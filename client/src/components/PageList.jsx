/** @jsx jsx */
import { jsx, Flex } from "theme-ui";

import { useState } from "react";
import { Icon, Modal, Menu, Grid, Dropdown } from "semantic-ui-react";

export default function PageList({ pages }) {
  const [activeItem, setActive] = useState("Home");
  const [open, setOpen] = useState(false);
  const handlePageClick = (e, page) => {
    setActive(activeItem === { page });
  };

  const items = pages.map(page => (
    <Menu.Item
      name={page}
      active={activeItem === { page }}
      onClick={handlePageClick}
    >
      <span>
        <Grid>
          <Grid.Column floated="left" width={5}>
            {page}
          </Grid.Column>
          <Grid.Column floated="right" width={3}>
            <Dropdown right aligned floating inline direction="left">
              <Dropdown.Menu>
                <Dropdown.Item><Icon name="cursor" fitted /> Rename Page</Dropdown.Item>
                <Dropdown.Item><Icon name="trash" fitted /> Delete Page</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Grid.Column>
        </Grid>
      </span>
    </Menu.Item>
  ));
  const newPage = (
    <Modal
      closeOnDimmerClick={false}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size="FullScreen"
      actions={["Cancel", { key: "add", content: "Add", positive: true }]}
      trigger={
        <Menu.Item
            name="Create Page"
            active={activeItem === "Create Page"}
            onClick={handlePageClick}
          >
           <Button primary>
              <Icon.Group fitted sx={{ mr: "0.5em" }}>
                <Icon name="file text" />
                <Icon corner name="add" />
              </Icon.Group>
              Create Page
            </Button>
          </Menu.Item>
      }
    ></Modal>
  );

  return (
    <Flex sx={{ justifyContent: "center" }}>
      <Menu secondary vertical>
        {items}
        {newPage}
      </Menu>
    </Flex>
  );
}
