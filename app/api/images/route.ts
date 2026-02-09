import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category') // 'juron', 'biya', or 'reception'
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '30') // Load 30 images at a time

    const publicDir = path.join(process.cwd(), 'public', 'images', 'wedding')
    
    const getImagesFromFolder = (folderName: string, page: number, limit: number) => {
      const folderPath = path.join(publicDir, folderName)
      
      // Check if folder exists
      if (!fs.existsSync(folderPath)) {
        return { images: [], total: 0, hasMore: false }
      }
      
      const files = fs.readdirSync(folderPath)
        .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
        .sort()
      
      const total = files.length
      const start = (page - 1) * limit
      const end = start + limit
      const hasMore = end < total
      
      const paginatedFiles = files
        .slice(start, end)
        .map(file => `/images/wedding/${folderName}/${file}`)
      
      return { images: paginatedFiles, total, hasMore, page }
    }

    // If category is specified, return paginated results for that category
    if (category) {
      const result = getImagesFromFolder(category, page, limit)
      return NextResponse.json(result)
    }

    // Otherwise, return initial batch for all categories
    const images = {
      juron: getImagesFromFolder('juron', 1, limit),
      biya: getImagesFromFolder('biya', 1, limit),
      reception: getImagesFromFolder('reception', 1, limit),
    }

    return NextResponse.json(images)
  } catch (error) {
    console.error('Error loading images:', error)
    return NextResponse.json(
      { error: 'Failed to load images' },
      { status: 500 }
    )
  }
}
