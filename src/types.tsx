import { RefObject } from "react";

export type MessageType = "text" | "audio" | "photo";

export enum Author {
  other = "Christopher T.",
  aaronH = "Honk",
  alex = "Tebbo",
  aaron = "Sheet",
  james = "Hot Tub",
  brady = "Brody",
  david = "Docey",
  patrick = "PT Pure Heat",
  ian = "Shiplet Ian",
  allen = "ALLEB",
  landon = "Lembo",
  harrison = "Harrison",
  joeJ = "Doctor Joe",
  joe = "Jitsu Joe",
  mack = "Mack",
  levi = "Levi Starbird",
  ryanS = "Spiritual Ryan",
  ryanC = "Cookie Ryan",
  ray = "Ray",
  eli = "Eli Pussy",
  chrisV = "CV",
  ben = "Nurse Ben",
  chrisL = "Landy",
  zack = "Zeech",
  johnny = "Boats",
  conor = "Connie",
  nick = "Tahoe Nick",
  sam = "Sammy 'Bagchaser' Bottles",
  johnS = "Johnny Safari",
  johnH = "Hip Hop John",
  charles = "Chuck C",
  kyle = "Graceland",
  ryanM = "Murgs",
  tip = "Some Random Tip",
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
