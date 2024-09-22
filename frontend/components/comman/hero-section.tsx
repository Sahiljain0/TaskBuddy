"use client";

import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { useAuthStore } from "@/hooks/use-auth-store";

export default function HeroSection() {
	const ref = useRef(null);
	const inView = useInView(ref, { once: true, margin: "-100px" });
	const { user } = useAuthStore();

	return (
		<section
			id='hero'
			className='relative mx-auto mt-32 px-6 md:px-8 max-w-[80rem] text-center'
		>
			<h1 className='bg-clip-text bg-gradient-to-br from-30% from-black dark:from-white to-black/40 dark:to-white/40 opacity-0 py-6 font-medium text-5xl text-balance text-transparent sm:text-3xl md:text-5xl lg:text-6xl leading-none tracking-tighter translate-y-[-1rem] animate-fade-in [--animation-delay:200ms]'>
			TaskBuddy 

			</h1>
			<p className='opacity-0 mb-12 text-balance text-gray-400 text-lg md:text-2xl tracking-tight translate-y-[-1rem] animate-fade-in [--animation-delay:400ms]'>
			TaskBuddy empowers teams and individuals to effortlessly organize, track, and conquer their tasks
				<br className='md:block hidden' /> enhancing productivity and collaboration...
			</p>
			<div className='flex justify-center items-center'>
				<Link href={user ? '/dashboard' : '/signup'} className=''>
					<HoverBorderGradient
						containerClassName='rounded-full'
						as='button'
						className='flex items-center space-x-2 bg-white dark:bg-black text-black dark:text-white'
					>
						Let's Start
						<ChevronRight className='ml-1 transition-all group-hover:translate-x-1 duration-300 ease-out size-4' />
					</HoverBorderGradient>
				</Link>
			</div>

			<div
				ref={ref}
				className='relative after:[background:linear-gradient(to_top,hsl(var(--background))_30%,transparent)] after:z-50 after:absolute after:inset-0 opacity-0 mt-[8rem] animate-fade-up [--animation-delay:400ms] [perspective:2000px]'
			>
				<div
					className={`rounded-xl border border-white/10 bg-white bg-opacity-[0.01] before:absolute before:bottom-1/2 before:left-0 before:top-0 before:h-full before:w-full before:opacity-0 before:[filter:blur(180px)] before:[background-image:linear-gradient(to_bottom,var(--color-one),var(--color-one),transparent_40%)] ${inView ? "before:animate-image-glow" : ""
						}`}
				>
					<img
						src='/Dash1.png'
						alt='Tasker Dark Mode'
						className='dark:block relative hidden border rounded-[inherit] w-full h-full object-contain'
					/>
					<img
						src='/Dash2.png'
						alt='Tasker Light Mode'
						className='block relative dark:hidden border rounded-[inherit] w-full h-full object-contain'
					/>
				</div>
			</div>
		</section>
	);
}
