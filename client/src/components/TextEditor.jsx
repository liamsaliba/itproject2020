import React, { useState } from "react";
// import CKEditor from "@ckeditor/ckeditor5-react";
// import ReactHTMLParser from "react-html-parser";
import { Modal } from "semantic-ui-react";
import { Editor } from "@tinymce/tinymce-react";

export default function TextEditor() {
  const [open, setOpen] = useState(false);

  const handleChange = (content, editor) => {
    console.log("Content was updated:", content);
  };

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size="FullScreen"
      trigger={
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate
          nisi quibusdam saepe. Commodi temporibus, atque rem unde vel,
          voluptatem tempore quisquam fugit exercitationem voluptates sint.
          Porro temporibus quisquam eveniet molestiae.
        </p>
      }
    >
      <Editor
        initialValue="<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate nisi quibusdam saepe. Commodi temporibus, atque rem unde vel, voluptatem tempore quisquam fugit exercitationem voluptates sint. Porro temporibus quisquam eveniet molestiae.</p>"
        apiKey="n5ht6rb15nn13oiatqpzcgq6s67wressz3ux6hme9kp6dbht"
        init={{
          height: 600,
          menubar: false,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount spellchecker",
          ],
          toolbar:
            "undo redo | formatselect | bold italic underline | link code | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist ",
        }}
        onEditorChange={handleChange}
      />
    </Modal>
  );
}
