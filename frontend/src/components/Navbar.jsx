import {
  Button,
  Container,
  Flex,
  HStack,
  Text,
  useColorMode,
  Box,
  useColorModeValue,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const brandColor = useColorModeValue("brand.600", "brand.400");

  return (
    <Box
      bg={bg}
      borderBottom="1px"
      borderColor={borderColor}
      position="sticky"
      top={0}
      zIndex={10}
      backdropFilter="blur(10px)"
      boxShadow="sm"
    >
      <Container maxW="container.xl">
        <Flex justify="space-between" align="center" py={4}>
          {/* Logo */}
          <Link to="/">
            <Text
              fontSize="2xl"
              fontWeight="bold"
              color={brandColor}
              cursor="pointer"
              _hover={{ color: "brand.700" }}
              transition="color 0.2s"
            >
              Product Store
            </Text>
          </Link>

          {/* Search Bar */}
          <Box flex={1} maxW="600px" mx={8}>
            <SearchBar />
          </Box>

          {/* Actions */}
          <HStack spacing={4}>
            <Link to="/create">
              <Button
                leftIcon={<PlusSquareIcon />}
                colorScheme="brand"
                variant="solid"
                size="md"
                _hover={{ transform: "translateY(-1px)", boxShadow: "md" }}
                transition="all 0.2s"
              >
                Add Product
              </Button>
            </Link>

            <Tooltip
              label={`Switch to ${
                colorMode === "light" ? "dark" : "light"
              } mode`}
            >
              <IconButton
                onClick={toggleColorMode}
                icon={colorMode === "light" ? <IoMoon /> : <LuSun />}
                variant="ghost"
                size="md"
                aria-label="Toggle color mode"
                color={useColorModeValue("gray.600", "gray.300")}
                _hover={{
                  bg: useColorModeValue("gray.100", "gray.700"),
                  color: brandColor,
                }}
              />
            </Tooltip>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
