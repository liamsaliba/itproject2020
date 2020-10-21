import React, { useState } from "react";
import { Modal } from "semantic-ui-react";
import { Editor } from "@tinymce/tinymce-react";
import ReactHTMLParser from "react-html-parser";

export default function TextEditor({ editing, contents, id, media }) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState(contents.text || "");

  const handleChange = (content, editor) => {
    setText(content);
    // console.log("Content was updated:", setText(content));
  };

  return (
    <Modal
      size="large"
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open ? editing : false}
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
