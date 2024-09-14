import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useAuthStore } from "../store/authStore";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const toast = useToast();
  const { register } = useAuthStore();

  const handleRegister = async (newUser) => {
    const { success, message } = await register(newUser);
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
      navigate("/login");
      setNewUser({ username: "", email: "", password: "" });
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
            <Button
              onClick={() => handleRegister(newUser)}
              colorScheme="blue"
              w={"full"}
            >
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
