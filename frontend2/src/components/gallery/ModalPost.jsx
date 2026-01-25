import React, { useRef, useState, useEffect } from "react";
import { addGalleryLike, addGalleryComment } from "../../hooks/useAPI";

// Heart icon
const HeartIcon = ({ filled, size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24"
    stroke={filled ? "#ec4899" : "#fff"}
    fill={filled ? "#ec4899" : "none"}
    strokeWidth="2"
    style={{ display: "inline", verticalAlign: "middle" }}>
    <path d="M12 21s-7-6-7-10a7 7 0 1 1 14 0c0 4-7 10-7 10z" />
  </svg>
);

// Comment icon
const CommentIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="1.8"
    style={{ display: "inline", verticalAlign: "middle", marginRight: 6 }}>
    <path d="M21 11.5a8.38 8.38 0 0 1-1.59 5.02A8.5 8.5 0 1 1 12 3.5v0a8.5 8.5 0 0 1 9 8v.07z" />
  </svg>
);

const SIDEBAR_WIDTH = 410;

const ModalPost = ({
  open,
  onClose,
  post,
  likeCount = 0,
  commentCount = 0,
  comments = [],
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}) => {
  const [liked, setLiked] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [myComments, setMyComments] = useState([]);
  const imageRef = useRef(null);
  const [imgDimensions, setImgDimensions] = useState(null);

  useEffect(() => {
    setLiked(false);
    setCommentInput("");
    setMyComments([]);
    setImgDimensions(null);
  }, [post]);

  function onImgLoad() {
    if (imageRef.current) {
      setImgDimensions({
        width: imageRef.current.naturalWidth,
        height: imageRef.current.naturalHeight,
        displayHeight: imageRef.current.offsetHeight,
        displayWidth: imageRef.current.offsetWidth
      });
    }
  }

  // Like handler (API call)
  const handleLike = async () => {
    if (!liked && post) {
      await addGalleryLike(post.id);
      setLiked(true);
    }
    // Optionally, refresh parent data here
  };

  // Comment handler (API call)
  const handleSend = async () => {
    if (!commentInput?.trim() || !post) return;
    await addGalleryComment(post.id, commentInput.trim());
    setMyComments([{ text: commentInput.trim(), replies: [] }, ...myComments]);
    setCommentInput("");
    // Optionally, refresh parent data here
  };

  const [mobile, setMobile] = useState(typeof window !== "undefined" && window.innerWidth < 700);
  useEffect(() => {
    const onResize = () => setMobile(window.innerWidth < 700);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const infoPanelHeight = imgDimensions ? imgDimensions.displayHeight : undefined;

  // Swipe navigation on mobile
  const touchStart = useRef(null);
  const onTouchStart = mobile ? (e) => { touchStart.current = e.touches[0].clientX; } : undefined;
  const onTouchEnd = mobile ? (e) => {
    if (touchStart.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStart.current;
    const threshold = 42;
    if (dx > threshold && hasPrev && onPrev) onPrev();
    if (dx < -threshold && hasNext && onNext) onNext();
    touchStart.current = null;
  } : undefined;

  if (!open || !post) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center items-center"
      style={{
        background: "rgba(24,26,27,0.70)",
        backdropFilter: "blur(8px)"
      }}
    >
      <div
        className={`relative w-auto mx-2 flex ${mobile ? "flex-col" : "flex-row"} items-stretch justify-center`}
        style={{
          background: "none",
          boxShadow: "none",
          alignItems: "center"
        }}
      >
        {/* IMAGE */}
        <div
          className="relative flex items-center justify-center"
          style={{
            width: mobile ? "100vw" : `auto`,
            maxWidth: mobile ? "98vw" : "62vw",
            minWidth: 220,
            flexShrink: 0,
            alignSelf: "center"
          }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {!mobile && hasPrev && (
            <button
              onClick={onPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-transparent border-none z-20 text-3xl text-white/80 hover:text-white cursor-pointer select-none"
              style={{ outline: "none" }}
              aria-label="Prev Photo"
            >
              &#8592;
            </button>
          )}
          <img
            ref={imageRef}
            src={post.image_url}
            alt={post.title}
            onLoad={onImgLoad}
            style={{
              display: "block",
              maxWidth: mobile ? "98vw" : "60vw",
              width: "auto",
              height: mobile ? "38vh" : "80vh",
              maxHeight: mobile ? "44vh" : "80vh",
              objectFit: "contain",
              background: "transparent",
              borderRadius: 0,
              boxShadow: "0 0 0 transparent"
            }}
            className="w-full h-auto"
          />
          {!mobile && hasNext && (
            <button
              onClick={onNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-transparent border-none z-20 text-3xl text-white/80 hover:text-white cursor-pointer select-none"
              style={{ outline: "none" }}
              aria-label="Next Photo"
            >
              &#8594;
            </button>
          )}
          <button
            onClick={handleLike}
            className={`absolute transition-opacity duration-200 hover:scale-110 active:scale-95`}
            style={{
              bottom: 22,
              right: 18,
              background: "none",
              border: "none",
              zIndex: 10,
              outline: "none",
              cursor: "pointer"
            }}
            aria-label="Like photo"
            tabIndex={0}
          >
          </button>
        </div>
        {/* INFO SIDEBAR */}
        <div
          className="flex flex-col px-2 sm:px-6 py-5 sm:py-6"
          style={{
            width: mobile ? "100vw" : SIDEBAR_WIDTH,
            maxWidth: SIDEBAR_WIDTH,
            minWidth: 210,
            height: infoPanelHeight || (mobile ? "auto" : "80vh"),
            minHeight: 0,
            alignSelf: mobile ? "initial" : "center",
            background: "transparent",
            borderRadius: 0,
            overflow: "hidden",
            display: "flex"
          }}
        >
          <div className="flex items-center justify-between mb-3" style={{ borderRadius: 0 }}>
            <span className="font-light text-white" style={{ fontSize: mobile ? "1.3rem" : "2rem", letterSpacing: ".02em", background: "transparent", lineHeight: 1.13 }}>
              {post.title}
            </span>
            <button
              onClick={onClose}
              className="text-white text-3xl hover:bg-white/10 transition-colors"
              style={{ background: "none", border: "none", borderRadius: 0, padding: ".28em .7em", marginRight: -8, marginTop: -8 }}
              aria-label="Close"
            >
              ×
            </button>
          </div>
          <div className="flex flex-wrap gap-1 mb-2" style={{ borderRadius: 0 }}>
            {post.tags &&
              post.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 text-white/90 font-semibold text-xs"
                  style={{ background: "rgba(255,255,255,0.06)", borderRadius: 0 }}
                >
                  #{tag}
                </span>
              ))}
          </div>
          <div className="flex items-center gap-4 mb-4">
            <button
              className={`flex items-center gap-1 transition-all px-2 py-1 ${liked ? "bg-pink-700/20" : "bg-white/10"}`}
              style={{ outline: "none", border: "none", background: "none", borderRadius: 0 }}
              onClick={handleLike}
              tabIndex={0}
            >
              <HeartIcon filled={liked} size={22} />
              <span className={`font-bold ${liked ? "text-pink-400" : "text-white/90"}`}>
                {likeCount + (liked ? 1 : 0)}
              </span>
            </button>
            <span className="flex items-center gap-1 text-blue-300 font-semibold text-base">
              <CommentIcon />
              {commentCount + myComments.length}
            </span>
          </div>
          <div className="mb-3 text-white/80">{post.description}</div>
          <div
            style={{
              flex: 1,
              minHeight: 0,
              overflowY: "auto",
              background: "transparent",
              marginBottom: 16,
              paddingRight: 2,
            }}
          >
            <h3 className="mb-1 text-white/70 text-base font-semibold" style={{ background: "transparent" }}>
              Comments
            </h3>

            {/*<ul style={{ margin: 0, padding: 0 }}>
              {myComments.map((c, idx) => (
                <li key={idx} style={{ listStyle: "none" }}>
                  <span className="text-white/90 text-base">{c.text}</span>
                </li>
              ))}
              {comments.map((c, idx) => (
                <li key={idx} style={{ listStyle: "none" }}>
                  <span className="text-white/90 text-base">{c.text}</span>
                </li>
              ))}
              {(!comments.length && !myComments.length) && (
                <div className="text-xs text-white/60">No comments yet.</div>
              )}
            </ul>*/}

            <ul style={{ margin: 0, padding: 0 }}>
              {myComments.map((c, idx) => (
                <li
                  key={`mycomment-${idx}`}
                  style={{
                    listStyle: "none",
                    marginBottom: 8,
                    background: "rgba(64,148,255,0.19)",
                    borderRadius: 8,
                    border: "1px solid rgba(100,180,255,0.18)",
                    padding: "7px 16px",
                    color: "#fff",
                    fontWeight: 500,
                    fontSize: "1.05rem",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <span style={{ color: "#5bf", fontWeight: 700, marginRight: 8 }}>You:</span>
                  <span>{c.text}</span>
                </li>
              ))}
              {comments.map((c, idx) => (
                <li
                  key={`comment-${idx}`}
                  style={{
                    listStyle: "none",
                    marginBottom: 8,
                    background: "rgba(255,255,255,0.06)",
                    borderRadius: 8,
                    border: "1px solid rgba(255,255,255,0.12)",
                    padding: "7px 16px",
                    color: "#fff",
                    fontWeight: 500,
                    fontSize: "1.05rem",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <span style={{ color: "#eee", fontWeight: 700, marginRight: 8 }}>💬:</span>
                  <span>{c.text}</span>
                </li>
              ))}
              {(!comments.length && !myComments.length) && (
                <div className="text-xs text-white/60">No comments yet.</div>
              )}
            </ul>
          </div>
          <div className="w-full flex gap-2 items-center pt-2 border-t border-white/10 bg-transparent" style={{ flex: "none" }}>
            <input
              type="text"
              value={commentInput}
              onChange={e => setCommentInput(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 bg-transparent border border-white/10 rounded-none text-white/90 px-4 py-2 focus:outline-none"
              style={{ background: "rgba(24, 26, 27, 0.28)", borderRadius: 0 }}
              onKeyDown={e => { if (e.key === "Enter") handleSend(); }}
            />
            <button
              onClick={handleSend}
              className="p-2 rounded-none bg-white/10 hover:bg-white/20 transition-colors"
              style={{ borderRadius: 0, background: "none" }}
              aria-label="Send"
              tabIndex={0}
            >
              <svg width={22} height={22} fill="none" viewBox="0 0 24 24" stroke="#39f" strokeWidth="2">
                <path d="M22 2L11 13" />
                <path d="M22 2L15 22L11 13L2 9L22 2Z" />
              </svg>
            </button>
          </div>
          <div className="text-right text-xs text-white/50 bg-transparent">{post.date}</div>
        </div>
      </div>
    </div>
  );
};

export default ModalPost;
