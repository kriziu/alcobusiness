interface Props {
  x: number;
  y: number;
  radius: number;
  color: 'red' | 'orange';
}

const Circle = ({ x, y, radius, color }: Props) => {
  return (
    <div
      className={`absolute -z-50 rounded-full ${
        color === 'red' ? 'bg-red-500' : 'bg-orange-500'
      } ${radius < 16 && 'hidden sm:block'}`}
      style={{
        width: `${radius}rem`,
        height: `${radius}rem`,
        top: `${y}%`,
        left: `${x}%`,
      }}
    />
  );
};

export default Circle;
