import React from "react";
import { Navbar } from "./Navbar";
import { Searchbar } from "./Searchbar";

type Props = {
  children : React.ReactNode,
}

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <main 
      className="
        min-h-screen bg-dark font-body text-light lg:pl-40
        px-4 sm:px-6 py-16 sm:pt-[116px] lg:pt-0
      "
    >
      <Navbar />
      <Searchbar />
      {children}
    </main>
  );
}
