/** @jsx jsx */
import { jsx, Flex, Box, Image, Styled } from "theme-ui";
import profileExample from "../../svg/Profile_example.png";

import {
  selectArtifactsByPageId,
  selectPageById,
  selectPortfolioIsEditing,
  selectPortfolioPages,
} from "../../store";
import { useSelector } from "react-redux";
import { Section, Artifact } from "../../components";
import { selectPortfolioBio } from "../../store/slices/portfolios";

import { Button, Form, Icon, TextArea } from "semantic-ui-react";
import { Modal } from "semantic-ui-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { changePortfolioBio } from "../../store/slices/portfolios";

const NewArtifact = ({ onClick, pageId, type }) => {
  // pass up pageId, so we know what page we're adding to.
  return (
    <Box>
      <Button icon small labelPosition="left" onClick={() => onClick(pageId)}>
        <Icon name="add" />
        Add {type}
      </Button>
    </Box>
  );
};

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
        <Button icon small labelPosition="left">
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

const Header = ({ username, bio, editing }) => {
  return (
    <Box mb={5}>
      <Image
        src={profileExample}
        sx={{ borderRadius: "50%", width: "30%" }}
        margin={2}
      />
      {/* TODO: put first name + last name here instead! */}
      <Styled.h1> {username} </Styled.h1>
      <Styled.p> {bio} </Styled.p>
      {editing ? <EditBioModal bio={bio} /> : null}
    </Box>
  );
};

const Page = ({ pageId: id, name, userId }) => {
  const page = useSelector(state => selectPageById(state, id));
  const content = useSelector(state => selectArtifactsByPageId(state, id));
  const editing = useSelector(state => selectPortfolioIsEditing(state, userId));
  // TODO: display a toast saying unable to fetch page.
  if (page === undefined) return null;
  const { type } = page;
  const artifacts = content.map(artifact => (
    <Artifact {...artifact} editing={editing} />
  ));

  const newbtn = (
    <NewArtifact onClick={() => console.log("hello")} type={type} pageId={id} />
  );

  const pageProps = {
    id,
    name,
    content: artifacts,
    editing,
    type,
    newbtn,
  };

  return <Section {...pageProps} />;
};

const SinglePagePortfolio = props => {
  const { userId } = props;
  const bio = useSelector(state => selectPortfolioBio(state, userId));
  const pages = useSelector(state => selectPortfolioPages(state, userId));
  const editing = useSelector(state => selectPortfolioIsEditing(state, userId));

  // userId will be given with the pages selector, so no need to pass it to children (...page)
  const pageContainers = pages.map(page => (
    <Page {...page} key={page.pageId.toString()} userId={userId} />
  ));

  const styling = {
    textAlign: "center",
    justifyContent: "center",
    flexDirection: "column",
  };

  return (
    <Flex as="main" sx={styling}>
      <Header username={userId} bio={bio} editing={editing} />
      {pageContainers}
    </Flex>
  );
};

// TODO: implement Multi Page Portfolio

export default SinglePagePortfolio;
