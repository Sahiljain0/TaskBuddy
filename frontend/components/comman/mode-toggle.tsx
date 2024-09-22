
"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
	const { theme, setTheme } = useTheme();
	const isDark = theme === "dark";

	const toggleTheme = () => {
		setTheme(isDark ? "light" : "dark");
	};

	return (
		<Button variant='outline' size='icon' onClick={toggleTheme}>
			{isDark ? (
				<Sun className='w-[1.2rem] h-[1.2rem]' />
			) : (
				<Moon className='w-[1.2rem] h-[1.2rem]' />
			)}
			<span className='sr-only'>Toggle theme</span>
		</Button>
	);
}
