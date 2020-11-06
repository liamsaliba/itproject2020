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
  updateSocials,
  selectHeaderImage,
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
import { ContactForm } from "./Contact";
import { MenuButton } from "../../components/NavItems";
import { selectArtifactsError } from "../../store/slices/artifacts";
import { pageTypes } from "../Editor/SectionPages";
import { SocialIcons } from "../../components/Socials";
import { Image } from "theme-ui";

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

const MainHeader = ({ username, bio, editing }) => {
  const fullName = useSelector(state => selectFullName(state, username));
  const profile = useSelector(state => selectPortfolioAvatar(state, username));
  const socials = useSelector(state => selectSocialIcons(state, username));
  const header = useSelector(state => selectHeaderImage(state, username));

  const dispatch = useDispatch();

  const headerComponent = (
    <Box as="header">
      <EditableUserProfile
        editing={editing}
        username={username}
        profile={profile}
      />
      <Styled.h1 sx={{ mb: 0 }}> {fullName} </Styled.h1>
      <Styled.h2 sx={{ mt: 0, fontWeight: "400", fontFamily: "monospace" }}>
        {username}
      </Styled.h2>
      <SocialIcons
        socials={socials}
        editing={editing}
        update={s => dispatch(updateSocials(s))}
      />
      <br />
      <Styled.p> {bio} </Styled.p>
      {editing ? <EditBioModal bio={bio} /> : null}
    </Box>
  );

  if (
    // !editing &&
    header.length === 0
  )
    return headerComponent;

  return (
    <Flex
      sx={{
        position: "relative",
        overflow: "hidden",
        alignItems: "center",
        justifyContent: "center",
        pb: "2em",
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          zIndex: "1",
          color: header.length !== 0 ? "white" : undefined,
          "& h1, & h2, & h3, & p": {
            color: header.length !== 0 ? "white" : undefined,
          },
        }}
      >
        {headerComponent}
      </Box>
      <Box
        sx={{
          position: "absolute",
          zIndex: "0",
          height: "auto",
          width: "100%",
          bg: "text",
          opacity: "0.2",
        }}
      >
        <Image
          sx={{
            filter: "brightness(0.60)",
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          src={profile}
        />
      </Box>
    </Flex>
  );
};

const Page = ({ pageId: id, name, userId }) => {
  const page = useSelector(state => selectPageById(state, id));
  const content = useSelector(state => selectArtifactsByPageId(state, id));
  const editing = useSelector(state => selectPortfolioIsEditing(state, userId));

  const dispatch = useDispatch();

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
    />
  ));

  const create = t => () =>
    dispatch(createArtifactStarted({ type: t, pageId: id }));

  const buttonStyle = { float: "right", whiteSpace: "nowrap" };

  const options = Object.values(pageTypes)
    .slice(1)
    .map(option => ({
      ...option,
      onClick: option.disabled !== true ? create(option.value) : undefined,
      description: undefined,
      defaultPageName: undefined,
    }));
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

const NewPlaceholder = ({
  children = null,
  tagline,
  icon = "file outline",
}) => (
  <Box sx={{ margin: "2em" }}>
    <Segment placeholder>
      <Header icon>
        <Icon name={icon} />
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

const PageNotFound = ({ homeBtn }) => {
  return (
    <NewPlaceholder tagline="404: Page not found." icon="question circle">
      {homeBtn}
    </NewPlaceholder>
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
    flex: "1",
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
          <NewPageModal pages={pages} />
        </NewPlaceholder>
      ) : null}
      {pageContainers}

      {editing && pages.length !== 0 && pages.length < 10 ? (
        <NewPlaceholder tagline="We're at the end here, want to create a new page?">
          <NewPageModal pages={pages} />
        </NewPlaceholder>
      ) : null}
      {editing && pages.length >= 10 ? (
        <NewPlaceholder
          tagline="Limited to creating 10 pages. To create a new page, delete another
        page first."
        />
      ) : null}
    </React.Fragment>
  );
};

// TODO: implement Multi Page Portfolio

export default Body;
