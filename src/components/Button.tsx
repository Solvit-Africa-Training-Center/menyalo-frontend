import type { ButtonProps } from '../types/buttontypes';

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'sm',
  disabled = false,
  className = '',
}) => {
  const baseClasses =
    'font-medium rounded-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variantClasses = {
    primary: 'bg-primary-50 text-white hover:bg-primary-100 focus:ring-primary-50',
    secondary: 'bg-secondary-50 text-white hover:bg-secondary-100 focus:ring-secondary-50',
    outline:
      'border-2 border-primary-50 text-primary-50 hover:bg-primary-50 hover:text-white focus:ring-primary-50',
  };

  const sizeClasses = {
    sm: 'p-2 text-sm',
    md: 'p-3 text-base',
    lg: 'p-4 text-lg',
  };
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`;

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
};

export default Button;
