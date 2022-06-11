import "./global.css";

import { useState, useEffect, useRef } from "react";
import { db, storage } from "./firebase-config";
import {
  addDoc,
  collection,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { nanoid } from "nanoid";

import { Message, MessageType, Author } from "./types";
import MessageItem from "./components/MessageItem";
import AddMessageForm from "./components/AddMessageForm";
import Layout from "./components/Layout";
import arrayShuffle from "array-shuffle";

function App() {
  const messageCollectionReference = collection(db, "messages");

  const [messages, setMessages] = useState(Array<Message>());

  const formElementRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const authorInputRef = useRef<HTMLSelectElement>(null);
  const textInputRef = useRef<HTMLTextAreaElement>(null);

  const createMessage = async (
    newType: MessageType,
    newText: string,
    newAuthor: Author,
    newFileUpload: File
  ) => {
    let newFileDownloadURL = "";

    if (newFileUpload) {
      const newFileRef = ref(storage, `${newFileUpload.name + "-" + nanoid()}`);
      await uploadBytes(newFileRef, newFileUpload);
      newFileDownloadURL = await getDownloadURL(newFileRef);
    }

    let newMessage: Message = {
      id: "",
      text: newText,
      author: newAuthor as Author,
      type: newType,
      fileRef: newFileDownloadURL,
      date: new Date(),
      reacts: {
        disliked: 0,
        liked: 0,
        loved: 0,
        questioned: 0,
        emphasized: 0,
        laughedat: 0,
      },
    };

    const docRef = await addDoc(messageCollectionReference, newMessage);

    newMessage.id = docRef.id;

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    if (textInputRef.current) {
      textInputRef.current.value = "";
    }

    setMessages([...messages, newMessage]);
  };

  const addReact = async (updatedMessage: any, reactToEdit: string) => {
    const messageDoc = doc(db, "messages", updatedMessage.id);

    const currentReactValue = updatedMessage.reacts[reactToEdit];
    const updatedReacts = updatedMessage.reacts;
    updatedReacts[reactToEdit] = currentReactValue + 1;

    await updateDoc(messageDoc, { reacts: updatedReacts });

    const updatedMessages = messages.map((message) => {
      if (message.id === updatedMessage.id) {
        return {
          ...message,
          reacts: updatedReacts,
        };
      } else {
        return message;
      }
    });

    setMessages(updatedMessages);
  };

  useEffect(() => {
    const getMessages = async () => {
      const data = await getDocs(messageCollectionReference);
      const shuffled = arrayShuffle(
        data.docs.map((doc) => ({ ...doc.data(), id: doc.id } as Message))
      );

      setMessages(shuffled);
    };

    getMessages();
  }, []);

  return (
    <Layout>
      {messages.map((message) => {
        return (
          <MessageItem key={nanoid()} addReact={addReact} message={message} />
        );
      })}

      <AddMessageForm
        formElementRef={formElementRef}
        fileInputRef={fileInputRef}
        textInputRef={textInputRef}
        authorInputRef={authorInputRef}
        createMessage={createMessage}
      />
    </Layout>
  );
}

export default App;
