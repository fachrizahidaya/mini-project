import { Flex, VStack, Heading, Text } from "@chakra-ui/layout";
import { Tag } from "@chakra-ui/tag";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axios } from "../../helper/axios";
import { convertDate } from "../../helper/date";

export const CoverHome = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const getData = async () => {
    const { data } = await axios.get(`/blog?size=1`);
    setData(data.result);
  };

  const handleClick = (title, id) => {
    navigate(`/blog?title=${title}&id=${id}`);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {data.map(({ imageURL, title, createdAt, id, Category, User }, index) => {
        return (
          <Flex
            key={index}
            maxW={"750px"}
            w={"full"}
            h={{ xl: "inherit", md: "inherit", sm: "400px", base: "300px" }}
            backgroundImage={`url(http://localhost:8000/${imageURL})`}
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            backgroundPosition={"center center"}
            borderRadius="2xl"
            transition="background-size 0.2s"
            _hover={{
              backgroundSize: "110%",
            }}
            cursor="pointer"
            onClick={() => handleClick(title, id)}
          >
            <Flex
              w="inherit"
              h="inherit"
              bgColor="blackAlpha.600"
              align="flex-end"
              borderRadius="2xl"
            >
              <VStack
                m="4"
                align="flex-start"
                p="4"
                color="white"
                justify="left"
                h={{ xl: "30%", base: "40%" }}
                w="inherit"
              >
                <Tag color="white" bgColor="orange">
                  {Category.name}
                </Tag>
                <Heading fontSize={{ md: "2xl", base: "sm" }}>{title}</Heading>
                <Text
                  fontSize={{ md: "sm", base: "xx-small" }}
                  color="gray.300"
                >{`${User.username} . ${convertDate(createdAt)}`}</Text>
              </VStack>
            </Flex>
          </Flex>
        );
      })}
    </>
  );
};
