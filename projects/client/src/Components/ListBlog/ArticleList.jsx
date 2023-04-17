import { Flex, Stack } from "@chakra-ui/react";
import { CardBlog } from "./Card";

export const ArticleList = () => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <Stack align="center" p="4" w={{ xl: "1150px", base: "full" }}>
      <Flex
        borderRadius="2xl"
        justify="space-evenly"
        flexWrap="wrap"
        border="1px"
        borderColor="gray.200"
        w="full"
      >
        {data.map((item, index) => {
          return <CardBlog key={index} data={item} />;
        })}
      </Flex>
    </Stack>
  );
};
