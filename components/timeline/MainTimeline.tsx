"use client";

import { Chrono } from "react-chrono";
import LoadMore from '@/components/infinite-scrolling/LoadMore';
import { MotionDiv } from "@/components/infinite-scrolling/MotionDiv";
import Link from "next/link";
import Image from "next/image";

/* interface Post {
  _id: string; // Schema.Types.ObjectId;
  createdAt: Date;
  slug: string;
  title: string;
  desc: string;
  img: string;
} */

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
const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const MainTimeline = ({ posts }: MainTimelineProps) => {
  console.log('Posts:', posts);
  const transformedPosts = posts.map((post) => ({
    id: post._id,
    title: post.title,
    cardTitle: post.title,
    cardSubtitle: post.desc,
    url: "http://www.history.com",
    media: {
      type: "IMAGE",
      source: {
        url: post.img,
      },
    },
    cardDetailedText: post.desc,
    slug: post.slug,
  }));

  // console.log("Transformed posts:", transformedPosts);

/*    const items = [
    {
      title: "May 1940",
      cardTitle: "Dunkirk",
      url: "http://www.history.com",
      cardSubtitle:
        "Men of the British Expeditionary Force (BEF) wade out to...",
      cardDetailedText:
        "<p>Yellow Magic Orchestra (YMO) are widely regarded as the pioneering group that bridged traditional music from Japan and techno in the late 1970s and early 1980s. YMO founders Ryuichi Sakamoto, Haruomi Hosono and Yukihiro Takahashi were known for their early experimentation of synthesizers and electronic sounds, and were highly influential in the development of modern techno music. Although YMO may have been a little-known group outside of Japan in their early days, they have gained a massive global following, and their influence can still be heard in both Eastern and Western pop music today.</p><p><br></p>",
      media: {
        type: "IMAGE",
        source: {
          url: "http://someurl/image.jpg",
        },
      },
    },
    {
      title: "July 1969",
      cardTitle: "Moon Landing",
      url: "http://www.nasa.gov",
      cardSubtitle: "Apollo 11 makes its historic landing on the Moon...",
      cardDetailedText:
        "Neil Armstrong and Buzz Aldrin became the first and second people...",
      media: {
        type: "IMAGE",
        source: {
          url: "http://someotherurl/moonlanding.jpg",
        },
      },
    },
    {
      title: "April 1912",
      cardTitle: "Titanic",
      url: "http://www.maritimehistory.com",
      cardSubtitle: "The RMS Titanic hits an iceberg in the North Atlantic...",
      cardDetailedText:
        "The 'unsinkable' ship, RMS Titanic, sank on its maiden voyage...",
      media: {
        type: "IMAGE",
        source: {
          url: "http://anotherurl/titanic.jpg",
        },
      },
    },
    {
      title: "November 1989",
      cardTitle: "Fall of Berlin Wall",
      url: "http://www.historyofgermany.com",
      cardSubtitle:
        "The Berlin Wall, a symbol of the Cold War, was torn down...",
      cardDetailedText:
        "Marking the end of the Cold War, the Berlin Wall was demolished...",
      media: {
        type: "IMAGE",
        source: {
          url: "http://differenturl/berlinwall.jpg",
        },
      },
    },
    {
      title: "October 1492",
      cardTitle: "Columbus Discovery",
      url: "http://www.explorationhistory.com",
      cardSubtitle: "Christopher Columbus reaches the New World...",
      cardDetailedText:
        "In an attempt to find a direct water route to Asia, Columbus...",
      media: {
        type: "IMAGE",
        source: {
          url: "http://newurl/columbus.jpg",
        },
      },
    },
    {
      title: "December 1903",
      cardTitle: "First Flight",
      url: "http://www.aviationhistory.com",
      cardSubtitle:
        "The Wright brothers achieve the first powered, sustained...",
      cardDetailedText:
        "Orville and Wilbur Wright made the first successful flight...",
      media: {
        type: "IMAGE",
        source: {
          url: "http://flighturl/firstflight.jpg",
        },
      },
    },
  ];
 */
  return (
    <div style={{ width: "800px", height: "675px" }} className={`chronoClass`} >
      <h1 className="text-center text-2xl mb-6" >Timeline</h1>
      <Chrono
     suppressHydrationWarning={true}
        // items={transformedPosts}
        // items={items}
        mode="VERTICAL_ALTERNATING"
        /* enableOutline
        parseDetailsAsHTML */
        classNames={{
          card: "my-card",
          cardMedia: "my-card-media",
          cardSubTitle: "my-card-subtitle",
          cardText: "my-card-text",
          cardTitle: "my-card-title",
          controls: "my-controls",
          title: "my-title",
        }}
        theme={{
          primary: "rgb(71 85 105)",
          secondary: "blue",
          cardBgColor: "transparent",
          cardForeColor: "violet",
          titleColor: "black",
          titleColorActive: "red",
        }}
        autoScroll
        slideShow
        slideShowType="slide_from_sides"
      >{transformedPosts?.map((post) => {
        {
          /* {
          console.log("Post:", post.id);
        } */
        }
        return (
          <div key={post.id} className="test h-96 px-5 pt-5 rounded-lg bg-gray-700/30">
            <Link href={`/posts/${post.slug}`}>
              <div className='test h-56 w-56'>
                <Image
                  src={post.media.source.url}
                  alt={post.title}
                  className="object-cover"
                  width={260}
                  height={260}
                />
              </div>
              <h3>{post.title}</h3>
              <div
                dangerouslySetInnerHTML={{ __html: post.cardDetailedText }}
              />
            </Link>
          </div>
        );
      })}</Chrono>
    </div>
  );
};
export default MainTimeline;
