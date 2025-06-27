import React from "react";

import { Input, List, Avatar } from "antd";
import { Search, User } from "lucide-react";
import { auto } from "manate/react";
import { useNavigate } from "react-router-dom";

import { patientStore } from "../store/patients";

const { Search: SearchInput } = Input;

const Sidebar = auto(() => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "16px" }}>
      <SearchInput
        placeholder="Search patients..."
        prefix={<Search size={16} />}
        value={patientStore.searchTerm}
        onChange={(e) => patientStore.setSearchTerm(e.target.value)}
        style={{ marginBottom: "16px" }}
      />

      <List
        dataSource={patientStore.filteredPatients}
        renderItem={(patient) => (
          <List.Item
            style={{
              cursor: "pointer",
              background:
                patientStore.selectedPatient?.id === patient.id
                  ? "#e6f7ff"
                  : "transparent",
              borderRadius: "8px",
              margin: "4px 0",
              padding: "12px",
            }}
            onClick={() => {
              patientStore.selectPatient(patient);
              navigate(`/patient/${patient.id}`);
            }}
          >
            <List.Item.Meta
              avatar={
                <Avatar
                  icon={<User size={16} />}
                  style={{ backgroundColor: "#1890ff" }}
                />
              }
              title={patient.name}
              description={patient.phone}
            />
          </List.Item>
        )}
      />
    </div>
  );
});

export default Sidebar;
