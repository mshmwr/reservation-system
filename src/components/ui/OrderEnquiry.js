import React, { useState } from "react";
import styled from "styled-components";
import { getSVGURI } from "../../utils/Utils"
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { getReservedData } from "../../apis/reservedDataApi";
import useDialogAction from "../../action/ui/dialogAction"
import useOrderEnquiryAction from "../../action/ui/orderEnquiryAction";


const MyOrderEnquiry = ({ className, setShowWindow, }) => {
    const { t } = useTranslation();
    const { setDialogText, setDialogToggle, setDialogHeight } = useDialogAction()
    const { setOrderSearchResult } = useOrderEnquiryAction();
    const [inputOrderId, setInputOrderId] = useState("");

    const orderSearchClickHandler = async () => {
        setDialogToggle();
        setDialogHeight("100px");

        const orderId = inputOrderId;
        if (orderId === "") {
            setDialogText("no input");
            setOrderSearchResult([]);
            return;
        }
        if (orderId.length < 40) {
            setDialogText(t("features.orderSearchTexts.noResult"));
            setOrderSearchResult([]);
            return;
        }

        const fetchedData = await getReservedData(undefined, orderId, undefined); //only one record
        if (fetchedData === null) {
            return;
        }
        const resultData = fetchedData.result;
        if (resultData.length === 0) {
            setDialogText(t("features.orderSearchTexts.noResult"));
            setOrderSearchResult([]);
            // console.log("fetch data is empty array");
        } else {
            setOrderSearchResult(resultData);
            setShowWindow(true);
        }
    };
    const orderInputHandler = (e) => {
        setInputOrderId(e.target.value);
    };
    const orderInputOnFocus = () => { };
    const orderInputOnBlur = () => {
        setDialogText("");
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
            {/* <div className={`${orderSearchResultText === "" ? "menu__order__result" : "menu__order__result"}`}>{orderSearchResultText}</div> */}
        </div>

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
        border-radius: var(--border-radius);
        border-style: none;
    }

    .menu__order__searchIcon{
        width: calc(var(--menu-item-height)/2);
        height: calc(var(--menu-item-height)/2);
        margin:0 0.25rem;
        background-image: url(${getSVGURI(faSearch, "#FFFFFF")});
        background-position: center;
        background-size: cover;
        cursor: pointer;
    
    }

`;

export default OrderEnquiry;
