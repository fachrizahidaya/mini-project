import { Box, Flex } from "@chakra-ui/react";
import { SearchForm } from "../components/listBlog/Search";
import { ArticleList } from "../components/listBlog/ArticleList";

export const Search = () => {
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
        <SearchForm />
      </Box>
      <Box maxW="700px" w="full">
        <ArticleList />
      </Box>
    </Flex>
  );
};
