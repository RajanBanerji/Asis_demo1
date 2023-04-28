import { useEffect, useState } from "react";
import { customDatasArr } from "./CustomDataValues";
import "./style.css";

const CustomDatas = ({ selectedInfo, setSelectedInfo, customDatas, handleChangeCustomData }) => {
  // const [customDatas, setCustomData] = useState(customDatasArr);

  // const handleChange = (e) => {
  //   const { value, checked } = e.target;
  //   const tempArr = customDatas.map((obj) =>
  //     obj.id === value ? { ...obj, checked: checked } : obj
  //   );
  //   setCustomData(tempArr);
  // };

  // const checkDivContent = (strId) => {
  //   if (strId !== "" && strId != undefined) {
  //     document.getElementById("check_" + strId).checked =
  //       !document.getElementById("check_" + strId).checked;
  //   }
  // };

  return (
    <div className="check-box-section-list">
      <label className="document-type-container-title">
        Please choose data types?
      </label>

      {customDatas.map((item, index) => {
        return (
          <div className="form-check-container-list" key={index}>
            <input
              className="form-check-input"
              type="checkbox"
              id={"check_" + item.id}
              name={item.name}
              value={item.id}
              onChange={handleChangeCustomData}
              checked={item.checked}
            />
            <label htmlFor={"check_" + item.id}>{item.name}</label>
          </div>
        );
      })}
    </div>
  );
};

export default CustomDatas;
