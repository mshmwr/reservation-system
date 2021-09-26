import React from "react";
import styled from "styled-components";

const MyFooter = styled.footer.attrs({ className: "footer" })`
  display: flex;
  height: 5rem;
  background-color: var(--main-normal); //
  justify-content: center;
  align-items: center;
`;

function Footer() {
  return <MyFooter>All right is reserved.</MyFooter>; //return 一個 styled-component
}
export default Footer;
