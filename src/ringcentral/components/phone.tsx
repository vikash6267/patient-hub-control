"use client"

import { Button, Empty, Form, Input, Select, Space, Typography, Badge, Card } from "antd"
import { auto } from "manate/react"
import React from "react"

import type { Store } from "../store"
import CallSession from "./call-session"

const Phone = auto((props: { store: Store }) => {
  const { store } = props
  const [callee, setCallee] = React.useState<string>("")
  const [selectedCallerId, setSelectedCallerId] = React.useState<string>("")

  React.useEffect(() => {
    if (store.callerIds.length > 0 && !selectedCallerId) {
      setSelectedCallerId(store.callerIds[0])
    }
  }, [store.callerIds, selectedCallerId])

  return (
    <>
      <div style={{ position: "absolute", top: 16, right: 16 }}>
        <Space>
          <Badge
            status={store.isConnected ? "success" : "error"}
            text={store.isConnected ? "Connected" : "Disconnected"}
          />
          <Button onClick={() => store.disconnect()}>Disconnect</Button>
        </Space>
      </div>

      <Space direction="vertical" style={{ display: "flex", maxWidth: 800, margin: "0 auto" }}>
        <Card>
          <Typography.Text>
            Connected as{" "}
            <strong>
              {store.extInfo?.contact?.firstName} {store.extInfo?.contact?.lastName}
            </strong>
          </Typography.Text>
          <br />
          <Typography.Text type="secondary">
            Primary Number: <strong>{store.primaryNumber}</strong>
          </Typography.Text>
        </Card>

        <Card title="Make a Call">
          <Form layout="vertical">
            <Form.Item label="From Number">
              <Select
                value={selectedCallerId}
                onChange={setSelectedCallerId}
                style={{ width: "100%" }}
                options={store.callerIds.map((n) => ({
                  value: n,
                  label: `+${n}`,
                }))}
              />
            </Form.Item>

            <Form.Item label="Call To">
              <Input
                placeholder="Enter phone number (e.g., +1234567890)"
                value={callee}
                onChange={(e) => setCallee(e.target.value.trim())}
                onPressEnter={() => {
                  if (callee.trim().length > 0) {
                    store.makeCall(callee, selectedCallerId)
                    setCallee("")
                  }
                }}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                onClick={() => {
                  store.makeCall(callee, selectedCallerId)
                  setCallee("")
                }}
                disabled={callee.trim().length === 0}
                block
                size="large"
              >
                Make Call
              </Button>
            </Form.Item>
          </Form>
        </Card>

        <Card title="Active Calls">
          {store.webPhone && (
            <>
              {store.webPhone.callSessions.map((callSession) => (
                <div key={callSession.callId} style={{ marginBottom: 16 }}>
                  <CallSession callSession={callSession} />
                </div>
              ))}
              {store.webPhone.callSessions.length === 0 && (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No active calls" />
              )}
            </>
          )}
        </Card>
      </Space>
    </>
  )
})

export default Phone
