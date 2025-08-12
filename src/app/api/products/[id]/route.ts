// // app/api/products/[id]/route.ts
// import { NextRequest, NextResponse } from 'next/server';
// import clientPromise from '@/lib/mongodb';
// import { ObjectId } from 'mongodb';

// export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
//   try {
//     const client = await clientPromise;
//     const db = client.db('vilantra');

//     const id = params.id;

//     if (!id) {
//       return NextResponse.json({ error: 'No ID provided' }, { status: 400 });
//     }

//     const product = await db.collection('products').findOne({ _id: new ObjectId(id) });

//     if (!product) {
//       return NextResponse.json({ error: 'Product not found' }, { status: 404 });
//     }

//     return NextResponse.json(product, { status: 200 });
//   } catch (error) {
//     console.error('Error fetching product:', error);
//     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//   }
// }
