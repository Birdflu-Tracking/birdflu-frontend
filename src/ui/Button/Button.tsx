const Button: React.FC<{
  value: string;
  fullWidth?: boolean;
  rounded: string;
  text: string;
  onClick: () => void;
}> = ({ value, rounded, fullWidth = false, text, onClick }) => {
  return (
    <button
      onClick={() => onClick()}
      type="submit"
      className={`h-fit bg-primary text-white  py-2 px-5 ${rounded} ${
        fullWidth ? "w-full" : "w-fit"
      } ${text}`}
    >
      {value}
    </button>
  );
};

export default Button;
