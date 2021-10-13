import React from "react";

const Modal = ({ message, show, setShow }) => {
    
  const handleClose = () => {
    setShow(false);
  };
  return (
    show && (
      <div className="fixed top-10 right-10 z-10">
        <div className="bg-gray-300 rounded-xl text-center shadow-xl text-xl p-4">
          <p className="m-4">{message}</p>
          <button
            onClick={handleClose}
            className="bg-gray-900 text-white px-4 py-2 mx-4 text-2xl rounded-xl transition duration-500 transform hover:bg-gray-300 hover:text-black"
          >
            Okay
          </button>
          <button
            onClick={handleClose}
            className="bg-gray-900 text-white px-4 py-2 mx-4 text-2xl rounded-xl transition duration-500 transform hover:bg-gray-300 hover:text-black"
          >
            Close
          </button>
        </div>
      </div>
    )
  );
};

Modal.defaultProps = {
  message: "Modal",
};

export default Modal;
