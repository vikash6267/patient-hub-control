"use client"
import React from "react"
import { Card, Descriptions, Tag, Typography, Space, Divider, Spin, Alert } from "antd"
import { auto } from "manate/react"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

import { patientStore } from "../store/patients"
import CommunicationPanel from "./calling/CommunicationPanel"
import type { Patient } from "../types"

const { Title } = Typography

const PatientDetails = auto(() => {
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [patient, setPatient] = useState<Patient | null>(null)

  useEffect(() => {
    console.log("PatientDetails - ID from params:", id)
    console.log("PatientDetails - Available patients:", patientStore.patients.length)

    if (id) {
      const foundPatient = patientStore.patients.find((p) => p.id === id)
      console.log("PatientDetails - Found patient:", foundPatient)
      setPatient(foundPatient || null)

      if (foundPatient) {
        patientStore.selectPatient(foundPatient)
      }
    }
    setLoading(false)
  }, [id])

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "400px" }}>
        <Spin size="large" />
      </div>
    )
  }

  if (!patient) {
    return (
      <Card>
        <Alert
          message="Patient Not Found"
          description={`Patient with ID "${id}" was not found. Please select a patient from the sidebar.`}
          type="error"
          showIcon
        />
      </Card>
    )
  }

  return (
    <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
      <div style={{ flex: 1, minWidth: "400px" }}>
        <Card title={`Patient Details - ${patient.name}`}>
          <Descriptions column={2} bordered>
            <Descriptions.Item label="Name">{patient.name}</Descriptions.Item>
            <Descriptions.Item label="Phone">{patient.phone}</Descriptions.Item>
            <Descriptions.Item label="Email">{patient.email}</Descriptions.Item>
            <Descriptions.Item label="Age">{patient.age}</Descriptions.Item>
            <Descriptions.Item label="Gender">{patient.gender}</Descriptions.Item>
            <Descriptions.Item label="Address" span={2}>
              {patient.address}
            </Descriptions.Item>
            <Descriptions.Item label="Last Visit">{patient.lastVisit}</Descriptions.Item>
            <Descriptions.Item label="Next Appointment">{patient.nextAppointment || "Not scheduled"}</Descriptions.Item>
          </Descriptions>

          <Divider />

          <Title level={5}>Medical History</Title>
          <Space wrap>
            {patient.medicalHistory.map((condition, index) => (
              <Tag key={index} color="blue">
                {condition}
              </Tag>
            ))}
          </Space>

          <Divider />

          <Title level={5}>Emergency Contact</Title>
          <Descriptions column={1} size="small">
            <Descriptions.Item label="Name">{patient.emergencyContact.name}</Descriptions.Item>
            <Descriptions.Item label="Phone">{patient.emergencyContact.phone}</Descriptions.Item>
            <Descriptions.Item label="Relation">{patient.emergencyContact.relation}</Descriptions.Item>
          </Descriptions>
        </Card>
      </div>

      <div style={{ width: "400px", minWidth: "400px" }}>
        <CommunicationPanel patient={patient} />
      </div>
    </div>
  )
})

export default PatientDetails
