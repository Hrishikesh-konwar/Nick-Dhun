'use client'

import { useState, useEffect } from 'react'
import { Slideshow } from '@/components/slideshow'
import { PhotoGrid } from '@/components/photo-grid'
import { Menu, X } from 'lucide-react'

export default function WeddingAlbum() {
  const [images, setImages] = useState<{
    juron: string[]
    biya: string[]
    reception: string[]
  }>({ juron: [], biya: [], reception: [] })

  const [imageStats, setImageStats] = useState<{
    juron: { total: number; hasMore: boolean; page: number }
    biya: { total: number; hasMore: boolean; page: number }
    reception: { total: number; hasMore: boolean; page: number }
  }>({
    juron: { total: 0, hasMore: false, page: 1 },
    biya: { total: 0, hasMore: false, page: 1 },
    reception: { total: 0, hasMore: false, page: 1 }
  })

  const [loading, setLoading] = useState<{
    juron: boolean
    biya: boolean
    reception: boolean
  }>({ juron: false, biya: false, reception: false })

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Load images from public folder
  useEffect(() => {
    const loadImages = async () => {
      try {
        const response = await fetch('/api/images')
        const data = await response.json()
        
        setImages({
          juron: data.juron.images || [],
          biya: data.biya.images || [],
          reception: data.reception.images || [],
        })
        
        setImageStats({
          juron: { total: data.juron.total, hasMore: data.juron.hasMore, page: 1 },
          biya: { total: data.biya.total, hasMore: data.biya.hasMore, page: 1 },
          reception: { total: data.reception.total, hasMore: data.reception.hasMore, page: 1 },
        })
      } catch (error) {
        console.error('Error fetching images:', error)
      }
    }

    loadImages()
  }, [])

  // Function to load more images for a specific category
  const loadMoreImages = async (category: 'juron' | 'biya' | 'reception') => {
    if (loading[category] || !imageStats[category].hasMore) return
    
    setLoading(prev => ({ ...prev, [category]: true }))
    
    try {
      const nextPage = imageStats[category].page + 1
      const response = await fetch(`/api/images?category=${category}&page=${nextPage}`)
      const data = await response.json()
      
      setImages(prev => ({
        ...prev,
        [category]: [...prev[category], ...data.images]
      }))
      
      setImageStats(prev => ({
        ...prev,
        [category]: { total: data.total, hasMore: data.hasMore, page: nextPage }
      }))
    } catch (error) {
      console.error(`Error loading more ${category} images:`, error)
    } finally {
      setLoading(prev => ({ ...prev, [category]: false }))
    }
  }

  const allImages = [
    ...images.juron,
    ...images.biya,
    ...images.reception,
  ]

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.toLowerCase())
    element?.scrollIntoView({ behavior: 'smooth' })
    setIsMenuOpen(false)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-200 via-pink-300/50 to-pink-200">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-pink-200/90 backdrop-blur-md border-b border-pink-300">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-pink-900">
              Nick & Dhun Wedding Album
            </h1>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-8 items-center">
              <button
                onClick={() => scrollToSection('juron')}
                className="text-pink-800 hover:text-pink-950 transition-colors font-medium"
              >
                Juron
              </button>
              <button
                onClick={() => scrollToSection('biya')}
                className="text-pink-800 hover:text-pink-950 transition-colors font-medium"
              >
                Biya
              </button>
              <button
                onClick={() => scrollToSection('reception')}
                className="text-pink-800 hover:text-pink-950 transition-colors font-medium"
              >
                Reception
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-pink-300 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 space-y-3 pb-4">
              <button
                onClick={() => scrollToSection('juron')}
                className="block w-full text-left px-4 py-2 rounded-lg hover:bg-pink-300 transition-colors font-medium text-pink-800"
              >
                Juron
              </button>
              <button
                onClick={() => scrollToSection('biya')}
                className="block w-full text-left px-4 py-2 rounded-lg hover:bg-pink-300 transition-colors font-medium text-pink-800"
              >
                Biya
              </button>
              <button
                onClick={() => scrollToSection('reception')}
                className="block w-full text-left px-4 py-2 rounded-lg hover:bg-pink-300 transition-colors font-medium text-pink-800"
              >
                Reception
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center space-y-6">
          <h2 className="text-5xl md:text-7xl font-serif font-bold text-pink-900 text-balance">
            A Celebration of Love
          </h2>
          <p className="text-lg md:text-xl text-pink-700 max-w-2xl mx-auto">
            Relive our beautiful wedding moments captured through the lens of love and joy
          </p>
        </div>
      </section>

      {/* Slideshow */}
      <section className="container mx-auto px-4 mb-20">
        {allImages.length > 0 && <Slideshow images={allImages} />}
      </section>

      {/* Photo Galleries */}
      <section className="container mx-auto px-4 space-y-20 pb-20">
        {images.juron.length > 0 && (
          <div>
            <PhotoGrid title="Juron" images={images.juron} />
            {imageStats.juron.hasMore && (
              <div className="mt-8 text-center">
                <button
                  onClick={() => loadMoreImages('juron')}
                  disabled={loading.juron}
                  className="px-8 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-md"
                >
                  {loading.juron ? 'Loading...' : `Load More (${images.juron.length} of ${imageStats.juron.total})`}
                </button>
              </div>
            )}
          </div>
        )}
        
        {images.biya.length > 0 && (
          <div>
            <PhotoGrid title="Biya" images={images.biya} />
            {imageStats.biya.hasMore && (
              <div className="mt-8 text-center">
                <button
                  onClick={() => loadMoreImages('biya')}
                  disabled={loading.biya}
                  className="px-8 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-md"
                >
                  {loading.biya ? 'Loading...' : `Load More (${images.biya.length} of ${imageStats.biya.total})`}
                </button>
              </div>
            )}
          </div>
        )}
        
        {images.reception.length > 0 && (
          <div>
            <PhotoGrid title="Reception" images={images.reception} />
            {imageStats.reception.hasMore && (
              <div className="mt-8 text-center">
                <button
                  onClick={() => loadMoreImages('reception')}
                  disabled={loading.reception}
                  className="px-8 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-md"
                >
                  {loading.reception ? 'Loading...' : `Load More (${images.reception.length} of ${imageStats.reception.total})`}
                </button>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-pink-300/70 border-t border-pink-400 mt-20">
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="text-pink-800 text-sm">
            © 2024 Our Wedding. All memories preserved with love.
          </p>
        </div>
      </footer>


    </main>
  )
}
