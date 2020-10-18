/** @jsx jsx */
import { jsx } from "theme-ui";
import Display from "./Display";

export const artifactTypeToName = type => {
  switch (type) {
    case "display":
      return "Display";
    case "education":
      return "Education";
    case "experience":
      return "Experience";
  }
  return null;
};

const Artifact = props => {
  const { type } = props;

  switch (type) {
    case "display":
      return <Display {...props} />;
    // case "education":
    //   return <Education {...props} />;
    // case "experience":
    //   return <Experience {...props} />;
  }
  return <p>{JSON.stringify(props)}</p>;
};

export default Artifact;
