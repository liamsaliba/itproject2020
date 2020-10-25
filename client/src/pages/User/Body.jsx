/** @jsx jsx */
import { jsx, Flex, Box, Styled } from "theme-ui";
import React from "react";
import {
  selectArtifactsByPageId,
  selectPageById,
  selectPortfolioIsEditing,
  selectPortfolioPages,
  selectPortfolioProfile,
  selectPortfolioBio,
  changePortfolioBio,
  // selectSocialIcons,
} from "../../store";
import { Section, Artifact } from "../../components";
import {
  Button,
  Form,
  Icon,
  TextArea,
  Segment,
  Header,
  Modal,
} from "semantic-ui-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ArtifactForm } from "../../components/ArtifactForm";
import { NewPageModal } from "../Editor/SectionPages";
import { EditableUserProfile } from "../../components/ProfileIcon";
import {
  createArtifactStarted,
  editArtifactFinished,
  editArtifactStarted,
  selectArtifactCurrentlyEditing,
} from "../../store/slices/ui";
import { useEffect } from "react";
// import { SocialIcon } from "react-social-icons";
import { ContactForm } from "./Contact";
import { MenuButton } from "../../components/NavItems";

const EditBioModal = ({ bio }) => {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({ bio });
  const dispatch = useDispatch();
  const handleChange = (e, { name, value }) =>
    setState({ ...state, [name]: value });

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(changePortfolioBio(state.bio));
    setOpen(false);
  };

  return (
    <Modal
      as={Form}
      onSubmit={handleSubmit}
      size="tiny"
      closeOnDimmerClick={false}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      dimmer={{ inverted: true }}
      open={open}
      trigger={
        <Button icon labelPosition="left">
          <Icon inline name="pencil" />
          Edit bio
        </Button>
      }
    >
      <Modal.Header>Biography</Modal.Header>
      <Modal.Content>
        <TextArea
          transparent
          fluid
          iconPosition="left"
          icon="file"
          placeholder="a short thing about yourself..."
          name="bio"
          onChange={handleChange}
          defaultValue={bio}
          required
        />
      </Modal.Content>
      <Modal.Actions>
        <Button basic color="red" onClick={() => setOpen(false)} type="button">
          <Icon name="remove" /> Cancel
        </Button>
        <Button color="green" type="submit">
          <Icon name="checkmark" /> Save
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

const SocialIcons = id => {
  // const socials = useSelector(state => selectSocialIcons(state, id));

  return (
    <Box>
      {/* {socials.map(social => (
        <SocialIcon key={social} url={social} />
      ))} */}
    </Box>
  );
};

const MainHeader = ({ username, bio, editing }) => {
  return (
    <Box mb={5} as="header">
      <EditableUserProfile editing={editing} username={username} />
      {/* TODO: put first name + last name here instead! */}
      <Styled.h1> {username} </Styled.h1>
      <Styled.p> {bio} </Styled.p>
      {editing ? <EditBioModal bio={bio} /> : null}
      <SocialIcons />
    </Box>
  );
};

const Page = ({ pageId: id, name, userId }) => {
  const page = useSelector(state => selectPageById(state, id));
  const content = useSelector(state => selectArtifactsByPageId(state, id));
  const editing = useSelector(state => selectPortfolioIsEditing(state, userId));

  const dispatch = useDispatch();
  // TODO: display a toast saying unable to fetch page.
  if (page === undefined) return null;
  const { type, loading } = page;
  const artifacts = content.map(artifact => (
    // TODO: add loader
    <Artifact
      {...artifact}
      editing={editing}
      openEditor={() =>
        editing ? dispatch(editArtifactStarted(artifact)) : null
      }
      // temporarily, while we wait for a backend fix...
      type={type}
    />
  ));

  const newbtn = (
    <Button
      icon
      labelPosition="left"
      onClick={() => dispatch(createArtifactStarted({ type, pageId: id }))}
      sx={{ float: "right" }}
    >
      <Icon name="add" />
      Add {type}
    </Button>
  );

  const pageProps = {
    id,
    name,
    loading,
    content: artifacts,
    editing,
    type,
    newbtn,
  };

  return <Section {...pageProps} />;
};

const NewPlaceholder = ({ children, tagline }) => (
  <Box sx={{ margin: "2em" }}>
    <Segment placeholder fluid>
      <Header icon>
        <Icon name="file outline" />
        {tagline}
      </Header>
      {children}
    </Segment>
  </Box>
);

// pop the edit form
const ArtifactFormController = () => {
  const dispatch = useDispatch();
  const artifactEditing = useSelector(state =>
    selectArtifactCurrentlyEditing(state)
  );

  const [editOpen, setEditOpen] = useState(false);

  useEffect(() => {
    if (artifactEditing) {
      setEditOpen(true);
    } else {
      setEditOpen(false);
    }
  }, [artifactEditing]);

  return (
    <ArtifactForm
      open={editOpen}
      closeModal={() => {
        dispatch(editArtifactFinished());
      }}
      currentlyEditing={artifactEditing}
    />
  );
};

const PageNotFound = ({ path, homeBtn }) => {
  return (
    <Box sx={{ margin: "2em" }}>
      <Header as="h2">
        <Icon name="question circle" />
        <Header.Content>Page doesn't exist.</Header.Content>
        {homeBtn}
      </Header>
    </Box>
  );
};

const Body = props => {
  const { userId, selectedPage } = props;
  const bio = useSelector(state => selectPortfolioBio(state, userId));
  const editing = useSelector(state => selectPortfolioIsEditing(state, userId));
  const profile = useSelector(state => selectPortfolioProfile(state, userId));
  const pages = useSelector(state => selectPortfolioPages(state, userId));

  const path = editing ? "/editor" : `/u/${userId}`;

  const styling = {
    textAlign: "center",
    justifyContent: "center",
    flexDirection: "column",
    "*": {
      transition: "all .2s ease-out",
    },
  };

  const homeBtn = (
    <MenuButton primary to={path}>
      <Icon name="home" />
      Home
    </MenuButton>
  );

  const children = () => {
    console.log("selectedPage", selectedPage);
    if (selectedPage === "contact") {
      return <ContactForm userId={userId} homeBtn={homeBtn} />;
    }
    if (selectedPage === undefined) {
      return (
        <SinglePagePortfolio userId={userId} editing={editing} pages={pages} />
      );
    }
    console.log("pages", pages);
    const page = pages.filter(page => page.name === selectedPage)[0];
    // TODO: if in edit mode, ask if a page should be created
    if (page === undefined) return <PageNotFound homeBtn={homeBtn} />;
    return (
      <React.Fragment>
        <ArtifactFormController />
        <Page {...page} key={page.pageId.toString()} userId={userId} />
      </React.Fragment>
    );
  };

  return (
    <Flex as="main" sx={styling}>
      <MainHeader
        username={userId}
        bio={bio}
        editing={editing}
        profile={profile}
      />
      {children()}
    </Flex>
  );
};

const SinglePagePortfolio = props => {
  const { userId, editing, pages } = props;
  // userId will be given with the pages selector, so no need to pass it to children (...page)
  const pageContainers = pages.map(page => (
    <Page {...page} key={page.pageId.toString()} userId={userId} />
  ));

  return (
    <React.Fragment>
      <ArtifactFormController />
      {editing && pages.length === 0 ? (
        <NewPlaceholder tagline="No pages yet!  Would you like to create a new one?">
          <NewPageModal />
        </NewPlaceholder>
      ) : null}
      {pageContainers}
      {editing && pages.length !== 0 ? (
        <NewPlaceholder tagline="We're at the end here, want to create a new page?">
          <NewPageModal />
        </NewPlaceholder>
      ) : null}
    </React.Fragment>
  );
};

// TODO: implement Multi Page Portfolio

export default Body;
