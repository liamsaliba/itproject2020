/** @jsx jsx */
import { jsx, Box, Label, Input, Button } from "theme-ui";
export default (props) => (
  <Box sx={{ mb: 4 }}>
    <Label htmlFor="search">Search</Label>
    <Input id="search" name="search" {...props} />
    <Button>Go</Button>
  </Box>
);
