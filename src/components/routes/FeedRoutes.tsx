import { Feed } from "../unique/feed/Feed";

export function PersonalFeedRoute() {
  return (
    <>
      <Feed type="following" />
    </>
  );
}

export function GlobalFeedRoute() {
  return (
    <>
      <Feed type="global" />
    </>
  );
}
