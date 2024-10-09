export default function PageWrapper({ title, children } : {
  title: string,
  children: JSX.Element | JSX.Element[]
}) {
  return (
    <>
      <h2>{title}</h2>
      {children}
    </>
  );
}
