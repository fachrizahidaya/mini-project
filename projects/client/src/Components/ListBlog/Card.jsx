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
import { convertDate } from "../../helper/date";

export const CardBlog = ({ data }) => {
  const { imageURL, title, createdAt, id, Category, User } = data;
  const navigate = useNavigate();
  const date = convertDate(createdAt);

  const handleClick = () => {
    navigate(`/blog?title=${title}&id=${id}`);
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
          backgroundImage={`url(http://localhost:8000/${imageURL})`}
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
              {Category?.name}
            </Tag>
          </Box>
        </Box>
        <Stack m={2}>
          <Heading fontSize="sm" fontFamily={"body"}>
            {title}
          </Heading>
        </Stack>
        <Stack m={2} direction={"row"} spacing={4} align={"center"}>
          <Avatar
            src={`http://localhost:8000/${User.imgProfile}`}
            alt={"Author"}
            size="sm"
          />
          <Stack direction={"column"} spacing={0} fontSize={"sm"}>
            <Text fontSize="x-small" fontWeight={600}>
              {User?.username}
            </Text>
            <Text fontSize="x-small" color={"gray.500"}>
              {date}
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
};
