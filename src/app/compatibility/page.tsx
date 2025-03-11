'use client'

import React, { useState } from 'react'
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

const CompatibilityPage = () => {
  const [sign1, setSign1] = useState("")
  const [sign2, setSign2] = useState("")
  const [compatibility, setCompatibility] = useState("")
  const [isLoading, setIsLoading] = useState(false);
  

  const checkCompatibility = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/compatibility', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sign1, sign2 }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch compatibility');
      }

      const data = await response.json();
      setCompatibility(data.compatibility);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching compatibility:', error);
      setCompatibility('Failed to get compatibility. Please try again.');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" >
      <WavyBackground className="z-0 max-w-4xl mx-auto" >
      <Card className="w-full max-w-2xl bg-gradient-to-b from-cyan-500 to-purple-900/85 backdrop-blur-md">
        <CardHeader>
          <SparklesText className="text-4xl text-center"  text="Zodiac Compatibility" />
          <CardDescription className="text-center text-slate-900">Check the compatibility between two zodiac signs</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="space-y-4 mt-6">
            <Select onValueChange={(value) => setSign1(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select your zodiac sign" />
              </SelectTrigger>
              <SelectContent>
                {zodiacSigns.map((sign) => (
                  <SelectItem key={sign} value={sign.toLowerCase()}>{sign}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select onValueChange={(value) => setSign2(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select partner's zodiac sign" />
              </SelectTrigger>
              <SelectContent>
                {zodiacSigns.map((sign) => (
                  <SelectItem key={sign} value={sign.toLowerCase()}>{sign}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button 
              onClick={checkCompatibility} 
              disabled={!sign1 || !sign2} 
              className="w-full  bg-cyan-500 hover:bg-purple-500"
            >
              {isLoading ? 'Asking the stars...' : 'Check Compatibility'}
            </Button>

            {compatibility && (
                <Card className="bg-gradient-to-b from-cyan-500 to-purple-900">
                    <div className="p-4 rounded-md">
                        <p className="text-md font-light text-white">{compatibility}</p>
                    </div>
                </Card>
                    
            )}
          </div>
          <div className=" py-4 w-full">
          <p className="text-sm text-center px-4 text-white">
              Explore the compatibility between different zodiac signs, find your match.
          </p>
        </div>
        </CardContent>
      </Card>
      </ WavyBackground>
    </div>
  )
}

export default CompatibilityPage