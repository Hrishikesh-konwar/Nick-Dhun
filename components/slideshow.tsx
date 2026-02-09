'use client'

import { useState, useEffect } from 'react'
import { Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react'

interface SlideshowProps {
  images: string[]
  autoplay?: boolean
  interval?: number
}

export function Slideshow({
  images,
  autoplay = true,
  interval = 4000,
}: SlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(autoplay)

  useEffect(() => {
    if (!isPlaying || images.length === 0) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, interval)

    return () => clearInterval(timer)
  }, [isPlaying, images.length, interval])

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  if (images.length === 0) return null

  return (
    <section className="w-full py-12">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary">
            Our Journey Together
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </div>

        <div className="relative group">
          <div className="aspect-video bg-muted rounded-xl overflow-hidden">
            <img
              src={images[currentIndex] || "/placeholder.svg"}
              alt={`Wedding slideshow - Photo ${currentIndex + 1}`}
              className="w-full h-full object-cover transition-opacity duration-500"
            />
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between gap-4 mt-6">
            <button
              onClick={handlePrev}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center justify-center w-14 h-14 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
            >
              {isPlaying ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6 ml-0.5" />
              )}
            </button>

            <button
              onClick={handleNext}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Progress indicator */}
          <div className="mt-6 flex gap-1 justify-center">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-1.5 rounded-full transition-all ${
                  index === currentIndex ? 'bg-primary w-8' : 'bg-muted w-2'
                }`}
                aria-label={`Go to photo ${index + 1}`}
              />
            ))}
          </div>

          {/* Counter */}
          <div className="text-center mt-4 text-muted-foreground">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      </div>
    </section>
  )
}
