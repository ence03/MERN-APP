import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuthStore } from "../store/authStore";

const LoginPage = () => {
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
  });

  const { login } = useAuthStore();
  const toast = useToast();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const { success, message } = await login(newUser);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        isClosable: true,
      });
      navigate("/");
    }
  };

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
          Login an account
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
              placeholder="Password"
              name="password"
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
            />
            <Button onClick={handleLogin} colorScheme="blue" w={"full"}>
              Login
            </Button>
            <Link to="/register">Don't have an account?</Link>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default LoginPage;
