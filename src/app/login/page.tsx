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


export default function Login() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn("credentials", { email, password, redirect: false }).then(async(e)=>{
        if(e?.error){
            setError("Invalid email/password")
        } else{
            router.push("/");
        }
    })
  };

  if (!isClient) {
    return null; // Return null on server-side and initial client-side render
  }

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "authenticated") {
    return null;
  }
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex items-center justify-center p-4" style={{ backgroundImage: "url('/zodiac-bg.jpg')" , backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <Card className="w-full max-w-md bg-white/50 backdrop-blur-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center text-cyan-900">Sign in</CardTitle>
            <CardDescription className="text-center text-cyan-900">
              Choose your preferred sign in method
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Button variant="outline" className="w-full" onClick={() => signIn("google")}>
                <svg
                  className="mr-2 h-4 w-4"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="google"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 488 512"
                >
                  <path
                    fill="currentColor"
                    d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                  ></path>
                </svg>
                Sign in with Google
              </Button>
              <Button variant="outline" className="w-full" onClick={() => signIn("github")}>
                <Github className="mr-2 h-4 w-4" />
                Sign in with GitHub
              </Button>
            </div>
            <div className="relative">
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background text-cyan-900 font-bold px-2 pt-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input type="email"
              value={email} 
              name="email" 
              placeholder="m@example.com" 
              onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" 
              value={password} 
              name="password" 
              placeholder="********" 
              onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button className="w-full bg-gray-600 hover:bg-cyan-600" type="submit" onClick={handleSignIn}>
              <Mail className="mr-2 h-4 w-4" /> Sign in with Email
            </Button>
          </CardContent>
          <CardFooter>
            <div className="text-sm text-center w-full">
              Don't have an account?{" "}
              <Link href="/CreateAccount" className="text-cyan-900  hover:underline">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    )
}