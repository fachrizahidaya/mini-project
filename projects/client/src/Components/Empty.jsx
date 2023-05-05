import { Box, Image } from "@chakra-ui/react";
import logo from "../assets/empty.png";

export const Empty = () => {
  return (
    <Box textAlign="center" py={8}>
      <Image src={logo} maxW="300px" mx="auto" alt="No data found" />
    </Box>
  );
};
