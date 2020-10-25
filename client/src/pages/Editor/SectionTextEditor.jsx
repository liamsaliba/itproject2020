/** @jsx jsx */
import { jsx } from "theme-ui";
import Section from "./Section";

import TextEditor from "../../components/TextEditor";
import { useState } from "react";
const SectionTextEditor = () => {
  const [open, setOpen] = useState(true);
  const defaultText =
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate" +
    "nisi quibusdam saepe. Commodi temporibus, atque rem unde vel," +
    "voluptatem tempore quisquam fugit exercitationem voluptates sint." +
    "Porro temporibus quisquam eveniet molestiae.";

  return (
    <Section name="Text Editor" icon="paragraph">
      <TextEditor textEditor={{ defaultText }} state={(open, setOpen)} />
    </Section>
  );
};
export default SectionTextEditor;
