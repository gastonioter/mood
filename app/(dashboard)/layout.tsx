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
    <div className="min-h-screen grid grid-rows-[auto_auto_1fr_auto]">
      <Header></Header>
      <SideNav></SideNav>
      <main className="overflow-scroll grow ">{children}</main>
      <Footer></Footer>
    </div>
  );
}
