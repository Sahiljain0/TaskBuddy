"use client"
import Particles from "@/components/landing/particles";
import { FeaturesSection } from "@/components/landing/features-section";
import HeroSection from "@/components/comman/hero-section";

export default function LandingPage() {
	return (
		<>
			<HeroSection />
			{/* <FeaturesSection /> */}
			<Particles
				className='-z-10 absolute inset-0 text-black dark:text-white'
				quantity={50}
				ease={70}
				size={0.05}
				staticity={40}
			/>
		</>
	);
}
