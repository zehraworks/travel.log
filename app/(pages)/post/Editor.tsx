"use client";

import React, { useRef, useEffect, useState, FormEvent } from "react";
import EditorJS, { ToolConstructable } from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Embed from "@editorjs/embed";
import Paragraph from "@editorjs/paragraph";

// Define types for props
interface EditorProps {
  placeId: string;
  posts: Array<{ id: string; title: string; content: any }>;
  setValue: (data: {
    posts: Array<{ id: string; title: string; content: any }>;
  }) => void;
}

export default function Editor({ placeId, posts, setValue }: EditorProps) {
  const ejInstance = useRef<EditorJS | null>(null);
  const [editorData, setEditorData] = useState<any>(null);

  useEffect(() => {
    if (!ejInstance.current) {
      initEditor();
      ejInstance.current = new EditorJS();
    }
  }, []);

  const initEditor = () => {
    const editor = new EditorJS({
      holder: "editorjs",
      onReady: () => {
        ejInstance.current = editor;
      },
      autofocus: true,
      onChange: async () => {
        if (ejInstance.current) {
          const content = await ejInstance.current.save();
          console.log("Editor content:", content);
          setEditorData(content);
        }
      },
      tools: {
        header: {
          class: Header as unknown as ToolConstructable,
          config: {
            placeholder: "Enter a header",
            levels: [1, 2, 3, 4, 5],
            defaultLevel: 2,
          },
        },
        paragraph: {
          class: Paragraph as unknown as ToolConstructable,
        },
        list: {
          class: List as unknown as ToolConstructable,
          inlineToolbar: true,
          shortcut: "CMD+SHIFT+L",
          sanitize: {
            ul: {},
            ol: {},
            li: {},
          },
        },
        embed: Embed as unknown as ToolConstructable,
      },
    });
    ejInstance.current = editor;
  };

  const handleSavePost = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!placeId) {
      console.error("Place ID is not available");
      return;
    }

    if (!editorData) {
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
          title: "My New Post 22",
          content: editorData,
          pinnedLocationId: placeId,
        }),
      });

      if (!res.ok) {
        console.error("Failed to save the post");
      } else {
        const newPost = await res.json();
        setValue({ posts: [...posts, newPost] });

        if (ejInstance.current) {
          ejInstance.current.clear();
        }

        setEditorData(null);
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

      if (!response.ok) {
        console.error("Failed to delete post");
        return;
      }
    } catch (err) {
      console.log("Error deleting the post", err);
    }
  };

  return (
    <div>
      <div id="editorjs"></div>
      <button onClick={(e) => handleSavePost(e)}>Save Post</button>
      <button
        className="bg-red-600"
        onClick={() => handleDeletePost("some-id")}
      >
        Delete Post
      </button>
    </div>
  );
}
