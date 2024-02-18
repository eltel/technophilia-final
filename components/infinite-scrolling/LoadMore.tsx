"use client";

import { getData } from '@/actions/postActions';
import Image from "next/image";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

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

interface LoadMoreProps {
  setPosts: React.Dispatch<React.SetStateAction<Post[] | undefined >>;
  posts: Post[];
}

const LoadMore: React.FC<LoadMoreProps> = ({ setPosts }) => {
  const { ref, inView } = useInView();
  const [page, setPage] = useState(2); // Start from page 2, assuming page 1 is loaded by the parent
  const limit = 4;

  useEffect(() => {
    if (inView) {
      getData(page, limit).then((newPosts) => {
        console.log('res', newPosts);
        if (newPosts?.length) {
          // Use the setPosts function passed as a prop to update the posts list
          setPosts(prevPosts => [...(prevPosts || []), ...newPosts]);
          setPage(currentPage => currentPage + 1); // Increment the page for the next fetch
        }
      }).catch(error => console.error(error));
    }
  }, [inView, page, setPosts]); // Include setPosts in the dependencies array

  return (
    <>
      <section className="flex justify-center items-center w-full">
        <div ref={ref}>
          <Image src="./spinner.svg" alt="spinner" width={56} height={56} className="object-contain" />
        </div>
      </section>
    </>
  );
};

export default LoadMore;
