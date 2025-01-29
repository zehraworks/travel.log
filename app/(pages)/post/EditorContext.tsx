"use client";

import React, { useRef, createContext, useEffect } from "react";
import EditorJS, { ToolConstructable } from "@editorjs/editorjs";

import Paragraph from "@editorjs/paragraph";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Embed from "@editorjs/embed";
import Checklist from "@editorjs/checklist";
import Marker from "@editorjs/marker";
import ColorPlugin from "editorjs-text-color-plugin";
import AlignmentBlockTune from "editorjs-text-alignment-blocktune";

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
        // textAlignment: {
        //   class: AlignmentBlockTune as unknown as ToolConstructable,
        //   config: {
        //     default: "left",
        //     blocks: {
        //       header: "center",
        //     },
        //   },
        // },
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
          class: Checklist as unknown as ToolConstructable,
          config: {
            placeholder: "Add a checklist item",
          },
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
        Color: {
          class: ColorPlugin as unknown as ToolConstructable,
          config: {
            colorCollections: [
              "#EC7878",
              "#9C27B0",
              "#673AB7",
              "#3F51B5",
              "#0070FF",
              "#03A9F4",
              "#00BCD4",
              "#4CAF50",
              "#8BC34A",
              "#CDDC39",
              "#FFF",
            ],
            type: "text",
            defaultColor: "#FF1300",
            customPicker: true,
          },
        },
      },
    });

    editorInstanceRef.current = editor;
  };

  useEffect(() => {
    if (!editorInstanceRef.current) {
      initEditor();
    }

    return () => {
      if (
        editorInstanceRef.current &&
        typeof editorInstanceRef.current.destroy === "function"
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
