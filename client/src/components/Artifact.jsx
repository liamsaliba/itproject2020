/** @jsx jsx */
import { jsx } from "theme-ui";
import TextEditor from "./TextEditor";
import { Education, Experience, Display, Embedded } from "./Sections";

const Artifact = props => {
  const { type } = props;

  switch (type) {
    case "display":
    case "heading":
      return <Display {...props} />;
    case "custom":
      return <TextEditor {...props} />;
    case "education":
      return <Education {...props} />;
    case "experience":
      return <Experience {...props} />;
    case "embed":
      return <Embedded {...props} />;
    default:
      return <p>{JSON.stringify(props)}</p>;
  }
};

export default Artifact;
