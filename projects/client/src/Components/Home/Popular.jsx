import { Avatar } from "@chakra-ui/avatar";
import { Button } from "@chakra-ui/button";
import { Flex, HStack, Stack, Text, Box } from "@chakra-ui/layout";
import { useState } from "react";

export const PopularArticle = () => {
  const data = [1, 2, 3, 4, 5];
  const [state, setState] = useState("Popular");

  const onChangeOption = () => {
    if (state === "Popular") setState("Recent");
    else setState("Popular");
  };
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
      h='full'
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
        {data.map((item, index) => {
          return (
            <HStack w="full" p="3" key={index}>
                <Avatar src="https://s3.ap-southeast-1.amazonaws.com/static.lontara.app/ee543415-3914-44dc-8776-99716f1a7e81.jpg" />
              <Box
                borderBottom="1px"
                borderBottomColor="gray.200"
                w="inherit"
                pb="2"
              >
                <Text fontSize="sm" fontWeight="bold">
                  Judul Artikel {state} {item}
                </Text>
                <Text fontSize="x-small">ilham hidayatulloh</Text>
                <Text fontSize="x-small">21 Mei 2023</Text>
              </Box>
            </HStack>
          );
        })}
      </Box>
    </Stack>
  );
};
