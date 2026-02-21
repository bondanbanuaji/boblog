import { useState, useEffect } from "react";

interface InteractionsProps {
    articleSlug: string;
    initialLikes: number;
    initialBookmarks: number;
    isLoggedIn: boolean;
    userLikedInitially: boolean;
    userBookmarkedInitially: boolean;
}

export default function Interactions({
    articleSlug,
    initialLikes,
    initialBookmarks,
    isLoggedIn,
    userLikedInitially,
    userBookmarkedInitially,
}: InteractionsProps) {
    const [likes, setLikes] = useState(initialLikes);
    const [bookmarks, setBookmarks] = useState(initialBookmarks);
    const [liked, setLiked] = useState(userLikedInitially);
    const [bookmarked, setBookmarked] = useState(userBookmarkedInitially);
    const [loadingAction, setLoadingAction] = useState<"like" | "bookmark" | null>(null);

    const handleAction = async (action: "like" | "bookmark") => {
        if (!isLoggedIn) {
            alert("Silakan login terlebih dahulu.");
            window.location.href = "/auth/login";
            return;
        }

        if (loadingAction) return;
        setLoadingAction(action);

        // Optimistic UI update
        if (action === "like") {
            setLiked(!liked);
            setLikes((prev) => liked ? prev - 1 : prev + 1);
        } else {
            setBookmarked(!bookmarked);
            setBookmarks((prev) => bookmarked ? prev - 1 : prev + 1);
        }

        try {
            const res = await fetch(`/api/interactions/${articleSlug}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action })
            });

            if (!res.ok) {
                throw new Error("Gagal menyimpan interaksi");
            }

            const data = await res.json();

            // Sync actual backend state
            if (action === "like" && data.liked !== undefined) {
                if (data.liked !== !liked) { // If optimistic differs from actual
                    setLiked(data.liked);
                    setLikes(data.liked ? initialLikes + (userLikedInitially ? 0 : 1) : initialLikes - (userLikedInitially ? 1 : 0));
                }
            }
            if (action === "bookmark" && data.bookmarked !== undefined) {
                if (data.bookmarked !== !bookmarked) {
                    setBookmarked(data.bookmarked);
                    setBookmarks(data.bookmarked ? initialBookmarks + (userBookmarkedInitially ? 0 : 1) : initialBookmarks - (userBookmarkedInitially ? 1 : 0));
                }
            }
        } catch (err) {
            // Revert optimistic update on failure
            if (action === "like") {
                setLiked(liked);
                setLikes(likes);
            } else {
                setBookmarked(bookmarked);
                setBookmarks(bookmarks);
            }
            console.error(err);
            alert("Terjadi kesalahan, coba lagi nanti.");
        } finally {
            setLoadingAction(null);
        }
    };

    return (
        <div className="flex gap-4">
            <button
                onClick={() => handleAction("like")}
                disabled={loadingAction === "like"}
                className={`btn btn-circle ${liked ? 'btn-primary shadow-lg shadow-primary/30' : 'btn-outline border-base-300'}`}
                aria-label="Suka artikel ini"
                title="Suka"
            >
                <span className="sr-only">Like</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={liked ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            </button>
            <div className="flex items-center text-sm font-medium opacity-70">
                {likes} suka
            </div>

            <div className="divider divider-horizontal mx-0"></div>

            <button
                onClick={() => handleAction("bookmark")}
                disabled={loadingAction === "bookmark"}
                className={`btn btn-circle ${bookmarked ? 'btn-accent shadow-lg shadow-accent/30 text-white' : 'btn-outline border-base-300'}`}
                aria-label="Simpan artikel ini"
                title="Simpan"
            >
                <span className="sr-only">Bookmark</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={bookmarked ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
            </button>
            <div className="flex items-center text-sm font-medium opacity-70">
                {bookmarks} disimpan
            </div>
        </div>
    );
}
