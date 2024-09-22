
import { SiteFooter } from "@/components/comman/site-footer";
import Navbar from "@/components/comman/Navbar";
import Particles from "@/components/landing/particles";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      {/* Particles component in the background */}
      <div className="absolute inset-0 z-0">
        <Particles className="h-full w-full" quantity={100} color="#ffffff" />
      </div>

      {/* Main content */}
      <div className="relative z-10">
        <Navbar />
        <main className="mt-[3.5rem] min-h-screen">{children}</main>
        <SiteFooter />
      </div>
    </div>
  );
}
