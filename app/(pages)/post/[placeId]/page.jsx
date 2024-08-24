"use client";
import { useGlobal } from "@/context/postContext";
import dynamic from "next/dynamic";
import React, { useEffect } from "react";
const Editor = dynamic(() => import("../Editor"), { ssr: false });

export default function Post({ params }) {
  const placeId = params.placeId;

  const { posts, setValue } = useGlobal();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/post/getPosts?placeId=${placeId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch post");
        }
        const data = await response.json();
        setValue({ posts: data?.posts });
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    }
    fetchData();
  }, [placeId]);

  const handleDeletePost = async (id) => {
    console.log("idoo", id);
    try {
      const response = await fetch(`/api/post/deletePost?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        console.error("Failed to delete post");
        return;
      }
      setValue((prevState) => ({
        ...prevState,
        posts: prevState.posts.filter((post) => post?.id !== id),
      }));
    } catch (error) {
      console.log("Failed to delete post", error);
    }
  };
  console.log("pooo", posts);
  return (
    <div className="bg-slate-300 w-full flex flex-col">
      <div className="bg-blue-400 h-56 flex flex-row space-x-3">
        {Array.isArray(posts) && posts.length > 0 ? (
          posts?.map((post) => (
            <div
              className="bg-purple-500 h-10"
              key={post?.id}
              onClick={() => handleDeletePost(post?.id)}
            >
              <p>{post?.title}</p>
            </div>
          ))
        ) : (
          <p>No post</p>
        )}
      </div>
      {/*  <h1>Post Editor</h1>
      <Editor placeId={placeId} posts={posts} setValue={setValue} /> */}
    </div>
  );
}
