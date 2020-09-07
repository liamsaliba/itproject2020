/** @jsx jsx */
import { jsx, Label, Input, Box, Checkbox, Button } from "theme-ui";

export default () => {
  return (
    <Box
      as="form"
      pb={3}
      onSubmit={e => e.preventDefault()}
      sx={{
        position:"absolute", 
        top: "50%", 
        left:'50%', 
        transform: 'translate(-50%,-50%)', 
        textAlign:'center', 
        justifyContent: 'center'}}
    >
      <Label htmlFor="First Name">First Name</Label>
      <Input name="firstName" mb={1} />

      <Label htmlFor="Last Name">Last Name</Label>
      <Input name="lastName" mb={1} />

      <Label htmlFor="email">email</Label>
      <Input name="email" mb={1} />

      <Label htmlFor="username">Username</Label>
      <Input name="username" mb={1} />

      <Label htmlFor="password">Password</Label>
      <Input type="password" name="password" mb={1} />

      <Label htmlFor="confirm password">Confirm Password</Label>
      <Input type="confirmPassword" name="confirmPassword" mb={3} />

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
