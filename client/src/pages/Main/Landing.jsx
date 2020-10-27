/** @jsx jsx */
import { jsx, Flex } from "theme-ui";
import Search from "./Search";
import React from "react";

import {
  Button,
  Grid,
  Header,
  Icon,
  Image,
  Segment,
  Divider,
} from "semantic-ui-react";
import camel from "../../svg/camel.svg";
import autosave from "../../svg/Landing/Autosave.png";
import customise from "../../svg/Landing/Customise.png";
import media from "../../svg/Landing/Media.png";
import portfolio from "../../svg/Landing/Portfolio.png";
import themes from "../../svg/Landing/Themes.png";

import { Link } from "react-router-dom";

import { createMedia } from "@artsy/fresnel";

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    mobile: 0,
    tablet: 768,
    computer: 1024,
  },
});

const Left = props => {
  return (
    <Segment style={{ padding: "1em 0em" }} vertical>
      <Grid container centered verticalAlign="middle" stackable>
        <Grid.Row>
          <Grid.Column floated="left" width={6}>
            <Image
              rounded
              size="large"
              src={props.image}
              href="https://stories.freepik.com/web"
            />
          </Grid.Column>
          <Grid.Column textAlign="right" width={8}>
            <Header as="h3" style={{ fontSize: "2em" }}>
              {props.header}
            </Header>
            <p style={{ fontSize: "1.33em" }}>{props.subheading}</p>
            {props.button}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

const Right = props => {
  return (
    <Segment style={{ padding: "1em 0em" }} vertical>
      <Grid container centered verticalAlign="middle" stackable>
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as="h3" style={{ fontSize: "2em" }}>
              {props.header}
            </Header>
            <p style={{ fontSize: "1.33em" }}>{props.subheading}</p>
            {props.button}
          </Grid.Column>
          <Grid.Column floated="right" width={6}>
            <Image
              rounded
              size="large"
              src={props.image}
              href="https://stories.freepik.com/web"
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

const Middle = props => {
  return (
    <Segment style={{ padding: "1em 0em" }} vertical>
      <Grid
        container
        style={{ marginTop: "0em", marginBottom: "1em" }}
        centered
        verticalAlign="middle"
        stackable
      >
        <Grid.Row>
          <Image
            rounded
            size="large"
            src={props.image}
            href="https://stories.freepik.com/web"
          />
        </Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign="center" width={8}>
            <Header as="h3" style={{ fontSize: "2em" }}>
              {props.header}
            </Header>
            <p style={{ fontSize: "1.33em" }}>{props.subheading}</p>
            {props.button}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

// Illustration by Freepik Stories "https://stories.freepik.com/web"

const HomepageHeading = () => (
  <Segment textAlign="center" style={{ padding: "1em 0em" }} vertical>
    <Grid
      container
      style={{ marginTop: "4em", marginBottom: "6em" }}
      centered
      stackable
    >
      <Grid.Row>
        <Flex sx={{ alignItems: "center" }}>
          <Image rounded size="small" src={camel} />
          <Header
            as="h1"
            style={{
              fontSize: "4em",
              fontWeight: "normal",
              marginTop: "0.5em",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <span sx={{ p: "0.2em" }} />
            Camel Pages
          </Header>
        </Flex>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={8}>
          <Search />
          <br />
          <Divider horizontal>Or</Divider>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column textAlign="center">
          <Button animated primary size="huge" as={Link} to="signup">
            <Button.Content visible>Create your own!</Button.Content>
            <Button.Content hidden>
              <Icon name="user plus" />
            </Button.Content>
          </Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Segment>
);

const FirstTwo = (
  <React.Fragment>
    <Right
      header="Create and share ePortfolios on the fly"
      subheading="Creating your own ePortfolio on the whim and sharing with
      potential employers or friends have never been easier with a
      simple, easy-to-use UI."
      image={portfolio}
    />
    <Left
      header="Hit the ground running"
      subheading="Pick a ready-made template without having to worry about complex
      or complicated features while still being able to customise it
      enough to call it yours."
      image={customise}
    />
  </React.Fragment>
);

const MobileFirst = (
  <React.Fragment>
    <Middle
      header="Create and share ePortfolios on the fly"
      subheading="Creating your own ePortfolio on the whim and sharing with
      potential employers or friends have never been easier with a
      simple, easy-to-use UI."
      image={portfolio}
    />
    <Middle
      header="Hit the ground running"
      subheading="Pick a ready-made template without having to worry about complex
      or complicated features while still being able to customise it
      enough to call it yours."
      image={customise}
    />
  </React.Fragment>
);

const LastTwo = (
  <React.Fragment>
    <Left
      header="Everything you need, all at your fingertips"
      subheading="Pick and choose which of your work to show off by easily managing
      all your media uploads at any time."
      image={media}
    />
    <Right
      header="Save as you go"
      subheading="Now you don't have to worry about whether you saved your work.
      Leave it to us!"
      image={autosave}
      button={
        <Button animated primary size="huge" as={Link} to="signup">
          <Button.Content visible>Get Started!</Button.Content>
          <Button.Content hidden>
            <Icon name="user plus" />
          </Button.Content>
        </Button>
      }
    />
  </React.Fragment>
);

const MobileLast = (
  <React.Fragment>
    <Middle
      header="Everything you need, all at your fingertips"
      subheading="Pick and choose which of your work to show off by easily managing
      all your media uploads at any time."
      image={media}
    />
    <Middle
      header="Save as you go"
      subheading="Now you don't have to worry about whether you saved your work.
      Leave it to us!"
      image={autosave}
      button={
        <Button animated primary size="huge" as={Link} to="signup">
          <Button.Content visible>Get Started!</Button.Content>
          <Button.Content hidden>
            <Icon name="user plus" />
          </Button.Content>
        </Button>
      }
    />
  </React.Fragment>
);

const HomepageBody = props => (
  <React.Fragment>
    {props.mobile ? MobileFirst : FirstTwo}
    <Middle
      header="An eye for aesthetics"
      subheading="Add colour and life to your portfolio by choosing one of our
      favourite themes and colour palettes."
      image={themes}
      button={
        <Button animated secondary size="huge" as={Link} to="themes">
          <Button.Content visible>Check out our themes!</Button.Content>
          <Button.Content hidden>
            <Icon name="paint brush" />
          </Button.Content>
        </Button>
      }
    />
    {props.mobile ? MobileLast : LastTwo}
  </React.Fragment>
);

export default () => {
  return (
    <MediaContextProvider>
      <HomepageHeading />
      <Media greaterThan="mobile">
        <HomepageBody />
      </Media>
      <Media at="mobile">
        <HomepageBody mobile />
      </Media>
    </MediaContextProvider>
  );
};
