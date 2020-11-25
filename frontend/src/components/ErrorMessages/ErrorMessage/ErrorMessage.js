import React from "react";

export default function ErrorMessage(props) {
  const { error } = props;
  const { errMessage } = error;

  return (
    <div className="alert alert-danger" role="alert" >
      <span><strong>Uh oh!</strong> {errMessage}</span>
    </ div>

  );
}