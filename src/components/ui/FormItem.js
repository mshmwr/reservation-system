import React from "react";
import styled from "styled-components";


const getBorderRadius = (props) => {
  console.log(props.borderRadius);
  if (props.borderRadius) {
    return props.borderRadius;
  }
  return "var(--border-radius)";
}

const MyFormItem = ({ className, formList, handleInputClick, handleChange, handleSubmit, needSubmitButton, isFirstInput, borderRadius }) => {

  return <form className={`${className} form`} onSubmit={handleSubmit}>
    {
      formList.map((inputItem) => (
        <div key={inputItem.label} className="form__item">
          <label className="form__item__label">{inputItem.label}</label>
          <input
            className={`form__item__input ${isFirstInput ? "" : "notFirstInInput"}`}
            onClick={handleInputClick}
            value={inputItem.value}
            type={inputItem.type}
            placeholder={inputItem.placeholder}
            minLength={inputItem.minLength}
            maxLength={inputItem.maxLength}
            size={inputItem.size}
            pattern={inputItem.pattern}
            required={inputItem.required}
            onChange={(e) => handleChange(inputItem, e.target.value)}
          />
          {needSubmitButton === true ? (
            <input className="common__submit" type="submit" value="新增"></input>
          ) : null}
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