import { Container, Flex, HStack, Text, Button } from "@chakra-ui/react";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { useAuthStore } from "../store/authStore";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Container maxW={"1440px"} px={4} boxShadow="base">
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row",
        }}
      >
        <Text
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
          fontSize="4xl"
          fontWeight="extrabold"
        >
          <Link to="/">Product Store</Link>
        </Text>
        <HStack spacing={2} alignItems={"center"}>
          {isAuthenticated ? (
            <>
              <Text>Welcome, {user?.username || "User"}</Text>
              <Button onClick={handleLogout}>Logout</Button>
              <Link to="/create">
                <Button>
                  <PlusSquareIcon fontSize={25} />
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button>Login</Button>
              </Link>
              <Link to="/register">
                <Button>Register</Button>
              </Link>
            </>
          )}
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
