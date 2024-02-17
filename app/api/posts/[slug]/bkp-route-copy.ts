import { NextResponse, NextRequest } from "next/server";
import { MongoClient } from 'mongodb';

// GET SINGLE POST
export const GET = async (req: NextRequest, { params}: { params: { slug: string } }) => {
  const uri = process.env.DATABASE_URL as string;
  const client = new MongoClient(uri);
  const dbName = "futureblog";
  const { slug } = params;

  try {
  /*   const post = await prisma.post.update({
      where: { slug },
      data: { views: { increment: 1 } },
      include: { user: true },
    }); */
    await client.connect();
    const dbName = "futureblog";
    const database = client.db(dbName);
    const collection = database.collection("Post");
    // Fetching documents sorted by createdAt in asscending order
    let posts = await collection.find({}).sort({ createdAt: 1 }).toArray() as unknown as Post[];

     // Convert non-serializable fields to strings
    posts = posts.map((post) => ({
      ...post,
      _id: post._id,
      createdAt: new Date(post.createdAt).toISOString(),
    }));


    console.log(posts);
    return posts; // This returns the fetched posts

    return new NextResponse(JSON.stringify(post, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};
