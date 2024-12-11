import { Warning, CheckCircle } from "@mui/icons-material";

export function Alert({
  type,
  children,
}: {
  type: "warning" | "success";
  children: JSX.Element;
}) {
  return (
    <div className={`alert ${type}`}>
      {type === "warning" && <Warning />}
      {type === "success" && <CheckCircle />}
      {children}
    </div>
  );
}
