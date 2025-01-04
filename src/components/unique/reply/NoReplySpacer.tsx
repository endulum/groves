import { Air } from "@mui/icons-material";

export function NoReplySpacer({
  isUser,
  isReadonly,
}: {
  isUser: boolean;
  isReadonly: boolean;
}) {
  return (
    <div className="spacer">
      <Air />
      <p>
        This post doesn't have any replies yet.
        {isUser && !isReadonly && (
          <>
            <br />
            Be the first to reply!
          </>
        )}
      </p>
    </div>
  );
}
