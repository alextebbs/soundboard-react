import { AddMessageFormProps, MessageType, Author } from "../../types";
import { useState } from "react";
import { nanoid } from "nanoid";

const AddMessageForm: React.FC<AddMessageFormProps> = (
  props: AddMessageFormProps
) => {
  const [newType, setNewType] = useState<MessageType>("audio");
  const [newText, setNewText] = useState("");
  const [newAuthor, setNewAuthor] = useState<Author>("None" as Author);
  const [newFileUpload, setNewFileUpload] = useState<File>();

  const changeEditForm = (type: MessageType) => {
    setNewType(type);
  };

  return (
    <form ref={props.formElementRef} className="add">
      <select
        onChange={(e) => {
          changeEditForm(e.target.value as MessageType);
        }}
      >
        <option value="audio">Audio</option>
        <option value="photo">Photo</option>
        <option value="text">Message</option>
      </select>

      {(newType === "text" || newType === "audio") && (
        <div>
          <textarea
            placeholder="Message"
            value={newText}
            onChange={(event) => {
              setNewText(event.target.value);
            }}
          />
        </div>
      )}

      {(newType === "audio" || newType === "photo") && (
        <div>
          <input
            type="file"
            accept={newType === "audio" ? ".m4a, .caf" : ".jpg, .png"}
            onChange={(event) => {
              if (!event.target.files) return;
              setNewFileUpload(event.target.files[0]);
            }}
          />
        </div>
      )}

      <div>
        <select
          value={newAuthor}
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
      </div>

      <div>
        <button
          type="button"
          onClick={() =>
            props.createMessage(newType, newText, newAuthor, newFileUpload)
          }
        >
          Create
        </button>
      </div>
    </form>
  );
};

export default AddMessageForm;
