import { dataTypeOptions } from "./dataTypesOptions";
import "./style.css";
const DocumentTypes = ({ selectedInfo, setSelectedInfo }) => {
  
  const handleChange = (optionValue) => {
    const strSelectedValue = { ...selectedInfo };
    strSelectedValue.document_types = optionValue;
    setSelectedInfo(strSelectedValue);
  };

  return (
    <div className="document-type-container">
      <label className="document-type-container-title">
        What kind of Document is this?
      </label>
      <div className="check-box-section">
        {
          dataTypeOptions.map((item, index) =>
          {
            return(
              <div className="form-check-container" key={index}>
          <input
            type="radio"
            className="form-check-input"
            id={item.id}
            name="optradio"
            value={item.value}
            checked={selectedInfo.document_types === item.value}
            onChange={() => handleChange(item.value)}
          />
          <label className="form-check-label" htmlFor={item.id}>
           {item.value}
          </label>
        </div>
            )
          })
        }
      </div>
    </div>
  );
};

export default DocumentTypes;
