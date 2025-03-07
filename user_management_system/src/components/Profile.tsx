import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Avatar, Descriptions, Button } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";

const Profile: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/login"); // Redirect if no user is logged in
    }
  }, [navigate]);

  if (!user) return null; // Prevent rendering before user data loads

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl w-full">
        <Card
          title="User Profile"
          className="shadow-lg"
          style={{ overflowY: "auto", maxHeight: "80vh" }} // Prevents cut-off when scrolling
          extra={
            <Button
              type="primary"
              danger
              icon={<LogoutOutlined />}
              onClick={() => {
                localStorage.removeItem("loggedInUser");
                navigate("/login");
              }}
            >
              Logout
            </Button>
          }
        >
          <div className="flex flex-col items-center mb-4">
            <Avatar
              size={100}
              src={user.image}
              icon={<UserOutlined />}
              className="mb-3"
            />
          </div>

          <Descriptions bordered column={1} size="middle">
            <Descriptions.Item label="Name">
              {user.firstName} {user.lastName}
            </Descriptions.Item>
            <Descriptions.Item label="Middle Name">
              {user.maidenName}
            </Descriptions.Item>
            <Descriptions.Item label="Age">{user.age}</Descriptions.Item>
            <Descriptions.Item label="Gender">{user.gender}</Descriptions.Item>
            <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
            <Descriptions.Item label="Phone">{user.phone}</Descriptions.Item>
            <Descriptions.Item label="Username">{user.username}</Descriptions.Item>
            <Descriptions.Item label="Birth Date">{user.birthDate}</Descriptions.Item>
            <Descriptions.Item label="Blood Group">{user.bloodGroup}</Descriptions.Item>
            <Descriptions.Item label="Height">{user.height} cm</Descriptions.Item>
            <Descriptions.Item label="Weight">{user.weight} kg</Descriptions.Item>
            <Descriptions.Item label="Eye Color">{user.eyeColor}</Descriptions.Item>
            <Descriptions.Item label="Address">
              {user.address.address}, {user.address.city}, {user.address.state},{" "}
              {user.address.country} - {user.address.postalCode}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
