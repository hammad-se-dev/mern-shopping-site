import React, { useState, useEffect } from "react";
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  IconButton,
  HStack,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Text,
  useColorModeValue,
  VStack,
  Button,
  Tooltip,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { SearchIcon, CloseIcon, SettingsIcon } from "@chakra-ui/icons";
import { useProductStore } from "../store/product";

const SearchBar = () => {
  const [localSearchTerm, setLocalSearchTerm] = useState("");
  const [localFilters, setLocalFilters] = useState({
    minPrice: "",
    maxPrice: "",
    sortBy: "createdAt:desc",
    category: "all",
  });

  const { searchTerm, filters, setSearchTerm, setFilters, fetchProducts, categories, fetchCategories } =
    useProductStore();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const bg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Initialize local state with store values
  useEffect(() => {
    setLocalSearchTerm(searchTerm);
    setLocalFilters(filters);
  }, [searchTerm, filters]);

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (localSearchTerm !== searchTerm) {
        setSearchTerm(localSearchTerm);
        fetchProducts();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [localSearchTerm, searchTerm, setSearchTerm, fetchProducts]);

  const handleFilterChange = () => {
    setFilters(localFilters);
    fetchProducts();
    onClose();
  };

  const clearAll = () => {
    setLocalSearchTerm("");
    setLocalFilters({
      minPrice: "",
      maxPrice: "",
      sortBy: "createdAt:desc",
      category: "all",
    });
    setSearchTerm("");
    setFilters({
      minPrice: "",
      maxPrice: "",
      sortBy: "createdAt:desc",
      category: "all",
    });
    fetchProducts();
    onClose();
  };

  const hasActiveFilters =
    searchTerm ||
    filters.minPrice ||
    filters.maxPrice ||
    filters.sortBy !== "createdAt:desc" ||
    filters.category !== "all";

  return (
    <Box w="full">
      <HStack spacing={2} w="full">
        {/* Search Input */}
        <InputGroup size="md">
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.400" />
          </InputLeftElement>
          <Input
            placeholder="Search products..."
            value={localSearchTerm}
            onChange={(e) => setLocalSearchTerm(e.target.value)}
            bg={bg}
            borderColor={borderColor}
            _focus={{
              borderColor: "blue.400",
              boxShadow: "0 0 0 1px var(--chakra-colors-blue-400)",
            }}
          />
          <InputRightElement>
            <HStack spacing={2}>
              {localSearchTerm && (
                <IconButton
                  icon={<CloseIcon />}
                  variant="ghost"
                  size="sm"
                  onClick={() => setLocalSearchTerm("")}
                  aria-label="Clear search"
                />
              )}
            </HStack>
          </InputRightElement>
        </InputGroup>

        {/* Filter Button */}
        <Tooltip label="Advanced Filters" placement="bottom">
          <IconButton
            icon={<SettingsIcon />}
            colorScheme={hasActiveFilters ? "orange" : "blue"}
            variant="ghost"
            size="md"
            onClick={onOpen}
            aria-label="Filters"
          />
        </Tooltip>
      </HStack>

      {/* Filters Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader
            bgGradient="linear(to-r, cyan.400, blue.500)"
            bgClip="text"
          >
            Advanced Filters
          </DrawerHeader>

          <DrawerBody>
            <VStack spacing={6} pt={4}>
              {/* Category Filter */}
              <VStack align="start" w="full">
                <Text fontSize="sm" fontWeight="medium">
                  Category
                </Text>
                <Select
                  value={localFilters.category}
                  onChange={(e) =>
                    setLocalFilters({ ...localFilters, category: e.target.value })
                  }
                >
                  <option value="all">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </Select>
              </VStack>

              <VStack align="start" w="full">
                <Text fontSize="sm" fontWeight="medium">
                  Min Price
                </Text>
                <NumberInput
                  value={localFilters.minPrice}
                  onChange={(value) =>
                    setLocalFilters({ ...localFilters, minPrice: value })
                  }
                  min={0}
                  precision={2}
                  w="full"
                >
                  <NumberInputField placeholder="0.00" />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </VStack>

              <VStack align="start" w="full">
                <Text fontSize="sm" fontWeight="medium">
                  Max Price
                </Text>
                <NumberInput
                  value={localFilters.maxPrice}
                  onChange={(value) =>
                    setLocalFilters({ ...localFilters, maxPrice: value })
                  }
                  min={0}
                  precision={2}
                  w="full"
                >
                  <NumberInputField placeholder="1000.00" />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </VStack>

              <VStack align="start" w="full">
                <Text fontSize="sm" fontWeight="medium">
                  Sort By
                </Text>
                <Select
                  value={localFilters.sortBy}
                  onChange={(e) =>
                    setLocalFilters({ ...localFilters, sortBy: e.target.value })
                  }
                >
                  <option value="createdAt:desc">Newest First</option>
                  <option value="createdAt:asc">Oldest First</option>
                  <option value="name:asc">Name A-Z</option>
                  <option value="name:desc">Name Z-A</option>
                  <option value="price:asc">Price Low to High</option>
                  <option value="price:desc">Price High to Low</option>
                  <option value="category:asc">Category A-Z</option>
                </Select>
              </VStack>

              <VStack spacing={4} w="full" pt={4}>
                <Button
                  colorScheme="blue"
                  onClick={handleFilterChange}
                  w="full"
                  size="lg"
                >
                  Apply Filters
                </Button>
                {hasActiveFilters && (
                  <Button
                    variant="outline"
                    onClick={clearAll}
                    w="full"
                    size="lg"
                  >
                    Clear All Filters
                  </Button>
                )}
              </VStack>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default SearchBar;
