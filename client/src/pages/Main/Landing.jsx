/** @jsx jsx */
import { jsx, Flex } from "theme-ui";
import Search from "./Search";
import React from "react";

import {
  Button,
  Container,
  Grid,
  Header,
  Icon,
  Image,
  Segment,
} from "semantic-ui-react";
import camel from "../../svg/camel.svg";
import { Link } from "react-router-dom";

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
            }}
          >
            <span sx={{ p: "0.2em" }} />
            Camel Pages
          </Header>
        </Flex>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Search />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column textAlign="center">
          <Button animated primary size="huge" as={Link} to="signup">
            <Button.Content visible>Get Started!</Button.Content>
            <Button.Content hidden>
              <Icon name="arrow right" />
            </Button.Content>
          </Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Segment>
);

const HomepageBody = () => (
  <Container>
    <Segment style={{ padding: "1em 0em" }} vertical>
      <Grid
        container
        style={{ marginTop: "4em", marginBottom: "6em" }}
        centered
        verticalAlign="middle"
        stackable
      >
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as="h3" style={{ fontSize: "2em" }}>
              Hit the ground running
            </Header>
            <p style={{ fontSize: "1.33em" }}>
              Pick a ready-made template without having to worry about complex
              or complicated features while still being able to customise it
              enough to call it your’s.
            </p>
          </Grid.Column>
          <Grid.Column floated="right" width={6}>
            <Image rounded size="large" src={camel} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
    <Segment style={{ padding: "1em 0em" }} vertical>
      <Grid
        container
        style={{ marginTop: "4em", marginBottom: "6em" }}
        centered
        verticalAlign="middle"
        stackable
      >
        <Grid.Row>
          <Grid.Column floated="left" width={6}>
            <Image rounded size="large" src={camel} />
          </Grid.Column>
          <Grid.Column textAlign="right" width={8}>
            <Header as="h3" style={{ fontSize: "2em" }}>
              An eye for aesthetics
            </Header>
            <p style={{ fontSize: "1.33em" }}>
              Add colour and life to your portfolio by choosing one of our
              favourite colour palettes.
            </p>
            <Button animated secondary size="huge" as={Link} to="themes">
              <Button.Content visible>Check out our themes!</Button.Content>
              <Button.Content hidden>
                <Icon name="arrow right" />
              </Button.Content>
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  </Container>
);

export default () => {
  return (
    <React.Fragment>
      <HomepageHeading />
      <HomepageBody />
    </React.Fragment>
  );
};
