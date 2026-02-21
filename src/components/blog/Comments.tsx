import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { id as localeID } from "date-fns/locale";

interface CommentAuthor {
    id: string;
    displayName: string;
    avatar: string | null;
}

interface Reply {
    id: string;
    content: string;
    createdAt: string;
    author: CommentAuthor;
}

interface Comment {
    id: string;
    content: string;
    createdAt: string;
    author: CommentAuthor;
    replies: Reply[];
}

interface CommentsProps {
    articleId: string;
    isLoggedIn: boolean;
}

export default function Comments({ articleId, isLoggedIn }: CommentsProps) {
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const [content, setContent] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [replyTo, setReplyTo] = useState<string | null>(null);
    const [replyContent, setReplyContent] = useState("");

    const fetchComments = async () => {
        try {
            const res = await fetch(`/api/comments/${articleId}`);
            const data = await res.json();
            if (data.data) {
                setComments(data.data);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [articleId]);

    const handleSubmit = async (e: React.FormEvent, parentId?: string | null) => {
        e.preventDefault();
        if (!isLoggedIn) {
            alert("Silakan login untuk berkomentar");
            return;
        }

        const text = parentId ? replyContent : content;
        if (text.length < 3) return;

        setSubmitting(true);
        try {
            const res = await fetch(`/api/comments/${articleId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content: text, parentId }),
            });

            if (res.ok) {
                if (parentId) {
                    setReplyContent("");
                    setReplyTo(null);
                } else {
                    setContent("");
                }
                await fetchComments();
            } else {
                const err = await res.json();
                alert(err.error || "Gagal mengirim komentar");
            }
        } catch (err) {
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return <div className="text-center py-8"><span className="loading loading-spinner text-primary"></span></div>;
    }

    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold mb-8">Komentar ({comments.reduce((acc, c) => acc + 1 + c.replies.length, 0)})</h2>

            {/* Main Comment Form */}
            {isLoggedIn ? (
                <form onSubmit={(e) => handleSubmit(e, null)} className="bg-base-200 p-4 rounded-2xl border border-base-300 shadow-sm relative">
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Tulis pendapat Anda..."
                        className="textarea w-full bg-base-100 border-none focus:ring-0 text-base min-h-[100px] mb-2"
                        disabled={submitting}
                    />
                    <div className="flex justify-between items-center px-2">
                        <span className="text-xs opacity-50">{content.length} karakter</span>
                        <button
                            type="submit"
                            className="btn btn-primary btn-sm px-6 rounded-full shadow-md shadow-primary/20"
                            disabled={submitting || content.length < 3}
                        >
                            {submitting ? <span className="loading loading-spinner loading-xs"></span> : "Kirim"}
                        </button>
                    </div>
                </form>
            ) : (
                <div className="bg-base-200/50 p-6 rounded-2xl text-center border-dashed border border-base-300">
                    <p className="mb-4 opacity-70">Bergabung dalam diskusi dengan meninggalkan komentar.</p>
                    <a href="/auth/login" className="btn btn-primary">Login untuk Berkomentar</a>
                </div>
            )}

            {/* Constraints display */}
            <div className="space-y-6 mt-8">
                {comments.length === 0 ? (
                    <p className="text-center opacity-50 py-4">Belum ada komentar. Jadilah yang pertama!</p>
                ) : (
                    comments.map((comment) => (
                        <div key={comment.id} className="flex gap-4">
                            <div className="avatar shrink-0 self-start">
                                <div className="w-10 rounded-full bg-base-300">
                                    <img src={comment.author.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(comment.author.displayName)}`} alt={comment.author.displayName} />
                                </div>
                            </div>
                            <div className="flex-1 space-y-2">
                                <div className="bg-base-200 rounded-2xl rounded-tl-none px-5 py-4 border border-base-300">
                                    <div className="flex justify-between items-baseline mb-2">
                                        <h4 className="font-bold text-sm">{comment.author.displayName}</h4>
                                        <span className="text-xs opacity-50">
                                            {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true, locale: localeID })}
                                        </span>
                                    </div>
                                    <p className="text-sm opacity-90 leading-relaxed wrap-break-word">{comment.content}</p>
                                </div>

                                <div className="px-2">
                                    <button
                                        onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
                                        className="text-xs font-semibold opacity-60 hover:opacity-100 hover:text-primary transition-colors"
                                    >
                                        Balas
                                    </button>
                                </div>

                                {/* Reply Form */}
                                {replyTo === comment.id && isLoggedIn && (
                                    <form onSubmit={(e) => handleSubmit(e, comment.id)} className="mt-2 flex gap-2 animate-fade-in pl-4 border-l-2 border-base-300">
                                        <input
                                            type="text"
                                            value={replyContent}
                                            onChange={(e) => setReplyContent(e.target.value)}
                                            placeholder="Tulis balasan..."
                                            className="input input-sm input-bordered flex-1 rounded-full bg-base-100"
                                            autoFocus
                                        />
                                        <button type="submit" disabled={submitting || replyContent.length < 3} className="btn btn-sm btn-primary rounded-full px-4">Kirim</button>
                                        <button type="button" onClick={() => setReplyTo(null)} className="btn btn-sm btn-ghost rounded-full">Batal</button>
                                    </form>
                                )}

                                {/* Replies */}
                                {comment.replies.length > 0 && (
                                    <div className="space-y-4 mt-3">
                                        {comment.replies.map(reply => (
                                            <div key={reply.id} className="flex gap-3">
                                                <div className="avatar shrink-0 self-start">
                                                    <div className="w-8 rounded-full bg-base-300">
                                                        <img src={reply.author.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(reply.author.displayName)}`} alt={reply.author.displayName} />
                                                    </div>
                                                </div>
                                                <div className="flex-1">
                                                    <div className="bg-base-200/60 rounded-2xl rounded-tl-none px-4 py-3 text-sm">
                                                        <div className="flex justify-between items-baseline mb-1">
                                                            <h5 className="font-bold text-xs">{reply.author.displayName}</h5>
                                                            <span className="text-[10px] opacity-50">
                                                                {formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true, locale: localeID })}
                                                            </span>
                                                        </div>
                                                        <p className="opacity-90">{reply.content}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
