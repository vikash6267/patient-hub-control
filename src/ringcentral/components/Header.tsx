"use client"
import React from 'react'
import { useState, useEffect } from "react"
import { Badge, Button, Space, Typography, Dropdown, Tooltip, Spin } from "antd"
import { Phone, PhoneOff, LogOut, Clock } from "lucide-react"

import { ringCentralStore } from "../store/ringcentral"

const { Title, Text } = Typography

const Header = () => {
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [tokenExpiry, setTokenExpiry] = useState("Not logged in")
  const [extInfo, setExtInfo] = useState(null)
  const [initComplete, setInitComplete] = useState(false)

  useEffect(() => {
    const updateStatus = () => {
      setIsConnected(ringCentralStore.isConnected)
      setIsConnecting(ringCentralStore.isConnecting)
      setIsLoggedIn(ringCentralStore.isLoggedIn)
      setTokenExpiry(ringCentralStore.tokenExpiryFormatted)
      setExtInfo(ringCentralStore.extInfo)
      setInitComplete(ringCentralStore.initializationComplete)
    }

    // Initial update
    updateStatus()

    // Subscribe to store changes
    const unsubscribe = ringCentralStore.subscribe(updateStatus)

    // Also update every second for token expiry
    const interval = setInterval(updateStatus, 1000)

    return () => {
      unsubscribe()
      clearInterval(interval)
    }
  }, [])

  const handleConnect = () => {
    ringCentralStore.connect()
  }

  const handleDisconnect = () => {
    ringCentralStore.disconnect()
  }

  const handleLogout = () => {
    ringCentralStore.logout()
  }

  const dropdownItems = [
    {
      key: "user-info",
      label: (
        <div style={{ padding: "8px 0" }}>
          <Text strong>
            {extInfo?.contact?.firstName} {extInfo?.contact?.lastName}
          </Text>
          <br />
          <Text type="secondary" style={{ fontSize: "12px" }}>
            {extInfo?.contact?.email}
          </Text>
        </div>
      ),
      disabled: true,
    },
    {
      type: "divider" as const,
    },
    {
      key: "token-expiry",
      label: (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Clock size={14} />
          <Text style={{ fontSize: "12px" }}>{tokenExpiry}</Text>
        </div>
      ),
      disabled: true,
    },
    {
      type: "divider" as const,
    },
    {
      key: "logout",
      label: (
        <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#ff4d4f" }}>
          <LogOut size={14} />
          <span>Logout</span>
        </div>
      ),
      onClick: handleLogout,
    },
  ]

  // Show loading state during initialization
  if (!initComplete) {
    return (
      <div
        style={{
          background: "#001529",
          padding: "0 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "64px",
        }}
      >
        <Title level={3} style={{ color: "white", margin: 0 }}>
          Patient Management System
        </Title>
        <Space>
          <Spin size="small" />
          <Text style={{ color: "white" }}>Initializing...</Text>
        </Space>
      </div>
    )
  }

  return (
    <div
      style={{
        background: "#001529",
        padding: "0 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "64px",
      }}
    >
      <Title level={3} style={{ color: "white", margin: 0 }}>
        Patient Management System
      </Title>

      <Space>
        {/* Connection Status */}
        <Badge
          status={isConnected ? "success" : isLoggedIn ? "warning" : "error"}
          text={
            <span style={{ color: "white" }}>
              {isConnected ? "Connected" : isLoggedIn ? "Logged In" : "Disconnected"}
            </span>
          }
        />

        {/* User Info Dropdown (when logged in) */}
        {isLoggedIn && extInfo && (
          <Dropdown menu={{ items: dropdownItems }} placement="bottomRight">
            <Button type="text" style={{ color: "white", padding: "4px 8px" }}>
              <Text style={{ color: "white" }}>
                {extInfo.contact?.firstName} {extInfo.contact?.lastName}
              </Text>
            </Button>
          </Dropdown>
        )}

        {/* Connect/Disconnect Button */}
        {isLoggedIn ? (
          isConnected ? (
            <Button icon={<PhoneOff size={16} />} onClick={handleDisconnect} danger>
              Disconnect
            </Button>
          ) : (
            <Button icon={<Phone size={16} />} onClick={handleConnect} loading={isConnecting} type="primary">
              Connect
            </Button>
          )
        ) : (
          <Button icon={<Phone size={16} />} onClick={handleConnect} loading={isConnecting} type="primary">
            Login & Connect
          </Button>
        )}

        {/* Token Expiry Tooltip */}
        {isLoggedIn && (
          <Tooltip title={`Token ${tokenExpiry}`}>
            <Clock size={16} style={{ color: "white", opacity: 0.7 }} />
          </Tooltip>
        )}
      </Space>
    </div>
  )
}

export default Header
