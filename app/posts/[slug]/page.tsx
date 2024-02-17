import Image from "next/image";
import { MongoClient } from 'mongodb';

function getDataURL() {
  if (process.env.NODE_ENV === "production") {
    return "https://teu-content-manager-2024.vercel.app";
  } else {
    return "http://localhost:3000";
  }
}

/* const getData = async (slug: string) => {
  const url = getDataURL();
  const res = await fetch(`${url}/api/posts/${slug}`, {
    cache: "no-store",
  });

  // if (!res.ok) {
  //   throw new Error("Failed");
  // }

  return res.json();
}; */

/* async function getPostBySlug( slug: string ) {
  const uri = process.env.DATABASE_URL as string;
  const client = new MongoClient(uri);
  // const dbName = "futureblog";
  const db = client.db("futureblog");

  try {
    await client.connect();
    const dbName = "futureblog";
    const database = client.db(dbName);
    const collection = database.collection("Post");
     // Increment views and get the updated document
     const post = await db.collection('posts').findOneAndUpdate(
      { slug }, 
      { $inc: { views: 1 } }, 
      { 
        returnDocument: 'after', // Ensures the updated document is returned
        projection: { _id: 0 }, // Exclude the _id field if you don't want it in the response
      }
    );


    console.log(post);
    return post; // This returns the fetched post

  } catch (err) {
    console.error("Failed to fetch posts:", err);
  } finally {
    await client.close();
    console.log("Disconnected from database");
  }
}
 */


async function getPostBySlug(slug: string) {
  const uri = process.env.DATABASE_URL as string;
  const client = new MongoClient(uri);
  const dbName = "futureblog";

  try {
    console.log('entered try')
    await client.connect();
    console.log('connected to db')
    const database = client.db(dbName);
    const collection = database.collection("Post"); // Ensure collection name is correct

    // Increment views and get the updated document
    const post = await collection.findOneAndUpdate(
      { slug }, 
      { $inc: { views: 1 } }, 
      { 
        returnDocument: 'after', // Ensures the updated document is returned
        projection: { _id: 0 }, // Exclude the _id field if you don't want it in the response
      }
    );

    console.log('post', post);
    return post; // This returns the fetched post. Note: `post.value` to get the actual document
  } catch (err) {
    console.error("Failed to fetch posts:", err);
  } finally {
    await client.close();
    console.log("Disconnected from database");
  }
}


const SinglePage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  const post = await getPostBySlug(slug);
  console.log('post', post);

  return (
    <div className=''>     
      <div className=''>
          <h1 className='text-center text-3xl mt-4 font-semibold'>{post?.title}</h1>
        <div className='w-2/3 mx-auto my-8'>
          {post?.img && (
            <div className='relative w/2/3 h-96 '>
              <Image
                src={post.img}
                alt=""
                fill
                className='object-cover'
                priority={true}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          )}
          <div
           className='mt-4 text-lg leading-7 text-gray-700 dark:text-gray-300'
            dangerouslySetInnerHTML={{ __html: post?.desc || `<p>No code</p>` }}
          />         
        </div>
      </div>
  
    </div>
  );
};

export default SinglePage;
