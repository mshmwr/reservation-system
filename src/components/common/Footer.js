import React from "react";
import styled from "styled-components";

import Menu from "../ui/Menu"
import { getSVGURI } from "../../utils/Utils"
import { faCopyright } from "@fortawesome/free-solid-svg-icons";

const MyFooter = styled.footer.attrs({ className: "footer" })`
  display: flex;
  height: calc(var(--menu-item-height) * 1.5);
  background-color: var(--dark); //
  justify-content: center;
  align-items: center;
  position: relative;

  .footer__copyright__paragraph{
    position: absolute;
    right: 1rem;
    top: -30px;
    left: 5px;
    width: fit-content;
    padding: .25rem .5rem;
    background-color: var(--main-normal);
    border-radius: 5px;
    color: var(--dark);
    visibility: hidden;
  }

  .footer__copyright__icon{
      width: calc(var(--menu-item-height)/2);
      height: calc(var(--menu-item-height)/2);
      margin:0 0.25rem;
      background-image: url(${getSVGURI(faCopyright, "#FFFFFF")});
      background-position: center;
      background-size: cover;
      margin-left: 1rem;
      cursor: pointer;
  }
  
  .footer__copyright__icon:hover ~ .footer__copyright__paragraph{
    visibility: visible;
  }

`;

function Footer() {
  return <MyFooter>
    <div className="footer__copyright__icon" />
    <Menu />
    <p className="footer__copyright__paragraph">All right is reserved.</p>
  </MyFooter>;
}
export default Footer;
