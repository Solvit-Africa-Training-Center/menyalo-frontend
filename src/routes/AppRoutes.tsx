import { Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/Auth/LoginPage';
import RegisterPage from '../pages/Auth/RegisterPage';
import ForgetPasswordPage from '../pages/Auth/ForgetPasswordPage';
import VerificationPage from '../pages/Auth/verificationPage';
import NewPasswordPage from '../pages/Auth/NewPasswordPage';
import Feed from '../pages/Feed';
import Userprofile from '../pages/Userprofile';
import FirmPage from '../pages/FirmPage';
import FirmProfilePage from '../pages/FirmProfilePage';
import CommunityPage from '../pages/CommunityPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forget-password" element={<ForgetPasswordPage />} />
      <Route path="/verification" element={<VerificationPage />} />
      <Route path="/new-password" element={<NewPasswordPage />} />
      <Route path="/feed" element={<Feed />} />
      <Route path="/user" element={<Userprofile />} />
      <Route path="/firms" element={<FirmPage />} />
      <Route path="/firms/:firmName" element={<FirmProfilePage />} />
      <Route path="/community" element={<CommunityPage />} />
    </Routes>
  );
}
