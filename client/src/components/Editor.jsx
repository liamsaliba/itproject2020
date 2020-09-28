import React, { useState } from "react";
// import CKEditor from "@ckeditor/ckeditor5-react";
// import ReactHTMLParser from "react-html-parser";
import { Button, Modal } from "semantic-ui-react";
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
      trigger={<Button>Show Modal</Button>}
    >
      <Editor
        initialValue="<p>This is the initial content of the editor</p>"
        apiKey="n5ht6rb15nn13oiatqpzcgq6s67wressz3ux6hme9kp6dbht"
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar:
            "undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help",
        }}
        onEditorChange={handleChange}
      />
    </Modal>
  );
}
