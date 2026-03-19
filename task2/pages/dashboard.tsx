import { GetServerSideProps } from "next";
import { User, Notification, getCurrentUser, getUserNotifications, getUserAnalytics } from "@/lib/api";

interface DashboardProps {
    user: User;
    notifications: Notification[];
    analytics: { pageViews: number; sessions: number; bounceRate: number };
    currentTime: string;
}


export default function Dashboard({ user, notifications, analytics, currentTime }: DashboardProps) {
    const unreadCount = notifications.filter((n) => !n.read).length;

    return (
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "2rem", fontFamily: "sans-serif" }}>
            <header style={{ borderBottom: "2px solid #0070f3", paddingBottom: "1rem", marginBottom: "1.5rem" }}>
                <h1>👤 Welcome, {user.name}!</h1>
                <p>📧 {user.email} · Role: <strong>{user.role}</strong></p>
                <p style={{ color: "gray", fontSize: 12 }}>
                    🕐 SSR — data fetched at request time: {currentTime}
                </p>
            </header>

            <section style={{ marginBottom: "2rem" }}>
                <h2>📊 Analytics</h2>
                <div style={{ display: "flex", gap: "1rem" }}>
                    {[
                        { label: "Page Views", value: analytics.pageViews.toLocaleString() },
                        { label: "Sessions", value: analytics.sessions.toLocaleString() },
                        { label: "Bounce Rate", value: `${analytics.bounceRate.toFixed(1)}%` },
                    ].map((stat) => (
                        <div
                            key={stat.label}
                            style={{
                                flex: 1, background: "#f9f9f9", border: "1px solid #eee",
                                borderRadius: 8, padding: "1rem", textAlign: "center",
                            }}
                        >
                            <div style={{ fontSize: 24, fontWeight: "bold", color: "#0070f3" }}>{stat.value}</div>
                            <div style={{ color: "gray", fontSize: 14 }}>{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <h2>🔔 Notifications ({unreadCount} unread)</h2>
                <ul style={{ listStyle: "none", padding: 0 }}>
                    {notifications.map((notif) => (
                        <li
                            key={notif.id}
                            style={{
                                padding: "0.75rem 1rem",
                                marginBottom: "0.5rem",
                                borderRadius: 6,
                                background: notif.read ? "#f9f9f9" : "#fff8e1",
                                border: `1px solid ${notif.type === "warning" ? "#f59e0b" : notif.type === "success" ? "#10b981" : "#3b82f6"}`,
                                display: "flex",
                                alignItems: "center",
                                gap: "0.75rem",
                            }}
                        >
                            <span>{notif.type === "info" ? "ℹ️" : notif.type === "success" ? "✅" : "⚠️"}</span>
                            <span>{notif.message}</span>
                            {!notif.read && (
                                <span style={{ marginLeft: "auto", fontSize: 11, color: "#f59e0b", fontWeight: "bold" }}>
                                    NEW
                                </span>
                            )}
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}


export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {

    const user = getCurrentUser();
    const notifications = await getUserNotifications(user.id);
    const analytics = await getUserAnalytics(user.id);

    return {
        props: {
            user,
            notifications,
            analytics,
            currentTime: new Date().toISOString(),
        },
    };
};