/* eslint-disable no-undef */
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.imgbb.com/1/',
});

export const getUploadedLink = async (image:string | null) => {
  if (!image) return null

  const formData = new FormData();
  formData.append('image', image);

  const apiKey = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_KEY || 'e71ab4474afd7156f25da63750f77d38';

  try {
    const response = await api.post(`/upload?key=${apiKey}`, formData);

    if (response.status === 200) {
      return response.data.data.display_url;
    } else {
      throw new Error(`Image upload failed with status: ${response.status}`);
    }
  } catch (error) {
    console.log({ error });
    throw new Error('Failed to upload image');
  }
};
