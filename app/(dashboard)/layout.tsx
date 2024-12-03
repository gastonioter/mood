import React from "react";
import Header from "../ui/Header";
import SideNav from "../ui/SideNav";
import Footer from "../ui/Footer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-screen grid grid-cols-[256px_minmax(900px,_1fr)] grid-rows-[60px_1fr_30px]">
      <Header></Header>
      <SideNav></SideNav>
      <main className="overflow-scroll">{children}</main>
      <Footer></Footer>
    </div>
  );
}
