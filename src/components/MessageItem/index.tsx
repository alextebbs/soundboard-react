import { MessageItemProps, Author } from "../../types";
import s from "./style.module.scss";

const MessageItem: React.FC<MessageItemProps> = (props: MessageItemProps) => {
  const playAudio = (url: any) => {
    var audio = new Audio(url);
    audio.play();
  };

  return (
    <div data-author={props.message.author} className={s.message}>
      <div className={s.avatar}>
        <img
          src={process.env.PUBLIC_URL + `/avatars/${props.message.author}.jpg`}
          alt={Author[props.message.author.toString() as keyof typeof Author]}
        />
      </div>

      <div className={s.author}>
        {Author[props.message.author.toString() as keyof typeof Author]}
      </div>

      {props.message.type === "text" && (
        <div className={s.bubble}>
          <div>{props.message.text}</div>
        </div>
      )}

      {props.message.type === "audio" && (
        <div
          onClick={() => playAudio(props.message.fileRef)}
          className={`${s.bubble} ${s.isPlayable}`}
        >
          <div>{props.message.text}</div>
        </div>
      )}

      {props.message.type === "photo" && (
        <div className={s.photo}>
          <img
            src={props.message.fileRef}
            alt={
              "Image By" +
              Author[props.message.author.toString() as keyof typeof Author]
            }
          />
        </div>
      )}
    </div>
  );
};

export default MessageItem;
