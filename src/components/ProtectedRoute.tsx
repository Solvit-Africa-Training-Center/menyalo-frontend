import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import type { JSX } from 'react';
import { toast } from 'react-toastify';
import Button from './Button';

function MessageBox({
  message,
  title = 'Access Denied',
  buttonText = 'Go Back',
  onBack,
}: {
  message: string;
  title?: string;
  buttonText?: string;
  onBack: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh]">
      <div className="bg-red-50 border border-red-200 rounded-lg px-6 py-8 shadow text-center max-w-md">
        <h2 className="text-red-600 text-2xl font-bold mb-2">{title}</h2>
        <p className="text-red-500 text-base mb-6">{message}</p>
        <Button variant="primary" size="md" onClick={onBack}>
          {buttonText}
        </Button>
      </div>
    </div>
  );
}

export default function ProtectedRoute({
  children,
  allowedRoles,
}: {
  children: JSX.Element;
  allowedRoles?: string[];
}) {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  let errorMsg = '';
  let errorTitle = 'Access Denied';

  if (!token) {
    errorMsg = 'You must login to access this page.';
    errorTitle = 'Login Required';
  } else {
    try {
      const decoded: any = jwtDecode(token);
      const role = decoded.role;
      console.log('Decoded role:', role);
      if (allowedRoles && !allowedRoles.includes(role)) {
        errorMsg = 'You are not allowed to access this page.';
        errorTitle = 'Permission Denied';
      }
    } catch {
      errorMsg = 'Invalid token. Please login again.';
      errorTitle = 'Invalid Session';
    }
  }

  useEffect(() => {
    if (errorMsg) toast.error(errorMsg);
  }, [errorMsg]);

  if (errorMsg) {
    return (
      <MessageBox
        message={errorMsg}
        title={errorTitle}
        buttonText="Go Back"
        onBack={() => navigate(-1)}
      />
    );
  }

  return children;
}
