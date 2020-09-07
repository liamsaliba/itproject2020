/** @jsx jsx */
import { jsx, Styled } from "theme-ui";
import {
  NavLink,
  Divider,
  Box,
  Button,
  Card,
  Text,
  Label,
  Flex,
  Checkbox,
  Select,
  Textarea,
  Radio,
  Input,
  Link,
  Badge,
  Alert,
} from "theme-ui";

export default () => (
  <Styled.root>
    <Styled.h1>Example Components</Styled.h1>
    <Divider />
    <Styled.h2>Buttons</Styled.h2>
    <Button variant="primary" m={10}>
      Default
    </Button>
    <Button variant="danger" m={10}>
      Danger
    </Button>
    <Button variant="info" m={10}>
      Info
    </Button>
    <Button variant="warning" m={10}>
      Warning
    </Button>
    <Button variant="success" m={10}>
      Success
    </Button>

    <Divider />

    <Styled.h2>Form elements</Styled.h2>

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
      <Label htmlFor="sound">Sound</Label>
      <Select name="sound" mb={3}>
        <option>Beep</option>
        <option>Boop</option>
        <option>Blip</option>
      </Select>
      <Label htmlFor="comment">Comment</Label>
      <Textarea name="comment" rows="6" mb={3} />
      <Flex mb={3}>
        <Label>
          <Radio name="letter" /> Alpha
        </Label>
        <Label>
          <Radio name="letter" /> Bravo
        </Label>
        <Label>
          <Radio name="letter" /> Charlie
        </Label>
      </Flex>
      <Button>Submit</Button>
    </Box>

    <Divider />

    <Styled.h2>Links</Styled.h2>

    <Box pb={20}>
      <Link href="#!">Hello</Link>
    </Box>

    <Divider />

    <Styled.h2>Badges</Styled.h2>

    <Box pb={20}>
      <Badge variant="accent">New</Badge>
      <Badge variant="outline" ml={2}>
        Cool
      </Badge>
    </Box>

    <Divider />
    <Styled.h2>Alerts</Styled.h2>

    <Box pb={20}>
      <Alert variant="danger" m={10}>
        Danger
      </Alert>
      <Alert variant="info" m={10}>
        Info
      </Alert>
      <Alert variant="warning" m={10}>
        Warning
      </Alert>
      <Alert variant="success" m={10}>
        Success
      </Alert>
    </Box>

    <Divider />

    <Styled.h2>Navigation</Styled.h2>

    <Box pb={20}>
      <Flex as="nav">
        <NavLink href="#!" p={2}>
          Home
        </NavLink>
        <NavLink href="#!" p={2}>
          Blog
        </NavLink>
        <NavLink href="#!" p={2}>
          About
        </NavLink>
      </Flex>
    </Box>

    <Divider />

    <Styled.h2>Table</Styled.h2>

    <table style={{ paddingBottom: 20 }}>
      <thead>
        <tr>
          <th colSpan="2">The table header</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>The table body</td>
          <td>with two columns</td>
        </tr>
      </tbody>
    </table>

    <Divider />

    <Styled.h2>Card</Styled.h2>

    <Card
      mb={5}
      sx={{
        maxWidth: 400,
        padding: "30px",
      }}
    >
      <Text>
        Cupcake ipsum dolor sit amet chocolate bar. Apple pie macaron muffin
        jelly candy cake soufflé muffin croissant. Gummies jelly beans cotton
        candy fruitcake. Wafer lemon drops soufflé cookie. Sesame snaps
        fruitcake cheesecake danish toffee marzipan biscuit.
      </Text>
    </Card>

    <Divider />
  </Styled.root>
);
