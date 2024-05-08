import Image from "next/image";
type PageItem = {
  pageName: string;
};

export default function Loading({ pageName }: Readonly<PageItem>) {
  // Or a custom loading skeleton component
  return (
    <>
      <span className="loader">Loading</span>
      {/* <Image src={"Ruko.gif"} width={50} height={50} alt="Loading image" />;
      <h2>`Loading the ${pageName} page`</h2> */}
    </>
  );
}
