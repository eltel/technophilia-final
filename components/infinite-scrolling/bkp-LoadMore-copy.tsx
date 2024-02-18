"use client";

import { getData } from '@/actions/postActions';
import Image from "next/image";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import dynamic from 'next/dynamic';
const MainTimeline = dynamic(
  () => import("@/components/timeline/MainTimeline"),
  {
    ssr: false,
  }
);

let page = 2;
let limit = 4;

interface LoadMoreProps {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[] | undefined>>;
}

interface Post {
  _id: string; // Define _id as a string
  slug: string;
  title: string;
  desc: string;
  img: string;
  createdAt: string;
  views: number;
  catSlug: string;
  userEmail: string;
}

interface MainTimelineProps {
  posts: Post[];
  className?: string;
}

export type MainTimeline = JSX.Element;

const LoadMore:React.FC<LoadMoreProps> = (props) => {
  const { ref, inView } = useInView();
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);



 /*  useEffect(() => {
    if (inView) {
      getData(page, limit).then((newPosts) => {
        console.log('res', newPosts)
        if (newPosts) {
          setPosts(prevPosts => [...prevPosts, ...newPosts]);
          page++;
        }
      });
    }
  }, [inView, posts]); */

/*   useEffect(() => {
    if (inView) {
      getData(page, limit).then((newPosts) => {
        console.log('res', newPosts)
        if (newPosts) {
          setPosts(prevPosts => [...prevPosts, ...newPosts]);
          page++;
        }
      });
    }
  }, [inView]); // Removed `posts` from dependencies to avoid infinite loop */

  useEffect(() => {
    if (inView) {
      getData(page, limit).then((newPosts) => {
        console.log('res', newPosts);
        if (newPosts?.length) { // Check if newPosts actually has items to prevent empty updates
          setPosts(prevPosts => [...prevPosts, ...newPosts]);
          setPage(currentPage => currentPage + 1); // Use setPage to increment
        }
      }).catch(error => console.error(error)); // Always good to catch potential errors
    }
  }, [inView, page]); // Include page in your dependency array if using it as state
  
  

  return (
    <>
      <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
      {posts && <MainTimeline posts={posts} className='custom-scrollbar' />}
       {/*  {data} */}
      </section>
      <section className="flex justify-center items-center w-full">
        <div ref={ref}>
          <Image
            src="./spinner.svg"
            alt="spinner"
            width={56}
            height={56}
            className="object-contain"
          />
        </div>
      </section>
    </>
  );
}

export default LoadMore;
