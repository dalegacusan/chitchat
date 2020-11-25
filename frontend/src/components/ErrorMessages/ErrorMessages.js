import React from "react";
import ErrorMessage from './ErrorMessage/ErrorMessage';

export default function ErrorMessages(props) {
  const { errorMessages } = props;

  return (
    <div>
      {
        errorMessages.map((error, i) => {
          return (
            <ErrorMessage key={i} delay="5000" error={error} />
          );
        })
      }
    </div>
  );
}