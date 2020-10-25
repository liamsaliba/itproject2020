/** @jsx jsx */
import { jsx } from "theme-ui";
import Section from "./Section";
import { Media } from "../../components/Media";

const SectionMedia = () => {
  return (
    <Section name="Media" icon="file image">
      <Media />
    </Section>
  );
};
export default SectionMedia;
