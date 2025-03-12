"use client"
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { WavyBackground } from "@/components/ui/wavy-background";
import { SparklesText } from "@/components/ui/sparkles-text"


const AboutPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center  p-4 ">
      <WavyBackground className="z-0 max-w-4xl mx-auto" >
      <Card className="w-full mt-24 max-w-2xl bg-gradient-to-b from-cyan-500 to-purple-900/85 backdrop-blur-md ">
        <CardHeader className="mt-4"  >
          <CardTitle className="text-3xl font-bold text-center text-cyan-100 capitalize">The stars welcome you</CardTitle>
          <CardDescription className="text-center text-cyan-900">Sign up and explore your cosmic insights powered by AI</CardDescription>
          <SparklesText className="text-center"  text="About Us" />

        </CardHeader>
        <CardContent>
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto bg-gradient-to-b from-cyan-500 to-purple-900 shadow-md rounded-lg p-6">
              <p className="mb-4 text-cyan-100">
                Welcome to AstroApp, your gateway to the celestial world of astrology.
              </p>
              <p className="mb-4 text-cyan-100">
                Our mission is to provide accurate and insightful astrological information,
                helping you navigate life&apos;s journey with the wisdom of the stars.
              </p>
              <p className="text-cyan-100">
                Founded by a team of passionate astrologers and developers, we strive to
                blend ancient astrological knowledge with modern technology.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      </ WavyBackground>
    </div>
    
  )
}

export default AboutPage
