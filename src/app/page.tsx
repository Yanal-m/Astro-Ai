"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Sparkles } from 'lucide-react'
import { cn } from "@/lib/utils"  // Make sure this import is present

const zodiacSigns = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
]

const timeframes = ["Daily", "Weekly", "Monthly"]

const categories = ["General", "Love", "Career", "Health"]

export default function HoroscopeAI() {
  const [sign, setSign] = useState("")
  const [timeframe, setTimeframe] = useState("Daily")
  const [category, setCategory] = useState("General")
  const [reading, setReading] = useState("")

  const fetchHoroscope = async () => {
    try {
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
    } catch (error) {
      console.error('Error fetching horoscope:', error);
      setReading('Sorry, there was an error generating your horoscope. Please try again later.');
    }
  }

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center p-4" style={{ backgroundImage: "url('/zodiac-bg.jpg')" }}>
      <Card className="w-full mt-16 max-w-2xl bg-white/50 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-xlg font-bold text-center text-cyan-900 capitalize">Horoscope AI</CardTitle>
          <CardDescription className="text-center text-cyan-900">Discover your cosmic insights powered by AI</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
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
              className="w-full hover:bg-gray-600"
            >
              Get Your Horoscope <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            
            {reading && (
              <Card className="mt-4 bg-gradient-to-r from-cyan-500 via-rose-400 to-cyan-700">
                <CardContent className="p-4">
                  <p className="text-white flex items-center">
                    <Sparkles className="mr-2 h-5 w-5" />
                    {reading}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
          <div className=" py-4 w-full">
          <p className="text-sm text-white p-4 text-center">
              May the stars guide you to happiness and fulfillment in your journey through life.
          </p>
        </div>
        </CardContent>
      </Card>
    </div>
  )
}