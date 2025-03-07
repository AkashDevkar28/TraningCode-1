import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/LoginPage";
import AdminLogin from "./components/AdminLogin";
import UserList from "./components/UserList";
import Profile from "./components/Profile";
import UserForm from "./components/UserForm";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/userlist" element={<UserList />} />
        <Route path="/user-form" element={<UserForm />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
