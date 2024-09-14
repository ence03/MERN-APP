import {
  Container,
  VStack,
  Text,
  SimpleGrid,
  Box,
  Spinner,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      await fetchProducts();
      setLoading(false);
    };
    loadProducts();
  }, [fetchProducts]);

  console.log("products", products);

  return (
    <Container maxW="container.xl" py={12} bg="#f1f1f1">
      <VStack spacing={8}>
        <Text
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
          fontSize="3xl"
          fontWeight="extrabold"
        >
          Current Products
        </Text>

        {loading ? (
          <Spinner size="xl" />
        ) : products && products.length > 0 ? (
          <SimpleGrid columns={3} spacing={10} w={"full"}>
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </SimpleGrid>
        ) : (
          <Text
            fontSize={"xl"}
            textAlign={"center"}
            fontWeight={"bold"}
            color={"gray.500"}
          >
            No Products found{" "}
            <Link to="/create">
              <Text
                as={"span"}
                color={"blue.400"}
                _hover={{ textDecoration: "underline" }}
              >
                Create a product
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;
