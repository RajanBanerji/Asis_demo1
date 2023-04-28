import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { PDFPreview } from "./PDFPreview/PDFPreview";
import "./style.css";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 3,
  borderRadius: 2,
  borderColor: '#9cd17a',
  borderStyle: 'dashed',
  // backgroundColor: '#73bf452e',
  color: '#73bf45',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const focusedStyle = {
  borderColor: '#66ab3b'
};

const acceptStyle = {
  borderColor: '#66ab3b'
};

const rejectStyle = {
  borderColor: '#ff1744'
};
const UploadDocument = ({ selectedInfo, setSelectedInfo, setErrorMessage }) => {
  const [uploadedFile, setUploadedFile] = useState([]);
  const [show, setShow] = useState(false);
  const [dontShow, setdontShow] = useState(false);
  useEffect(() => {
    localStorage.getItem("donotShow") === "Yes" ? setShow(false) : setShow(true);
  }, []);

  const handleClose = () => setShow(false);
  const dontShowAgainChecked = (e) => setdontShow(e.target.checked);
  const acceptOnClick = () => {
    if (dontShow) {
      localStorage.setItem("donotShow", "Yes");
    }
    handleClose();
  };

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length) {
      const la_uploadedFiles = uploadedFile;
      for (let selectedFiles of acceptedFiles) {
        la_uploadedFiles.push(selectedFiles);
      }
      setUploadedFile(la_uploadedFiles);
      selectedInfo.uploaded_file = la_uploadedFiles;
      setSelectedInfo(selectedInfo);
      setErrorMessage("");
      console.log("acceptedFiles", acceptedFiles);
    }
  }, []);

  const { getRootProps, getInputProps, isFocused,
    isDragAccept,
    isDragReject } = useDropzone({
    accept: {
      // "image/*": [],
      "application/pdf": [".pdf"],
    },
    onDrop,
    multiple: false,
  });

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isFocused ? focusedStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isFocused,
    isDragAccept,
    isDragReject
  ]);

  const files = uploadedFile.map((file) => {
    return (
      <div className="preview-section" key={file.name}>
        {file.type === "application/pdf" ? (
          <div className="preview-pdf">
            <PDFPreview preview={file} />
          </div>
        ) : (
          <div className="preview-image">
            <img
              src={URL.createObjectURL(file)}
              onLoad={() => {
                URL.revokeObjectURL(URL.createObjectURL(file));
              }}
            />
          </div>
        )}
      </div>
    );
  });

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () =>
      files.forEach((file) =>
        file.type === "application/pdf"
          ? null
          : URL.revokeObjectURL(URL.createObjectURL(file))
      );
  }, []);

  return (
    <>
      <div className="document-type-container">
        <section className="">
          <div className="upload-document-container">
            <div {...getRootProps({style})}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
          </div>
          {uploadedFile.length > 0 ? (
            <aside className="uploaded-container">{files}</aside>
          ) : null}
        </section>
      </div>
      <Modal show={show} onHide={handleClose}>
        <header className="modal-confimr-header">
          <h5>Disclaimer</h5>
          <span onClick={handleClose}>
            <i className="fa fa-times" aria-hidden="true"></i>
          </span>
        </header>
        <Modal.Body>
          {/* <p>
            To get best quality output we recommend the input/source document
            resolution to be atleast 300 DPI. Please ensure Document is aligned
            correctly in potrait format. Processing time depends on number of
            pages, quality of input source document, your hardware
            Specifications & internet connectivity. Request you to be patient if
            either of the above factors are not optimal. We recommend you to
            close all background apps & refresh your cache before you start
            processing.
          </p> */}
          <ul>
            <li>To get best quality output we recommend the input/source document
            resolution to be atleast 300 DPI.
            </li>
            <li>
            Please ensure Document is aligned
            correctly in potrait format.
            </li>
            <li>
            Processing time depends on number of
            pages, quality of input source document, your hardware
            Specifications & internet connectivity.
            </li>
            <li>
            Request you to be patient if
            either of the above factors are not optimal.
            </li>
            <li>
            We recommend you to
            close all background apps & refresh your cache before you start
            processing.
            </li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <div className="modal-footer-container">
            <div className="check-container">
              <input
                className="form-check-input"
                type="checkbox"
                id="check1"
                name="check"
                value="dontShowAgain"
                onChange={dontShowAgainChecked}
                checked={dontShow}
              />
              <label htmlFor="check1">Don't show this msg again</label>
            </div>
            <button
              className="btn btn-common"
              variant="secondary"
              onClick={acceptOnClick}
            >
              Accept
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UploadDocument;
