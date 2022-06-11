import { MessageItemProps, Author } from "../../types";
import s from "./style.module.scss";
import { ReactComponent as Corner } from "./bubble-corner.svg";
import { useState, useEffect } from "react";
import useLongPress from "../../utils/useLongPress";
import { db } from "../../firebase-config";
import { updateDoc, doc } from "firebase/firestore";

import { ReactComponent as EmphasizedIcon } from "./icons/emphasized.svg";
import { ReactComponent as LikedIcon } from "./icons/liked.svg";
import { ReactComponent as DislikedIcon } from "./icons/disliked.svg";
import { ReactComponent as LovedIcon } from "./icons/loved.svg";
import { ReactComponent as QuestionedIcon } from "./icons/questioned.svg";
import { ReactComponent as LaughedAtIcon } from "./icons/laughedat.svg";

const MessageItem: React.FC<MessageItemProps> = (props: MessageItemProps) => {
  const [reactsActive, setReactsActive] = useState(false);
  const [reacts, setReactsState] = useState(() => {
    return props.message.reacts as any;
  });

  const setReacts = (reacts: Object) => {
    setReactsState(reacts);
    getMostPopular(reacts);
  };

  const [popular, setPopular] = useState<string>();

  const messageDoc = doc(db, "messages", props.message.id);

  const playAudio = (url: any) => {
    var audio = new Audio(url);
    audio.play();
  };

  const showReacts = () => {
    setReactsActive(true);
  };

  const showReactsLongPress = useLongPress(showReacts, 200);

  const addReact = async (reactToEdit: string) => {
    const currentReactValue = reacts[reactToEdit];

    const updatedReacts = Object.assign({}, reacts);

    updatedReacts[reactToEdit] = currentReactValue + 1;

    await updateDoc(messageDoc, { reacts: updatedReacts });

    setReacts(updatedReacts);
  };

  const getMostPopular = (reacts: any) => {
    if (!Object.values(reacts).some((x) => x)) return;

    const sorted = Object.keys(reacts).sort((a, b) => {
      return reacts[b] - reacts[a];
    });

    const mostPopular = sorted.slice(0, 1).toString();

    setPopular(mostPopular);
  };

  useEffect(() => {
    getMostPopular(reacts);
  }, []);

  return (
    <div
      data-reactsactive={reactsActive}
      data-author={props.message.author}
      data-id={props.message.id}
      className={s.message}
    >
      <div className={s.avatar}>
        <img
          src={process.env.PUBLIC_URL + `/avatars/${props.message.author}.jpg`}
          alt={Author[props.message.author.toString() as keyof typeof Author]}
        />
      </div>

      <div className={s.author}>
        {Author[props.message.author.toString() as keyof typeof Author]}
      </div>

      <div
        className={s.bubble}
        data-type={props.message.type}
        onClick={
          props.message.type === "audio"
            ? () => playAudio(props.message.fileRef)
            : undefined
        }
        {...showReactsLongPress}
      >
        {props.message.type === "text" && <>{props.message.text}</>}

        {props.message.type === "audio" && (
          <>
            <div className={s.playButton}></div>
            {props.message.text}
          </>
        )}

        {props.message.type === "photo" && (
          <img
            src={props.message.fileRef}
            alt={
              "Image By" +
              Author[props.message.author.toString() as keyof typeof Author]
            }
          />
        )}

        <div className={s.corner}>
          <Corner />
        </div>

        <div className={s.reactsActiveFlair}></div>

        {popular === "loved" && (
          <div className={s.popularReact} data-reactype="loved">
            <LovedIcon />
          </div>
        )}

        {popular === "liked" && (
          <div className={s.popularReact} data-reactype="liked">
            <LikedIcon />
          </div>
        )}

        {popular === "disliked" && (
          <div className={s.popularReact} data-reactype="disliked">
            <DislikedIcon />
          </div>
        )}

        {popular === "questioned" && (
          <div className={s.popularReact} data-reactype="questioned">
            <QuestionedIcon />
          </div>
        )}

        {popular === "emphasized" && (
          <div className={s.popularReact} data-reactype="emphasized">
            <EmphasizedIcon />
          </div>
        )}

        {popular === "laughedat" && (
          <div className={s.popularReact} data-reactype="laughedat">
            <LaughedAtIcon />
          </div>
        )}
      </div>

      <div className={s.reactsBubble}>
        <div className={s.react}>
          <div className={s.reactCircle} onClick={() => addReact("loved")}>
            <LovedIcon />
          </div>
          <div className={s.reactCount}>{reacts.loved}</div>
        </div>
        <div className={s.react}>
          <div className={s.reactCircle} onClick={() => addReact("liked")}>
            <LikedIcon />
          </div>
          <div className={s.reactCount}>{reacts.liked}</div>
        </div>
        <div className={s.react}>
          <div className={s.reactCircle} onClick={() => addReact("disliked")}>
            <DislikedIcon />
          </div>
          <div className={s.reactCount}>{reacts.disliked}</div>
        </div>
        <div className={s.react}>
          <div className={s.reactCircle} onClick={() => addReact("laughedat")}>
            <LaughedAtIcon />
          </div>
          <div className={s.reactCount}>{reacts.laughedat}</div>
        </div>
        <div className={s.react}>
          <div className={s.reactCircle} onClick={() => addReact("emphasized")}>
            <EmphasizedIcon />
          </div>
          <div className={s.reactCount}>{reacts.emphasized}</div>
        </div>
        <div className={s.react}>
          <div className={s.reactCircle} onClick={() => addReact("questioned")}>
            <QuestionedIcon />
          </div>
          <div className={s.reactCount}>{reacts.questioned}</div>
        </div>
      </div>
      {reactsActive && (
        <div
          onClick={() => setReactsActive(false)}
          className={s.reactsUnderlay}
        ></div>
      )}
    </div>
  );
};

export default MessageItem;
