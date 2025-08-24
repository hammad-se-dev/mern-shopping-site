import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useToast,
  Alert,
  AlertIcon,
  Container,
  Heading,
  Text,
  useColorModeValue,
  Icon,
  HStack,
  Select,
  Textarea,
} from "@chakra-ui/react";
import { useProductStore } from "../store/product";
import { motion } from "framer-motion";
import { PlusSquareIcon } from "@chakra-ui/icons";

const MotionBox = motion(Box);

const CreatePage = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    category: "",
    description: "",
  });

  const navigate = useNavigate();
  const toast = useToast();
  const { createProduct, loading, error, clearError, categories, fetchCategories } = useProductStore();
  
  const bg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();

    const result = await createProduct({
      ...formData,
      price: parseFloat(formData.price),
    });

    if (result.success) {
      toast({
        title: "Success",
        description: result.message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/");
    } else {
      toast({
        title: "Error",
        description: result.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Container maxW="container.md" py={12}>
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <VStack spacing={8}>
          <VStack spacing={4} textAlign="center">
            <Icon as={PlusSquareIcon} w={12} h={12} color="blue.500" />
            <Heading
              size="xl"
              bgGradient="linear(to-r, cyan.400, blue.500, purple.500)"
              bgClip="text"
            >
              Create New Product
            </Heading>
            <Text color="gray.500" fontSize="lg">
              Add a new product to your store
            </Text>
          </VStack>

          <Box
            w="full"
            maxW="md"
            bg={bg}
            rounded="xl"
            shadow="xl"
            border="1px"
            borderColor={borderColor}
            p={8}
          >
            <VStack spacing={6} as="form" onSubmit={handleSubmit}>
              {error && (
                <Alert status="error" rounded="lg">
                  <AlertIcon />
                  {error}
                </Alert>
              )}

              <FormControl isRequired>
                <FormLabel fontWeight="bold" color="gray.700">
                  Product Name
                </FormLabel>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter product name"
                  size="lg"
                  focusBorderColor="blue.400"
                  _hover={{ borderColor: "blue.300" }}
                  transition="all 0.2s"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel fontWeight="bold" color="gray.700">
                  Category
                </FormLabel>
                <Select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="Select category"
                  size="lg"
                  focusBorderColor="blue.400"
                  _hover={{ borderColor: "blue.300" }}
                  transition="all 0.2s"
                >
                  <option value="Electronics">Electronics</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Books">Books</option>
                  <option value="Home & Garden">Home & Garden</option>
                  <option value="Sports">Sports</option>
                  <option value="Beauty">Beauty</option>
                  <option value="Toys">Toys</option>
                  <option value="Automotive">Automotive</option>
                  <option value="Health">Health</option>
                  <option value="Food & Beverages">Food & Beverages</option>
                  <option value="Other">Other</option>
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel fontWeight="bold" color="gray.700">
                  Price
                </FormLabel>
                <Input
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Enter price"
                  size="lg"
                  focusBorderColor="blue.400"
                  _hover={{ borderColor: "blue.300" }}
                  transition="all 0.2s"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel fontWeight="bold" color="gray.700">
                  Image URL
                </FormLabel>
                <Input
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="Enter image URL"
                  size="lg"
                  focusBorderColor="blue.400"
                  _hover={{ borderColor: "blue.300" }}
                  transition="all 0.2s"
                />
              </FormControl>

              <FormControl>
                <FormLabel fontWeight="bold" color="gray.700">
                  Description
                </FormLabel>
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter product description (optional)"
                  size="lg"
                  focusBorderColor="blue.400"
                  _hover={{ borderColor: "blue.300" }}
                  transition="all 0.2s"
                  rows={3}
                />
              </FormControl>

              <Button
                type="submit"
                colorScheme="blue"
                size="lg"
                width="full"
                isLoading={loading}
                loadingText="Creating Product..."
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "xl",
                }}
                transition="all 0.2s"
                bgGradient="linear(to-r, blue.400, purple.500)"
                _hover={{
                  bgGradient: "linear(to-r, blue.500, purple.600)",
                }}
              >
                Create Product
              </Button>
            </VStack>
          </Box>
        </VStack>
      </MotionBox>
    </Container>
  );
};

export default CreatePage;
