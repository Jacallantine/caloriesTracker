
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./Components/Navbar";
import { findSession } from "./lib/session";
import SubNavBar from "./Components/SubNavBar";
import prisma from "@/app/lib/prisma";





const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "StatCore",
  description: "",
};
let firstName;

export default async function RootLayout({ children }) {
  let session = await findSession(false);
  if(session){
  const getFirstname = await prisma.user.findUnique({
    where: { userId: session.userId },
    select: { firstName: true },

  });
firstName = getFirstname.firstName;

}

  let navItems = [];

  if (session) {
    navItems = [
      { label: "Home", href: "/" },
      { label: firstName, href: "/Profile" },
      { label: "COD", href: "/COD" },
    ];
  } else {
    navItems = [
      { label: "Home", href: "/" },
      { label: "Login", href: "/Login" },
      { label: "COD", href: "/COD" },
    ];
  }

  const subLinks = [
    { label: "Input Stats", href: "/COD/InputStats" },
    { label: "My Teams", href: "/COD/MyTeams" },
    { label: "Stats", href: "/COD/Stats" },
    { label: "Add Team", href: "/COD/AddTeam" },
    { label: "Maps", href: "/COD/Maps" },
  ];

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar navItems={navItems} />
        <SubNavBar links={subLinks} />

      
       {children}
      </body>
    </html>
  );
}

// ---------------------------
// Motion Wrapper Component
// ---------------------------

