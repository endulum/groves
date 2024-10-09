export default function PageWrapper({ title, children } : {
  title: string,
  children: JSX.Element | Array<JSX.Element | JSX.Element[] | boolean>
}) {
  return (
    <>
      <h2>{title}</h2>
      {children}
    </>
  );
}
