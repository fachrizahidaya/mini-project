import { Flex, Box, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { ArticleList } from "../ListBlog/ArticleList";
import { CoverHome } from "./Cover";
import { PopularArticle } from "./Popular";

export const HeroHome = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <Box w="full">
      <Flex
        w="full"
        display={{ base: "block", md: "flex" }}
        gap="4"
        p="4"
        pt="20"
        justify="center"
      >
        <CoverHome />
        <PopularArticle />
      </Flex>
      <VStack>
        <ArticleList w={{ xl: "1150px", base: "full" }} />
      </VStack>
    </Box>
  );
};
