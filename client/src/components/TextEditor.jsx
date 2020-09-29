import React, { useState } from "react";
import { Button, Icon, Modal } from "semantic-ui-react";
import { Editor } from "@tinymce/tinymce-react";

export default function TextEditor() {
  const [open, setOpen] = useState(false);

  const handleChange = (content, editor) => {
    console.log("Content was updated:", content);
  };

  return (
    <Modal
      basic
      closeOnDimmerClick={false}
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
          skin: "oxide-dark",
          branding: false,
          statusbar: false,
          height: 600,
          menubar: false,
          plugins: [
            "advlist autolink lists link image charmap preview code fullscreen media table paste codesample",
          ],
          toolbar:
            "undo redo | formatselect | bold italic underline | link codesample code | alignleft aligncenter" +
            "alignright alignjustify | bullist numlist ",
        }}
        onEditorChange={handleChange}
      />
      <Modal.Actions>
        <Button basic color="red" onClick={() => setOpen(false)}>
          <Icon name="remove" /> Cancel
        </Button>
        <Button color="green" onClick={() => setOpen(false)}>
          <Icon name="checkmark" /> Save
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
