export const firebaseDateToDate = (createdAt: {
  _seconds: number;
  _nanoseconds: number;
}) => {
  return (
    new Date(createdAt._seconds * 1000).toString().split(" ")[2] +
    "-" +
    new Date(createdAt._seconds * 1000).toString().split(" ")[1] +
    "-" +
    new Date(createdAt._seconds * 1000).toString().split(" ")[3]
  );
};

export const firebaseDateToTime = (createdAt: {
  _seconds: number;
  _nanoseconds: number;
}) => {
  return new Date(createdAt._seconds * 1000).toString().split(" ")[4];
};
