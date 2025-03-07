import { useState } from "react";
import { Form, Input, Button, Alert } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const AdminLogin: React.FC = () => {
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleLogin = (values: { username: string; password: string }) => {
    const success = login(values.username, values.password);
    if (success) {
      navigate("/userlist");
    } else {
      setError("Invalid credentials! Please try again.");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "100px auto", textAlign: "center" }}>
      <h2>Admin Login</h2>
      {error && <Alert message={error} type="error" showIcon style={{ marginBottom: 10 }} />}
      
      <Form onFinish={handleLogin}>
        <Form.Item name="username" rules={[{ required: true, message: "Please enter username" }]}>
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: "Please enter password" }]}>
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Button type="primary" htmlType="submit" block>
          Login
        </Button>
      </Form>
    </div>
  );
};

export default AdminLogin;
