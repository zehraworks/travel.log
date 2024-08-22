"use client";
import React, { useRef, useEffect, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Embed from "@editorjs/embed";
import Paragraph from "@editorjs/paragraph";

/* import checklistUmd from "@editorjs/checklist";
import tableUmd from "@editorjs/table";
import markerUmd from "@editorjs/marker"; */

export default function Editor({ placeId }) {
  const ejInstance = useRef(null);
  const [editorData, setEditorData] = useState(null);

  useEffect(() => {
    if (ejInstance.current === null) {
      initEditor();
    }

    return () => {
      ejInstance?.current?.destroy();
      ejInstance.current = null;
    };
  }, []);

  const initEditor = () => {
    const editor = new EditorJS({
      holder: "editorjs",
      onReady: () => {
        ejInstance.current = editor;
        console.log("editoo", editor);
      },
      autofocus: true,
      onChange: async () => {
        const content = await editor.save();
        console.log("heyconn", content);
        setEditorData(content);
      },
      tools: {
        header: {
          class: Header,
          config: {
            placeholder: "Enter a header",
            levels: [1, 2, 3, 4, 5],
            defaultLevel: 2,
          },
        },
        paragraph: {
          class: Paragraph,
        },
        list: {
          class: List,
          inlineToolbar: true,
          shortcut: "CMD+SHIFT+L",
          sanitize: {
            tags: ["ul", "ol", "li"],
          },
        },
        embed: Embed,
        /*       checklist: {
          class: checklistUmd,
          inlineToolbar: true,
        },
        table: {
          class: tableUmd,
          inlineToolbar: true,
          shortcut: "CMD+ALT+T",
        },
        Marker: {
          class: markerUmd,
          shortcut: "CMD+SHIFT+M",
        }, */
        /*    image: ImageTool, */
      },
    });
    ejInstance.current = editor;
  };

  const handleSavePost = async (e) => {
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
          title: "My New Post",
          content: editorData,
          pinnedLocationId: placeId,
        }),
      });

      if (!res.ok) {
        console.error("Failed to save the post");
      } else {
        console.log("Post saved successfully");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDeletePost = async (id) => {
    try {
      const response = await fetch(`/api/post/deletePost?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        console.error("Failed to delete place");
        return;
      }
    } catch (err) {
      console.log("Error deleting the post", err);
    }
  };

  return (
    <div>
      <div id="editorjs"></div>;
      <button onClick={(e) => handleSavePost(e)}>Save Post</button>
      <button className="bg-red-600" onClick={() => handleDeletePost()}>
        Delete Post
      </button>
    </div>
  );
}
