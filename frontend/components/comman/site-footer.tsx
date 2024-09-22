import { SquareCheckBig } from "lucide-react";
import Link from "next/link";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

export function SiteFooter() {
	return (
		<footer className='w-full'>
			<div className='mx-auto xl:pb-2 w-full max-w-screen-xl'>
				<div className='flex justify-between items-center gap-4 px-8 py-16'>
					<div className='flex items-center gap-4'>
						<Link className='flex items-center text-md' href='/'>
						<SquareCheckBig className='w-6 h-6 text-black dark:text-primary' />							<span className='ml-2'>TaskBuddy</span>
						</Link>
					</div>

<div className='flex  flex-col items-center gap-4'>
  <p className='max-w-xs font-bold'>
    Made by Sahil Jain. 
	<div className="flex gap-4">
    <a href='https://github.com/Sahiljain0' className='text-primary dark:black ' aria-label="GitHub">
      <FaGithub className='inline-block w-5 h-5' />
    </a>
    <a href='https://x.com/sahiljain576?t=2PZPf-kn_-58zYi4NsVpUQ&s=09' className='text-primary dark:black' aria-label="Twitter">
      <FaTwitter className='inline-block w-5 h-5' />
    </a>
    <a href='https://www.linkedin.com/in/sahil-jain-28433022a' className='text-primary dark:black' aria-label="LinkedIn">
      <FaLinkedin className='inline-block w-5 h-5' />
    </a>
	</div>
  </p>
</div>

				</div>

				<div className='flex justify-between items-center gap-2 border-t border-neutral-700/20 px-8 py-4'>
					<span className='text-gray-500 text-sm dark:text-gray-400'>
						Copyright © {new Date().getFullYear()}{" "}
						<Link href='/' className='cursor-pointer'>
							TaskBuddy
						</Link>
						. All Rights Reserved.
					</span>
				</div>
			</div>
		</footer>
	);
}
