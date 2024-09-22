"use client"
import { ContentLayout } from "@/components/admin-panel/content-layout";
import Dashboard from "./components/Dashboard";
import { useAuthStore } from "@/hooks/use-auth-store";
import { redirect } from "next/navigation";
import TaskStoreInitializer from "@/hooks/use-task-store";

export default function DashboardPage() {

    const { user } = useAuthStore();
    if (!user) {
        return redirect("/login");
    }
    return (
        <ContentLayout title='Dashboard' className='min-h-[70vh]'>
            <TaskStoreInitializer />
            <Dashboard />
        </ContentLayout>
    );
}