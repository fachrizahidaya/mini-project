import { Box, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { ProfileCard } from "../Components/Profile/Card";
import { Outlet } from "react-router-dom";

export const Profile = () => {
  const [content, setContent] = useState(null);
  function handleData(data) {
    setContent(data);
  }

  return (
    <Flex
      direction="row"
      justify="center"
      gap="4"
      pt={{ md: "20", base: "16" }}
      display={{ md: "flex", base: "block" }}
    >
      <Box
        h="full"
        position={{ md: "sticky", base: "relative" }}
        top={{ md: "20", base: "none" }}
        maxW={{ md: "350px", base: "750px" }}
        w={"full"}
        p="4"
      >
        <ProfileCard onData={handleData} />
      </Box>
      <Box maxW="700px" w="full">
        <Outlet />
      </Box>
    </Flex>
  );
};
