import React from "react";
import styled from "styled-components";

const MyFooter = styled.footer`
  display: flex;
  height: 5rem;
  background-color: var(--main-normal);
  justify-content: center;
  align-items: center;
`;

function Footer() {
  return <MyFooter>All right is reserved.</MyFooter>;
}
export default Footer;
