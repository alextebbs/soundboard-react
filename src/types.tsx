import { RefObject } from "react";

export type MessageType = "text" | "audio" | "photo" | "video";

export enum Author {
  aaronH = "Aaron H.",
  alex = "Alex T.",
  aaron = "Aaron",
  james = "James",
  brady = "Brady",
  david = "David",
  patrick = "Patrick",
  ian = "Ian",
  allen = "Allen",
  landon = "Landon",
  harrison = "Harrison",
  joeJ = "Joe J.",
  mack = "Mack",
  levi = "Levi",
  ryanS = "Ryan",
  ray = "Ray",
  eli = "Eli",
  zack = "Zack",
  conor = "Connor",
  nick = "Nick",
}

export interface Message {
  id: string;
  author: Author;
  type: MessageType;
  date: Date;
  reacts: {
    disliked: number;
    liked: number;
    loved: number;
    questioned: number;
    emphasized: number;
    laughedat: number;
  };
  text?: string;
  fileRef?: string;
}

export interface MessageItemProps {
  message: Message;
  addReact: Function;
}

export interface AddMessageFormProps {
  formElementRef: RefObject<HTMLFormElement>;
  authorInputRef: RefObject<HTMLSelectElement>;
  textInputRef: RefObject<HTMLTextAreaElement>;
  fileInputRef: RefObject<HTMLInputElement>;
  createMessage: Function;
}
