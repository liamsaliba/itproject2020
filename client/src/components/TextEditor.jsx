import React, { useState } from "react";
import { Modal } from "semantic-ui-react";
import { Editor } from "@tinymce/tinymce-react";
import ReactHTMLParser from "react-html-parser";

const defaultText =
  "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate \
nisi quibusdam saepe. Commodi temporibus, atque rem unde vel, \
voluptatem tempore quisquam fugit exercitationem voluptates sint. \
Porro temporibus quisquam eveniet molestiae.";

export default function TextEditor() {
  const [open, setOpen] = useState(false);

  const [text, setText] = useState(defaultText);

  const handleChange = (content, editor) => {
    console.log("Content was updated:", setText(content));
  };

  return (
    <Modal
      basic
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size="FullScreen"
      trigger={<p>{ReactHTMLParser(text)}</p>}
    >
      <Editor
        initialValue={`${text}`}
        apiKey="n5ht6rb15nn13oiatqpzcgq6s67wressz3ux6hme9kp6dbht"
        init={{
          skin: "oxide-dark",
          branding: false,
          statusbar: false,
          height: 600,
          menubar: false,
          outputFormat: "text",
          plugins: [
            "advlist autolink lists link image charmap preview code fullscreen media table paste codesample",
          ],
          toolbar:
            "undo redo | formatselect | bold italic underline | link codesample code | " +
            "alignleft aligncenter alignright alignjustify | bullist numlist ",
        }}
        onEditorChange={handleChange}
      />
    </Modal>
  );
}
