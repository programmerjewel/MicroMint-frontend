import axios from "axios";

export const uploadImage = async (imageFile) => {
  if (!imageFile) return null;

  const formData = new FormData();
  formData.append("image", imageFile);

  try {
    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API}`,
      formData
    );

    return response.data.data.display_url;
  } catch (error) {
    console.error("ImgBB Upload Error:", error);
    throw new Error("Failed to upload image");
  }
};