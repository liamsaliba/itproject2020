// Social Icons code forked from https://github.com/jaketrent/react-social-icons
// uses MIT license
import React from "react";
import DB from "./_socialicons.db";

const DEFAULT_KEY = "sharethis";
const KEYS = Object.keys(DB);
const KEYS_REGEX = new RegExp(
  "(?:https?:\\/\\/(?:[a-z0-9]*.)?)?(" + KEYS.join("|") + ").*"
);

function iconFor(key) {
  return DB[key] ? DB[key].icon : null;
}

function maskFor(key) {
  return DB[key] ? DB[key].mask : null;
}

function colorFor(key) {
  return DB[key] ? DB[key].color : null;
}

function keyFor(url) {
  if (!url) {
    return DEFAULT_KEY;
  }

  const key = url.replace(KEYS_REGEX, "$1");
  return key === url ? DEFAULT_KEY : key;
}

const socialIcon = {
  display: "inline-block",
  width: "50px",
  height: "50px",
  position: "relative",
  overflow: "hidden",
  verticalAlign: "middle",
};

const socialContainer = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
};

const socialSvg = {
  borderRadius: "50%",
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  fillRule: "evenodd",
};

const socialSvgContent = {
  msTransition: "fill 170ms ease-in-out",
  OTransition: "fill 170ms ease-in-out",
  MozTransition: "fill 170ms ease-in-out",
  WebkitTransition: "fill 170ms ease-in-out",
  transition: "fill 170ms ease-in-out",
  fill: "transparent",
};

const socialSvgMask = {
  ...socialSvgContent,
  fill: "#0f0b0b",
};

export const SocialIcon = props => {
  const { url, disabled = false, className, ...rest } = props;
  const networkKey = keyFor(url);

  return (
    <a
      {...rest}
      href={disabled ? undefined : url}
      className={"social-icon" + (!!className ? " " + className : "")}
      style={{ ...socialIcon, ...props.style, marginTop: "-7px" }}
      aria-label={networkKey}
    >
      <div className="social-container" style={socialContainer}>
        <svg className="social-svg" style={socialSvg} viewBox="0 0 64 64">
          <g
            {...props}
            className="social-svg-background"
            style={socialSvgContent}
          >
            <circle cx="32" cy="32" r="31" />
          </g>
          <g
            className="social-svg-icon"
            style={{
              ...socialSvgContent,
              fill: "transparent",
            }}
          >
            <path d={iconFor(networkKey)} />
          </g>
          <g
            className="social-svg-mask"
            style={{
              ...socialSvgMask,
              fill: colorFor(networkKey),
            }}
          >
            <path d={maskFor(networkKey)} />
          </g>
        </svg>
      </div>
    </a>
  );
};

export default SocialIcon;
