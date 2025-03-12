"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"  // Make sure this import is present
import { WavyBackground } from "@/components/ui/wavy-background";
import { SparklesText } from "@/components/ui/sparkles-text"


const zodiacSigns = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
]


const categories = ["General", "Love", "Career", "Health"]

export default function HoroscopeAI() {
  const [sign, setSign] = useState("")
  const [timeframe, setTimeframe] = useState("Daily")
  const [category, setCategory] = useState("General")
  const [reading, setReading] = useState("")
  const [isLoading, setIsLoading] = useState(false);


  const fetchHoroscope = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/horoscope', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sign, timeframe, category }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch horoscope');
      }

      const data = await response.json();
      setReading(data.horoscope);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching horoscope:', error);
      setReading('Sorry, there was an error generating your horoscope. Please try again later.');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 z-0" >
      <WavyBackground className="z-0 max-w-4xl mx-auto " >
      <Card className="w-full  max-w-2xl bg-gradient-to-b from-cyan-500 to-purple-900/85 backdrop-blur-md">
        <CardHeader>
          <SparklesText className="text-4xl text-center"  text="Horoscope AI" />

          <CardDescription className="text-center text-slate-900">Discover your cosmic insights powered by AI</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 mt-6">
            <Select onValueChange={(value) => setSign(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select your zodiac sign" />
              </SelectTrigger>
              <SelectContent>
                {zodiacSigns.map((zodiac) => (
                  <SelectItem key={zodiac} value={zodiac.toLowerCase()}>{zodiac}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select onValueChange={(value) => setCategory(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select horoscope category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat.toLowerCase()}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Tabs defaultValue="Daily" onValueChange={(value) => setTimeframe(value)}>
              <TabsList className="grid w-full grid-cols-3">
                {["Daily", "Weekly", "Monthly"].map((tab) => (
                  <TabsTrigger 
                    key={tab} 
                    value={tab}
                    className={cn(
                      "data-[state=active]:bg-cyan-500 data-[state=active]:text-white",
                      "hover:bg-cyan-600 hover:text-white",
                      "transition-colors duration-200"
                    )}
                  >
                    {tab}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
            
            <Button 
              onClick={fetchHoroscope} 
              disabled={!sign || !category} 
              className="w-full text-white bg-cyan-500 hover:bg-purple-500"
            >
              {isLoading ? 'Searching the stars...' : 'Get Your Horoscope'}
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
          <div className=" py-4 w-full">
          <p className="text-sm text-center px-4 text-cyan-100">
              May the stars guide you to happiness and fulfillment in your journey through life.
          </p>
        </div>
        </CardContent>
      </Card>
      </ WavyBackground>
    </div>
  )
}