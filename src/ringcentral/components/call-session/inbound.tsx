"use client"

import { Button, Space, Tag } from "antd"
import { auto } from "manate/react"
import type InboundCallSession from "ringcentral-web-phone/call-session/inbound"

import AnsweredSession from "./answered"

const InboundSession = auto((props: { session: InboundCallSession }) => {
  const { session } = props

  return (
    <Space direction="vertical">
      <Space>
        <strong>Incoming Call</strong>
        <span>from</span>
        <strong>{session.remoteNumber}</strong>
        <Tag color="blue">{session.state}</Tag>
      </Space>
      {session.state === "ringing" && (
        <Space>
          <Button onClick={() => session.answer()} type="primary">
            Answer
          </Button>
          <Button onClick={() => session.decline()} danger>
            Decline
          </Button>
        </Space>
      )}
      {session.state === "answered" && <AnsweredSession session={session} />}
    </Space>
  )
})

export default InboundSession
