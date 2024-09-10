"use client";
import React, { useState, ReactNode, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import useColorMode from "@/hooks/useColorMode";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
 

   const [colorMode, setColorMode] = useColorMode();

   useEffect(() => {
     if (typeof setColorMode === "function") {
       setColorMode(colorMode === "dark" ? "light" : "light");
     }
   }, []);
  return (
    <>
      
      <div className="flex h-screen overflow-hidden">
       
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        

       
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
         
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {children}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
