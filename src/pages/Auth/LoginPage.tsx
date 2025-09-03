import Button from '../../components/Button';
import InPuts from '../../components/InPuts';
import { FcGoogle } from 'react-icons/fc';
import { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import LOGO_new from '../../assets/LOGO_new.png';
import { useNavigate } from 'react-router-dom';
import logoA from '../../assets/logoA.jpg';

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});


const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  const newErrors: { email?: string; password?: string } = {};
  if (!form.email) newErrors.email = 'Email is required';
  if (!form.password) newErrors.password = 'Password is required';
  setErrors(newErrors);
  if (Object.keys(newErrors).length === 0) {
    navigate('/home');
  }
};

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-white">
      <div className="hidden lg:flex items-center justify-center bg-secondary-300 lg:w-1/2 p-0 relative min-h-[30vh] lg:min-h-screen overflow-hidden">
        <img
          src={logoA}
          alt="Judge"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: 0 }}
        />
        <div className="absolute inset-0 bg-primary-800/75 bg-opacity-40" style={{ zIndex: 1 }} />
        <div className="relative z-10 text-center text-white max-w-md w-full">
          <h1 className="text-3xl font-bold mb-2">Justice begins with knowledge</h1>
          <h1 className="text-2xl">&nbsp; Log in to know your rights</h1>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center w-full lg:w-1/2 p-6 lg:p-12 min-h-[70vh] lg:min-h-screen">
        <div className="flex justify-center mb-6">
          <img src={LOGO_new} alt="Logo" className="w-24 h-auto" />
        </div>
        <h1 className="text-2xl text-secondary-300 font-bold mb-6 text-center">
          Welcome back to MenyaLo
        </h1>
        <form className="w-full max-w-xs mx-auto" onSubmit={handleSubmit}>
          <div className="mb-4">
            <InPuts
              placeholder="Email"
              name="email"
              value={form.email}
              type="email"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              error={errors.email}
            />
          </div>
          <div className="mb-4">
            <div className="relative">
              <InPuts
                placeholder="Password"
                name="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                type={showPassword ? 'text' : 'password'}
                error={undefined}
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-xl text-primary-800"
                onClick={() => setShowPassword((prev) => !prev)}
                tabIndex={-1}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
          </div>
          <div className="text-right mb-4">
            <a href="#" className="text-secondary-300 hover:underline text-sm" onClick={() => {
              navigate('/forget-password');
            }}>
              Forget password?
            </a>
          </div>
          <Button type="submit" className="w-full bg-primary-800 text-white py-2 rounded-md mb-2">
            Log In
          </Button>
        </form>
        <div className="flex items-center w-full max-w-xs mx-auto my-4">
          <hr className="flex-grow border-secondary-200" />
          <span className="mx-2 text-secondary-300 text-sm">or continue</span>
          <hr className="flex-grow border-secondary-200" />
        </div>
        <div className="w-full max-w-xs mx-auto">
          <Button
            onClick={() => {}}
            className="w-full !text-secondary-300 py-2 rounded-md border border-primary-800 bg-white"
            variant="outline"
          >
            <div className="flex items-center justify-center">
              <FcGoogle className="mr-2" />
              Sign in with Google
            </div>
          </Button>
        </div>
        <div className="text-center mt-6 w-full max-w-xs mx-auto">
          <p className="text-sm text-secondary-300">
            Don't have an account?{' '}
            <a
              href="#"
              className="text-primary-800 hover:underline font-bold"
              onClick={() => navigate('/register')}
            >
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
