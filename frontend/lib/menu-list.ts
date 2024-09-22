import {
    HomeIcon,
    CheckSquare,
    LucideIcon
} from "lucide-react";

type Menu = {
    href: string;
    label: string;
    active: boolean;
    icon: LucideIcon;
};

type Group = {
    groupLabel: string;
    menus: Menu[];
};

export function getMenuList(pathname: string, userId: string): Group[] {
    return [
        {
            groupLabel: "Tasks",
            menus: [
                {
                    href: "/dashboard",
                    label: "Tasks",
                    active: pathname.includes("/dashboard"),
                    icon: HomeIcon,
                },
                {
                    href: `/kanban`,
                    label: "Kanban",
                    active: pathname.includes(`/${userId}/kanban`),
                    icon: CheckSquare,
                }
            ]
        }
    ];
}
