import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import clientPromise from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const title = formData.get("title")?.toString() || "";
    const price = parseFloat(formData.get("price")?.toString() || "0");
    const category = formData.get("category")?.toString() || "";
    const description = formData.get("description")?.toString() || "";
    const file = formData.get("image") as File;

    if (!file) {
      return NextResponse.json({ error: "No image uploaded" }, { status: 400 });
    }

    // Convert image file to Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload image to Cloudinary using Promise
    const uploaded = await new Promise<any>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "vilantra_products" },
        (error, result) => {
          if (error || !result) {
            reject(error || new Error("Cloudinary upload failed"));
          } else {
            resolve(result);
          }
        }
      );

      uploadStream.end(buffer);
    });

    // Save product in MongoDB with uploaded.secure_url
    const client = await clientPromise;
    const db = client.db("vilantra");

    const newProduct = await db.collection("products").insertOne({
      title,
      price,
      category,
      description,
      image: uploaded.secure_url,
    });

    return NextResponse.json(newProduct);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to upload product" }, { status: 500 });
  }
}
