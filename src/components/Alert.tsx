import {
  Warning,
  CheckCircle,
  Info,
  VisibilityOffOutlined,
} from "@mui/icons-material";

export function Alert({
  type,
  children,
}: {
  type: "warning" | "success" | "info" | "blind";
  children: JSX.Element;
}) {
  return (
    <div className={`alert ${type}`}>
      {type === "warning" && <Warning />}
      {type === "success" && <CheckCircle />}
      {type === "info" && <Info />}
      {type === "blind" && <VisibilityOffOutlined />}
      {children}
    </div>
  );
}
