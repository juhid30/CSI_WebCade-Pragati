import React from "react";
import PropTypes from "prop-types";

function Message({ message }) {
  if (!message) return null; // Handle the case when message is undefined

  return (
    <div className="p-2 mb-2 bg-gray-100 rounded-md shadow-sm">
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-500">{message}</span>
      </div>
    </div>
  );
}

Message.propTypes = {
  message: PropTypes.string.isRequired, // Adjust the type if needed
};

export default Message;
