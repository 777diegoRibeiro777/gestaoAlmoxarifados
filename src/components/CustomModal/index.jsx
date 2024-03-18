/* eslint-disable react/prop-types */
import ReactModal from "react-modal";

// eslint-disable-next-line react/prop-types
export default function CustomModal({
  isOpen,
  onRequestClose,
  title,
  content,
}) {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Example Modal"
      overlayClassName="modal-overlay"
      className="modal-content"
    >
      <h4 className="text-center textModal">{title}</h4>
      <hr />
      {content}
    </ReactModal>
  );
}
