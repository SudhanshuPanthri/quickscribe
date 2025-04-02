export function formatFileNameAsTitle(fileName: string): string {
    if (!fileName || typeof fileName !== 'string') {
      throw new Error('Invalid file name');
    }
  
    // Remove the file extension (e.g., .pdf or any other extension)
    const nameWithoutExtension = fileName.replace(/\.[^/.]+$/, '');
  
    // Replace underscores or dashes with spaces and trim extra spaces
    const formattedName = nameWithoutExtension.replace(/[_-]+/g, ' ').trim();
  
    // Capitalize the first letter of each word
    return formattedName
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }