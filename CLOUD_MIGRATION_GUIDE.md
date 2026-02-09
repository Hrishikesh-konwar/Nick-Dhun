# Cloud Storage Migration Guide

Your wedding album has **40GB of photos** which is too large for:
- Vercel deployments (500MB limit)
- Git repositories
- Direct hosting in public folder

## Current Implementation ✅

**Pagination with Lazy Loading** - Already implemented!
- Loads 50 images at a time per category
- "Load More" buttons for each section
- Juron: 429 images
- Biya: 1,032 images  
- Reception: 0 images

**Benefits:**
- Works with current folder structure
- No cloud costs initially
- Fast initial page load

**Limitations:**
- Still needs to deploy all images (won't work on Vercel)
- No automatic image optimization
- Slower loading from server

---

## Recommended: Migrate to Cloud Storage

### Option A: Cloudinary (Easiest) ⭐ RECOMMENDED

**Free Tier:** 25GB storage, 25GB bandwidth/month

**Steps:**
1. Sign up at https://cloudinary.com
2. Install: `npm install cloudinary`
3. Upload your images (can use their UI or bulk upload script)
4. Update `.env.local`:
   ```
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
   ```

**Benefits:**
- Automatic image optimization
- Responsive images (serves right size)
- Fast global CDN
- Free tier covers your needs
- Easy transformation (filters, effects)

### Option B: Vercel Blob Storage

**Pricing:** ~$0.15/GB/month (~$6/month for 40GB)

**Steps:**
1. Run: `npm install @vercel/blob`
2. Upload images via API or CLI
3. Get URLs automatically

**Benefits:**
- Seamless Vercel integration
- Simple API
- Fast for Vercel deployments

### Option C: AWS S3 + CloudFront

**Pricing:** ~$1-2/month for 40GB + bandwidth

**Steps:**
1. Create S3 bucket
2. Upload images
3. Setup CloudFront CDN
4. Use S3 URLs in your app

**Benefits:**
- Very scalable
- Professional solution
- Full control

---

## Migration Script (Cloudinary Example)

Create `scripts/upload-to-cloudinary.js`:

\`\`\`javascript
const cloudinary = require('cloudinary').v2
const fs = require('fs')
const path = require('path')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

async function uploadFolder(folderName) {
  const folderPath = path.join(__dirname, '../public/images/wedding', folderName)
  const files = fs.readdirSync(folderPath)
    .filter(f => /\.(jpg|jpeg|png)$/i.test(f))

  console.log(\`Uploading \${files.length} files from \${folderName}...\`)

  for (const file of files) {
    const filePath = path.join(folderPath, file)
    try {
      await cloudinary.uploader.upload(filePath, {
        folder: \`wedding/\${folderName}\`,
        public_id: file.split('.')[0],
        resource_type: 'image'
      })
      console.log(\`✓ Uploaded \${file}\`)
    } catch (error) {
      console.error(\`✗ Failed \${file}:\`, error.message)
    }
  }
}

async function main() {
  await uploadFolder('juron')
  await uploadFolder('biya')
  await uploadFolder('reception')
  console.log('Upload complete!')
}

main()
\`\`\`

Run: `node scripts/upload-to-cloudinary.js`

---

## Updated Code After Migration

Update `app/api/images/route.ts`:

\`\`\`typescript
import { NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const page = parseInt(searchParams.get('page') || '1')
  const limit = 50

  try {
    const result = await cloudinary.search
      .expression(\`folder:wedding/\${category}\`)
      .sort_by('public_id', 'asc')
      .max_results(limit)
      .next_cursor(searchParams.get('next_cursor'))
      .execute()

    return NextResponse.json({
      images: result.resources.map(r => r.secure_url),
      total: result.total_count,
      hasMore: !!result.next_cursor,
      nextCursor: result.next_cursor
    })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Failed to load images' }, { status: 500 })
  }
}
\`\`\`

---

## Deployment Strategy

### For Now (Local Development):
✅ Current pagination works fine

### For Production (Vercel):
You MUST use cloud storage because:
- Vercel has 500MB deployment limit
- 40GB won't fit
- Git won't handle this size well

### Recommended Timeline:
1. ✅ Test current app locally
2. Choose cloud provider (Cloudinary recommended)
3. Upload images using script
4. Update API to use cloud URLs
5. Deploy to Vercel

---

## Cost Comparison

| Provider | Setup | Monthly Cost | Free Tier |
|----------|-------|--------------|-----------|
| **Cloudinary** | Easy | $0 | 25GB (enough!) |
| **Vercel Blob** | Easiest | ~$6 | 0.5GB |
| **AWS S3+CF** | Medium | ~$2 | 5GB for 1 year |
| **ImageKit** | Easy | $0 | 20GB |

**Winner:** Cloudinary (free + enough storage + CDN + optimization)

---

## Questions?

Need help setting up? Let me know which provider you'd like to use!
