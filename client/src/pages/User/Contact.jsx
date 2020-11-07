/** @jsx jsx */
import {
  jsx,
  Flex,
  Styled,
  Label,
  Input,
  Box,
  Button,
  Textarea,
} from "theme-ui";
import axios from "axios";

import { useForm } from "react-hook-form";
import { endpoints } from "../../store";
import { Icon } from "semantic-ui-react";
import { useState } from "react";

const Heading = () => {
  return (
    <Flex sx={{ mt:"2em" ,alignItems: "center" }}>
      <Styled.h2
        id="contact-heading"
        sx={{ flex: 4, justifyContent: "center", wordBreak: "break-all" }}
      >
        Contact
      </Styled.h2>
    </Flex>
  );
};

export const ContactForm = ({ userId, homeBtn }) => {
  const { register, handleSubmit } = useForm();
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = data => {
    const payload = { ...data, username: userId }; // userId

    console.log(payload);

    // lazy
    axios
      .post(endpoints.contact, payload)
      .then(res => {
        // console.log(res);
        // console.log(res.data);
        setSubmitted(true);
      })
      .catch(err => {
        console.warn(err.message);
        console.warn(err.response);
      });
  };

  return (
    <Flex
      sx={{
        textAlign: "center",
        m: "0em 2em",
        mb: "3em", // space between sections
        transition: "all 0.3s",
        minHeight: "10em",
        flex: 1,
        justifyContent: "flex-start",
        flexDirection: "column",
      }}
      id="contact-form"
    >
      <Heading />
      {submitted ? (
        <Box as="h2">
          <Icon name="checkmark" />
          <p>Thanks! I'll get back to you soon.</p>
          {homeBtn}
        </Box>
      ) : (
        <Box as="form" onSubmit={handleSubmit(onSubmit)}>
          <Styled.p>
            Enter your details and a message to get in contact with me!
          </Styled.p>
          <Label htmlFor="name">Name</Label>
          <Input
            required
            placeholder="Scott Marketing"
            name="name"
            id="name"
            ref={register({ required: true })}
          />
          <Label htmlFor="email">Email</Label>
          <Input
            name="email"
            id="email"
            type="email"
            required
            placeholder="scott.marketing@hotmail.me"
            ref={register({ required: true })}
          />
          <Label htmlFor="message">Message</Label>
          <Textarea
            required
            name="message"
            id="message"
            rows="6"
            mb={3}
            ref={register({ required: true })}
          />
          <Button type="submit">
            <Icon name="send" />
            Send
          </Button>
        </Box>
      )}
    </Flex>
  );
};

export default ContactForm;
