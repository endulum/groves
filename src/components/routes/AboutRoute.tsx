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
          Communities can be moderated, and customized by moderation. Moderation
          is not wholly analogous to Reddit's moderation. A single admin manages
          a moderator team, all with the privilege to:
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

      <h2>Navigating Groves</h2>
      <h3 className="mb-1">Finding content</h3>
      <p>
        You can most easily find and filter communities relevant to your
        interests through the <b>explore</b> search.
      </p>
      <p>
        You can <b>follow</b> a community so that its content appears on your
        personal feed.
      </p>
      <p>
        Your feed consists of posts from all communities you follow, ordered by
        latest date of posting.
      </p>
      <h3 className="mt-1 mb-1">Creating content</h3>
      <p>
        If a community is not marked as frozen, anyone is free to create a post
        under the community.
      </p>
      <p>
        Likewise, if a post is not marked as frozen, anyone is free to create a
        reply under the post.
      </p>
      <p>
        Posts, replies, and wikis use{" "}
        <a href="https://commonmark.org/help/">limited markdown.</a> Supported
        markdown formats are:
      </p>
      <ul className="mt-0-5 mb-0-5">
        <li>First- to third-level headings</li>
        <li>Basic formatting: bold, italic, strikethrough</li>
        <li>Links</li>
        <li>Images</li>
        <li>Lists, both ordered and unordered</li>
      </ul>
      <h3 className="mt-1 mb-1">Voting on content</h3>
      <p>
        Users accumulate verdancy from votes on their content by other users.
        Giving a reply or post a vote is a way to show appreciation - or the
        opposite - for the content. Votes also help more relevant content appear
        more or less prominently in ranked search.
      </p>
      <p>
        If a post is not marked as frozen, and its root community is not marked
        as frozen, voting can be done freely on it and its replies.
      </p>
      <p>
        You can see a user's accumulated verdancy on their profile. Content with
        negative total verdancy scores do not negate the user's total verdancy.
        This way, user verdancy is always rewardingly positive, and scales up
        with how often the user engages with Groves.
      </p>
      <h3 className="mt-1 mb-1">Managing a community</h3>
      <p>
        Creating a community automatically grants the creator admin privileges
        over the community. All details provided in community creation can be
        changed later by the admin, so there's no worry to get it right the
        first time.
      </p>
      <p>
        The <b>moderation</b> tab of a community consists of the current admin
        as well as a roster of current moderators. The admin can promote and
        demote moderators, adjusting the mod team as they see fit, and even pass
        admin privileges to another user. The admin can also choose to freeze
        the entire community, functionally "archiving" it.
      </p>
      <p>
        The <b>wiki</b> of a community is a document in markdown, a place for a
        large amount of written information for readers, such as community
        rules, or an FAQ pertaining to the community subject. General moderation
        can edit this wiki.
      </p>
      <p>
        In post view, the admin is indicated in gold with a starred shield.
        Moderators are indicated in blue with a plain shield. Moderators can
        manage a post by freezing it, ceasing all voting and replying activity,
        or hiding any of its replies, ceasing voting activity on it.
      </p>
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
