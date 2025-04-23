'use client'
import { getImage, getText, getClassName } from "@/lib/card";
import { cardProps } from "@/types/cardProps";
import React from "react";

export default function Card(props: cardProps) {
  const [image, setImage] = React.useState<string>(getImage(props));
  React.useEffect(() => setImage(getImage(props)), [props]);
  const [text, setText] = React.useState<string>("");
  React.useEffect(() => setText(getText(props)), [props]);

  return (
  <div className={getClassName(props)} style={{ backgroundImage: image }}
    onClick={() => props.onClick({value: props.value, suit: props.suit})}>
      {text}
  </div>
  );
}
