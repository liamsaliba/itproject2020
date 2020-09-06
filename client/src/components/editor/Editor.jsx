/** @jsx jsx */
import { jsx } from "theme-ui";

export default props => {
  let { userId: id } = props;
  return <main>this is the editor page of user {id}.</main>;
};
