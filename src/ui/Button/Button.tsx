const Button: React.FC<{
  value: string;
  fullWidth?: boolean;
  rounded: string;
  text: string;
  disabled: boolean;
  onClick: () => void;
}> = ({ value, rounded, fullWidth = false, text, onClick, disabled }) => {
  return (
    <button
      disabled={disabled == true}
      onClick={() => onClick()}
      type="submit"
      className={`disabled:opacity-5 h-fit bg-primary text-white  py-2 px-5 ${rounded} ${
        fullWidth ? "w-full" : "w-fit"
      } ${text}`}
    >
      {value}
    </button>
  );
};

export default Button;
