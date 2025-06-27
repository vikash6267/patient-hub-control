import RingCentral from "@rc-ex/core"
import type GetExtensionInfoResponse from "@rc-ex/core/lib/definitions/GetExtensionInfoResponse"
import type SipInfoResponse from "@rc-ex/core/lib/definitions/SipInfoResponse"
import { message } from "antd"
import hyperid from "hyperid"
import localforage from "localforage"
import { manage } from "manate"
import WebPhone from "ringcentral-web-phone"
import type { SipInfo } from "ringcentral-web-phone/types"
import waitFor from "wait-for-async"

import { DEFAULT_CONFIG, type RingCentralConfig } from "../types/config"

const uuid = hyperid()

// Utility function to trim phone number prefix
const trimPrefix = (s: string, prefix: string): string => {
  if (s.startsWith(prefix)) {
    return s.slice(prefix.length)
  }
  return s
}

export class Store {
  public config: RingCentralConfig = DEFAULT_CONFIG
  public rcToken = ""
  public refreshToken = ""
  public isConnected = false
  public isConnecting = false
  public webPhone: WebPhone | null = null
  public extInfo: GetExtensionInfoResponse | null = null
  public primaryNumber = ""
  public callerIds: string[] = []
  public deviceId = ""

  public async connect() {
    this.isConnecting = true

    try {
      const rc = new RingCentral({
        server: this.config.server,
        clientId: this.config.clientId,
        clientSecret: this.config.clientSecret,
      })

      // Authenticate using JWT
      const token = await rc.authorize({ jwt: this.config.jwt })
      this.rcToken = token.access_token!
      this.refreshToken = token.refresh_token!

      // Fetch extension and phone number info
      this.extInfo = await rc.restapi().account().extension().get()
      const numberList = await rc.restapi().account().extension().phoneNumber().get()

      this.primaryNumber = trimPrefix(numberList.records?.find((n) => n.primary)?.phoneNumber ?? "", "+")

      if (this.primaryNumber !== "") {
        this.callerIds.push(this.primaryNumber)
      }

      // Add additional caller IDs
      this.callerIds = [
        ...this.callerIds,
        ...(numberList.records
          ?.filter((n) => !n.primary)
          .filter((n) => n.features?.includes("CallerId"))
          .map((n) => trimPrefix(n.phoneNumber!, "+")) ?? []),
      ]

      // Add the configured fromNumber if not already present
      const fromNumber = trimPrefix(this.config.fromNumber, "+")
      if (!this.callerIds.includes(fromNumber)) {
        this.callerIds.push(fromNumber)
      }

      // Create and initialize WebPhone
      const cacheKey = `rc-${this.extInfo.id}`
      let sipInfo = await localforage.getItem<SipInfoResponse>(`${cacheKey}-sipInfo`)
      this.deviceId = (await localforage.getItem<string>(`${cacheKey}-deviceId`)) ?? ""

      if (sipInfo === null) {
        console.log("Generating new sipInfo")
        const r = await rc
          .restapi()
          .clientInfo()
          .sipProvision()
          .post({
            sipInfo: [{ transport: "WSS" }],
          })
        sipInfo = r.sipInfo![0]
        this.deviceId = r.device!.id!
        await localforage.setItem(`${cacheKey}-sipInfo`, sipInfo)
        await localforage.setItem(`${cacheKey}-deviceId`, this.deviceId)
      } else {
        console.log("Using cached sipInfo")
      }

      console.log("deviceId:", this.deviceId)

      // Initialize WebPhone
      this.webPhone = new WebPhone({
        sipInfo: sipInfo as SipInfo,
        instanceId: uuid(),
        debug: true,
        autoAnswer: false,
      })

      // Set up event listeners
      this.setupEventListeners()

      // Start the WebPhone
      await this.webPhone.start()

      this.isConnected = true
      message.success(`Connected as ${this.extInfo.contact?.firstName} ${this.extInfo.contact?.lastName}`)

      // Set up token refresh
      this.setupTokenRefresh(rc)

      // Set up connection recovery
      this.setupConnectionRecovery()
    } catch (error) {
      console.error("Connection failed:", error)
      message.error(`Connection failed: ${error.message}`)
    } finally {
      this.isConnecting = false
    }
  }

  public async disconnect() {
    if (this.webPhone) {
      await this.webPhone.dispose()
      this.webPhone = null
    }
    this.isConnected = false
    this.rcToken = ""
    this.refreshToken = ""
    message.info("Disconnected")
  }

  public async makeCall(number: string, fromNumber?: string) {
    if (!this.webPhone) {
      message.error("Not connected")
      return
    }

    try {
      const callerId = fromNumber || this.callerIds[0]
      await this.webPhone.call(number, callerId)
    } catch (error) {
      console.error("Call failed:", error)
      message.error(`Call failed: ${error.message}`)
    }
  }

  private setupEventListeners() {
    if (!this.webPhone) return

    // Handle incoming calls
    this.webPhone.on("inboundCall", (callSession) => {
      globalThis.notifier.info({
        message: "Incoming Call",
        description: `Call from ${callSession.remoteNumber}`,
        duration: 0,
      })
    })

    // Handle outbound call events
    this.webPhone.on("outboundCall", (callSession) => {
      callSession.once("failed", (message) => {
        globalThis.notifier.error({
          message: "Call Failed",
          description: message,
          duration: 5,
        })
      })

      callSession.once("answered", () => {
        globalThis.notifier.success({
          message: "Call Connected",
          description: `Connected to ${callSession.remoteNumber}`,
          duration: 3,
        })
      })
    })
  }

  private setupTokenRefresh(rc: RingCentral) {
    // Auto refresh token every 30 minutes
    const refreshToken = async () => {
      if (this.rcToken !== "") {
        try {
          await rc.refresh()
          this.rcToken = rc.token!.access_token!
          this.refreshToken = rc.token!.refresh_token!
        } catch (error) {
          console.error("Token refresh failed:", error)
          this.disconnect()
        }
      }
    }

    setInterval(() => refreshToken(), 30 * 60 * 1000)
  }

  private setupConnectionRecovery() {
    if (!this.webPhone) return

    const recover = async () => {
      if (this.webPhone && !this.webPhone.disposed) {
        await this.webPhone.start()
        this.webPhone.callSessions.forEach((callSession) => {
          if (callSession.state === "answered") {
            callSession.reInvite()
          }
        })
      }
    }

    // Handle network outage
    globalThis.addEventListener("online", async () => {
      await recover()
    })

    // Handle WebSocket disconnection
    const closeListener = async (e) => {
      this.webPhone!.sipClient.wsc.removeEventListener("close", closeListener)
      if (this.webPhone!.disposed) {
        return
      }

      console.log("WebSocket disconnected unexpectedly", e)
      let connected = false
      let delay = 2000

      while (!connected && this.isConnected) {
        console.log(`Reconnecting in ${delay / 1000} seconds`)
        await waitFor({ interval: delay })
        try {
          await recover()
          connected = true
        } catch (e) {
          console.log("Error reconnecting:", e)
          delay = Math.min(delay * 2, 60000)
        }
      }

      if (connected && this.webPhone) {
        this.webPhone.sipClient.wsc.addEventListener("close", closeListener)
      }
    }

    this.webPhone.sipClient.wsc.addEventListener("close", closeListener)
  }
}

const store = manage(new Store())
globalThis.store = store
export default store
