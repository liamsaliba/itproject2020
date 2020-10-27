/** @jsx jsx */
import { jsx } from "theme-ui";
import TextEditor from "./TextEditor";
import { Education, Experience, Display } from "./Sections";

const Artifact = props => {
  const { type } = props;

  switch (type) {
    case "display":
      return <Display {...props} />;
    case "Heading":
      return <Display {...props} />;
    case "custom":
      return <TextEditor {...props} />;
    case "education":
      return <Education {...props} />;
    case "experience":
      return <Experience {...props} />;
    default:
      return <p>{JSON.stringify(props)}</p>;
  }
};

export default Artifact;
