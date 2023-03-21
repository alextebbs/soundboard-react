import { AddMessageFormProps, MessageType, Author } from "../../types";
import React, { useState } from "react";
import { nanoid } from "nanoid";
import s from "./style.module.scss";

const AddMessageForm: React.FC<AddMessageFormProps> = (
  props: AddMessageFormProps
) => {
  const [newType, setNewType] = useState<MessageType>("audio");
  const [newText, setNewText] = useState("");
  const [newAuthor, setNewAuthor] = useState<Author>("other" as Author);
  const [newFileUpload, setNewFileUpload] = useState<File>();

  const changeEditForm = (type: MessageType) => {
    setNewType(type);
  };

  const checkFileSize = (event: any) => {
    if (event.target.files[0].size > 2097152) {
      alert("Filesize must be under 2MB");
      event.target.value = "";
    }
  };

  return (
    <div>
      <form
        ref={props.formElementRef}
        className={s.addForm}
        onSubmit={(e) => {
          e.preventDefault();
          props.createMessage(newType, newText, newAuthor, newFileUpload);
        }}
      >
        <h2>Add a new message</h2>

        <label>
          <div className={s.label}>Message Type</div>
          <select
            required
            value={newType}
            onChange={(e) => {
              changeEditForm(e.target.value as MessageType);
            }}
          >
            <option value="audio">Audio</option>
            <option value="photo">Photo</option>
            <option value="text">Text</option>
          </select>
          <div className={s.note}>Select audio, photo, or text</div>
        </label>

        {(newType === "audio" || newType === "photo") && (
          <label>
            <div className={s.fileInput}>
              <input
                required
                type="file"
                id="message_file"
                ref={props.fileInputRef}
                accept={newType === "audio" ? ".m4a" : ".jpg, .png"}
                onChange={(event) => {
                  if (!event.target.files) return;
                  checkFileSize(event);
                  setNewFileUpload(event.target.files[0]);
                }}
              />
            </div>
            <div className={s.note}>
              {newType === "audio" && (
                <>
                  Audio files must be in .m4a format
                  <br />
                  You can convert here:{" "}
                  <a href="https://cloudconvert.com/caf-to-m4a">
                    https://cloudconvert.com/caf-to-m4a
                  </a>
                </>
              )}
              {newType === "photo" && (
                <>Photos must be in .jpg or .png format</>
              )}
            </div>
          </label>
        )}

        {(newType === "text" || newType === "audio") && (
          <label>
            <div className={s.label}>Message Text</div>
            <textarea
              required
              placeholder="Message"
              id="message_text"
              ref={props.textInputRef}
              onChange={(event) => {
                setNewText(event.target.value);
              }}
            />
            <div className={s.note}>
              {newType === "audio" && (
                <>Add a description for this audio file</>
              )}
            </div>
          </label>
        )}

        <label>
          <div className={s.label}>Sent by</div>
          <select
            required
            value={newAuthor}
            id="message_author"
            ref={props.authorInputRef}
            onChange={(event) => {
              setNewAuthor(event.target.value as Author);
            }}
          >
            <option disabled>Select an Author</option>
            {Object.entries(Author).map((item) => {
              return (
                <option key={nanoid()} value={item[0]}>
                  {item[1]}
                </option>
              );
            })}
          </select>
          <div className={s.note}>
            Choose who this appears as the author of this message
          </div>
        </label>

        <div>
          <button type="submit">Send</button>
        </div>
      </form>

      <a
        className={s.githubLink}
        href="https://github.com/alextebbs/soundboard-react"
      >
        View code on GitHub
      </a>
    </div>
  );
};

export default AddMessageForm;
