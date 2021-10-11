import React from "react";
import styled from "styled-components";


const getBorderRadius = (props) => {
  if (props.borderRadius) {
    return props.borderRadius;
  }
  return "var(--border-radius)";
}

const getInputValue = (formListItem, formInputValue) => {
  let inputValue = "";
  Object.entries(formInputValue).forEach(([key, value]) => {
    if (formListItem.name === key) {
      inputValue = value;
    }
  })

  return inputValue;
}

const MyFormItem = ({ className, formList, formInputValue, handleInputClick, handleChange, isFirstInput, borderRadius }) => {
  return <form className={`${className} form`}>
    {
      formList.map((inputItem) => (
        <div key={inputItem.name} className="form__item">
          <label className="form__item__label">{inputItem.label}</label>
          <input
            className={`form__item__input ${isFirstInput ? "" : "notFirstInInput"}`}
            onClick={handleInputClick}
            value={getInputValue(inputItem, formInputValue)}
            type={inputItem.type}
            placeholder={inputItem.placeholder}
            minLength={inputItem.minLength}
            maxLength={inputItem.maxLength}
            size={inputItem.size}
            pattern={inputItem.pattern}
            required={inputItem.required}
            onChange={(e) => handleChange(inputItem, e.target.value)}
          />
        </div>
      ))
    }
  </form>
}

//className: "form"
const FormItem = styled(MyFormItem)`
  .form__item{
    margin: 0px auto 1rem auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .form__item__label {
    width: 30%;
    padding: 0.6rem 0.6rem;
  }

  .form__item__input {
    width: 70%;
    padding: 0.6rem 0.6rem;
    border-radius: ${getBorderRadius};
    border: 1px solid var(--main-dark);
  }
  
  .form__item:last-child{
    margin-bottom: 0;
  }

  .notFirstInInput:invalid {
    border: 1px var(--light-red) solid;
  }
  
`;

export default FormItem;