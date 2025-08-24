import {
  Container,
  SimpleGrid,
  Text,
  VStack,
  Alert,
  AlertIcon,
  Box,
  useColorModeValue,
  HStack,
  Icon,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Button,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { ViewIcon } from "@chakra-ui/icons";

const HomePage = () => {
  const { products, loading, error, fetchProducts } = useProductStore();
  const bg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const headingColor = useColorModeValue("gray.800", "white");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        {/* Header */}
        <Box textAlign="center">
          <Text
            fontSize="4xl"
            fontWeight="bold"
            color={headingColor}
            mb={4}
            bgGradient="linear(to-r, brand.600, purple.600)"
            bgClip="text"
          >
            Product Management
          </Text>
          <Text fontSize="lg" color={textColor} maxW="2xl" mx="auto">
            Manage your product catalog with ease. Add, edit, and organize your
            products efficiently.
          </Text>
        </Box>

        {/* Stats */}
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
          <Box
            bg={bg}
            p={6}
            rounded="xl"
            border="1px"
            borderColor={borderColor}
            boxShadow="sm"
            _hover={{ transform: "translateY(-2px)", boxShadow: "md" }}
            transition="all 0.2s"
          >
            <Stat>
              <StatLabel color={textColor}>Total Products</StatLabel>
              <StatNumber color="brand.600">{products.length}</StatNumber>
              <StatHelpText color="accent.500">Active catalog</StatHelpText>
            </Stat>
          </Box>
          <Box
            bg={bg}
            p={6}
            rounded="xl"
            border="1px"
            borderColor={borderColor}
            boxShadow="sm"
            _hover={{ transform: "translateY(-2px)", boxShadow: "md" }}
            transition="all 0.2s"
          >
            <Stat>
              <StatLabel color={textColor}>Categories</StatLabel>
              <StatNumber color="purple.600">
                {new Set(products.map((p) => p.category)).size}
              </StatNumber>
              <StatHelpText color="brand.500">Organized</StatHelpText>
            </Stat>
          </Box>
          <Box
            bg={bg}
            p={6}
            rounded="xl"
            border="1px"
            borderColor={borderColor}
            boxShadow="sm"
            _hover={{ transform: "translateY(-2px)", boxShadow: "md" }}
            transition="all 0.2s"
          >
            <Stat>
              <StatLabel color={textColor}>Total Value</StatLabel>
              <StatNumber color="accent.600">
                ${products.reduce((sum, p) => sum + p.price, 0).toFixed(2)}
              </StatNumber>
              <StatHelpText color="gray.500">Inventory value</StatHelpText>
            </Stat>
          </Box>
        </SimpleGrid>

        {/* Error Alert */}
        {error && (
          <Alert status="error" rounded="lg">
            <AlertIcon />
            {error}
          </Alert>
        )}

        {/* Products Grid */}
        {products.length === 0 ? (
          <Box textAlign="center" py={12}>
            <Icon as={ViewIcon} w={16} h={16} color="gray.400" mb={4} />
            <Text fontSize="xl" color="gray.500" mb={4}>
              No products found
            </Text>
            <Text color={textColor} mb={6}>
              Get started by adding your first product to the catalog.
            </Text>
            <Link to="/create">
              <Button
                colorScheme="brand"
                size="lg"
                _hover={{ transform: "translateY(-1px)", boxShadow: "lg" }}
                transition="all 0.2s"
              >
                Add Your First Product
              </Button>
            </Link>
          </Box>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </SimpleGrid>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;
