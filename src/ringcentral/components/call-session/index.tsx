"use client"

import { auto } from "manate/react"
import type CallSession from "ringcentral-web-phone/call-session/index"
import type InboundCallSession from "ringcentral-web-phone/call-session/inbound"
import type OutboundCallSession from "ringcentral-web-phone/call-session/outbound"

import InboundSession from "./inbound"
import OutboundSession from "./outbound"

const Session = auto((props: { callSession: CallSession }) => {
  const { callSession } = props
  return callSession.direction === "inbound" ? (
    <InboundSession session={callSession as InboundCallSession} />
  ) : callSession.state === "init" ? (
    <>Initiating call...</>
  ) : (
    <OutboundSession session={callSession as OutboundCallSession} />
  )
})

export default Session
