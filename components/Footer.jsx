import { Box, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box
      textAlign="center"
      p="5"
      color="gray.600"
      borderTop="1px"
      borderColor="gray.100"
    >
      &copy; 2022 Cleo Premium,
      <Text display="inline-block" color="blue.700" fontWeight="bold">
        Tolgahan T
      </Text>{" "}
      - This project is a demo project with Bayut API
    </Box>
  );
};

export default Footer;
