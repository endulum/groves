import { GitHub } from "@mui/icons-material";

export function GithubAuthButton() {
  return (
    <a
      href={`https://github.com/login/oauth/authorize?client_id=${
        import.meta.env.VITE_GH_CLIENT_ID
      }&redirect_uri=${
        window.location.origin
      }/github&scope=read%3Auser&allow_signup=true`}
      type="button"
      className="button plain secondary"
    >
      <span>Authenticate with GitHub</span>
      <GitHub />
    </a>
  );
}
