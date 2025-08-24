import React from "react";
import {
  Box,
  Container,
  Stack,
  Text,
  Link,
  useColorModeValue,
  HStack,
  VStack,
  Divider,
  Icon,
  SimpleGrid,
} from "@chakra-ui/react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaHeart } from "react-icons/fa";

const Footer = () => {
  const bg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.600", "gray.400");
  const headingColor = useColorModeValue("gray.800", "white");

  const currentYear = new Date().getFullYear();

  return (
    <Box bg={bg} borderTop="1px" borderColor={borderColor} mt="auto">
      <Container maxW="container.xl" py={8}>
        <Stack spacing={8}>
          {/* Main Footer Content */}
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
            {/* Company Info */}
            <VStack align="start" spacing={4}>
              <Text
                fontSize="xl"
                fontWeight="bold"
                bgGradient="linear(to-r, brand.600, purple.600)"
                bgClip="text"
              >
                Product Store
              </Text>
              <Text color={textColor} fontSize="sm" lineHeight="tall">
                Professional product management system for administrators.
                Monitor, manage, and maintain your product catalog efficiently.
              </Text>
            </VStack>

            {/* Quick Links */}
            <VStack align="start" spacing={4}>
              <Text fontSize="lg" fontWeight="bold" color={headingColor}>
                Quick Links
              </Text>
              <VStack align="start" spacing={2}>
                <Link
                  color={textColor}
                  fontSize="sm"
                  _hover={{ color: "brand.500", textDecoration: "none" }}
                  transition="color 0.2s"
                >
                  Dashboard
                </Link>
                <Link
                  color={textColor}
                  fontSize="sm"
                  _hover={{ color: "brand.500", textDecoration: "none" }}
                  transition="color 0.2s"
                >
                  Products
                </Link>
                <Link
                  color={textColor}
                  fontSize="sm"
                  _hover={{ color: "brand.500", textDecoration: "none" }}
                  transition="color 0.2s"
                >
                  Analytics
                </Link>
                <Link
                  color={textColor}
                  fontSize="sm"
                  _hover={{ color: "brand.500", textDecoration: "none" }}
                  transition="color 0.2s"
                >
                  Settings
                </Link>
              </VStack>
            </VStack>

            {/* Contact Info */}
            <VStack align="start" spacing={4}>
              <Text fontSize="lg" fontWeight="bold" color={headingColor}>
                Contact
              </Text>
              <VStack align="start" spacing={2}>
                <HStack spacing={2}>
                  <Icon as={FaEnvelope} color="brand.500" />
                  <Text fontSize="sm" color={textColor}>
                    admin@productstore.com
                  </Text>
                </HStack>
                <HStack spacing={2}>
                  <Icon as={FaPhone} color="brand.500" />
                  <Text fontSize="sm" color={textColor}>
                    +1 (555) 987-6543
                  </Text>
                </HStack>
                <HStack spacing={2}>
                  <Icon as={FaMapMarkerAlt} color="brand.500" />
                  <Text fontSize="sm" color={textColor}>
                    Admin Center, Business City
                  </Text>
                </HStack>
              </VStack>
            </VStack>
          </SimpleGrid>

          <Divider borderColor={borderColor} />

          {/* Bottom Section */}
          <Stack
            direction={{ base: "column", md: "row" }}
            justify="space-between"
            align="center"
            spacing={4}
          >
            <Text color={textColor} fontSize="sm">
              © {currentYear} Product Store. All rights reserved.
            </Text>

            <HStack spacing={4}>
              <Text color={textColor} fontSize="sm">
                Built with <Icon as={FaHeart} color="red.500" mx={1} />
                for administrators
              </Text>
            </HStack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
