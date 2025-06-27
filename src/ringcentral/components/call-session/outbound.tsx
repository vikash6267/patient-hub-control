import { Space, Tag } from "antd";
import { auto } from "manate/react";
import type OutboundCallSession from "ringcentral-web-phone/call-session/outbound";

import AnsweredSession from "./answered";

const OutboundSession = auto((props: { session: OutboundCallSession }) => {
  const { session } = props;

  return (
    <Space direction="vertical">
      <Space>
        <strong>Outgoing Call</strong>
        <span>to</span>
        <strong>{session.remoteNumber}</strong>
        <Tag color="blue">{session.state}</Tag>
      </Space>
      {session.state === "answered" && <AnsweredSession session={session} />}
    </Space>
  );
});

export default OutboundSession;
