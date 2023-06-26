import { Avatar } from "@chakra-ui/avatar";
import { Button } from "@chakra-ui/button";
import { Flex, HStack, Stack, Text, Box } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import { axios } from "../../helper/axios";
import { convertDate } from "../../helper/date";
import { truncateString } from "../../helper/string";

export const PopularArticle = () => {
  // const data = [1, 2, 3, 4, 5];
  const [state, setState] = useState("Popular");

  const [data, setData] = useState([]);
  const getData = async () => {
    const { data } = await axios.get(`/blog?size=5`);
    setData(data.result);
  };
  const getDataFav = async () => {
    const { data } = await axios.get(`/blog/pagFav?size=5`);
    console.log(data.result);
  };

  const onChangeOption = () => {
    if (state === "Popular") setState("Recent");
    else setState("Popular");
  };

  useEffect(() => {
    getData();
    // getDataFav();
  }, []);
  return (
    <Stack
      borderRadius="2xl"
      align="center"
      p="4"
      maxW={{ md: "350px", base: "750px" }}
      w={"full"}
      border="1px"
      borderColor="gray.200"
      mt={{ base: "4", md: "0" }}
      h="full"
    >
      <Flex justify="space-evenly" w="inherit">
        <Button
          variant={state === "Popular" ? "solid" : "outline"}
          colorScheme={state === "Popular" ? "blue" : "gray"}
          borderRadius="3xl"
          w="45%"
          onClick={onChangeOption}
        >
          Popular
        </Button>
        <Button
          variant={state === "Recent" ? "solid" : "outline"}
          colorScheme={state === "Recent" ? "blue" : "gray"}
          borderRadius="3xl"
          w="45%"
          onClick={onChangeOption}
        >
          Recent
        </Button>
      </Flex>
      <Box w="inherit" p="4">
        {data.map(
          ({ imageURL, title, createdAt, id, Category, User }, index) => {
            return (
              <HStack w="full" p="3" key={index} cursor="pointer">
                <Avatar src={`${process.env.REACT_APP_API_PUBLIC_URL}/${imageURL}`} />
                <Box
                  borderBottom="1px"
                  borderBottomColor="gray.200"
                  w="inherit"
                  pb="2"
                >
                  <Text fontSize="sm" fontWeight="bold">
                    {truncateString(title, 25)}
                  </Text>
                  <Text fontSize="x-small">{User.username}</Text>
                  <Text fontSize="x-small">{convertDate(createdAt)}</Text>
                </Box>
              </HStack>
            );
          }
        )}
      </Box>
    </Stack>
  );
};
