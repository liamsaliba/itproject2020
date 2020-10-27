/** @jsx jsx */
import { jsx, Flex } from "theme-ui";
import { Accordion, Icon, Transition } from "semantic-ui-react";
import { useSelector } from "react-redux";
import { changeAccordion, selectAccordion } from "../../store/";
import { useDispatch } from "react-redux";

export const AccordionSection = props => {
  const active = useSelector(selectAccordion);
  const dispatch = useDispatch();

  const { name, icon, children } = props;

  const handleClick = e => {
    dispatch(changeAccordion(active === name ? null : name));
  };

  return (
    <Accordion styled name={name} exclusive={false} fluid sx={{ pt: "1em" }}>
      <Accordion.Title onClick={handleClick}>
        <Icon name="dropdown" />
        <Icon name={icon} sx={{ pr: "1.5em" }} />
        {name}
      </Accordion.Title>

      <Accordion.Content
        sx={{
          overflowY: "auto",
          overflowX: "hidden",
        }}
        active={active === name}
      >
        <Flex sx={{ justifyContent: "center" }}>{children}</Flex>
      </Accordion.Content>
    </Accordion>
  );
};

const Section = ({ name, children }) => {
  const active = useSelector(selectAccordion);
  const animation = "fade down";

  return (
    <Transition.Group animation={animation} duration={0}>
      {active === name && (
        <Flex
          sx={{
            flexDirection: "column",
            textAlign: "center",
            minHeight: "200px",
            pt: "1em",
            flex: "1",
          }}
        >
          {children}
        </Flex>
      )}
    </Transition.Group>
  );
  //
  // );
};

export default Section;
