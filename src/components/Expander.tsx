import { useRef, useState } from "react";
import { AddCircle, RemoveCircle } from "@mui/icons-material";

export function Expander({
  title,
  children,
}: {
  title: string;
  children: JSX.Element | JSX.Element[];
}) {
  const [expanded, setExpanded] = useState<boolean>(false);
  const content = useRef<HTMLDivElement>(null);
  return (
    <div className="expander">
      <button
        type="button"
        className="button expander-button"
        onClick={() => setExpanded(!expanded)}
        style={{ marginBottom: expanded ? "1rem" : 0 }}
      >
        <span>
          {expanded ? "Collapse" : "Expand"} {title}
        </span>
        {expanded ? <RemoveCircle /> : <AddCircle />}
      </button>
      <div
        ref={content}
        className="expander-content"
        style={{
          height: expanded ? `${content.current?.scrollHeight}px` : "0px",
        }}
      >
        {children}
      </div>
    </div>
  );
}
