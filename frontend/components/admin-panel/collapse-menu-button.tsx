"use client";

import Link from "next/link";
import { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface CollapseMenuButtonProps {
  icon: LucideIcon;
  label: string;
  active: boolean;
  isOpen: boolean | undefined;
  href: string;
}

export function CollapseMenuButton({
  icon: Icon,
  label,
  active,
  isOpen,
  href
}: CollapseMenuButtonProps) {
  return (
    <Link href={href}>
      <Button
        variant={active ? "secondary" : "ghost"}
        className="w-full justify-start h-10"
      >
        <div className="w-full items-center flex justify-between">
          <div className="flex items-center">
            <span className="mr-4">
              <Icon size={18} />
            </span>
            <p
              className={cn(
                "max-w-[150px] truncate",
                isOpen ? "translate-x-0 opacity-100" : "-translate-x-96 opacity-0"
              )}
            >
              {label}
            </p>
          </div>
        </div>
      </Button>
    </Link>
  );
}
