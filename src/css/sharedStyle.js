import { css } from "styled-components";

//resultBlock__select
export const reservedSelectItemStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  margin: 0 auto;

  .resultBlock__select__item {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 3rem;
    width: 100%;
    margin: 0 auto 1rem auto;
    font-size: inherit;
    border-radius: var(--border-radius-15);
    border: 1px solid var(--main-dark);
    background-color: var(--main-bg);
  }

  .resultBlock__select__select {
    padding-left: 1.8rem;
    text-align: left;
    text-align-last: left;
  }
  .resultBlock__select__select:focus {
    outline-color: var(--main-dark);
  }

  .resultBlock__select__item__label {
    width: 20%;
    min-width: 8rem;
    padding-left: 2rem;
  }

  .resultBlock__select__item__value {
    word-break: break-all;
  }

  .resultBlock__select__item__content {
    width: 80%;
  }

  @media screen and (max-width: 1000px) {
    flex-direction: column;
    width: 100%;

    .resultBlock__select__item {
      width: 100%;
      margin: 0;
      margin-bottom: 0.5rem;
      flex-direction: column;
      text-align: center;
      justify-content: center;
    }

    .resultBlock__select__item__label {
      width: 100%;
      min-width: fit-content;
      text-align: center;
      padding: 0;
    }
    .resultBlock__select__select {
      flex-direction: row;
      padding-left: 1rem;
      text-align: center;
      text-align-last: center;
    }
  }
`;
