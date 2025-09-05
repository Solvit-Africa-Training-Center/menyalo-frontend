import type { CardProps } from '../types/cardtypes';

const Cards: React.FC<CardProps> = ({
  title,
  bulletPoints = [],
  description,
  icon,
  className = '',
  titleClassName = '',
  descriptionClassName = '',
  bulletPointClassName = '',
}) => {
  return (
    <div
      className={`bg-secondary-300  text-white p-8 rounded-lg text-center min-w-[300px] ${className}`}
    >
      <div className="text-4xl mb-4 ">{icon}</div>
      <h3 className={`text-xl font-bold mb-4 ${titleClassName}`}>{title}</h3>
      <p className={descriptionClassName}>{description}</p>
      <ul className="text-left list-disc list-inside">
        {bulletPoints.map((point, index) => (
          <li key={index} className={bulletPointClassName}>
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cards;
