// import { NextResponse } from "next/server";
// import clientPromise from "@/lib/mongodb";

// export async function GET() {
//   try {
//     const client = await clientPromise;
//     const db = client.db("vilantra");

//     const products = await db
//       .collection("products")
//       .find({ category: "Designer sarees" })
//       .limit(10) // Fetch max 100; you can control batch via frontend
//       .toArray();

//     return NextResponse.json(products);
//   } catch (error) {
//     console.error("Error fetching designer sarees:", error);
//     return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
//   }
// }
