/** @jsx jsx */
import {
  jsx,
  Label,
  Input,
  Box,
  Checkbox,
  Button,
  Styled,
  Spinner,
} from "theme-ui";
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../store";

import { Link, Title } from "../../components";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

export default () => {
  const userId = useParams().userId || "";
  const dispatch = useDispatch();
  const history = useHistory();
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    if (auth.error) {
      toast.error("Unable to create user account. " + auth.error);
    }
  }, [auth.error]);

  useEffect(() => {
    if (auth.token) {
      history.push("/editor");
      toast("Created new account!");
    }
  }, [auth.token, history]);

  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    if (formData.get("confirmPassword") !== formData.get("password")) {
      toast.error("Password does not match.");
      return;
    }
    dispatch(
      signup(
        formData.get("firstName"),
        formData.get("lastName"),
        formData.get("email"),
        formData.get("username"),
        formData.get("password")
      )
    );

    // dispatch(signup(firstName, lastName, email, username, password));
  };

  return (
    <Box as="form" pb={3} onSubmit={handleSubmit}>
      <Title>Login</Title>

      <Styled.h2>Sign up</Styled.h2>
      <br />
      <Label htmlFor="firstName">First Name</Label>
      <Input name="firstName" mb={1} />

      <Label htmlFor="lastName">Last Name</Label>
      <Input name="lastName" mb={1} />

      <Label htmlFor="email">Email</Label>
      <Input name="email" mb={1} />

      <Label htmlFor="username">Username</Label>
      <Input name="username" mb={1} defaultValue={userId} />

      <Label htmlFor="password">Password</Label>
      <Input type="password" name="password" mb={1} />

      <Label htmlFor="confirm password">Confirm Password</Label>
      <Input type="password" name="confirmPassword" mb={3} />

      <Box>
        <Label mb={3}>
          <Checkbox />
          Remember me
        </Label>
      </Box>
      <Button>Submit</Button>
      {auth.loading ? <Spinner /> : null}
      <Link to="/login" sx={{ ml: 4 }}>
        {"Have an account? Log in"}
      </Link>
    </Box>
  );
};
