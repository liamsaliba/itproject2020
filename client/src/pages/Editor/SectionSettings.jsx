/** @jsx jsx */
import { jsx } from "theme-ui";
import Section from "./Section";
import { Button, Icon } from "semantic-ui-react";
import { Link } from "../../components";

const SectionSettings = () => {
  return (
    <Section name="Settings" icon="settings">
      <div
        sx={{
          "& div": {
            mb: "1em",
          },
        }}
      >
        <div>
          <Button icon primary labelPosition="left" as={Link} to="/settings">
            <Icon name="settings" />
            User Settings
          </Button>
        </div>
      </div>
    </Section>
  );
};
export default SectionSettings;
