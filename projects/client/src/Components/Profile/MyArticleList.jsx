import { Flex, Stack } from "@chakra-ui/react";
import { CardBlogEdited } from "../listBlog/CardEdited";

export const MyArticleList = ({w}) => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <Stack align="center" p="4" w={w}>
      <Flex
        borderRadius="2xl"
        justify="space-evenly"
        flexWrap="wrap"
        border="1px"
        borderColor="gray.200"
        w="full"
      >
        {data.map((item, index) => {
          return <CardBlogEdited key={index} data={item} />;
        })}
      </Flex>
    </Stack>
  );
};
