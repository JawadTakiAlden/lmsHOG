import React from "react";
import ActivationCodeGenerateForm from "./ActivationCodeGenerateForm";
import FileRenderer from "./FilesRenderer";

const ActivationCode = () => {
  return (
    <>
      <ActivationCodeGenerateForm />
      <FileRenderer />
    </>
  );
};

export default ActivationCode;
