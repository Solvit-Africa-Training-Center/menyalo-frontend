import { Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/Auth/LoginPage';
import RegisterPage from '../pages/Auth/RegisterPage';
import ForgetPasswordPage from '../pages/Auth/ForgetPasswordPage';
import VerificationPage from '../pages/Auth/verificationPage';
import NewPasswordPage from '../pages/Auth/NewPasswordPage';
export default function AppRoutes() {
  return (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/forget-password" element={<ForgetPasswordPage />} />
    <Route path="/verification" element={<VerificationPage />} />
    <Route path="/new-password" element={<NewPasswordPage />} />
  </Routes>
);
}
