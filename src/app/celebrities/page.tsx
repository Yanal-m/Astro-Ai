'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight } from "lucide-react"

const zodiacSigns = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
]

const CelebritiesPage = () => {
  const [sign, setSign] = useState("")
  const [celebrities, setCelebrities] = useState("")

  const checkCelebrities = async () => {
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
    }
  }

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center p-4" style={{backgroundImage: "url('/stars-bg.jpg')", backgroundSize: 'cover', backgroundPosition: 'center'}}>
      <Card className="w-full mt-16 max-w-2xl bg-white/50 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-xlg font-bold text-center text-cyan-900 capitalize">Celebrities in Your Sign</CardTitle>
          <CardDescription className="text-center text-cyan-900">Check celebrities in your zodiac sign</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
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
              className="w-full hover:bg-gray-600"
            >
              Check Compatibility <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            {celebrities && (
                <Card className="mt-4 bg-gradient-to-r from-cyan-500 via-rose-400 to-cyan-700">
                    <div className="mt-4 p-4 rounded-md">
                        <p className="text-white">{celebrities}</p>
                    </div>
                </Card>
                    
            )}
          </div>
          <div className=" py-4 w-full">
          <p className="text-xlg text-white p-4 text-center">
              Discover the celebrities that share your zodiac sign.
          </p>
        </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default CelebritiesPage