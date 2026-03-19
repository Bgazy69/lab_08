import { GetStaticProps } from "next";
import Link from "next/link";
import { Post } from "@/types";
import { getAllPosts } from "@/lib/api";

interface HomeProps {
  posts: Post[];
  generatedAt: string;
}

export default function Home({ posts, generatedAt }: HomeProps) {
  return (
    <main style={{ maxWidth: 800, margin: "0 auto", padding: "2rem" }}>
      <h1>📝 My Blog</h1>
      <p style={{ color: "gray", fontSize: 12 }}>
        Page generated at (SSG + ISR): {generatedAt}
      </p>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {posts.map((post) => (
          <li key={post.id} style={{ borderBottom: "1px solid #eee", padding: "1rem 0" }}>
            <Link href={`/posts/${post.id}`}>
              <h2 style={{ margin: 0, cursor: "pointer", color: "#0070f3" }}>
                {post.title}
              </h2>
            </Link>
            <p style={{ margin: "0.25rem 0", color: "gray" }}>
              By {post.author} · {post.date} · ⏱ {post.readTime} min read
            </p>
            <div>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    background: "#f0f0f0",
                    borderRadius: 4,
                    padding: "2px 8px",
                    marginRight: 4,
                    fontSize: 12,
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}


export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllPosts();
  return {
    props: {
      posts,
      generatedAt: new Date().toISOString(),
    },
    revalidate: 60, // ISR: перегенерировать каждые 60 секунд
  };
};