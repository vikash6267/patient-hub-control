import type React from "react";
import { useState, useEffect } from "react";
import { Card, Button, Space, Typography, Modal, Avatar } from "antd";
import { Phone, PhoneOff, User } from "lucide-react";

import { ringCentralStore } from "../../store/ringcentral";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebase"; // Adjust import path as needed

const { Text, Title } = Typography;

interface Patient {
  activityLevel: string;
  address: string;
  allergies: string;
  bloodPressure: string;
  dob: string;
  email: string;
  firstName: string;
  gender: string;
  heartRate: number;
  id: string;
  lastName: string;
  lastVisit: string;
  medicalHistory: string;
  name: string;
  phone: string;
  status: string;
  totalPatients: number;
  weeklyTrends: number;
}

export const getSinglePatientByNumberAPI = async (phoneNumber: string) => {
  try {
    // Clean the phone number
    const cleanNumber = phoneNumber.replace(/\D/g, "");

    // Query Firebase collection for patients with matching phone number
    const patientsRef = collection(db, "patients");
    const q = query(patientsRef, where("phone", "==", cleanNumber));

    const querySnapshot = await getDocs(q);
    const patients: any[] = [];

    querySnapshot.forEach((doc) => {
      patients.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return patients;
  } catch (error) {
    console.error("Error fetching patient by phone number:", error);
    throw error;
  }
};

const CallManager: React.FC = () => {
  const [incomingCall, setIncomingCall] = useState<any>(null);
  const [currentPatient, setCurrentPatient] = useState<Patient | null>(null);
  const [isLoadingPatient, setIsLoadingPatient] = useState(false);

  useEffect(() => {
    const updateIncomingCalls = async () => {
      const activeCalls = ringCentralStore.activeCalls || [];
      const ringingInbound = activeCalls.find(
        (call) => call.direction === "inbound" && call.state === "ringing"
      );

      if (ringingInbound && ringingInbound !== incomingCall) {
        setIncomingCall(ringingInbound);
        // Fetch patient data when new call comes in
        await fetchPatientByPhone(ringingInbound.remoteNumber);
      } else if (!ringingInbound) {
        setIncomingCall(null);
        setCurrentPatient(null);
      }
    };

    updateIncomingCalls();
    const unsubscribe = ringCentralStore.subscribe(updateIncomingCalls);

    return () => {
      unsubscribe();
    };
  }, [incomingCall]);

  const fetchPatientByPhone = async (phoneNumber: string) => {
    if (!phoneNumber) return;

    setIsLoadingPatient(true);
    try {
      // Clean the phone number - remove all non-digit characters
      const cleanNumber = phoneNumber.replace(/\D/g, "");

      console.log("🔍 Searching for patient with number:", cleanNumber);

      const response = await getSinglePatientByNumberAPI(cleanNumber);

      if (response && response.length > 0) {
        const patient = response[0];
        setCurrentPatient(patient);
        console.log("✅ Patient found:", patient);
      } else {
        console.log("❌ No patient found for number:", cleanNumber);
        setCurrentPatient(null);
      }
    } catch (error) {
      console.error("❌ Error fetching patient data:", error);
      setCurrentPatient(null);
      globalThis.notifier?.error({
        message: "Patient Lookup Failed",
        description: "Failed to fetch patient information. Please try again.",
      });
    } finally {
      setIsLoadingPatient(false);
    }
  };

  const handleAnswer = async () => {
    if (incomingCall) {
      try {
        await incomingCall.answer();
        // Keep the patient data available even after answering
      } catch (error) {
        console.error("❌ Failed to answer call:", error);
        globalThis.notifier?.error({
          message: "Answer Failed",
          description: "Failed to answer the call. Please try again.",
        });
      }
    }
  };

  const handleDecline = async () => {
    if (incomingCall) {
      try {
        await incomingCall.decline();
        setIncomingCall(null);
        setCurrentPatient(null);
      } catch (error) {
        console.error("❌ Failed to decline call:", error);
        globalThis.notifier?.error({
          message: "Decline Failed",
          description: "Failed to decline the call. Please try again.",
        });
      }
    }
  };

  const calculateAge = (birthDate: string): number => {
    if (!birthDate) return 0;

    const birth = new Date(birthDate);
    const today = new Date();

    if (birth > today) return 0;

    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }

    return age;
  };

  if (!incomingCall) return null;

  return (
    <Modal
      title="📞 Incoming Call"
      open={!!incomingCall}
      footer={null}
      closable={false}
      centered
      width={450}
      style={{ zIndex: 2000 }}
    >
      <Card style={{ textAlign: "center" }}>
        <Space
          direction="vertical"
          align="center"
          style={{ width: "100%" }}
          size="large"
        >
          <Avatar
            size={80}
            icon={<User size={40} />}
            style={{
              backgroundColor: currentPatient ? "#52c41a" : "#1890ff",
            }}
          />

          <div>
            <Title level={3} style={{ margin: 0 }}>
              {isLoadingPatient
                ? "Loading..."
                : currentPatient
                ? `${currentPatient.firstName} ${currentPatient.lastName}`
                : "Unknown Caller"}
            </Title>
            <Text type="secondary" style={{ fontSize: "16px" }}>
              {incomingCall.remoteNumber}
            </Text>

            {currentPatient && (
              <div style={{ marginTop: 8 }}>
                <Text type="secondary">Patient ID: {currentPatient.id}</Text>
                <br />
                <Text type="secondary">
                  Age: {calculateAge(currentPatient.dob)} |{" "}
                  {currentPatient.gender}
                </Text>
                <br />
                <Text type="secondary">
                  Status: {currentPatient.status} | Last Visit:{" "}
                  {currentPatient.lastVisit}
                </Text>
                {currentPatient.email && (
                  <>
                    <br />
                    <Text type="secondary">Email: {currentPatient.email}</Text>
                  </>
                )}
              </div>
            )}

            {!currentPatient && !isLoadingPatient && (
              <div style={{ marginTop: 8 }}>
                <Text type="warning">Patient not found in database</Text>
              </div>
            )}
          </div>

          <Text type="secondary" style={{ fontSize: "14px" }}>
            📞 Incoming call...
          </Text>

          <Space size="large">
            <Button
              type="primary"
              icon={<Phone size={24} />}
              onClick={handleAnswer}
              size="large"
              style={{
                backgroundColor: "#52c41a",
                borderColor: "#52c41a",
                height: "60px",
                width: "120px",
                borderRadius: "30px",
              }}
            >
              Answer
            </Button>

            <Button
              danger
              icon={<PhoneOff size={24} />}
              onClick={handleDecline}
              size="large"
              style={{
                height: "60px",
                width: "120px",
                borderRadius: "30px",
              }}
            >
              Decline
            </Button>
          </Space>
        </Space>
      </Card>
    </Modal>
  );
};

export default CallManager;
