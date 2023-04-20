import React from "react";
import { Navbar } from "./Navbar";
import { Searchbar } from "./Searchbar";

type Props = {
  children : React.ReactNode,
}

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <main className="min-h-screen bg-dark font-body text-light lg:pl-40">
      <Navbar />
      <Searchbar />
      {children}
    </main>
  );
}
