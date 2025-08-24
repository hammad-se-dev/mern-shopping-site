import React from "react";
import {
  Spinner,
  Center,
  Text,
  VStack,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const LoadingSpinner = ({ message = "Loading..." }) => {
  const bg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Center py={20}>
      <MotionBox
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Box
          bg={bg}
          p={8}
          rounded="xl"
          shadow="xl"
          border="1px"
          borderColor={borderColor}
        >
          <VStack spacing={6}>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
            <Text color="gray.600" fontSize="lg" fontWeight="medium">
              {message}
            </Text>
          </VStack>
        </Box>
      </MotionBox>
    </Center>
  );
};

export default LoadingSpinner;
