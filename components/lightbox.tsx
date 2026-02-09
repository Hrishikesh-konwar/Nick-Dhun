'use client'

import { useState, useEffect } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

interface LightboxProps {
  isOpen: boolean
  images: string[]
  currentIndex: number
  onClose: () => void
  onNext: () => void
  onPrev: () => void
}

export function Lightbox({
  isOpen,
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}: LightboxProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(currentIndex)

  useEffect(() => {
    setCurrentImageIndex(currentIndex)
  }, [currentIndex])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') onNext()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'Escape') onClose()
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onNext, onPrev, onClose])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl w-full max-h-[90vh] p-0 bg-background/95 backdrop-blur border-0">
        <VisuallyHidden>
          <DialogTitle>Image Viewer - Photo {currentImageIndex + 1} of {images.length}</DialogTitle>
        </VisuallyHidden>
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 rounded-full bg-primary text-primary-foreground p-2 hover:bg-primary/90 transition-colors"
          aria-label="Close lightbox"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="relative w-full h-full flex items-center justify-center">
          <img
            src={images[currentImageIndex] || "/placeholder.svg"}
            alt={`Wedding photo ${currentImageIndex + 1}`}
            className="max-w-full max-h-[80vh] object-contain"
          />

          <button
            onClick={onPrev}
            className="absolute left-4 rounded-full bg-primary/80 text-primary-foreground p-3 hover:bg-primary transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={onNext}
            className="absolute right-4 rounded-full bg-primary/80 text-primary-foreground p-3 hover:bg-primary transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-primary/80 text-primary-foreground px-4 py-2 rounded-full text-sm">
          {currentImageIndex + 1} / {images.length}
        </div>
      </DialogContent>
    </Dialog>
  )
}
