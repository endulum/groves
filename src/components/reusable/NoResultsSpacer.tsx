import { VisibilityOff } from "@mui/icons-material";

export function NoResultsSpacer() {
  return (
    <div className="spacer">
      <VisibilityOff />
      <p>No results found. Try another search.</p>
    </div>
  );
}
