'use client'
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
// import toast from "react-hot-toast"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import { useAuthStore } from "@/hooks/use-auth-store"

// Component for the login page
export default function LoginPage() {
    
    const router = useRouter()
    const [user, setUser] = useState({
        email: "",
        password: "",
    })
    const [loading, setLoading] = useState(false)
    const { login, user: isLogedIn } = useAuthStore();

    // Redirect to dashboard if user is already logged in
    useEffect(() => {
        if (isLogedIn) {
            router.push('/dashboard')
        }
    }, [isLogedIn])

    // Function to handle login
    const onLogin = async () => {
        setLoading(true)
        try {
            await login(user)
        } catch (error: any) {
            console.log(error)
            // toast.error(error.message)
        }
        setLoading(false)
    }

    // Render the login form
    return (
        <div className="min-h-screen flex flex-wrap flex-col items-center justify-center">
            <Card className="w-[300px] sm:w-[350px]  bg-muted/20">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your email and password to login
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                        />
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button disabled={user.email.length > 0 && user.password.length > 0 ? false : true} onClick={onLogin}>
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Login"}
                    </Button>
                    <Link href='/signup'><Button variant='outline'>Signup</Button></Link>
                </CardFooter>
            </Card>
        </div>
    )
}
