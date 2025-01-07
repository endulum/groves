import { Forest, Park, Spa, WbSunny } from "@mui/icons-material";
import { useDocumentTitle } from "usehooks-ts";

export function AboutRoute() {
  useDocumentTitle(`About ${import.meta.env.VITE_APP_NAME}`);
  return (
    <>
      <h2>About Groves</h2>
      <p>
        Groves is a semiclone of Reddit with an arboreal flavor. Communities are
        likened to <IconSpan icon={<Forest />} text="groves" />, with posts
        among them being <IconSpan icon={<Park />} text="trees" />, and post
        comments being <IconSpan icon={<Spa />} text="leaves" /> of a tree.
      </p>

      <h3 className="mt-1 mb-0-5">"Semiclone"?</h3>
      <p>This project reflects some, but not all, features that Reddit has.</p>
      <ul className="mt-0-5 mb-0-5">
        <li>
          Content can be voted on. Groves' analogue for Reddit karma is{" "}
          <IconSpan
            icon={<WbSunny style={{ color: "var(--accent2)" }} />}
            text="verdancy"
          />
          . In lists, such as a community's post search, verdancy is used to
          rank content, using roughly the same scoring types that Reddit uses
          ('Top', 'Hot', 'Controversial', etc.).
        </li>
        <li>
          Communities can be moderated, and customized by moderation. A single
          admin manages a moderator team, all with the privilege to:
          <ul>
            <li>Freeze posts, ceasing voting and replying activity on them</li>
            <li>Pin posts, showcasing them on the community post view route</li>
            <li>Hide comments, obscuring their score and content</li>
            <li>Contribute to the community's Wiki</li>
          </ul>
          The admin themself is able to:
          <ul>
            <li>Edit details, such as community title, of a community</li>
            <li>Promote and demote moderators</li>
            <li>Pass admin privileges to another user</li>
            <li>Freeze the community, ceasing all content interaction</li>
          </ul>
        </li>
        <li>
          Communities can be followed, and content from followed communities is
          pooled into a personal feed.
        </li>
      </ul>
    </>
  );
}

function IconSpan({ icon, text }: { icon: JSX.Element; text: string }) {
  return (
    <span className="icon-span">
      {icon} <b>{text}</b>
    </span>
  );
}
