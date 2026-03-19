import { Post, Author } from "@/types";

const authors: Author[] = [
    { id: "1", name: "John Doe", bio: "Tech writer", avatar: "/avatars/john.jpg" },
    { id: "2", name: "Jane Smith", bio: "React expert", avatar: "/avatars/jane.jpg" },
];

const posts: Post[] = [
    {
        id: "1",
        title: "Getting Started with Next.js",
        content: "Next.js is a React framework that enables server-side rendering and static site generation out of the box. It simplifies routing, data fetching, and deployment.",
        author: "1",
        date: "2026-03-01",
        tags: ["nextjs", "react"],
        readTime: 5,
    },
    {
        id: "2",
        title: "Understanding SSR vs SSG",
        content: "Server-Side Rendering generates pages on each request, while Static Site Generation pre-builds pages at build time. Choosing the right strategy depends on your data freshness needs.",
        author: "2",
        date: "2026-03-05",
        tags: ["ssr", "ssg", "performance"],
        readTime: 7,
    },
    {
        id: "3",
        title: "Incremental Static Regeneration Explained",
        content: "ISR combines the best of SSR and SSG — pages are statically generated but can be revalidated in the background after a specified interval without a full rebuild.",
        author: "1",
        date: "2026-03-10",
        tags: ["isr", "nextjs"],
        readTime: 6,
    },
];

export async function getAllPosts(): Promise<Post[]> {
    return posts;
}

export async function getPostById(id: string): Promise<Post | undefined> {
    return posts.find((p) => p.id === id);
}

export async function getAuthorById(id: string): Promise<Author | undefined> {
    return authors.find((a) => a.id === id);
}