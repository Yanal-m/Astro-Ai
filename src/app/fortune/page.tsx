"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { WavyBackground } from "@/components/ui/wavy-background";
import { SparklesText } from "@/components/ui/sparkles-text"



export function SparklesTextDemo() {
  return <SparklesText text="Magic UI" />;
}


const FortunePage = () => {
  const [name, setName] = useState("")
  const [birthday, setBirthday] = useState("")
  const [reading, setReading] = useState("")
  const [isLoading, setIsLoading] = useState(false);

  const fetchFortune = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/fortune', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, birthday }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch fortune');
      }

      const data = await response.json();
      setReading(data.reading);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching fortune:', error);
      setReading('Sorry, there was an error generating your fortune. Please try again later.');
    }
  }

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center p-4 z-0">
      <WavyBackground className="z-0 max-w-4xl mx-auto" >
      <Card className="w-full max-w-2xl bg-gradient-to-b from-cyan-500 to-purple-900/85 backdrop-blur-md">
        <CardHeader>
          <SparklesText className="text-4xl text-center"  text="Fortune Teller" />

          <CardDescription className="text-center text-slate-900">Your Mystical personalized reading based on Tarot and Numerology</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 mt-6">
            <Input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="placeholder:text-slate-700"
            />
            <Input
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
            />
            <Button 
              onClick={fetchFortune} 
              disabled={!name || !birthday} 
              className="w-full bg-cyan-500 hover:bg-purple-500"
            >
              {isLoading ? 'Asking the stars...' : 'Get Your Fortune'}
            </Button>
            
            {reading && (
              <Card className="bg-gradient-to-b from-cyan-500 to-purple-900">
                <CardContent className="p-4">
                  <p className="text-md font-light text-white flex items-center">
                    {reading}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
          <div className="py-4 w-full">
            <p className="text-sm text-center px-4 text-cyan-100">
              May the mystical forces guide you towards enlightenment and fulfillment.
            </p>
          </div>
        </CardContent>
      </Card>
      </ WavyBackground>
    </div>
  )
}

export default FortunePage
