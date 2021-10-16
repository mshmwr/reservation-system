import styled from "styled-components";

const Loader = styled.div.attrs({ className: "loader" })`
  border: 8px solid var(--main-light); /* Light grey */
  border-top: 8px solid var(--main-dark); /* Blue */
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 2s linear infinite;
  margin: 0 auto;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Loader;
