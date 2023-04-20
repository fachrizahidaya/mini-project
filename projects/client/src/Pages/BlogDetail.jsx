import { Box, Flex } from "@chakra-ui/react";
import { BlogRead } from "../Components/BlogDetail/BlogRead";
import { PopularArticle } from "../Components/Home/Popular";

export const BlogDetail = () => {
  return (
    <Flex
      direction="row"
      justify="center"
      gap="4"
      p="4"
      pt={{ md: "20", base: "16" }}
    >
      <BlogRead />
      <Box
        display={{ md: "block", base: "none" }}
        h="full"
        position="sticky"
        top="20"
        maxW={{ md: "350px", base: "750px" }}
        w={"full"}
      >
        <PopularArticle />
      </Box>
    </Flex>
  );
};
