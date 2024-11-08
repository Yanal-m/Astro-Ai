"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import {Input} from "@/components/ui/input"
import { ArrowRight, Sparkles } from 'lucide-react'

const DreamPage = () => {
  const [dream, setDream] = useState("")
  const [birthday, setBirthday] = useState("")
  const [reading, setReading] = useState("")

  const fetchDream = async () => {
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
    } catch (error) {
      console.error('Error fetching fortune:', error);
      setReading('Sorry, there was an error reading your Dream. Please try again later.');
    }
  }

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center p-4">
      <Card className="w-full mt-16 max-w-2xl bg-white/50 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-xlg font-bold text-center text-cyan-900 capitalize">Your Ultimate Dream Interpreter</CardTitle>
          <CardDescription className="text-center text-cyan-900">Discover your personalized reading for your dream</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 mt-6">
            <Textarea
              placeholder="Tell us your dream"
              value={dream}
              onChange={(e) => setDream(e.target.value)}
            />
            <Input
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
            />
            <Button 
              onClick={fetchDream} 
              disabled={!dream || !birthday} 
              className="w-full hover:bg-gray-600"
            >
              See what your dream tells you <ArrowRight className="ml-2 h-4 w-4" />
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
          <div className="py-4 w-full">
            <p className="text-sm text-center text-cyan-900">
            We wish you a meaningful interpretation for your dream.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default DreamPage
