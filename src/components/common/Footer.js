import React from "react";
import styled from "styled-components";

import Menu from "../ui/Menu"

const MyFooter = styled.footer.attrs({ className: "footer" })`
  display: flex;
  height: calc(var(--menu-item-height) * 1.5);
  background-color: var(--dark); //
  justify-content: center;
  align-items: center;
`;
const P = styled.p.attrs({ className: "footer__paragraph" })`
  margin: 1rem 0;
`

function Footer() {
  return <MyFooter>
    <Menu />
    <P>All right is reserved.</P>
  </MyFooter>;
}
export default Footer;
