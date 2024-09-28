"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, Mail } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function LoginPage() {
	const { status } = useSession();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loginError, setLoginError] = useState('');
	const router = useRouter();

	useEffect(() => {
		if (status === 'authenticated') {
			router.push('/');
		}
	}, [status, router]);

	const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const result = await signIn("credentials", { 
			email, 
			password, 
			redirect: false 
		});
		if (result?.error) {
			setLoginError("Invalid email/password");
		} else {
			router.push("/");
		}
	}

	return (
		<div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex items-center justify-center p-4" style={{ backgroundImage: "url('/zodiac-bg.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
			<Card className="w-full max-w-md bg-white/50 backdrop-blur-md">
				<CardHeader className="space-y-1">
					<CardTitle className="text-2xl text-center">Sign in</CardTitle>
					<CardDescription className="text-white text-center">
						Enter your email and password to login
					</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-4">
					<form onSubmit={handleSignIn}>
						<div className="grid gap-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								placeholder="m@example.com"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className="grid pt-3 gap-2">
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						{loginError && <p className="text-red-500">{loginError}</p>}
						<Button className="w-full hover:bg-cyan-600 mt-4" type="submit">
							Sign In with Email
						</Button>
					</form>
					<div className="relative">
						<div className="absolute inset-0 flex items-center">
							<span className="w-full" />
						</div>
						<div className="relative flex justify-center text-xs uppercase">
							<span className="bg-background px-2 text-muted-foreground">
								Or continue with
							</span>
						</div>
					</div>
					<div className="grid grid-cols-2 gap-6">
						<Button variant="outline" onClick={() => signIn('github')}>
							<Github className="mr-2 h-4 w-4" />
							Github
						</Button>
						<Button variant="outline" onClick={() => signIn('google')}>
							<Mail className="mr-2 h-4 w-4" />
							Google
						</Button>
					</div>
				</CardContent>
				<CardFooter>
					<div className="text-sm text-gray-600 text-center w-full">
						Don&apos;t have an account?{' '}
						<Link href="/CreateAccount" className="text-white hover:underline">
							Sign up
						</Link>
					</div>
				</CardFooter>
			</Card>
		</div>
	)
}