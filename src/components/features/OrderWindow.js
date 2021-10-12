import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import CloseIcon from "../ui/CloseIcon";
import useOrderEnquiryAction from "../../action/ui/orderEnquiryAction"

const MyOrderWindow = ({ className }) => {
    //i18n
    const { t } = useTranslation();

    //redux
    const orderSearchResult = useSelector(state => state.orderEnquiryReducer.orderSearchResult);
    const showOrderWindow = useSelector(state => state.orderEnquiryReducer.showOrderWindow);
    const { setShowOrderWindow } = useOrderEnquiryAction();
    const closeWindowClickHandler = () => {
        setShowOrderWindow(false);
    };

    if (!showOrderWindow) {
        return null;
    }

    return <div className={`${className} orderResultWindow`}>
        <CloseIcon clickHandler={closeWindowClickHandler} />
        {orderSearchResult.length !== 0 &&
            orderSearchResult.map((item) => (
                <div key={item.order_id} className="orderResultWindow__table">
                    {t("orderTableList", { returnObjects: true }).map((data) => (
                        <div
                            key={data.key}
                            className="orderResultWindow__table__item"
                        >
                            <p className="orderResultWindow__table__item__label">
                                {data.label}
                            </p>
                            <p className="orderResultWindow__table__item__value">
                                {item[data.key]}
                            </p>
                        </div>
                    ))}
                </div>
            ))}
    </div>
}

//className: "orderResultWindow"
const OrderWindow = styled(MyOrderWindow)`
    position: fixed;
    z-index: var(--zIndex-dialog);
    padding: 1rem;
    width: 90%;
    min-height: 200px;
    right: 20px;
    top: 18%;
    background-color: var(--main-bg);
    border: 1px solid var(--main-normal);
    box-sizing: border-box;
    border-radius: var(--border-radius-15);

    .orderResultWindow__table {
        display: flex;
        flex-direction: column;
    }

    .orderResultWindow__table__item {
        display: flex;
        flex-direction: row;
        border-bottom: 1px dashed var(--main-normal);
        padding: 0.8rem 0;
    }
    .orderResultWindow__table__item__label {
        display: flex;
        width: 8rem;
        flex-shrink: 0;
        justify-content: center;
        align-items: center;
    }
    .orderResultWindow__table__item__value {
        display: flex;
        flex-grow: 1;
        word-break: break-all;
    }
`

export default OrderWindow;