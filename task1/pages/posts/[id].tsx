import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { Post, Author } from "@/types";
import { getAllPosts, getPostById, getAuthorById } from "@/lib/api";

interface PostProps {
    post: Post;
    author: Author;
}

export default function PostPage({ post, author }: PostProps) {
    return (
        <main style={{ maxWidth: 800, margin: "0 auto", padding: "2rem" }}>
            <Link href="/">← Back to Home</Link>
            <article>
                <h1>{post.title}</h1>
                <p style={{ color: "gray" }}>
                    By <strong>{author.name}</strong> ({author.bio}) · {post.date} · ⏱ {post.readTime} min
                </p>
                <p>{post.content}</p>
                <div>
                    {post.tags.map((tag) => (
                        <span
                            key={tag}
                            style={{
                                background: "#e8f4fd",
                                borderRadius: 4,
                                padding: "2px 8px",
                                marginRight: 4,
                                fontSize: 12,
                                color: "#0070f3",
                            }}
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
            </article>
        </main>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    const posts = await getAllPosts();
    return {
        paths: posts.map((post) => ({ params: { id: post.id } })),
        fallback: "blocking", // новые посты рендерятся на сервере и кешируются
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const post = await getPostById(params?.id as string);

    if (!post) return { notFound: true };

    const author = await getAuthorById(post.author);

    if (!author) return { notFound: true };

    return {
        props: { post, author },
        revalidate: 60,
    };
};