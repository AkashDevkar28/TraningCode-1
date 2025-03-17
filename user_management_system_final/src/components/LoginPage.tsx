import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";
import { Card, Form, Input, Button, Typography, message } from "antd";
import { useForm, Controller } from "react-hook-form";

const { Title, Text } = Typography;

interface LoginFormInputs {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { users } = useUserStore();

  
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  
  const handleLogin = (values: LoginFormInputs) => {
    const { username, password } = values;
    const user = users.find((u) => u.username === username && u.password === password);

    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      message.success(`Welcome, ${user.firstName} ${user.lastName}!`);
      navigate("/profile");
    } else {
      setError("Invalid username or password!");
      message.error("Invalid username or password!");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #6e8efb, #a777e3)",
      }}
    >
      <Card
        style={{
          width: 400,
          padding: "25px",
          borderRadius: "12px",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
          background: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <Title level={3} style={{ color: "#fff", marginBottom: "15px" }}>
          🔐 Welcome Back
        </Title>

        {error && (
          <Text type="danger" style={{ display: "block", marginBottom: "10px" }}>
            {error}
          </Text>
        )}

        <Form layout="vertical" onFinish={handleSubmit(handleLogin)}>
          
          <Form.Item label={<span style={{ color: "#fff" }}>Username</span>}>
            <Controller
              name="username"
              control={control}
              rules={{ required: "Please enter your username!" }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Enter your username"
                  style={{
                    borderRadius: "8px",
                    padding: "10px",
                    border: "none",
                  }}
                />
              )}
            />
            {errors.username && <Text type="danger">{errors.username.message}</Text>}
          </Form.Item>


          <Form.Item label={<span style={{ color: "#fff" }}>Password</span>}>
            <Controller
              name="password"
              control={control}
              rules={{ required: "Please enter your password!" }}
              render={({ field }) => (
                <Input.Password
                  {...field}
                  placeholder="Enter your password"
                  style={{
                    borderRadius: "8px",
                    padding: "10px",
                    border: "none",
                  }}
                />
              )}
            />
            {errors.password && <Text type="danger">{errors.password.message}</Text>}
          </Form.Item>

          
          <Button
            type="primary"
            htmlType="submit"
            block
            style={{
              background: "linear-gradient(135deg, #ff9a9e, #fad0c4)",
              border: "none",
              borderRadius: "8px",
              padding: "10px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "all 0.3s ease-in-out",
              marginBottom: "10px",
            }}
            onMouseOver={(e) => (e.currentTarget.style.opacity = "0.8")}
            onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Login
          </Button>

          
          <Button
            type="default"
            block
            style={{
              background: "linear-gradient(135deg, #6a11cb, #2575fc)",
              border: "none",
              borderRadius: "8px",
              padding: "10px",
              fontSize: "16px",
              fontWeight: "bold",
              color: "#fff",
              cursor: "pointer",
              transition: "all 0.3s ease-in-out",
            }}
            onMouseOver={(e) => (e.currentTarget.style.opacity = "0.8")}
            onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
            onClick={() => navigate("/user-form")}
          >
            Sign Up
          </Button>
        </Form>

        <Text style={{ display: "block", marginTop: "15px", color: "#fff" }}>
          <Button type="link" onClick={() => navigate("/admin-login")} style={{ color: "#ffeb3b" }}>
            Admin Login
          </Button>
        </Text>
      </Card>
    </div>
  );
};

export default Login;
