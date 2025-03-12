'use client'

import React, { useState } from 'react'
import type { NextPage } from 'next'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { WavyBackground } from "@/components/ui/wavy-background";
import { SparklesText } from "@/components/ui/sparkles-text"



export function SparklesTextDemo() {
  return <SparklesText text="Magic UI" />;
}


const zodiacSigns = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
]

const CelebritiesPage: NextPage = () => {
  const [sign, setSign] = useState<string>("")
  const [celebrities, setCelebrities] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false);


  const checkCelebrities = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/celebrities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sign }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch celebrities');
      }

      const data = await response.json();
      setCelebrities(data.celebrities);
    } catch (error) {
      console.error('Error fetching celebrities:', error);
      setCelebrities('Failed to get celebrities. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center p-4" >
      <WavyBackground className="z-0 max-w-4xl mx-auto" >
      <Card className="w-full max-w-2xl bg-gradient-to-b from-cyan-500 to-purple-900/85 backdrop-blur-md">
        <CardHeader>
          <SparklesText className="text-4xl text-center"  text="Celebrities Like You" />

          <CardDescription className="text-center text-slate-900">Check celebrities in your zodiac sign</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 mt-6">
            <Select onValueChange={(value) => setSign(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select your zodiac sign" />
              </SelectTrigger>
              <SelectContent>
                {zodiacSigns.map((sign) => (
                  <SelectItem key={sign} value={sign.toLowerCase()}>{sign}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button 
              onClick={checkCelebrities} 
              disabled={!sign} 
              className="w-full bg-cyan-500 hover:bg-purple-500"
            >
             {isLoading ? 'Asking the stars...' : 'Check Celebrities'}
            </Button>

            {celebrities && (
                <Card className="bg-gradient-to-b from-cyan-500 to-purple-900">
                    <div className="text-md font-light p-4 rounded-md">
                        <p className="text-white">{celebrities}</p>
                    </div>
                </Card>
                    
            )}
          </div>
          <div className=" py-4 w-full">
          <p className="text-sm text-center px-4 text-cyan-100">
              Discover the celebrities that share your zodiac sign you&apos;ll be surprized.
          </p>
        </div>
        </CardContent>
      </Card>
      </ WavyBackground>
    </div>
  )
}

export default CelebritiesPage