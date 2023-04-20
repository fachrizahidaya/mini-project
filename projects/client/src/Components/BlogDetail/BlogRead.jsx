import {
  Flex,
  Avatar,
  Box,
  Stack,
  Heading,
  Text,
  Image,
} from "@chakra-ui/react";
import { useEffect } from "react";

export const BlogRead = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

  return (
    <Box maxW="750px" w="full">
      <Stack gap="2">
        <Heading>Judul Artikel Disini</Heading>
        <Flex align="center" gap="4">
          <Avatar size="sm" />
          <Text fontSize="small" color="grey">
            ilham hidayatulloh . category . 12 mei 2023
          </Text>
        </Flex>
        <Flex justifyContent='center'>
          <Image
            borderRadius="2xl"
            src="https://s3.ap-southeast-1.amazonaws.com/static.lontara.app/ee543415-3914-44dc-8776-99716f1a7e81.jpg"
          />
        </Flex>
        <Box px={{xl: '10', base: '4'}} textAlign='justify'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia ex, esse maiores illo perspiciatis nobis, animi fugit praesentium beatae distinctio earum iusto, doloremque quae tempore! Eos suscipit rerum temporibus provident.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia ex, esse maiores illo perspiciatis nobis, animi fugit praesentium beatae distinctio earum iusto, doloremque quae tempore! Eos suscipit rerum temporibus provident.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia ex, esse maiores illo perspiciatis nobis, animi fugit praesentium beatae distinctio earum iusto, doloremque quae tempore! Eos suscipit rerum temporibus provident.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia ex, esse maiores illo perspiciatis nobis, animi fugit praesentium beatae distinctio earum iusto, doloremque quae tempore! Eos suscipit rerum temporibus provident.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia ex, esse maiores illo perspiciatis nobis, animi fugit praesentium beatae distinctio earum iusto, doloremque quae tempore! Eos suscipit rerum temporibus provident.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia ex, esse maiores illo perspiciatis nobis, animi fugit praesentium beatae distinctio earum iusto, doloremque quae tempore! Eos suscipit rerum temporibus provident.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia ex, esse maiores illo perspiciatis nobis, animi fugit praesentium beatae distinctio earum iusto, doloremque quae tempore! Eos suscipit rerum temporibus provident.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia ex, esse maiores illo perspiciatis nobis, animi fugit praesentium beatae distinctio earum iusto, doloremque quae tempore! Eos suscipit rerum temporibus provident.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia ex, esse maiores illo perspiciatis nobis, animi fugit praesentium beatae distinctio earum iusto, doloremque quae tempore! Eos suscipit rerum temporibus provident.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia ex, esse maiores illo perspiciatis nobis, animi fugit praesentium beatae distinctio earum iusto, doloremque quae tempore! Eos suscipit rerum temporibus provident.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia ex, esse maiores illo perspiciatis nobis, animi fugit praesentium beatae distinctio earum iusto, doloremque quae tempore! Eos suscipit rerum temporibus provident.
        </Box>
      </Stack>
    </Box>
  );
};
