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

function App() {
  const messageCollectionReference = collection(db, "messages");

  const [messages, setMessages] = useState(Array<Message>());

  const formElementRef = useRef<HTMLFormElement>(null);

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
      reacts: {
        disliked: 0,
        liked: 0,
        loved: 0,
        questioned: 0,
        emphasized: 0,
      },
    };

    const docRef = await addDoc(messageCollectionReference, newMessage);

    newMessage.id = docRef.id;

    if (formElementRef.current) {
      formElementRef.current.reset();
    }

    setMessages([...messages, newMessage]);
  };

  const updateMessage = async (updatedMessage: Message, dislikes: number) => {
    const userDoc = doc(db, "messages", updatedMessage.id);
    await updateDoc(userDoc, { reacts: { disliked: dislikes + 1 } });

    const updatedMessages = messages.map((message) => {
      if (message.id === updatedMessage.id) {
        return {
          ...message,
          reacts: { ...message.reacts, disliked: dislikes + 1 },
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

      setMessages(
        data.docs.map((doc) => ({ ...doc.data(), id: doc.id } as Message))
      );
    };

    getMessages();
  });

  return (
    <Layout>
      {messages.map((message) => {
        return (
          <MessageItem
            key={nanoid()}
            updateMessage={updateMessage}
            message={message}
          />
        );
      })}

      <AddMessageForm
        formElementRef={formElementRef}
        createMessage={createMessage}
      />
    </Layout>
  );
}

export default App;
