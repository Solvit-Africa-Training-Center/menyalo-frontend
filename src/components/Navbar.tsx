import Logo from '../assets/Logo.png';
import Button from './Button';
// import { useNavigate } from 'react-router';

export default function Navbar() {
  // const navigate = useNavigate();
  // const handleRegister = () => {
  //     navigate('/register');
  // }
  // const handleLogin = () => {
  //     navigate('/login');
  // }

  return (
    <nav className="bg-primary-800 flex justify-between  pl-3 pr-3  ">
      <div className="w-20 h-20 p-2 ">
        <img src={Logo} alt="Logo" />
      </div>
      <div className="gap-6 flex p-2 mt-2">
        <Button
          variant="outline"
          size="sm"
          className="bg-white text-primary-800 h-10 w-20"
          type="button"
        >
          Register
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="bg-white text-primary-800 h-10 w-20"
          type="button"
        >
          Login
        </Button>
      </div>
    </nav>
  );
}
