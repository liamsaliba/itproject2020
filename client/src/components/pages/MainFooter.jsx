/** @jsx jsx */
import { jsx, Link } from "theme-ui";
import React from "react";

export default () => {
  return (
    <footer
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        p: 2,
        variant: "styles.footer",
      }}
    >
      <Link to="/" sx={{ variant: "styles.navlink", p: 2 }}>
        camel_case
      </Link>
      <div sx={{ mx: "auto" }} />
      <div sx={{ p: 2 }}>camel_case is...</div>
    </footer>
  );
};
