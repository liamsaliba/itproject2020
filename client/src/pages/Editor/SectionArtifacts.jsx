/** @jsx jsx */
import { jsx } from "theme-ui";
import { Button } from "semantic-ui-react";
import Section from "./Section";

const SectionArtifacts = () => {
  return (
    <Section name="Create Artifacts" icon="file">
      <Button>Add Artifacts</Button>
    </Section>
  );
};
export default SectionArtifacts;
