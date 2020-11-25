import React from "react";
import FlashMessage from 'react-flash-message';

export default function ErrorMessage(props) {
  const { error, delay } = props;
  const { errMessage } = error;

  return (
    <FlashMessage duration={delay}>
      <div className="alert alert-danger" role="alert" >
        <span><strong>Uh oh!</strong> {errMessage}</span>
      </ div>
    </FlashMessage>

  );
}