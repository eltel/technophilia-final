'use client';

// Timeline component
import React, { useState, useEffect } from 'react';
import LoadMore from '@/components/infinite-scrolling/LoadMore';
// import dynamic from 'next/dynamic';
import { getData } from '@/actions/postActions';
import CustomTimeline from '@/components/timeline/CustomTimeline'

// const MainTimeline = dynamic(() => import('@/components/timeline/MainTimeline'), {
//   ssr: false,
// });

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

let page = 1;
let limit = 4;

export default function Timeline() {
  const [posts, setPosts] = useState<Post[] | undefined>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const initialPosts = await getData(page, limit);
      setPosts(initialPosts);
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <div className="flex justify-center items-center .min-h-screen-minus-header" suppressHydrationWarning={true}>
        <CustomTimeline key={posts?.length} posts={posts || []}  />
      </div>
      <LoadMore setPosts={setPosts} posts={posts || []} />
    </div>
  );
}
