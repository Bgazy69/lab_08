import { GetServerSideProps } from "next";
import Link from "next/link";

interface AboutSSRProps {
    fetchedAt: string;
}

export default function AboutSSR({ fetchedAt }: AboutSSRProps) {
    return (
        <main style={{ maxWidth: 700, margin: "0 auto", padding: "2rem", fontFamily: "sans-serif" }}>
            <Link href="/dashboard">← Dashboard</Link>
            <h1>About Us (SSR)</h1>
            <div style={{ background: "#fef3c7", padding: "1rem", borderRadius: 8, marginBottom: "1rem" }}>
                <strong>🔄 Rendering: Server-Side Rendering (SSR)</strong>
                <p style={{ margin: "0.5rem 0 0" }}>
                    Page generated on EVERY request. Data is always fresh but slower TTFB.
                </p>
                <p style={{ color: "gray", fontSize: 12 }}>Fetched at: {fetchedAt}</p>
            </div>
            <p>
                Refresh this page — the timestamp above updates every time. <br />
                Compare with the SSG /about page — its timestamp stays the same until rebuild.
            </p>
            <Link href="/about" style={{ color: "#0070f3" }}>
                → Compare with SSG /about page
            </Link>
        </main>
    );
}

export const getServerSideProps: GetServerSideProps = async () => {
    return {
        props: {
            fetchedAt: new Date().toISOString(),
        },
    };
};