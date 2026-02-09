// Utility to generate image paths from a folder
export function getImagesFromFolder(folderPath: string, fileList: string[]): string[] {
  return fileList
    .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
    .map(file => `${folderPath}/${file}`)
    .sort()
}
