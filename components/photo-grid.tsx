'use client'

import { useState } from 'react'
import { Lightbox } from './lightbox'

interface PhotoGridProps {
  title: string
  images: string[]
}

export function PhotoGrid({ title, images }: PhotoGridProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index)
    setIsLightboxOpen(true)
  }

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const handlePrev = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <>
      <section className="py-12" id={title.toLowerCase()}>
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-pink-900">
              {title}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-pink-700 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
            {images.map((image, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg cursor-pointer aspect-square bg-pink-200"
                onClick={() => handleImageClick(index)}
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${title} - Photo ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Lightbox
        isOpen={isLightboxOpen}
        images={images}
        currentIndex={currentImageIndex}
        onClose={() => setIsLightboxOpen(false)}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </>
  )
}
