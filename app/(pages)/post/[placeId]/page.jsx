"use client";
import dynamic from "next/dynamic";
import React, { useEffect } from "react";
const Editor = dynamic(() => import("./Editor"), { ssr: false });

export default function Post({ params }) {
  useEffect(() => {}, [params]);

  const placeId = params.placeId;
  return (
    <div>
      <h1>Post Editor</h1>
      <Editor placeId={placeId} />
    </div>
  );
}
