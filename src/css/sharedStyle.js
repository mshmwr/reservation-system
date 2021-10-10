import { css } from "styled-components";
export const reservedSelectItemStyle = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 80%;
    margin: 0 auto;


    @media screen and (max-width: 1000px) {
        flex-direction: row;
        width: 75%;
    }

    .resultBlock__select__item {
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 3rem;
        width: 100%;
        background-color: var(--main-normal);
        margin: 0 auto 1rem auto;
        font-size: inherit;
        border-radius: var(--border-radius-15);
    }

    .resultBlock__select__select {
        padding-left: 1.4rem;
    }


    .resultBlock__select__item__label {
        width: 20%;
        min-width: 8rem;
        padding-left: 2rem;
    }

    .resultBlock__select__item__value{
        word-break: break-all;
    }

    .resultBlock__select__item__content {
        width: 80%;
    }

    @media screen and (max-width: 1000px) {
        .resultBlock__select__item{
            width: 100%;
            margin:0;
        }

        .resultBlock__select__item__label{
            width: 100%;
            min-width: fit-content;
            text-align: right;
            padding:0 0.5rem 0 0;
        }

    }


    @media screen and (max-width: 600px) {
    
        .resultBlock__select__item{
        flex-direction: column;
        text-align: center;
        justify-content: center;
        }
        .resultBlock__select__item__label{
        text-align: center;
        }
    }
`