import cloudinary from "@/lib/cloudinary";

export async function POST(req) {
  // console.log("hii hello")
    try {
    const body = await req.json();

    const uploadedImage = await cloudinary.uploader.upload(body.image, {
      folder: "Learn Flex",
    });

    return Response.json(uploadedImage);

  } catch (error) {
    return Response.json({ error: error.message });
  }
}