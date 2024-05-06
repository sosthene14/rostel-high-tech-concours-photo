export const getPictures = async () => {
  try {
    const response = await fetch("https://rostel-high-tech-concours-photo-backend.vercel.app/images");
    if (!response.ok) {
      throw new Error('Failed to fetch images');
    }
    const data = await response.json();
    return data; 
  } catch (error) {
    console.error('Error fetching images:', error);
    return null;
  }
};
