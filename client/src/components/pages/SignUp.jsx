/** @jsx jsx */
import { jsx, Label, Input, Box, Checkbox, Button } from "theme-ui";

export default () => {
  return (
    <Box
      as="form"
      pb={3}
      onSubmit={e => e.preventDefault()}
      sx={{ width: "100%", maxWidth: "500px" }}
    >
      <Label htmlFor="username">Username</Label>
      <Input name="username" mb={3} />
      <Label htmlFor="password">Password</Label>
      <Input type="password" name="password" mb={3} />
      <Box>
        <Label mb={3}>
          <Checkbox />
          Remember me
        </Label>
      </Box>
      <Button>Submit</Button>
    </Box>
  );
};
