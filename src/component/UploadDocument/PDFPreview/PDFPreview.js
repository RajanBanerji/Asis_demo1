/* import React, { useState } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import "./style.css";

const options = {
  cMapUrl: "cmaps/",
  cMapPacked: true,
  standardFontDataUrl: "standard_fonts/",
};

export const PDFPreview = ({ preview, setPreview }) => {
  const [file, setFile] = useState(preview);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  return (
    <div className="Example">
      <div className="Example__container">
       <div className="Example__container__document">
          <Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
            options={options}
          >
            <Page pageNumber={pageNumber}
            height={1054} />
          </Document>
          <div className="bottom_section">
            <button
              type="button"
              disabled={pageNumber <= 1}
              onClick={previousPage}
            >
              ‹
            </button>
            <span>
              {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
            </span>
            <button
              type="button"
              disabled={pageNumber >= numPages}
              onClick={nextPage}
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
 */

import React, { useCallback, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf/dist/esm/entry.webpack";
import "./style.css";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const options = {
  cMapUrl: "cmaps/",
  cMapPacked: true,
  standardFontDataUrl: "standard_fonts/",
};

export const PDFPreview = ({ preview, setPreview }) => {
  const [file, setFile] = useState(preview);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  function highlightPattern(text, pattern) {
    var str = text;
    pattern.forEach((p) => {
      str = str.replace(p, (value) => `<mark>${value}</mark>`);
    });
    return str;
    //return text.replace(pattern, (value) => `<mark>${value}</mark>`);
  }

  const arr = ['Closing', 'CHECK', 'PURCHASE'];

  //replace arr with dictionary 1D array
  const textRenderer = useCallback(
    (textItem) => highlightPattern(textItem.str, arr),
    []
  );


  return (
    <Document file={file}>
      <Page
        pageNumber={1}
        customTextRenderer={textRenderer}
      />
    </Document>
    // <div className="Example">
    //   <div className="Example__container">
    //     <div className="Example__container__document">
    //       <Document
    //         file={file}
    //         onLoadSuccess={onDocumentLoadSuccess}
    //         // options={options}
    //       >
    //         <Page pageNumber={pageNumber}
    //         customTextRenderer={textRenderer}
    //         height={1074} />
    //       </Document>
    //       <div className="bottom_section">
    //         <button
    //           type="button"
    //           disabled={pageNumber <= 1}
    //           onClick={previousPage}
    //         >
    //           ‹
    //         </button>
    //         <span>
    //           {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
    //         </span>
    //         <button
    //           type="button"
    //           disabled={pageNumber >= numPages}
    //           onClick={nextPage}
    //         >
    //           ›
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};


