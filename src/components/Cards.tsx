import type { CardProps } from '../types/cardtypes';

const Cards: React.FC<CardProps> = ({ title, description, icon, className = '' }) => {
  return (
    <div className={`bg-secondary-300 text-white p-8 rounded-lg text-center ${className}`}>
      <div className="text-4xl mb-4 ">{icon}</div>
      <h3 className="text-xl font-bold mb-4 ">{title}</h3>
      <p className="text-gray-200">{description}</p>
    </div>
  );
};

export default Cards;
