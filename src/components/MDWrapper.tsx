import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function MDWrapper({ content }: { content: string }) {
  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      allowedElements={[
        "a",
        "strong",
        "em",
        "del",
        "p",
        "br",
        "ul",
        "ol",
        "li",
        "img",
      ]}
      unwrapDisallowed
      skipHtml
      className="post-content"
    >
      {content.split("\n").join("  \n  \n")}
    </Markdown>
  );
}
