import { Flex, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { axios } from "../../helper/axios";
import { CardBlog } from "./Card";

export const FavArticleList = ({ w }) => {
  const [data, setData] = useState([]);
  const getData = async () => {
    const { data } = await axios.get("/blogAdmin/allBlog");
    setData(data)
    console.log(data);
  };

  useEffect(() => {
    getData();
  }, []);

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
          console.log(index);
          return <CardBlog key={index} data={item} />;
        })}
      </Flex>
    </Stack>
  );
};
