import Image from "next/image";
import Link from "next/link";


interface Post {
    _id: string;
    title: string;
    img: string;
    desc: string;
}

const CustomTimeline = ({ posts }: { posts: Post[] }) => {
    console.log('posts', posts)
    return (
        <div className="timeline-container">
            {posts.map((post) => (             
                <div key={post.id} className="test h-96 px-5 pt-5 rounded-lg bg-gray-700/30">
                <Link href={`/posts/${post.slug}`}>
                  <div className='test h-56 w-56'>
                    <Image
                      src={post.img}
                      alt={post.title}
                      className="object-cover"
                      width={260}
                      height={260}
                    />
                  </div>
                  <h3>{post.title}</h3>
                  <div
                    dangerouslySetInnerHTML={{ __html: post.desc }}
                  />
                </Link>
              </div>
            ))}
        </div>
    );
};
  
export default CustomTimeline;