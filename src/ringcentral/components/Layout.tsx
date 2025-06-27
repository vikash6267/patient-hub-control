import React from "react";
import { useEffect, useState } from "react";
import { Layout as AntLayout, notification } from "antd";
import { Outlet } from "react-router-dom";

import ActiveCallsPanel from "./calling/ActiveCallsPanel";
import CallManager from "./calling/CallManager";
import Header from "./Header";
import Sidebar from "./Sidebar";

const { Content, Sider } = AntLayout;

const Layout: React.FC = () => {
  const [api, contextHolder] = notification.useNotification();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    globalThis.notifier = api;
    setMounted(true);
  }, [api]);

  if (!mounted) {
    return <div>Loading...</div>;
  }

  return (
    <AntLayout style={{ minHeight: "100vh" }}>
      {contextHolder}
      <Header />
      <AntLayout>
        <Sider width={300} style={{ background: "#fff" }}>
          <Sidebar />
        </Sider>
        <Content style={{ padding: "24px", background: "#f0f2f5" }}>
          <div style={{ minHeight: "calc(100vh - 112px)" }}>
            <Outlet />
          </div>
        </Content>
      </AntLayout>

      <CallManager />
      <ActiveCallsPanel />
    </AntLayout>
  );
};

export default Layout;
