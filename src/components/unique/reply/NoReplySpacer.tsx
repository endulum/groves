import { Air } from "@mui/icons-material";

export function NoReplySpacer({ isUser }: { isUser: boolean }) {
  return (
    <div className="spacer">
      <Air />
      <p>
        This post doesn't have any replies yet.
        {isUser && (
          <>
            <br />
            Be the first to reply!
          </>
        )}
      </p>
    </div>
  );
}
