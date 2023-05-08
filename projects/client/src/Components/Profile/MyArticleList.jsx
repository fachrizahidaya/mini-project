import { Flex, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { axios } from "../../helper/axios";
import { CardBlogEdited } from "../ListBlog/CardEdited";

export const MyArticleList = ({ w }) => {
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);
  const getData = async () => {
    const { data } = await axios.get("/blog/pagUser", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setData(data.result);
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
        align="start"
        borderColor="gray.200"
        w="full"
      >
        {data.map((item, index) => {
          return <CardBlogEdited key={index} data={item} />;
        })}
      </Flex>
    </Stack>
  );
};
