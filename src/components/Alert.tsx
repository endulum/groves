import { Warning, CheckCircle, Info } from "@mui/icons-material";

export function Alert({
  type,
  children,
}: {
  type: "warning" | "success" | "info";
  children: JSX.Element;
}) {
  return (
    <div className={`alert ${type}`}>
      {type === "warning" && <Warning />}
      {type === "success" && <CheckCircle />}
      {type === "info" && <Info />}
      {children}
    </div>
  );
}
