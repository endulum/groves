import { Link } from "react-router-dom";
import { Shield, LocalPolice, Mode } from "@mui/icons-material";

import { type User } from "../../types";

export function Username({
  user,
  role,
}: {
  user: User;
  role: "mod" | "admin" | "op" | null;
}) {
  return (
    <Link
      className={`username${role ? ` ${role}` : ""}`}
      to={`/user/${user.username}`}
      {...(role === "mod" && {
        title: "This user is a moderator of this community.",
      })}
      {...(role === "admin" && {
        title: "This user is the admin of this community.",
      })}
      {...(role === "op" && { title: "This user is the author of this post." })}
    >
      {role === "mod" && <Shield />}
      {role === "admin" && <LocalPolice />}
      {role === "op" && <Mode />} <span>{user.username}</span>
    </Link>
  );
}
