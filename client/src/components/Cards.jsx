/** @jsx jsx */
import { jsx, Image, Styled, Card as ThemedCard } from "theme-ui";
import PropTypes from "prop-types";
import { Section } from "./Section";
import { Link } from "react-router-dom";

export const Card = ({
  card: { title, body, featureType, feature, featureOrientation, username },
}) => {
  const style = {
    boxShadow: "0 0 8px rgba(0, 0, 0, 0.25)",
    backgroundColor: "muted",
    maxWidth: "225px",
    // maxWidth: "300px", changed to 225px for browsing portfolios.
    padding: 2,
    m: 2,
    textAlign: "center",
    borderRadius: "5px",
  };

  const featureStyle = {
    width: "100%",
  };

  const textStyle = {
    pt: "0.25em",
    pb: "0.25em",
    mb: "0",
    mt: "0",
  };

  const GetFeature = () =>
    featureType === "image" ? <Image src={feature} sx={featureStyle} /> : feature;
  
  const link = () => username ? Link : null;
  const to = () => username ? "../u/" + username : null;

  if (featureOrientation === "bottom") {
    return (
      // When you click it, may open a modal to view the publication?
      <ThemedCard sx={style}>
        <Styled.h3 sx={textStyle}>{title}</Styled.h3>
        <Styled.p sx={textStyle}>{body}</Styled.p>
        <GetFeature />
      </ThemedCard>
    );
  }
  return (
    // The Featyre is above the body
    <ThemedCard sx={style} as={link()} to={to()}>
      <Styled.h3 sx={textStyle}>{title}</Styled.h3>
      <GetFeature />
      <Styled.p sx={textStyle}>{body}</Styled.p>
    </ThemedCard>
  );
};

Card.propTypes = {
  /** Composition of the page */
  card: PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.string,
    featureType: PropTypes.string, // Describes the feature tupe {image|video|...}
    feature: PropTypes.string, // or something else!
    featureOrientation: PropTypes.string,
  }),
};

/* ------------------------------------------------------------------- */

export const Cards = props => (
  <Section
    {...props}
    content={props.content.map((card, index) => (
      <Card key={props.key + index} {...card} />
    ))}
  />
);
