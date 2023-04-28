import UplaodingDocView from "../View/UplaodingDocView";
import { useEffect, useState } from "react";
import UploadDocument from "../../../component/UploadDocument";
import CheckResults from "../../../component/CheckResults";
import DataPoints from "../../../component/DataPoints";
import DocumentTypes from "../../../component/DocumentTypes";
import Header from "../../../component/Header";

const UplaodingDocContainer = ({ setIsLoggedIn }) => {
  const [selectedInfo, setSelectedInfo] = useState({
    document_types: "",
    data_points: "",
    customDataArray: [],
    uploaded_file: [],
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    {
      title: "Document Types",
      componenet: (
        <DocumentTypes
          selectedInfo={selectedInfo}
          setSelectedInfo={setSelectedInfo}
        />
      ),
      onClick: (e) => {
        setActiveStep(0);
      },
    },
    {
      title: "Data Points",
      componenet: (
        <DataPoints
          selectedInfo={selectedInfo}
          setSelectedInfo={setSelectedInfo}
        />
      ),
      onClick: (e) => {
        setActiveStep(1);
      },
    },
    {
      title: "Upload Document",
      componenet: (
        <UploadDocument
          selectedInfo={selectedInfo}
          setSelectedInfo={setSelectedInfo}
          setErrorMessage={setErrorMessage}
        />
      ),
      onClick: (e) => {
        setActiveStep(2);
      },
    },
    {
      title: "Check Results",
      componenet: <CheckResults selectedInfo={selectedInfo} />,
      onClick: (e) => {
        setActiveStep(3);
      },
    },
  ];
  const onClickBack = () => {
    setActiveStep(activeStep - 1);
  }
  const onClickNext = () => {
    // setActiveStep(activeStep + 1);
    if (activeStep > 2) {
      setActiveStep(0);
    } else {
      if (selectedInfo.document_types !== "" && activeStep === 0) {
        setActiveStep(activeStep + 1);
        setErrorMessage("");
      } else if (selectedInfo.data_points !== "" && activeStep === 1) {
        setActiveStep(activeStep + 1);
        setErrorMessage("");
      } else if (selectedInfo.uploaded_file.length && activeStep === 2) {
        setActiveStep(activeStep + 1);
        setErrorMessage("");
      } else {
        if (activeStep === 0) {
          setErrorMessage("Please select any Document Type");
        } else if (activeStep === 1) {
          setErrorMessage("Please select any Data Points");
        } else if (activeStep === 2) {
          setErrorMessage("Please Upload atleast one File");
        }
      }
    }
  };
  useEffect(() => {
    setErrorMessage("");
  }, [selectedInfo]);
  return (
    <>
      <Header setIsLoggedIn={setIsLoggedIn}></Header>
      <UplaodingDocView
        steps={steps}
        activeStep={activeStep}
        onClickNext={onClickNext}
        errorMessage={errorMessage}
        onClickBack={onClickBack}
      ></UplaodingDocView>
    </>
  );
};

export default UplaodingDocContainer;
