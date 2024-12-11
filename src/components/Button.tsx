interface ButtonProps extends React.ComponentProps<"button"> {
  icon?: JSX.Element;
  text: string;
}

export function Button({ icon, text, ...rest }: ButtonProps) {
  return (
    <button {...rest} className="button">
      {icon}
      <span>{text}</span>
    </button>
  );
}
