/** @jsx jsx */
import { jsx, Flex, Box, Styled } from "theme-ui";
import React from "react";
import {
  selectArtifactsByPageId,
  selectPageById,
  selectPortfolioIsEditing,
  selectPortfolioPages,
  selectPortfolioAvatar,
  selectPortfolioBio,
  changePortfolioBio,
  selectFullName,
  selectSocialIcons,
  selectArtifactsLoading,
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
  Dropdown,
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
import { SocialIcon } from "react-social-icons";
import { selectArtifactsError } from "../../store/slices/artifacts";
import { useFormState } from "../../components/Modals";
import { pageTypes } from "../Editor/SectionPages";

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
          <Icon name="pencil" />
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
  const socials = useSelector(state => selectSocialIcons(state, id));

  useEffect(() => {
    console.log(socials);
  });

  return (
    <Box>
      {socials
        ? socials.map(social => <SocialIcon key={social} url={social} />)
        : null}
    </Box>
  );
};

const MainHeader = ({ username, bio, editing }) => {
  const fullName = useSelector(state => selectFullName(state, username));
  const profile = useSelector(state => selectPortfolioAvatar(state, username));

  return (
    <Box mb={2} as="header">
      <EditableUserProfile
        editing={editing}
        username={username}
        profile={profile}
      />
      {/* TODO: put first name + last name here instead! */}
      <Styled.h1 sx={{ mb: 0 }}> {fullName} </Styled.h1>
      <Styled.h2 sx={{ mt: 0, fontWeight: "400", fontFamily: "monospace" }}>
        {username}
      </Styled.h2>
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
      key={artifact.id}
      editing={editing}
      openEditor={() =>
        editing ? dispatch(editArtifactStarted(artifact)) : null
      }
      // temporarily, while we wait for a backend fix...
      type={type}
    />
  ));

  const create = t => () =>
    dispatch(createArtifactStarted({ type: t, pageId: id }));

  const buttonStyle = { float: "right", whiteSpace: "nowrap" };

  const options = Object.values(pageTypes)
    .slice(1)
    .map(option => ({
      ...option,
      onClick: create(option.value),
      description: undefined,
    }));
  console.log(options);
  const newbtn =
    type === "mix" ? (
      <Dropdown
        pointing="right"
        button
        sx={{ float: "right", whiteSpace: "nowrap" }}
        className="icon"
        labeled
        icon="add"
        text="Add element"
        options={options}
      />
    ) : (
      <Button icon labelPosition="left" onClick={create(type)} sx={buttonStyle}>
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
    <Segment placeholder>
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
  const artifactEditing = useSelector(selectArtifactCurrentlyEditing);
  const artifactsLoading = useSelector(selectArtifactsLoading);
  const artifactsError = useSelector(selectArtifactsError);

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
      loading={artifactsLoading}
      error={artifactsError}
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
  const profile = useSelector(state => selectPortfolioAvatar(state, userId));
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
    if (selectedPage === "contact") {
      return <ContactForm userId={userId} homeBtn={homeBtn} />;
    }
    if (selectedPage === undefined) {
      return (
        <SinglePagePortfolio userId={userId} editing={editing} pages={pages} />
      );
    }
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
