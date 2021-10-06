import React, { useState } from "react";
import styled from "styled-components";
import { getSVGURI } from "../../utils/Utils"
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { getReservedData } from "../../apis/reservedDataApi";


const MyOrderEnquiry = ({ className, setOrderSearchResultArr, setShowWindow, }) => {
    const { t } = useTranslation();
    const [inputOrderId, setInputOrderId] = useState("");
    const [orderSearchResultText, setOrderSearchResultText] = useState("");

    const orderSearchClickHandler = async () => {
        const orderId = inputOrderId;
        if (orderId === "") {
            setOrderSearchResultText(orderId);
            setOrderSearchResultArr([]);
            return;
        }
        if (orderId.length < 40) {
            setOrderSearchResultText(t("features.orderSearchTexts.noResult"));
            setOrderSearchResultArr([]);
            return;
        }

        const fetchedData = await getReservedData(undefined, orderId, undefined); //only one record
        if (fetchedData === null) {
            return;
        }
        const resultData = fetchedData.result;
        if (resultData.length === 0) {
            setOrderSearchResultText(t("features.orderSearchTexts.noResult"));
            setOrderSearchResultArr([]);
            // console.log("fetch data is empty array");
        } else {
            setOrderSearchResultArr(resultData);
            setShowWindow(true);
        }
    };
    const orderInputHandler = (e) => {
        setInputOrderId(e.target.value);
    };
    const orderInputOnFocus = () => { };
    const orderInputOnBlur = () => {
        setOrderSearchResultText("");
    };


    return (<>
        <div className={`${className} menu__order`}>
            <input
                type="text"
                placeholder={t("features.orderSearchTexts.orderIdInput")}
                className="menu__order__input"
                onChange={orderInputHandler}
                onFocus={orderInputOnFocus}
                onBlur={orderInputOnBlur}
            />
            <div className="menu__order__searchIcon" onClick={orderSearchClickHandler} />
        </div>
        {orderSearchResultText === "" ? null : (
            <p className="menu__order__result">{orderSearchResultText}</p>
        )}
    </>
    )
}


const OrderEnquiry = styled(MyOrderEnquiry)`
    display:flex;
    flex-direction: row;
    align-items: center;

    .menu__order__input {
        height: var(--menu-item-height);
        width: 160px;
        box-sizing: border-box;
    }

    .menu__order__result {
        margin: 0.5rem 0;
    }

    .menu__order__searchIcon{
        width: calc(var(--menu-item-height)/2);
        height: calc(var(--menu-item-height)/2);
        margin:0 0.25rem;
        background-image: url(${getSVGURI(faSearch, "#FFFFFF")});
        cursor: pointer;
    
    }

`;

export default OrderEnquiry;
