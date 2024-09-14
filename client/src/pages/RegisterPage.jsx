import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import React, { useState } from "react";

const RegisterPage = () => {
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading
          as={"h4"}
          size={"lg"}
          textAlign={"center"}
          my={8}
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
        >
          Register an account
        </Heading>
        <Box w={"50%"} p={4} shadow={"md"}>
          <VStack spacing={4}>
            <Input
              placeholder="Username"
              name="username"
              value={newUser.username}
              onChange={(e) =>
                setNewUser({ ...newUser, username: e.target.value })
              }
            />
            <Input
              placeholder="Email"
              name="email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
            />
            <Input
              placeholder="Password"
              name="password"
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
            />
            <Button colorScheme="blue" w={"full"}>
              Register
            </Button>
            <Link to="/login">Already have an account?</Link>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default RegisterPage;
