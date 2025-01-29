"use client";

import React, { useEffect, useContext, FormEvent } from "react";
import { EditorContext } from "./EditorContext";

interface EditorProps {
  placeId: string;
  posts: Array<{ id: string; title: string; content: any }>;
  setValue: (data: {
    posts: Array<{ id: string; title: string; content: any }>;
  }) => void;
}

export default function Editor({ placeId, posts, setValue }: EditorProps) {
  const { initEditor, editorInstanceRef } = useContext(EditorContext);

  useEffect(() => {
    if (!editorInstanceRef.current) {
      initEditor();
    }

    return () => {
      try {
        if (editorInstanceRef.current) {
          editorInstanceRef.current.destroy();
        }
      } catch (err) {
        console.error("Editor destroy error:", err);
      }
      editorInstanceRef.current = null;
    };
  }, []);

  const handleSavePost = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!editorInstanceRef.current) {
      console.error("Editor is not initialized");
      return;
    }

    const data = await editorInstanceRef.current.save();

    if (!placeId) {
      console.error("Place ID is not available");
      return;
    }

    if (!data) {
      console.error("Editor data is not available");
      return;
    }

    try {
      const res = await fetch("/api/post/createPost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "Yeni Post",
          content: data,
          pinnedLocationId: placeId,
        }),
      });

      if (!res.ok) {
        console.error("Failed to save the post");
      } else {
        const newPost = await res.json();
        setValue({ posts: [...posts, newPost] });

        if (editorInstanceRef.current) {
          editorInstanceRef.current.blocks.clear();
        }

        console.log("Post saved successfully");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDeletePost = async (id: string) => {
    try {
      const response = await fetch(`/api/post/deletePost?id=${id}`, {
        method: "DELETE",
      });

      setValue({ posts: posts.filter((post) => post.id !== id) });

      if (!response.ok) {
        console.error("Failed to delete post");
        return;
      }
    } catch (err) {
      console.error("Error deleting the post", err);
    }
  };

  return (
    <div>
      <div id="editorjs"></div>
      <button onClick={handleSavePost}>Save Post</button>
      <button
        className="bg-red-600"
        onClick={() => handleDeletePost("some-id")}
      >
        Delete Post
      </button>
    </div>
  );
}
