"use client";

import { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { Card, CardHeader, CardDescription, CardContent } from "@/components/ui/card"
import { WavyBackground } from "@/components/ui/wavy-background";
import { SparklesText } from "@/components/ui/sparkles-text"

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
    <div className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center p-4">
      <WavyBackground className="z-0 max-w-4xl mx-auto" >
      <Card className="w-full max-w-2xl bg-gradient-to-b from-cyan-500 to-purple-900/85 backdrop-blur-md">
        <CardHeader>
          <SparklesText className="text-4xl text-center"  text="Coffee Cup Magic" />

          <CardDescription className="text-center text-slate-900 px-4">Discover your future in your coffee cup, We interpret every line and shape</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
          <form onSubmit={handleSubmit} className="mb-8 mt-8 flex flex-col items-center">
        <div className="mb-4 text-center">
            <label htmlFor="image-upload" className="block text-center text-sm font-medium text-slate-800 mb-4">Upload your coffee cup image</label>
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            onChange={handleImageUpload}
            className="block w-full text-sm text-slate-900
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
          className=" bg-cyan-500  hover:bg-purple-500 text-white font-bold py-2 mt-8 px-4 rounded disabled:opacity-50 mx-auto"
        >
          {isLoading ? 'Analyzing...' : 'Get Reading'}
        </button>
      </form>
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
    </CardContent>
    </Card>
    </ WavyBackground>
    </div>
  );
}