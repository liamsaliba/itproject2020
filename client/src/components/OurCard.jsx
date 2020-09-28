/** @jsx jsx */
import { jsx, Image, Styled, Card } from "theme-ui";
import React from "react";
import PropTypes from "prop-types";

export default function OurCard({card: {title, body, featureType, feature, featureOrientation}}) {
  console.log(typeof(feature));
  const style = {
    boxShadow: "0 0 8px rgba(0, 0, 0, 0.125)",
    maxWidth: "300px",
    padding: 2,
    m: 2,
    textAlign:"center"
  };

  const featureStyle = { 
    maxWidth: "256px",
    m: "1em"
  };

  const textStle = {
    pt:"0.25em",
    pb:"0.25em",
    mb:"0",
    mt:"0"
  }


  const GetFeature = () => {
    if (featureType==="image") {
      return (<Image src={feature} sx={featureStyle} />);
    } return (<React.Fragment></React.Fragment>);
  }

  if (featureOrientation==="bottom") {
    return (
      // When you click it, may open a modal to view the publication?
      <Card sx={style}>
        <Styled.h3 sx={textStle}>{title}</Styled.h3>
        <Styled.p sx={textStle}>{body}</Styled.p>
        <GetFeature />
      </Card>
    );
  }
  return (
    <Card sx={style}>
      <Styled.h3 sx={textStle}>{title}</Styled.h3>
      <GetFeature />
      <Styled.p sx={textStle}>{body}</Styled.p>
    </Card>
  );
};

OurCard.propTypes = {
  /** Composition of the page */
  card: PropTypes.shape({
    title: PropTypes.string, 
    body: PropTypes.string, 
    featureType: PropTypes.string, // Describes the feature tupe {image|video|...}
    feature: PropTypes.string, // or something else!
    featureOrientation: PropTypes.string
  }),
};