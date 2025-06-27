import React from 'react'
import { Card, Empty, Typography } from "antd"
import { auto } from "manate/react"

import { patientStore } from "../store/patients"

const { Title } = Typography

const PatientList = auto(() => {
  if (patientStore.filteredPatients.length === 0) {
    return (
      <Card>
        <Empty description="No patients found" style={{ padding: "40px" }} />
      </Card>
    )
  }

  return (
    <Card>
      <Title level={4}>Select a patient from the sidebar to view details</Title>
      <p>Total Patients: {patientStore.patients.length}</p>
    </Card>
  )
})

export default PatientList
