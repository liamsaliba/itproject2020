import React, { useState } from "react";
import { Button, Icon } from "semantic-ui-react";

// https://github.com/macro6461/react-scroll-arrow/blob/master/src/components/ScrollTopArrow.js
export default props => {
  const [showScroll, setShowScroll] = useState(false);

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 100) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 100) {
      setShowScroll(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  window.addEventListener("scroll", checkScrollTop);

  return (
    <Button
      circular
      icon
      onClick={scrollTop}
      style={{
        height: 40,
        position: "fixed",
        top: 10,
        right: 10,
        display: showScroll ? "flex" : "none",
      }}
    >
      <Icon name="chevron up" />
    </Button>
  );
};
