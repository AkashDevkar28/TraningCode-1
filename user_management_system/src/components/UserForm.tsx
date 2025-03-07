import { useState } from "react";
import { Form, Input, Button, Alert, Select, DatePicker, Card, Row, Col, Typography } from "antd";
import { useUserStore } from "../store/useUserStore";
import { useNavigate } from "react-router-dom"; 
import dayjs from "dayjs";

const { Title } = Typography;

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
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  address: string;
  country: string;
}

interface Props {
  user?: User | null;
  closeModal: () => void;
}

const UserForm: React.FC<Props> = ({ user, closeModal }) => {
  const { addUser, updateUser } = useUserStore();
  const [form] = Form.useForm();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = (values: Omit<User, "id">) => {
    if (user) {
      updateUser(user.id, values);
      closeModal();
    } else {
      const newUser = { id: Date.now(), ...values };
      localStorage.setItem("user", JSON.stringify(newUser)); // Store in local storage
      const error = addUser(newUser);
      if (error) {
        setErrorMessage(error);
      } else {
        setErrorMessage(null);
        setSuccessMessage("Registration successful!");
        form.resetFields();
        setTimeout(() => setSuccessMessage(null), 3000);
      }
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "#f4f4f4", padding: "20px" }}>
      <Card
        style={{
          width: "100%",
          maxWidth: "900px", 
          padding: "20px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          borderRadius: "12px",
          background: "#ffffff",
          maxHeight: "95vh",
          overflowY: "auto"
        }}
      >
        <Title level={3} style={{ textAlign: "center", marginBottom: "20px", color: "#1890ff" }}>
          {user ? "Update User" : "Register User"}
        </Title>

        {errorMessage && <Alert message={errorMessage} type="error" showIcon style={{ marginBottom: 10 }} />}
        {successMessage && <Alert message={successMessage} type="success" showIcon style={{ marginBottom: 10 }} />}

        <Form form={form} layout="vertical" onFinish={handleSubmit} initialValues={user ? { ...user, birthDate: dayjs(user.birthDate) } : {}}>
          <Row gutter={16}>
            <Col span={12}><Form.Item name="firstName" label="First Name" rules={[{ required: true }]}><Input placeholder="Enter first name" /></Form.Item></Col>
            <Col span={12}><Form.Item name="maidenName" label="Middle Name"><Input placeholder="Enter middle name" /></Form.Item></Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}><Form.Item name="lastName" label="Last Name" rules={[{ required: true }]}><Input placeholder="Enter last name" /></Form.Item></Col>
            <Col span={12}><Form.Item name="birthDate" label="Birth Date" rules={[{ required: true }]}><DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} /></Form.Item></Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}><Form.Item name="age" label="Age" rules={[{ required: true }]}><Input type="number" placeholder="Enter age" /></Form.Item></Col>
            <Col span={12}><Form.Item name="gender" label="Gender" rules={[{ required: true }]}><Select placeholder="Select gender"><Select.Option value="Male">Male</Select.Option><Select.Option value="Female">Female</Select.Option><Select.Option value="Other">Other</Select.Option></Select></Form.Item></Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}><Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}><Input placeholder="Enter email" /></Form.Item></Col>
            <Col span={12}><Form.Item name="phone" label="Phone" rules={[{ required: true }]}><Input placeholder="Enter phone number" /></Form.Item></Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}><Form.Item name="username" label="Username" rules={[{ required: true }]}><Input placeholder="Choose a username" /></Form.Item></Col>
            <Col span={12}><Form.Item name="password" label="Password" rules={[{ required: true }]}><Input.Password placeholder="Enter password" /></Form.Item></Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}><Form.Item name="bloodGroup" label="Blood Group"><Input placeholder="Enter blood group" /></Form.Item></Col>
            <Col span={12}><Form.Item name="eyeColor" label="Eye Color"><Input placeholder="Enter eye color" /></Form.Item></Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}><Form.Item name="height" label="Height (cm)"><Input type="number" placeholder="Enter height" /></Form.Item></Col>
            <Col span={12}><Form.Item name="weight" label="Weight (kg)"><Input type="number" placeholder="Enter weight" /></Form.Item></Col>
          </Row>

          <Form.Item name="address" label="Address"><Input placeholder="Enter address" /></Form.Item>
          <Form.Item name="country" label="Country"><Input placeholder="Enter country" /></Form.Item>

          <Form.Item name="image" label="Profile Image URL">
            <Input placeholder="Enter image URL" />
          </Form.Item>

          <Row justify="center">
            <Button type="primary" htmlType="submit" style={{ width: "100%", height: "45px", borderRadius: "6px" }}>
              {user ? "Update User" : "Register"}
            </Button>
          </Row>

          <Row justify="center" style={{ marginTop: "10px" }}>
            <Typography.Text>
              Already have an account?{" "}
              <Typography.Link onClick={() => navigate("/login")} style={{ color: "#1890ff" }}>
                Login
              </Typography.Link>
            </Typography.Text>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default UserForm;
