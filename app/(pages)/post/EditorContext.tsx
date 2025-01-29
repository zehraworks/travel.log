"use client";

import React, { useRef, createContext, useEffect } from "react";
import EditorJS, { ToolConstructable } from "@editorjs/editorjs";

import Paragraph from "@editorjs/paragraph";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Embed from "@editorjs/embed";
import Checklist from "@editorjs/checklist";
import Marker from "@editorjs/marker";

export const EditorContext = createContext<any>(null);

function EditorContextProvider({ children }: { children: React.ReactNode }) {
  const editorInstanceRef = useRef<EditorJS | null>(null);

  const initEditor = () => {
    if (!document.getElementById("editorjs")) {
      console.error("EditorJS holder element is missing.");
      return;
    }

    if (editorInstanceRef.current) {
      console.log("EditorJS is already initialized.");
      return;
    }

    const editor = new EditorJS({
      holder: "editorjs",
      placeholder: "Let's start to write your memory",
      onReady: () => {
        editorInstanceRef.current = editor;
      },
      tools: {
        paragraph: {
          class: Paragraph as unknown as ToolConstructable,
        },
        header: {
          class: Header as unknown as ToolConstructable,
          inlineToolbar: true,
          config: {
            placeholder: "Enter a Header",
            levels: [1, 2, 3, 4, 5],
            defaultLevel: 2,
          },
        },
        list: {
          class: List as unknown as ToolConstructable,
          config: {
            defaultStyle: "unordered",
          },
        },
        checklist: {
          class: Checklist,
        },
        embed: {
          class: Embed as unknown as ToolConstructable,
          config: {
            services: {
              youtube: true,
              codepen: true,
            },
          },
        },
        Marker: {
          class: Marker,
        },
      },
    });

    editorInstanceRef.current = editor;
  };

  useEffect(() => {
    return () => {
      if (
        editorInstanceRef.current
      ) {
        editorInstanceRef.current.destroy();
      }
      editorInstanceRef.current = null;
    };
  }, []);

  return (
    <EditorContext.Provider value={{ initEditor, editorInstanceRef }}>
      {children}
    </EditorContext.Provider>
  );
}

export default EditorContextProvider;
