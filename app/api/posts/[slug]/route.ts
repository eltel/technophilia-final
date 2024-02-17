// Assuming this file is named [slug].ts or similar to match the route /api/posts/:slug

import { MongoClient } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  export const GET = async (req: NextApiRequest, { params}: { params: { slug: string } }) => {
    const { slug } = params;
  console.log('params:', params)


  if (typeof slug !== 'string') {
    res.status(400).json({ message: 'Slug must be a string.' });
    return;
  }

  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI || '');
    const db = client.db("yourDatabaseName"); // Replace with your database name

    const post = await db.collection('posts').findOneAndUpdate(
      { slug },
      { $inc: { views: 1 } },
      {
        returnDocument: 'after',
        projection: { _id: 0 },
      }
    );

    if (post?.value && post.value.userId) {
      const user = await db.collection('users').findOne({ _id: post.value.userId });
      post.value.user = user;
    }

    res.status(200).json(post?.value || {});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong!" });
  }
}


/* import clientPromise from "@/utils/mongodb";
import { NextResponse, NextRequest } from "next/server";

// GET SINGLE POST
export const GET = async (req: NextRequest, { params}: { params: { slug: string } }) => {
  const { slug } = params;

  try {
    const client = await clientPromise;
    if (!client) {
      throw new Error('Please define the DATABASE_URL environment variable');
    }
    const db = client.db("yourDatabaseName"); // Replace with your database name

    // Increment views and get the updated document
    const post = await db.collection('posts').findOneAndUpdate(
      { slug }, 
      { $inc: { views: 1 } }, 
      { 
        returnDocument: 'after', // Ensures the updated document is returned
        projection: { _id: 0 }, // Exclude the _id field if you don't want it in the response
      }
    );

    // Assuming you have a separate collection for users and posts reference user ids
    // Fetch the user data if needed. You might need to adjust this based on your schema.
    if (post?.value && post.value.userId) {
      const user = await db.collection('users').findOne({ _id: post?.value.userId });
      post.value.user = user; // Attach user data to the post object
    }

    return new NextResponse(JSON.stringify(post?.value || {}, null, 2), { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, null, 2), 
      { status: 500 }
    );
  }
};
 */