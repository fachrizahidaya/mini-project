import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  Tag,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const CardBlog = ({ data }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/blog");
  };

  return (
    <Center py={6} cursor="pointer" onClick={handleClick}>
      <Box
        maxW="250px"
        minW={{ md: "250px", sm: "450px", base: "90vw" }}
        w={"full"}
        borderRadius="xl"
        overflow={"hidden"}
        p={{ md: "0", base: "2" }}
      >
        <Box
          bg={"gray.100"}
          h={{ xl: "200px", base: "250px" }}
          borderRadius="xl"
          backgroundImage={
            "url(https://s3.ap-southeast-1.amazonaws.com/static.lontara.app/ee543415-3914-44dc-8776-99716f1a7e81.jpg)"
          }
          backgroundRepeat="no-repeat"
          backgroundSize="cover"
          backgroundPosition={"center center"}
          transition="background-size 0.2s"
          _hover={{
            backgroundSize: "110%",
          }}
        >
          <Box bgColor="blackAlpha.500" borderRadius="xl" h="inherit">
            <Tag
              top="2"
              bgColor="orange"
              color="white"
              size="sm"
              left="2"
              position="relative"
            >
              category
            </Tag>
          </Box>
        </Box>
        <Stack m={2}>
          <Heading fontSize="sm" fontFamily={"body"}>
            Judul Artikel ke - {data}
          </Heading>
        </Stack>
        <Stack m={2} direction={"row"} spacing={4} align={"center"}>
          <Avatar
            src={"https://avatars0.githubusercontent.com/u/1164541?v=4"}
            alt={"Author"}
            size="sm"
          />
          <Stack direction={"column"} spacing={0} fontSize={"sm"}>
            <Text fontSize="x-small" fontWeight={600}>
              Ilham Hidayatulloh
            </Text>
            <Text fontSize="x-small" color={"gray.500"}>
              Feb 08, 2021
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
};
