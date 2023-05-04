import { Flex, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { axios } from "../../helper/axios";
import { CardBlog } from "./Card";

export const ArticleList = ({ w }) => {
  const [data, setData] = useState([]);
  const getData = async () => {
    const { data } = await axios.get("/blogAdmin/allBlog");
    setData(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Stack p="4" w={w}>
      <Flex
        borderRadius="2xl"
        justify="space-evenly"
        align='start'
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
