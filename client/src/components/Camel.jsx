/** @jsx jsx */
import { jsx, css, keyframes } from "@emotion/core";
import { Image } from "theme-ui";
import camel from "../svg/camel.svg";

const bounce = keyframes`
  from, 20%, 53%, 80%, to {
    transform: translate3d(0,0,0);
  }

  40%, 43% {
    transform: translate3d(0, -30px, 0);
  }

  70% {
    transform: translate3d(0, -15px, 0);
  }

  90% {
    transform: translate3d(0,-4px,0);
  }
`;

export const Camel = ({ src = camel }) => (
  <div
    css={css`
      animation: ${bounce} 1s ease infinite;
    `}
  >
    <Image src={src} sx={{ width: "5em" }} />
  </div>
);

export default Camel;
