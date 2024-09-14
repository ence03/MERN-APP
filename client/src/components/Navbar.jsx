import { Container, Flex, HStack, Text, Button } from "@chakra-ui/react";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import React from "react";

const Navbar = () => {
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
          <Link to="/create">
            <Button>
              <PlusSquareIcon fontSize={25} />
            </Button>
          </Link>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
