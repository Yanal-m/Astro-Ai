"use client"
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"  // Make sure this import is present



const AboutPage = () => {
  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center p-4" style={{ backgroundImage: "url('/zodiac-bg.jpg')" }}>
      <Card className="w-full mt-16 max-w-2xl bg-white/50 backdrop-blur-md">
        <CardHeader className="mt-4"  >
          <CardTitle className="text-xlg font-bold text-center text-cyan-900 capitalize">The stars welcome you</CardTitle>
          <CardDescription className="text-center text-cyan-900">Discover your cosmic insights powered by AI</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-6 text-cyan-900 text-center">About Us</h1>
            <div className="max-w-2xl mx-auto bg-white/40 shadow-md rounded-lg p-6">
              <p className="mb-4 text-cyan-900">
                Welcome to AstroApp, your gateway to the celestial world of astrology.
              </p>
              <p className="mb-4 text-cyan-900">
                Our mission is to provide accurate and insightful astrological information,
                helping you navigate life&apos;s journey with the wisdom of the stars.
              </p>
              <p className="text-cyan-900">
                Founded by a team of passionate astrologers and developers, we strive to
                blend ancient astrological knowledge with modern technology.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AboutPage
