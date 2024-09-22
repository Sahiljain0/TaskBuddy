"use client";

import { useState } from "react";
import { Ellipsis, Plus } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { getMenuList } from "@/lib/menu-list";
import { Button } from "@/components/ui/button";
import { CollapseMenuButton } from "@/components/admin-panel/collapse-menu-button";
import {
	Tooltip,
	TooltipTrigger,
	TooltipContent,
	TooltipProvider,
} from "@/components/ui/tooltip";
import { UserNav } from "./user-nav";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useTaskStore } from "@/hooks/use-task-store";
import { useAuthStore } from "@/hooks/use-auth-store";
import { LoggedInUser } from "@/lib/types";

interface MenuProps {
	isOpen: boolean | undefined;
}

export function Menu({ isOpen }: MenuProps) {
	const { addTask } = useTaskStore();
	const pathname = usePathname();
	const { user } = useAuthStore();
	const menuList = getMenuList(pathname, user?.id || "");
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [newTask, setNewTask] = useState({ title: "", description: "", dueDate: null, status: "", priority: "" });
	const handleDialogOpen = () => setIsDialogOpen(true);
	const handleDialogClose = () => setIsDialogOpen(false);

	const handleCreate = () => {
		addTask(newTask);
		setNewTask({});
		handleDialogClose();
	};


	return (
		<div className='flex flex-col justify-between items-end mt-8 w-full h-full overflow-x-hidden'>
			<div className='flex flex-col items-start space-y-1 px-2 w-full h-full'>
				<TooltipProvider disableHoverableContent>
					<Tooltip delayDuration={100}>
						<TooltipTrigger asChild>
							<Button
								onClick={handleDialogOpen}
								className='justify-center w-full h-10'
							>
								<span className={cn(isOpen === false ? "" : "mr-4")}>
									<Plus size={18} />
								</span>
								<p
									className={cn(
										"whitespace-nowrap",
										isOpen === false ? "opacity-0 hidden" : "opacity-100"
									)}
								>
									Create New Task
								</p>
							</Button>
						</TooltipTrigger>
						{isOpen === false && (
							<TooltipContent side='right'>Create New Task</TooltipContent>
						)}
					</Tooltip>
				</TooltipProvider>
				{menuList.map(({ groupLabel, menus }, index) => (
					<div className={cn("w-full", groupLabel ? "pt-5" : "")} key={index}>
						{(isOpen && groupLabel) || isOpen === undefined ? (
							<p className='px-4 pb-2 max-w-[248px] font-medium text-muted-foreground text-sm truncate'>
								{groupLabel}
							</p>
						) : !isOpen && isOpen !== undefined && groupLabel ? (
							<TooltipProvider>
								<Tooltip delayDuration={100}>
									<TooltipTrigger className='w-full'>
										<div className='flex justify-center items-center w-full'>
											<Ellipsis className='w-5 h-5' />
										</div>
									</TooltipTrigger>
									<TooltipContent side='right'>
										<p>{groupLabel}</p>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						) : (
							<p className='pb-2'></p>
						)}
						{menus.map(({ href, label, icon: Icon, active }, index) => (
							<div className='w-full my-2' key={index}>
								<CollapseMenuButton
									href={href}
									icon={Icon}
									label={label}
									active={active}
									isOpen={isOpen}
								/>
							</div>
						))}
					</div>
				))}
			</div>

			<UserNav isOpen={isOpen || false} user={user as LoggedInUser} />

			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<DialogContent>
					<DialogTitle>{"Create New Task"}</DialogTitle>
					<DialogDescription>
						<div className="space-y-4">
							<Input
								type="text"
								placeholder="Task Name"
								value={newTask.title || ""}
								onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
								className="w-full p-2 border rounded"
							/>
							<Input
								type="text"
								placeholder="Task Description"
								value={newTask.description || ""}
								onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
								className="w-full p-2 border rounded"
							/>
							<Input
								type="date"
								placeholder="Due Date"
								value={newTask.dueDate?.toString() || ""}
								onChange={(e) => setNewTask({ ...newTask, dueDate: new Date(e.target.value) })}
								className="w-full p-2 border rounded"
							/>
							<Select
								value={newTask.status || ""}
								onValueChange={(value) => setNewTask({ ...newTask, status: value })}
							>
								<SelectTrigger className="w-full p-2 border rounded">
									<SelectValue placeholder="Status" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="To Do">To Do</SelectItem>
									<SelectItem value="In Progress">In Progress</SelectItem>
									<SelectItem value="Completed">Completed</SelectItem>
								</SelectContent>
							</Select>
							<Select
								value={newTask.priority || ""}
								onValueChange={(value) => setNewTask({ ...newTask, priority: value })}
							>
								<SelectTrigger className="w-full p-2 border rounded">
									<SelectValue placeholder="Priority" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="Low">Low</SelectItem>
									<SelectItem value="Medium">Medium</SelectItem>
									<SelectItem value="High">High</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</DialogDescription>
					<DialogClose asChild>
						<Button
							onClick={handleCreate}
							className="px-4 py-2 rounded"
						>
							{"Create Task"}
						</Button>
					</DialogClose>
				</DialogContent>
			</Dialog>
		</div>
	);
}
