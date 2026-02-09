# Wedding Album Setup Guide

Welcome to your elegant wedding album! This guide will help you set up and upload your wedding photos.

## Project Structure

Your wedding album is organized into three main categories:

- **Juron** - Pre-wedding/Engagement photos
- **Biya** - Wedding ceremony photos  
- **Reception** - Reception and celebration photos

## How to Add Your Photos

### Step 1: Create the Folder Structure

You need to create the following folder structure in your project:

```
public/
  images/
    wedding/
      juron/
      biya/
      reception/
```

If the `public` folder doesn't exist, create it at the root of your project.

### Step 2: Upload Your Photos

1. **For Juron photos**: Upload all your pre-wedding/engagement photos to `public/images/wedding/juron/`
2. **For Biya photos**: Upload all your wedding ceremony photos to `public/images/wedding/biya/`
3. **For Reception photos**: Upload all your reception photos to `public/images/wedding/reception/`

Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`

### Step 3: Update the Code (if using custom filenames)

If you want to display specific photos in a specific order, edit the image paths in `/app/page.tsx`:

```javascript
const juronImages = [
  '/images/wedding/juron/your-photo-1.jpg',
  '/images/wedding/juron/your-photo-2.jpg',
  '/images/wedding/juron/your-photo-3.jpg',
]

const biyaImages = [
  '/images/wedding/biya/your-photo-1.jpg',
  '/images/wedding/biya/your-photo-2.jpg',
  '/images/wedding/biya/your-photo-3.jpg',
]

const receptionImages = [
  '/images/wedding/reception/your-photo-1.jpg',
  '/images/wedding/reception/your-photo-2.jpg',
  '/images/wedding/reception/your-photo-3.jpg',
]
```

## Features

### 1. **Slideshow**
- Auto-playing slideshow of all your photos combined
- Play/Pause button to control the slideshow
- Navigate with Previous/Next buttons
- Click on progress indicators to jump to specific photos
- Auto-rotates every 4 seconds

### 2. **Photo Galleries**
Three organized photo galleries:
- Each category displays photos in a responsive grid
- Hover effects for better interactivity
- Beautiful gradient separator between sections

### 3. **Lightbox Modal**
Click on any photo to:
- View it in full size
- Navigate through photos with arrow buttons
- Use keyboard shortcuts:
  - **Right Arrow** - Next photo
  - **Left Arrow** - Previous photo
  - **Escape** - Close lightbox
- Close by clicking the X button or backdrop

### 4. **Navigation**
- Sticky navigation bar to jump to any section
- Mobile-responsive menu
- Smooth scrolling to sections

## Customization

### Change Colors
Edit the theme colors in `/app/globals.css`:
- `--primary` - Main accent color (currently pink)
- `--secondary` - Secondary accent (currently gold)
- `--background` - Background color
- `--foreground` - Text color

### Change Fonts
The album uses:
- **Playfair Display** for headings (serif)
- **Lora** for body text (serif)

To change fonts, edit `/app/layout.tsx` and `/tailwind.config.ts`

### Change Section Names
Edit the section titles in `/app/page.tsx`:
- Change `"Juron"`, `"Biya"`, `"Reception"` to your preferred names
- Update the navigation button labels

### Adjust Slideshow Timing
In `/components/slideshow.tsx`, change the `interval` prop:
```javascript
<Slideshow images={allImages} interval={5000} /> // 5 seconds
```

## Mobile Responsive

The album is fully responsive:
- **Mobile**: Single column grid, touch-friendly controls
- **Tablet**: 2-column grid
- **Desktop**: 3-column grid with enhanced interactions

## Browser Compatibility

Works on all modern browsers:
- Chrome/Edge
- Firefox
- Safari
- Mobile browsers

## Troubleshooting

### Photos not showing?
1. Check folder structure is exactly: `public/images/wedding/category/`
2. Ensure image paths in code match actual filenames (case-sensitive)
3. Verify image format is supported (.jpg, .png, .webp)
4. Clear browser cache and reload

### Lightbox not working?
Make sure you're clicking on photos in the gallery sections, not the slideshow.

### Styling issues?
The app uses Tailwind CSS. Make sure all dependencies are installed:
```bash
npm install
```

## Deployment

Once you're happy with your album:

1. **Download the code**: Click the three dots in the top right and select "Download ZIP"
2. **Or publish to Vercel**: Click the "Publish" button to deploy instantly
3. **Share the link**: Send the deployed URL to family and friends

## Need Help?

- Check the inline instructions that appear in the bottom right corner of the page
- Review the component files in `/components/` for detailed comments
- Main page logic is in `/app/page.tsx`

Enjoy celebrating your special day! 💕
