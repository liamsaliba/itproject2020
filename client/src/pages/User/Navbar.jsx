/** @jsx jsx */
import { createMedia } from "@artsy/fresnel";

import { jsx } from "theme-ui";
import { ProfileDropdown, Navbar, MenuCamel } from "../../components";
import { useSelector } from "react-redux";
import { selectPortfolioPages, selectToken } from "../../store";

const NavItem = ({ page }) => (
  <Navbar.Item key={page.pageId} to={`#${page.name}`}>
    {page.name}
  </Navbar.Item>
);

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    mobile: 0,
    tablet: 768,
    computer: 1024,
  },
});

export default props => {
  const token = useSelector(selectToken);
  const { userId } = props;
  const pages = useSelector(state => selectPortfolioPages(state, userId));

  const menuItems =
    pages.length > 10
      ? pages
          .slice(0, 10)
          .map(page => <NavItem page={page} />)
          .concat([<Navbar.Item>...</Navbar.Item>])
      : pages.map(page => <NavItem page={page} />);

  return (
    <MediaContextProvider>
      <Media greaterThan="mobile">
        <Navbar>
          <Navbar.Left>
            <MenuCamel />
          </Navbar.Left>
          <Navbar.Center>
            <Navbar.Item to="#">{userId}</Navbar.Item>
            <span sx={{ p: "0.4em" }}>|</span>
            {menuItems}
          </Navbar.Center>
          <Navbar.Right>
            {token && <ProfileDropdown items="default" />}
          </Navbar.Right>
        </Navbar>
      </Media>

      <Media at="mobile"></Media>
    </MediaContextProvider>
  );
};
