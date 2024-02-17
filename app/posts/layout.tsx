import Navbar from "@/components/navbar/Navbar";
import "../globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "teu-content-manager-2024",
  description: "Content Creation and Display in the same app",
};

export default function PostLayout({ children }) {
  return (
    <div className="container">
      <div className="wrapper">{children}</div>
    </div>
  );
}
