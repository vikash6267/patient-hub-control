"use client"

import { notification, Typography } from "antd"
import { auto } from "manate/react"

import type { Store } from "../store"
import Connection from "./connection"
import Phone from "./phone"

const App = auto((props: { store: Store }) => {
  const { store } = props
  const [api, contextHolder] = notification.useNotification()
  globalThis.notifier = api

  return (
    <>
      {contextHolder}
      <Typography.Title>RingCentral WebPhone Demo</Typography.Title>
      <Typography.Text type="secondary" style={{ display: "block", textAlign: "center", marginBottom: "2rem" }}>
        Provider: {store.config.providerName} | From: {store.config.fromNumber}
      </Typography.Text>
      {!store.isConnected ? <Connection store={store} /> : <Phone store={store} />}
    </>
  )
})

export default App
