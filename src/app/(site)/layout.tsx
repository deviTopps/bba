import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomePreloader from "@/components/HomePreloader";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <HomePreloader />
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
