/** @jsx jsx */
import { jsx } from "theme-ui";

export default props => {
  const { userId: id } = props;
  return <main>this is the userpage of user {id}.</main>;
};
