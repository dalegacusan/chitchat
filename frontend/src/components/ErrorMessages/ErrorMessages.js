import React from "react";
import ErrorMessage from './ErrorMessage/ErrorMessage';
import FlashMessage from 'react-flash-message';

export default function ErrorMessages(props) {
  const { errorMessages } = props;

  return (
    <div>
      {
        errorMessages.map((error, i) => {
          return (
            <FlashMessage key={i} duration="4000">
              <ErrorMessage error={error} />
            </FlashMessage>
          );
        })
      }
    </div>
  );
}