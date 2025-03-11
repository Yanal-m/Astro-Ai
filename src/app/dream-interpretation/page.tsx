"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import {Input} from "@/components/ui/input"
import { WavyBackground } from "@/components/ui/wavy-background";
import { SparklesText } from "@/components/ui/sparkles-text"



export function SparklesTextDemo() {
  return <SparklesText text="Magic UI" />;
}


const DreamPage = () => {
  const [dream, setDream] = useState("")
  const [birthday, setBirthday] = useState("")
  const [reading, setReading] = useState("")
  const [isLoading, setIsLoading] = useState(false);
  

  const fetchDream = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/dreamology', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dream, birthday }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch dream interpetation');
      }

      const data = await response.json();
      setReading(data.reading);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching fortune:', error);
      setReading('Sorry, there was an error reading your Dream. Please try again later.');
    }
  }

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat flex  items-center justify-center p-4">
      <WavyBackground className="z-0 max-w-4xl mx-auto" >
      <Card className="w-full  max-w-2xl bg-gradient-to-b from-cyan-500 to-purple-900/85 backdrop-blur-md">
        <CardHeader>
          <SparklesText className="text-4xl text-center"  text="Your Dream Interpreter" />

          <CardDescription className="text-center text-slate-900">Discover your personalized reading for your dream</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 mt-6">
            <Textarea
              placeholder="Tell us your dream"
              value={dream}
              onChange={(e) => setDream(e.target.value)}
              className="placeholder:text-slate-700"
            />
            <Input
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
            />
            <Button 
              onClick={fetchDream} 
              disabled={!dream || !birthday} 
              className="w-full bg-cyan-500 hover:bg-purple-500"
            >
              {isLoading ? 'Asking the stars...' : 'See what your dream tells you'}
            </Button>
            
            {reading && (
              <Card className="mt-4 bg-gradient-to-b from-cyan-500 to-purple-900">
                <CardContent className="p-4">
                  <p className="text-white font-light text-md flex items-center">
                    {reading}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
          <div className="py-4 w-full">
            <p className="text-sm text-center px-4 text-cyan-100">
            We wish you a meaningful interpretation for your dream, but remember it's not true.
            </p>
          </div>
        </CardContent>
      </Card>
      </ WavyBackground>
    </div>
  )
}

export default DreamPage
