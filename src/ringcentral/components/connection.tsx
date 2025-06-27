"use client"

import { Button, Card, Space, Typography } from "antd"
import { auto } from "manate/react"

import type { Store } from "../store"

const { Text, Title } = Typography

const Connection = auto((props: { store: Store }) => {
  const { store } = props

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <Card>
        <Space direction="vertical" style={{ width: "100%" }}>
          <Title level={3}>RingCentral Configuration</Title>

          <div>
            <Text strong>Server: </Text>
            <Text code>{store.config.server}</Text>
          </div>

          <div>
            <Text strong>Client ID: </Text>
            <Text code>{store.config.clientId}</Text>
          </div>

          <div>
            <Text strong>Provider: </Text>
            <Text>{store.config.providerName}</Text>
          </div>

          <div>
            <Text strong>From Number: </Text>
            <Text>{store.config.fromNumber}</Text>
          </div>

          <div>
            <Text strong>Auth Type: </Text>
            <Text>{store.config.authType.toUpperCase()}</Text>
          </div>

          <Button type="primary" size="large" onClick={() => store.connect()} loading={store.isConnecting} block>
            {store.isConnecting ? "Connecting..." : "Connect to RingCentral"}
          </Button>

          <Text type="secondary" style={{ fontSize: "12px" }}>
            This will authenticate using JWT and set up the WebPhone connection.
          </Text>
        </Space>
      </Card>
    </div>
  )
})

export default Connection
