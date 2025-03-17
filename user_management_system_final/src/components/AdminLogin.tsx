import { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Input, Button, Alert } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";


interface LoginFormInputs {
  username: string;
  password: string;
}

const AdminLogin: React.FC = () => {
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  
  
  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();


  const handleLogin: SubmitHandler<LoginFormInputs> = (values) => {
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

      <form onSubmit={handleSubmit(handleLogin)}>
        <div style={{ marginBottom: 10 }}>
          <Controller
            name="username"
            control={control}
            rules={{ required: "Please enter username" }}
            render={({ field }) => <Input {...field} placeholder="Username" />}
          />
          {errors.username && <p style={{ color: "red" }}>{errors.username.message}</p>}
        </div>
        <div style={{ marginBottom: 10 }}>
          <Controller
            name="password"
            control={control}
            rules={{ required: "Please enter password" }}
            render={({ field }) => <Input.Password {...field} placeholder="Password" />}
          />
          {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}
        </div>
        <Button type="primary" htmlType="submit" block>
          Login
        </Button>
      </form>
    </div>
  );
};

export default AdminLogin;
