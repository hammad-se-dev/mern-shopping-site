import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
  Badge,
  Flex,
  Tooltip,
  FormControl,
  FormLabel,
  Select,
  Textarea,
} from "@chakra-ui/react";
import { useProductStore } from "../store/product";
import { useState } from "react";

const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const { deleteProduct, updateProduct } = useProductStore();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isViewOpen,
    onOpen: onViewOpen,
    onClose: onViewClose,
  } = useDisclosure();

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleUpdateProduct = async (pid, updatedProduct) => {
    const { success, message } = await updateProduct(pid, updatedProduct);
    onClose();
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: "Product updated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      bg={bg}
      border="1px"
      borderColor={borderColor}
      rounded="xl"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{
        shadow: "xl",
        transform: "translateY(-4px)",
        borderColor: "brand.300",
      }}
    >
      {/* Product Image */}
      <Box position="relative" cursor="pointer" onClick={onViewOpen}>
        <Image
          src={product.image}
          alt={product.name}
          w="full"
          h="200px"
          objectFit="cover"
          transition="transform 0.3s"
          _hover={{ transform: "scale(1.05)" }}
        />
        <Badge
          position="absolute"
          top={3}
          right={3}
          colorScheme="brand"
          variant="solid"
          rounded="full"
          px={3}
          py={1}
        >
          {product.category}
        </Badge>
      </Box>

      {/* Product Info */}
      <Box p={6}>
        <VStack spacing={4} align="stretch">
          <Heading as="h3" size="md" mb={2} color={textColor}>
            {product.name}
          </Heading>

          {product.description && (
            <Text color={textColor} fontSize="sm" noOfLines={2}>
              {product.description}
            </Text>
          )}

          <Flex justify="space-between" align="center">
            <Text fontWeight="bold" fontSize="2xl" color="brand.600">
              ${product.price}
            </Text>

            <HStack spacing={2}>
              <Tooltip label="View Details" placement="top">
                <IconButton
                  icon={<EditIcon />}
                  onClick={onViewOpen}
                  size="sm"
                  colorScheme="brand"
                  variant="ghost"
                  _hover={{ bg: "brand.50", color: "brand.700" }}
                />
              </Tooltip>

              <Tooltip label="Edit Product" placement="top">
                <IconButton
                  icon={<EditIcon />}
                  onClick={onOpen}
                  size="sm"
                  colorScheme="accent"
                  variant="ghost"
                  _hover={{ bg: "accent.50", color: "accent.700" }}
                />
              </Tooltip>

              <Tooltip label="Delete Product" placement="top">
                <IconButton
                  icon={<DeleteIcon />}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteProduct(product._id);
                  }}
                  size="sm"
                  colorScheme="red"
                  variant="ghost"
                  _hover={{ bg: "red.50", color: "red.700" }}
                />
              </Tooltip>
            </HStack>
          </Flex>
        </VStack>
      </Box>

      {/* Product View Modal */}
      <Modal isOpen={isViewOpen} onClose={onViewClose} size="lg">
        <ModalOverlay />
        <ModalContent rounded="xl">
          <ModalHeader color="brand.600">Product Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <Image
                src={product.image}
                alt={product.name}
                w="full"
                h="300px"
                objectFit="cover"
                rounded="lg"
              />
              <Box>
                <Heading size="lg" mb={2} color={textColor}>
                  {product.name}
                </Heading>
                <Badge colorScheme="brand" mb={3} rounded="full" px={3}>
                  {product.category}
                </Badge>
                <Text fontSize="xl" fontWeight="bold" color="brand.600" mb={3}>
                  ${product.price}
                </Text>
                {product.description && (
                  <Text color={textColor}>{product.description}</Text>
                )}
              </Box>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="brand" mr={3} onClick={onOpen}>
              Edit Product
            </Button>
            <Button variant="ghost" onClick={onViewClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Update Product Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent rounded="xl">
          <ModalHeader color="brand.600">Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} py={4}>
              <FormControl isRequired>
                <FormLabel>Product Name</FormLabel>
                <Input
                  placeholder="Product Name"
                  name="name"
                  value={updatedProduct.name}
                  onChange={(e) =>
                    setUpdatedProduct({
                      ...updatedProduct,
                      name: e.target.value,
                    })
                  }
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Price</FormLabel>
                <Input
                  placeholder="Price"
                  name="price"
                  type="number"
                  value={updatedProduct.price}
                  onChange={(e) =>
                    setUpdatedProduct({
                      ...updatedProduct,
                      price: parseFloat(e.target.value),
                    })
                  }
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Category</FormLabel>
                <Select
                  value={updatedProduct.category}
                  onChange={(e) =>
                    setUpdatedProduct({
                      ...updatedProduct,
                      category: e.target.value,
                    })
                  }
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

              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea
                  placeholder="Product Description"
                  name="description"
                  value={updatedProduct.description || ""}
                  onChange={(e) =>
                    setUpdatedProduct({
                      ...updatedProduct,
                      description: e.target.value,
                    })
                  }
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Image URL</FormLabel>
                <Input
                  placeholder="Image URL"
                  name="image"
                  value={updatedProduct.image}
                  onChange={(e) =>
                    setUpdatedProduct({
                      ...updatedProduct,
                      image: e.target.value,
                    })
                  }
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="brand"
              mr={3}
              onClick={() => handleUpdateProduct(product._id, updatedProduct)}
            >
              Update
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;
