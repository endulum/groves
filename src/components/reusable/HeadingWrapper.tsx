export default function HeadingWrapper({ title, children } : {
  title: string,
  children: Array<JSX.Element | boolean> | JSX.Element
}) {
  return (
    <>
      <h2>{title}</h2>
      {children}
    </>
  );
}
