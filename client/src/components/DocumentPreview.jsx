/** @jsx jsx */
import { jsx } from "theme-ui";
import { Modal, Image, Header, Icon } from "semantic-ui-react";

const PreviewModal = ({ open, setClosed, src }) => {
  if (!src) {
    setClosed();
  }

  return (
    <Modal
      basic
      closeIcon
      onClose={() => setClosed(false)}
      open={open}
      size="small"
    >
      <Image src={src} fluid />
    </Modal>
  );
};

export default PreviewModal;
