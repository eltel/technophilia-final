import LoadMore from '@/components/infinite-scrolling/LoadMore';
import { MongoClient } from 'mongodb';
import dynamic from 'next/dynamic';

const MainTimeline = dynamic(
  () => import("@/components/timeline/MainTimeline"),
  {
    ssr: false,
  }
);

interface Post {
  _id: string; // Define _id as a string
  createdAt: string;
  slug: string;
  title: string;
  desc: string;
  img: string;
  views: number;
  catSlug: string;
  userEmail: string;
}


/* function getDataURL() {
  if (process.env.NODE_ENV === "production") {
    return "https://teu-content-manager-2024.vercel.app";
  } else {
    return "http://localhost:3000";
  }
}
 */

/* const getData = async () => {
  const url = getDataURL();
  const res = await fetch(`${url}/api/posts/timeline`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
}; */

async function getData() {
  const uri = process.env.DATABASE_URL as string;
  const client = new MongoClient(uri);
  const dbName = "futureblog";

  try {
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

  } catch (err) {
    console.error("Failed to fetch posts:", err);
  } finally {
    await client.close();
    console.log("Disconnected from database");
  }
}


export default async function Timeline() {
  const posts = await getData();

  return (
    <div>
      <h1>Timeline</h1>
      <div className="flex justify-center items-center .min-h-screen-minus-header"  suppressHydrationWarning={true}>
      {posts && <MainTimeline posts={posts} className='custom-scrollbar' />}
      </div>
      <LoadMore />
    </div>
  );
}
