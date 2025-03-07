import { useEffect, useState } from "react";
import { List, Button, Typography, Spin, Modal, Space, Input, Select } from "antd";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useUserStore } from "../store/useUserStore";
import UserForm from "./UserForm";
import { useNavigate } from "react-router-dom";
import Login from "./LoginPage";

const { Title, Text } = Typography;
const { Search } = Input;
const { Option } = Select;

interface User {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
}

const fetchUsers = async (): Promise<User[]> => {
  const { data } = await axios.get("https://dummyjson.com/users");
  return data.users;
};

const UserList = () => {
  const navigate = useNavigate();
  const { users, setUsers, deleteUser } = useUserStore();
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [genderFilter, setGenderFilter] = useState("all");

  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  useEffect(() => {
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else if (data) {
      setUsers(data);
      localStorage.setItem("users", JSON.stringify(data));
    }
  }, [data, setUsers]);

  const handleRefetch = async () => {
    const newUsers = await fetchUsers();
    setUsers(newUsers);
    localStorage.setItem("users", JSON.stringify(newUsers));
  };

  const handleDeleteAll = () => {
    if (window.confirm("Are you sure you want to delete all users?")) {
      setUsers([]);
      localStorage.removeItem("users");
    }
  };

  const filteredUsers = users.filter(user =>
    (user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (genderFilter === "all" || user.gender === genderFilter)
  );

  if (isLoading) return <Spin size="large" style={{ display: "block", margin: "50px auto" }} />;
  if (error) return <Text type="danger">Failed to load users.</Text>;

  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        maxWidth: "800px",
        margin: "50px auto",
        height: "80vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Title level={3} style={{ textAlign: "center", marginBottom: "20px" }}>USER LIST</Title>

      <Space style={{ marginBottom: 10, width: "100%", justifyContent: "space-between" }}>
        <Button type="primary" onClick={() => setIsModalOpen(true)}>Add User</Button>
        <Button type="default" onClick={handleRefetch}>Refetch Users</Button>
        <Button type="primary" danger onClick={handleDeleteAll}>Delete All Users</Button>
        <Button type="dashed" onClick={() => navigate("/login")}>Go To User Login</Button>
      </Space>

      <Space style={{ marginBottom: 10, width: "100%", display: "flex" }}>
        <Search
          placeholder="Search by name, email, or username"
          allowClear
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ flex: 1 }}
        />
        <Select defaultValue="all" onChange={(value) => setGenderFilter(value)} style={{ width: 120 }}>
          <Option value="all">All</Option>
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
        </Select>
      </Space>

      <div style={{ flex: 1, overflowY: "auto", paddingRight: "10px" }}>
        <List
          bordered
          dataSource={filteredUsers}
          renderItem={(user) => (
            <List.Item
              actions={[
                <Button type="link" onClick={() => { setEditingUser(user); setIsModalOpen(true); }}>Edit</Button>,
                <Button type="link" danger onClick={() => deleteUser(user.id)}>Delete</Button>,
              ]}
            >
              <div>
                <Title level={5}>
                  {user.firstName} {user.maidenName} {user.lastName} ({user.age}, {user.gender})
                </Title>
                <Text>Email: {user.email}</Text> <br />
                <Text>Phone: {user.phone}</Text> <br />
                <Text>Username: {user.username}</Text>
              </div>
            </List.Item>
          )}
        />
      </div>

      <Modal
        title={editingUser ? "Edit User" : "Add User"}
        open={isModalOpen}
        onCancel={() => { setIsModalOpen(false); setEditingUser(null); }}
        footer={null}
      >
        <UserForm user={editingUser} closeModal={() => { setIsModalOpen(false); setEditingUser(null); }} />
      </Modal>
    </div>
  );
};

export default UserList;
