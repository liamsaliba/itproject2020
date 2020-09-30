/** @jsx jsx */
import { jsx } from "theme-ui";
import Section from "./Section";

import TextEditor from "../../components/TextEditor";
const SectionTextEditor = () => {
  const defaultText =
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate" +
    "nisi quibusdam saepe. Commodi temporibus, atque rem unde vel," +
    "voluptatem tempore quisquam fugit exercitationem voluptates sint." +
    "Porro temporibus quisquam eveniet molestiae.";

  return (
    <Section name="Text Editor" icon="paragraph">
      <TextEditor textEditor={{ defaultText }} />
    </Section>
  );
};
export default SectionTextEditor;
