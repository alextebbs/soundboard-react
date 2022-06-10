import { RefObject } from "react";

export type MessageType = "text" | "audio" | "photo";

export enum Author {
  other = "None",
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
  joe = "Doctor Joe",
  levi = "Levi Starbird",
  ryan = "Spiritual Ryan",
  ray = "Ray",
  chrisV = "CV",
  chrisL = "Landy",
  zack = "Zeech",
  johnny = "Boats",
  conor = "Connie",
  nick = "Tahoe Nick",
  sam = "Sammy 'Bagchaser' Bottles",
  john = "Johnny Safari",
  chuck = "Chuck C",
  kyle = "Graceland",
}

export interface Message {
  id: string;
  author: Author;
  type: MessageType;
  reacts: {
    disliked: number;
    liked: number;
    loved: number;
    questioned: number;
    emphasized: number;
  };
  text?: string;
  fileRef?: string;
}

export interface MessageItemProps {
  message: Message;
  updateMessage: Function;
}

export interface AddMessageFormProps {
  formElementRef: RefObject<HTMLFormElement>;
  createMessage: Function;
}
