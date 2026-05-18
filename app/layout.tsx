import type { Metadata } from "next";
import { Outfit, Inter, Fira_Code } from "next/font/google";
import "./globals.css";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollProgress from "@/components/ui/ScrollProgress";
import LenisProvider from "@/components/ui/LenisProvider";

const outfit   = Outfit({ subsets: ["latin"], variable: "--font-outfit", weight: ["300","400","500","600","700","800"] });
const inter    = Inter({ subsets: ["latin"], variable: "--font-inter", weight: ["300","400","500","600","700"] });
const firaCode = Fira_Code({ subsets: ["latin"], variable: "--font-mono", weight: ["300","400","500"] });

export const metadata: Metadata = {
  title: "Ahmed Ashraf — IT Specialist & Web Developer",
  description: "IT Specialist and Web Developer based in Egypt. Building reliable infrastructure and modern digital experiences.",
  keywords: ["IT Specialist", "Web Developer", "React", "Next.js", "Ahmed Ashraf", "Portfolio"],
  openGraph: { title: "Ahmed Ashraf — Portfolio", description: "IT Specialist and Web Developer.", type: "website" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable} ${firaCode.variable}`} suppressHydrationWarning>
      <body>
        <AnimatedBackground />
        <LenisProvider>
          <ScrollProgress />
          <CustomCursor />
          <div style={{ position: 'relative', zIndex: 10 }}>
            {children}
          </div>
        </LenisProvider>
      </body>
    </html>
  );
}
