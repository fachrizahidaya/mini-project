import { Box, Flex, Stack } from "@chakra-ui/react";
import { BlogForm } from "../Components/blog/BlogForm";

export const CreateBlog = () => {
  return (
    <Stack
      align="center"
      p="4"
      pt={{ md: "20", base: "16" }}
      
    >
      <BlogForm />
    </Stack>
  );
};
