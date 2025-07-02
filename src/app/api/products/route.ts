import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    console.log("🌐 Attempting to connect to MongoDB...");
    const client = await clientPromise;
    console.log("✅ Connected to MongoDB!");
    const db = client.db("vilantra");
    console.log("📦 Using DB: vilantra");
    const products = await db.collection("products").find({}).toArray();
    console.log("🎨 Products fetched:", products);
    return NextResponse.json(products);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
