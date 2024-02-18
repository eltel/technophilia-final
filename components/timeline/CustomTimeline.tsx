import Image from "next/image";
import Link from "next/link";


interface Post {
    _id: string;
    title: string;
    img: string;
    desc: string;
    slug: string;
}

interface CustomTimelineProps {
  posts: Post[];
  className?: string;
}

const CustomTimeline = ({ posts }: CustomTimelineProps) => {
  const maxLength = 160;
    console.log('posts', posts)
    return (
        <div className="flex flex-col sm:w-1/2 mx-auto " >
            {posts.map((post) => (             
                <div key={post._id} className="chronoClass h-[400px] w-[320px] px-5 pt-5 rounded-lg bg-gray-700/50 m-4 sm:m-12 overflow-scroll">
                <Link href={`/posts/${post.slug}`}>
                  <div className='relative h-56 w-56 sm:h-96 sm:w-96 mx-auto '>
                    <Image
                      src={post.img}
                      alt={post.title}
                      fill
                      className='object-cover'
                      priority={true}
                      // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-center text-gray-300 mt-4">{post.title}</h3>
                  <div
                  className="text-sm text-gray-300"
                    dangerouslySetInnerHTML={{ __html: post.desc.length > maxLength ? post.desc.substring(0, maxLength) + "...[read more]" : post.desc}}
                  />
                </Link>
              </div>
            ))}
        </div>
    );
};
  
export default CustomTimeline;