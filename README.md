# Lab 08 – Server-Side Rendering with Next.js

**Student Name:** Avdanov Bigazy
**Date:** 2026-03-20

## SSR vs SSG – Key Differences

| Feature        | SSR (getServerSideProps) | SSG (getStaticProps)     |
|----------------|--------------------------|--------------------------|
| When renders   | Every request            | Build time               |
| Data freshness | Always fresh             | Stale until rebuild      |
| TTFB           | Slower                   | Fastest (CDN cache)      |
| Use case       | Dashboard, auth, live data | Blog, docs, marketing  |
| ISR support    | ❌                        | ✅ (revalidate: 60)      |

## Pages

- `/` – SSG home page (+ ISR every 60s)
- `/posts/[id]` – Dynamic SSG post pages
- `/dashboard` – SSR user dashboard (data fresh on every request)
- `/about` – SSG about page
- `/about-ssr` – SSR about page (for comparison)

# запускать
```bash
npm install
npm run dev
```