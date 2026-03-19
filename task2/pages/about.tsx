import { GetStaticProps } from "next";
import Link from "next/link";

interface AboutProps {
    generatedAt: string;
}

export default function About({ generatedAt }: AboutProps) {
    return (
        <main style={{ maxWidth: 700, margin: "0 auto", padding: "2rem", fontFamily: "sans-serif" }}>
            <Link href="/dashboard">← Dashboard</Link>
            <h1>About Us (SSG)</h1>
            <div style={{ background: "#e8f4fd", padding: "1rem", borderRadius: 8, marginBottom: "1rem" }}>
                <strong>⚡ Rendering: Static Site Generation (SSG)</strong>
                <p style={{ margin: "0.5rem 0 0" }}>
                    Page pre-built at build time. Served instantly from CDN. Data does NOT change between deployments.
                </p>
                <p style={{ color: "gray", fontSize: 12 }}>Built at: {generatedAt}</p>
            </div>
            <p>We are a team of developers building awesome blog tools with Next.js.</p>
        </main>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {
            generatedAt: new Date().toISOString(),
        },
    };
};