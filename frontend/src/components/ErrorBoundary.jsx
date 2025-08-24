import React from "react";
import { Box, Text, Button, VStack } from "@chakra-ui/react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box textAlign="center" py={10}>
          <VStack spacing={4}>
            <Text fontSize="xl" fontWeight="bold" color="red.500">
              Something went wrong!
            </Text>
            <Text color="gray.600">
              {this.state.error?.message || "An unexpected error occurred"}
            </Text>
            <Button colorScheme="blue" onClick={() => window.location.reload()}>
              Reload Page
            </Button>
          </VStack>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
