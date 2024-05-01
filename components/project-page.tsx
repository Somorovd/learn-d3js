import Link from "next/link";
import React from "react";

type Props = {
  name: string;
  children?: React.ReactNode;
};
const ProjectPage = ({ name, children }: Props) => {
  return (
    <div>
      <header className="flex justify-center items-center gap-8 mt-4 mb-8">
        <h1 className="text-3xl">{name}</h1>
        <div>&#x2022;</div>
        <Link href="/" className="link">
          Home
        </Link>
      </header>
      <div className="w-fit m-auto">{children}</div>
    </div>
  );
};

export default ProjectPage;
