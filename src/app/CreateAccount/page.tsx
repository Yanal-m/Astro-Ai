"use client"

import axios from "axios";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, Mail } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function CreateAccount() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [error, setError] = useState("");
    const router = useRouter();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password !== passwordRepeat) {
            setError("Passwords do not match");
            return;
        }
        try {
            const response = await axios.post('/api/users', {
                name,
                email,
                password,
            });
            router.push('/login');
        } catch (error: unknown) {
            if ((error as any).response?.status === 400) {
                // Handle 400 Bad Request (email already exists)
                setError("Email already exists");
            } else {
                // Handle other errors
                console.log("Error creating user with account: ", (error as any).response);
                setError("An error occurred");
            }
        }
    }
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex items-center justify-center p-4" style={{ backgroundImage: "url('/zodiac-bg.jpg')" , backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <Card className="w-full max-w-md bg-white/50 backdrop-blur-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center text-cyan-900">Sign up</CardTitle>
            <CardDescription className="text-center text-cyan-900">
              The Cosmos is glad to see you here!
            </CardDescription>
            <p className="text-red-500 text-center">{error}</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Name</Label>
              <Input type="text"
              value={name} 
              name="name" 
              placeholder="Your Name" 
              onChange={(e) => setName(e.target.value)}
              />
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
              required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Repeat Password</Label>
              <Input id="passwordRepeat" type="password" 
              value={passwordRepeat} 
              name="passwordRepeat" 
              placeholder="********" 
              onChange={(e) => setPasswordRepeat(e.target.value)}
              required
              />
            </div>
            <Button className="w-full bg-gray-600 hover:bg-cyan-600" onClick={handleSubmit}>
            <Mail className="mr-2 h-4 w-4" /> Sign up with Email
            </Button>
          </CardContent>
          <CardFooter>
            <div className="text-sm text-center w-full">
              Already have an account?{" "}
              <Link href="/login" className=" text-cyan-900 hover:underline">
                Login
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    )
}