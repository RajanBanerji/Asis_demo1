import { useState } from "react";
import CustomDatas from "./CustomDatas/CustomDatas";
import { customDatasArr } from "./CustomDatas/CustomDataValues";
import "./style.css";
const DataPoints = ({ selectedInfo, setSelectedInfo }) => {
  const [customDataShow , setcustomDataShow] = useState(false)

  const [customDatas, setCustomData] = useState(customDatasArr);

  const handleChangeCustomData = (e) => {
    const { value, checked } = e.target;
    const selectedData = []
    const tempArr = customDatas.map((obj) =>
      obj.id === value ? { ...obj, checked: checked } : obj
    );
    setCustomData(tempArr);
    tempArr.forEach(element => {
      if (element.checked === true)
      {
        selectedData.push(element);
      }
    });
    const strSelectedValue = { ...selectedInfo };
    strSelectedValue.customDataArray = selectedData;
    setSelectedInfo(strSelectedValue);
  };

  const handleChange = (optionValue) => {
    const strSelectedValue = { ...selectedInfo };
    strSelectedValue.data_points = optionValue;
    setSelectedInfo(strSelectedValue);
    setcustomDataShow(optionValue === 'Custom Data')
    if(optionValue === 'All data points')
    {
      strSelectedValue.customDataArray = [];
    setSelectedInfo(strSelectedValue);
    }
  };


  return (
    <div className="document-type-container">
      <label className="document-type-container-title">
      What data types do you need?
      </label>
      <div className="check-box-section">
        <div className="form-check-container">
          <input
            type="radio"
            className="form-check-input"
            id="radio1"
            name="optradio"
            value="All data points"
            checked = {selectedInfo.data_points === "All data points"}
            onChange={() => handleChange("All data points")}
          />
          <label className="form-check-label" htmlFor="radio1">
          All data points
          </label>
        </div>
        {/* <div className="form-check-container">
          <input
            type="radio"
            className="form-check-input"
            id="radio2"
            name="optradio"
            value="Custom Data"
            onChange={() => handleChange("Custom Data")}
          />
          <label className="form-check-label" htmlFor="radio2">
          Custom Data
          </label>
        </div> */}
      </div>
      {/* {customDataShow ? <CustomDatas customDatas={customDatas} handleChangeCustomData={handleChangeCustomData}/> : null} */}
    </div>
  );
};

export default DataPoints;
