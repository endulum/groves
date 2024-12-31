import { useRef } from "react";
import { Link } from "react-router-dom";

export function ReadMore({
  link,
  children,
  maxHeight = 300,
}: {
  link: string;
  children: React.ReactNode;
  maxHeight?: number;
}) {
  const readmoreContent = useRef<HTMLDivElement>(null);
  return (
    <>
      <div className="readmore" style={{ maxHeight: `${maxHeight}px` }}>
        <div className="readmore-content" ref={readmoreContent}>
          {children}
        </div>

        {readmoreContent.current &&
          readmoreContent.current.scrollHeight > maxHeight && (
            <div className="readmore-fade" />
          )}
      </div>

      {readmoreContent.current &&
        readmoreContent.current.scrollHeight > maxHeight && (
          <div className="readmore-link mt-0-5">
            <Link to={link}>
              <small>Read more</small>
            </Link>
          </div>
        )}
    </>
  );
}
