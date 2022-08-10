export const convertIndexToPosition = (index: number) => {
  const goodIndex = index % 32;

  if (goodIndex <= 8) {
    return { x: goodIndex, y: 0 };
  }
  if (goodIndex <= 16) {
    return { x: 8, y: goodIndex - 8 };
  }
  if (goodIndex <= 24) {
    return { x: 24 - goodIndex, y: 8 };
  }
  if (goodIndex <= 32) {
    return { x: 0, y: 32 - goodIndex };
  }

  throw new Error('Invalid index');
};

export const convertPositionToIndex = (position: { x: number; y: number }) => {
  const { x, y } = position;
  if (x === 0 && y === 0) return 0;
  if (x === 0) {
    return 32 - y;
  }
  if (y === 0) {
    return x;
  }
  if (x === 8) {
    return 8 + y;
  }
  if (y === 8) {
    return 24 - x;
  }

  throw new Error('Invalid position');
};
