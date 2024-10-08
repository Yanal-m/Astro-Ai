"use client";

import { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Sparkles } from "lucide-react";
export default function CoffeeCupReading() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [reading, setReading] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedImage) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      const response = await axios.post('/api/analyze-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setReading(response.data.reading);
    } catch (error) {
      console.error('Error analyzing image:', error);
      setReading('An error occurred while analyzing the image.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center p-4" style={{ backgroundImage: "url('/zodiac-bg.jpg')" }}>
      <Card className="w-full mt-24 max-w-2xl bg-white/50 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-xlg mt-2 font-bold text-center text-cyan-900 capitalize">See the future in your coffee cup</CardTitle>
          <CardDescription className="text-center text-cyan-900">Discover your future in your coffee cup</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
          <form onSubmit={handleSubmit} className="mb-8 mt-8 flex flex-col items-center">
        <div className="mb-4 text-center">
            <label htmlFor="image-upload" className="block text-center text-sm font-medium text-gray-700 mb-4">Upload your coffee cup image</label>
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            onChange={handleImageUpload}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-cyan-50 file:text-cyan-700
              hover:file:bg-cyan-100"
          />
        </div>
        {imagePreview && (
          <div className="mb-4">
            <Image src={imagePreview} alt="Coffee cup" width={300} height={300} className="rounded-lg mx-auto" />
          </div>
        )}
        <button
          type="submit"
          disabled={!selectedImage || isLoading}
          className="bg-cyan-700 hover:bg-cyan-900 text-white font-bold py-2 px-4 rounded disabled:opacity-50 mx-auto"
        >
          {isLoading ? 'Analyzing...' : 'Get Reading'}
        </button>
      </form>
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
    </CardContent>
    </Card>
    </div>
  );
}