import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export default cloudinary

// Upload image to Cloudinary
export async function uploadToCloudinary(file: File, folder: string = 'medical-care') {
  try {
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: 'auto',
        },
        (error, result) => {
          if (error) reject(error)
          else resolve(result)
        }
      ).end(buffer)
    })
  } catch (error) {
    console.error('Cloudinary upload error:', error)
    throw error
  }
}

// Delete image from Cloudinary
export async function deleteFromCloudinary(publicId: string) {
  try {
    const result = await cloudinary.uploader.destroy(publicId)
    return result
  } catch (error) {
    console.error('Cloudinary delete error:', error)
    throw error
  }
}

// Get optimized image URL
export function getOptimizedImageUrl(publicId: string, options: {
  width?: number
  height?: number
  quality?: number
  format?: string
} = {}) {
  const {
    width = 800,
    height,
    quality = 80,
    format = 'auto',
  } = options

  return cloudinary.url(publicId, {
    transformation: [
      { width, height, crop: 'fill' },
      { quality, fetch_format: format },
    ],
  })
}
