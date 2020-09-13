/** @jsx jsx */
import { jsx, Label, Input, Box, Button, Styled } from "theme-ui";

import { useHistory } from "react-router-dom";

export default () => {
  // const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("un");
    if (username === "") return;
    history.push("/u/" + username);
  };
  return (
    <Box as="form" onSubmit={handleSubmit}>
      <Styled.h2>Find a portfolio</Styled.h2>
      <br />
      <Label htmlFor="un">Username</Label>
      <Input name="un" mb={3} />
      <Button>Go</Button>
      {/* {auth.loading ? <Spinner /> : null} */}
    </Box>
  );
};
