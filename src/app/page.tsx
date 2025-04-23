'use client'
import Board from "@/components/board";
import React from "react";

export default function Home() {
  const [message, setMessage] = React.useState<string>("");

  return (
    <>
    <Board setMessage={setMessage}></Board>
    <div id="buttonsAndMessage">
      <input id="restartGame" type="button" value="Reset" onClick={() => window.location.reload()} />
      <label id="message">{message}</label>
    </div>
    </>
  );
}
