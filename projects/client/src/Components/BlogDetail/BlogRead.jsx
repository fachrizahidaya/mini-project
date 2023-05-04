import {
  chakra,
  Flex,
  Avatar,
  Box,
  Stack,
  Heading,
  Text,
  Image,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { axios } from "../../helper/axios";
import { convertDate } from "../../helper/date";

export const BlogRead = () => {
  const [data, setData] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const itemId = searchParams.get("id");

  console.log(itemId);

  const getData = async () => {
    const { data } = await axios.get(`/blogUser/byId/${itemId}`);
    console.log(data);
    setData(data);
  };

  useEffect(() => {
    getData();
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box maxW="750px" w="full">
      {data.map((item, index) => {
        return (
          <Stack gap="2" key={index}>
            <Heading fontSize={{ md: "40px", base: "25px" }}>
              {item.title}
            </Heading>
            <Flex align="center" gap="4">
              <Avatar
                size="sm"
                src={`http://localhost:8000/${item.User.imgProfile}`}
              />
              <Text fontSize="small" color="grey">
                {`${item.User.username} . ${item.Category.name} . ${convertDate(
                  item.createdAt
                )}`}
              </Text>
            </Flex>
            <Flex justifyContent="center" px={{ xl: "10", base: "4" }}>
              <Image
                borderRadius="2xl"
                src={`http://localhost:8000/${item.imageURL}`}
              />
            </Flex>
            <Box
              px={{ xl: "10", base: "4" }}
              fontSize={{ md: "14px", base: "12px" }}
              textAlign="justify"
            >
              <chakra.div dangerouslySetInnerHTML={{ __html: item.content }} />
            </Box>
          </Stack>
        );
      })}
    </Box>
  );
};
