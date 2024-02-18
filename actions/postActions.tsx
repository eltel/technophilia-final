"use server";

import AnimeCard, { AnimeProp } from "@/components/infinite-scrolling/AnimeCard";
import { MongoClient } from 'mongodb';


export const fetchAnime = async (page: number) => {
  const response = await fetch(
    `https://shikimori.one/api/animes?page=${page}&limit=8&order=popularity`
  );

  const data = await response.json();

  return data.map((item: AnimeProp, index: number) => (
    <AnimeCard key={item.id} anime={item} index={index} />
  ));
};

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

export async function getData(page: number = 1, limit: number = 4) {
  const uri = process.env.DATABASE_URL as string;
  const client = new MongoClient(uri);
  const dbName = "futureblog";

  try {
    await client.connect();
    const database = client.db(dbName);
    const collection = database.collection("Post");

    // Calculate the number of documents to skip
    const skips = limit * (page - 1);

    // Fetching documents with pagination and sorting by createdAt in ascending order
    let posts = await collection
      .find({})
      .sort({ createdAt: 1 })
      .skip(skips)
      .limit(limit)
      .toArray() as unknown as Post[];

    // Convert non-serializable fields to strings
    posts = posts.map((post) => ({
      ...post,
      _id: post._id.toString(), // Ensure _id is converted to string
      createdAt: new Date(post.createdAt).toISOString(),
    }));

    // console.log(posts);
    return posts; // This returns the fetched posts
   /*  return <MainTimeline posts={posts} className='custom-scrollbar' />; // This returns the fetched posts */

  } catch (err) {
    console.error("Failed to fetch posts:", err);
  } finally {
    await client.close();
    console.log("Disconnected from database");
  }
}
