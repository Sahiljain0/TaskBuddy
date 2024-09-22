// "use client";

// import Link from "next/link";
// import { Button, buttonVariants } from "../ui/button";
// import { AlignJustify, ArrowRight, Ticket, XIcon } from "lucide-react";
// import { useEffect, useState } from "react";
// import { ModeToggle } from "./mode-toggle";
// import { UserNavMenu } from "./UserNavMenu";
// import { cn } from "@/lib/utils";
// import { AnimatePresence, motion } from "framer-motion";
// import {
// 	mobilenavbarVariant,
// 	mobileLinkVar,
// 	containerVariants,
// } from "./framer-varients";
// import { useRouter } from "next/navigation";
// import { useAuthStore } from "@/hooks/use-auth-store";
// import { LoggedInUser } from "@/lib/types";

// export const menuItem = [
// 	{
// 		id: 1,
// 		label: "Login",
// 		href: "/login",
// 	},
// 	{
// 		id: 2,
// 		label: "Sign Up",
// 		href: "/signup",
// 	},
// ];

// export function Navbar() {
// 	const { user } = useAuthStore();
// 	console.log(user);
// 	const router = useRouter();
// 	const [hamburgerMenuIsOpen, setHamburgerMenuIsOpen] = useState(false);

// 	useEffect(() => {
// 		const html = document.querySelector("html");
// 		if (html) html.classList.toggle("overflow-hidden", hamburgerMenuIsOpen);
// 	}, [hamburgerMenuIsOpen]);

// 	useEffect(() => {
// 		const closeHamburgerNavigation = () => setHamburgerMenuIsOpen(false);
// 		window.addEventListener("orientationchange", closeHamburgerNavigation);
// 		window.addEventListener("resize", closeHamburgerNavigation);

// 		return () => {
// 			window.removeEventListener("orientationchange", closeHamburgerNavigation);
// 			window.removeEventListener("resize", closeHamburgerNavigation);
// 		};
// 	}, [setHamburgerMenuIsOpen]);

// 	return (
// 		<>
// 			<header className='top-0 left-0 z-50 fixed opacity-0 backdrop-blur-[12px] border-b w-full translate-y-[-1rem] animate-fade-in [--animation-delay:600ms]'>
// 				<div className='flex justify-between items-center w-full h-[3.5rem] container'>
// 					<Link className='flex items-center text-md' href='/'>
// 						<Ticket className='w-6 h-6 text-purple-600/70 dark:text-purple-400/70' />
// 						<span className='ml-2'>Tasker</span>
// 					</Link>

// 					<div className='sm:flex justify-center items-center gap-4 hidden h-full'>
// 						{!user ? (
// 							<div className='md:flex gap-4 sm:gap-6 hidden ml-auto'>
// 								<Link
// 									className='flex items-center font-medium text-sm hover:text-purple-600 dark:hover:text-purple-400 transition-colors'
// 									href='/signup'
// 								>
// 									<span className='flex items-center'>SignUp</span>
// 								</Link>

// 								<Link
// 									className={cn(
// 										buttonVariants({ variant: "secondary" }),
// 										"mr-6 text-sm"
// 									)}
// 									href='/login'
// 								>
// 									Login <ArrowRight className='ml-1.5 w-5 h-5' />
// 								</Link>
// 								<ModeToggle />
// 							</div>
// 						) : (
// 							<div className='flex items-center gap-4'>
// 								<ModeToggle />
// 								<Button onClick={() => router.push('/dashboard')}>
// 									Dashboard
// 								</Button>
// 								<UserNavMenu user={user} />
// 							</div>
// 						)}
// 					</div>

// 					<button
// 						className='md:hidden ml-6'
// 						onClick={() => setHamburgerMenuIsOpen((open) => !open)}
// 					>
// 						<span className='sr-only'>Toggle menu</span>
// 						{hamburgerMenuIsOpen ? <XIcon /> : <AlignJustify />}
// 					</button>
// 				</div>
// 			</header>
// 			<MobileNavbar
// 				user={user}
// 				hamburgerMenuIsOpen={hamburgerMenuIsOpen}
// 				setHamburgerMenuIsOpen={setHamburgerMenuIsOpen}
// 			/>
// 		</>
// 	);
// }

// const MobileNavbar = ({
// 	user,
// 	hamburgerMenuIsOpen,
// 	setHamburgerMenuIsOpen,
// }: {
// 	user: LoggedInUser | null;
// 	hamburgerMenuIsOpen: boolean;
// 	setHamburgerMenuIsOpen: (open: boolean) => void;
// }) => {
// 	return (
// 		<AnimatePresence>
// 			<motion.nav
// 				initial='initial'
// 				exit='exit'
// 				variants={mobilenavbarVariant}
// 				animate={hamburgerMenuIsOpen ? "animate" : "exit"}
// 				className={cn(
// 					`fixed left-0 top-0 z-50 h-screen w-full overflow-auto bg-background/70 backdrop-blur-[12px] `,
// 					{
// 						"pointer-events-none": !hamburgerMenuIsOpen,
// 					}
// 				)}
// 			>
// 				<div className='flex justify-between items-center h-[3.5rem] container'>
// 					<Link className='flex items-center text-md' href='/'>
// 						<Ticket className='w-6 h-6 text-purple-600/70 dark:text-purple-400/70' />
// 						<span className='ml-2'>Tasker</span>
// 					</Link>

// 					<button
// 						className='md:hidden ml-6'
// 						onClick={() => setHamburgerMenuIsOpen(!hamburgerMenuIsOpen)}
// 					>
// 						<span className='sr-only'>Toggle menu</span>
// 						{hamburgerMenuIsOpen ? <XIcon /> : <AlignJustify />}
// 					</button>
// 				</div>
// 				<motion.ul
// 					className={`flex flex-col md:flex-row md:items-center uppercase md:normal-case ease-in`}
// 					variants={containerVariants}
// 					initial='initial'
// 					animate={hamburgerMenuIsOpen ? "open" : "exit"}
// 				>
// 					{user ? <motion.li
// 						variants={mobileLinkVar}
// 						className='border-grey-dark py-0.5 pl-6 border-b md:border-none'
// 					>
// 						<Link
// 							className={`hover:text-grey flex h-[var(--navigation-height)] w-full items-center text-xl transition-[color,transform] duration-300 md:translate-y-0 md:text-sm md:transition-colors ${hamburgerMenuIsOpen ? "[&_a]:translate-y-0" : ""
// 								}`}
// 							href={"/dashboard"}
// 						>
// 							{"Dashboard"}
// 						</Link>
// 					</motion.li> : menuItem.map((item) => (
// 						<motion.li
// 							variants={mobileLinkVar}
// 							key={item.id}
// 							className='border-grey-dark py-0.5 pl-6 border-b md:border-none'
// 						>
// 							<Link
// 								className={`hover:text-grey flex h-[var(--navigation-height)] w-full items-center text-xl transition-[color,transform] duration-300 md:translate-y-0 md:text-sm md:transition-colors ${hamburgerMenuIsOpen ? "[&_a]:translate-y-0" : ""
// 									}`}
// 								href={item.href}
// 							>
// 								{item.label}
// 							</Link>
// 						</motion.li>
// 					))}
// 				</motion.ul>
// 			</motion.nav>
// 		</AnimatePresence>
// 	);
// };

// export default Navbar;
"use client";

import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { AlignJustify, ArrowRight, SquareCheckBig, XIcon } from "lucide-react"; // Import SquareCheckBig icon
import { useEffect, useState } from "react";
import { ModeToggle } from "./mode-toggle";
import { UserNavMenu } from "./UserNavMenu";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
	mobilenavbarVariant,
	mobileLinkVar,
	containerVariants,
} from "./framer-varients";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/hooks/use-auth-store";
import { LoggedInUser } from "@/lib/types";

export const menuItem = [
	{
		id: 1,
		label: "Login",
		href: "/login",
	},
	{
		id: 2,
		label: "Sign Up",
		href: "/signup",
	},
];

export function Navbar() {
	const { user } = useAuthStore();
	console.log(user);
	const router = useRouter();
	const [hamburgerMenuIsOpen, setHamburgerMenuIsOpen] = useState(false);

	useEffect(() => {
		const html = document.querySelector("html");
		if (html) html.classList.toggle("overflow-hidden", hamburgerMenuIsOpen);
	}, [hamburgerMenuIsOpen]);

	useEffect(() => {
		const closeHamburgerNavigation = () => setHamburgerMenuIsOpen(false);
		window.addEventListener("orientationchange", closeHamburgerNavigation);
		window.addEventListener("resize", closeHamburgerNavigation);

		return () => {
			window.removeEventListener("orientationchange", closeHamburgerNavigation);
			window.removeEventListener("resize", closeHamburgerNavigation);
		};
	}, [setHamburgerMenuIsOpen]);

	return (
		<>
			<header className='top-0 left-0 z-50 fixed opacity-0 backdrop-blur-[12px] border-b w-full translate-y-[-1rem] animate-fade-in [--animation-delay:600ms]'>
				<div className='flex justify-between items-center w-full h-[3.5rem] container'>
					<Link className='flex items-center text-md' href='/'>
						<SquareCheckBig className='w-6 h-6 text-black dark:text-[#e63477]' /> {/* Updated Icon */}
						<span className='ml-2'>TaskBuddy</span>
					</Link>

					<div className='sm:flex justify-center items-center gap-4 hidden h-full'>
						{!user ? (
							<div className='md:flex gap-4 sm:gap-6 hidden ml-auto'>
								<Link
									className='flex items-center font-medium text-sm hover:text-[#e63477] dark:hover:text-[#e63477] transition-colors'
									href='/signup'
								>
									<span className='flex items-center'>SignUp</span>
								</Link>

								<Link
									className={cn(
										buttonVariants({ variant: "secondary" }),
										"mr-6 text-sm"
									)}
									href='/login'
								>
									Login <ArrowRight className='ml-1.5 w-5 h-5' />
								</Link>
								<ModeToggle />
							</div>
						) : (
							<div className='flex items-center gap-4'>
								<ModeToggle />
								<Button onClick={() => router.push('/dashboard')}>
									Dashboard
								</Button>
								<UserNavMenu user={user} />
							</div>
						)}
					</div>

					<button
						className='md:hidden ml-6'
						onClick={() => setHamburgerMenuIsOpen((open) => !open)}
					>
						<span className='sr-only'>Toggle menu</span>
						{hamburgerMenuIsOpen ? <XIcon /> : <AlignJustify />}
					</button>
				</div>
			</header>
			<MobileNavbar
				user={user}
				hamburgerMenuIsOpen={hamburgerMenuIsOpen}
				setHamburgerMenuIsOpen={setHamburgerMenuIsOpen}
			/>
		</>
	);
}

const MobileNavbar = ({
	user,
	hamburgerMenuIsOpen,
	setHamburgerMenuIsOpen,
}: {
	user: LoggedInUser | null;
	hamburgerMenuIsOpen: boolean;
	setHamburgerMenuIsOpen: (open: boolean) => void;
}) => {
	return (
		<AnimatePresence>
			<motion.nav
				initial='initial'
				exit='exit'
				variants={mobilenavbarVariant}
				animate={hamburgerMenuIsOpen ? "animate" : "exit"}
				className={cn(
					`fixed left-0 top-0 z-50 h-screen w-full overflow-auto bg-background/70 backdrop-blur-[12px] `,
					{
						"pointer-events-none": !hamburgerMenuIsOpen,
					}
				)}
			>
				<div className='flex justify-between items-center h-[3.5rem] container'>
					<Link className='flex items-center text-md' href='/'>
						<SquareCheckBig className='w-6 h-6 text-[#e63477] dark:text-[#e63477]' /> {/* Updated Icon */}
						<span className='ml-2'>Tasker</span>
					</Link>

					<button
						className='md:hidden ml-6'
						onClick={() => setHamburgerMenuIsOpen(!hamburgerMenuIsOpen)}
					>
						<span className='sr-only'>Toggle menu</span>
						{hamburgerMenuIsOpen ? <XIcon /> : <AlignJustify />}
					</button>
				</div>
				<motion.ul
					className={`flex flex-col md:flex-row md:items-center uppercase md:normal-case ease-in`}
					variants={containerVariants}
					initial='initial'
					animate={hamburgerMenuIsOpen ? "open" : "exit"}
				>
					{user ? (
						<motion.li
							variants={mobileLinkVar}
							className='border-grey-dark py-0.5 pl-6 border-b md:border-none'
						>
							<Link
								className={`hover:text-grey flex h-[var(--navigation-height)] w-full items-center text-xl transition-[color,transform] duration-300 md:translate-y-0 md:text-sm md:transition-colors ${
									hamburgerMenuIsOpen ? "[&_a]:translate-y-0" : ""
								}`}
								href={"/dashboard"}
							>
								{"Dashboard"}
							</Link>
						</motion.li>
					) : (
						menuItem.map((item) => (
							<motion.li
								variants={mobileLinkVar}
								key={item.id}
								className='border-grey-dark py-0.5 pl-6 border-b md:border-none'
							>
								<Link
									className={`hover:text-grey flex h-[var(--navigation-height)] w-full items-center text-xl transition-[color,transform] duration-300 md:translate-y-0 md:text-sm md:transition-colors ${
										hamburgerMenuIsOpen
											? "[&_a]:translate-y-0"
											: ""
									}`}
									href={item.href}
								>
									{item.label}
								</Link>
							</motion.li>
						))
					)}
				</motion.ul>
			</motion.nav>
		</AnimatePresence>
	);
};

export default Navbar;
