import { Flex, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { axios } from "../../helper/axios";
import { Empty } from "../Empty";
import { Pagination } from "../Pagination";
import { CardBlog } from "./Card";

export const ArticleList = ({ w }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const nowPage = searchParams.get("page");
  const sort = searchParams.get("sort");
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const [data, setData] = useState([]);
  const [page, setPage] = useState([]);

  const getData = async () => {
    const { data } = await axios.get(
      `/blog?size=8&page=${nowPage || ""}&sort=${sort || ""}&id_cat=${
        category || ""
      }&search=${search || ""}`
    );
    setData(data.result);
    setPage(data.page);
  };

  useEffect(() => {
    getData();
  }, [nowPage, sort, category, search]);

  return (
    <Stack p="4" w={w}>
      <Flex
        borderRadius="2xl"
        justify="space-evenly"
        align="start"
        flexWrap="wrap"
        border="1px"
        borderColor="gray.200"
        w="full"
      >
        {data.length === 0 ? (
          <Empty />
        ) : (
          data.map((item, index) => {
            return <CardBlog key={index} data={item} />;
          })
        )}
      </Flex>
      {data.length === 0 ? null : (
        <Pagination totalPages={+page} currentPage={+nowPage || 1} />
      )}
    </Stack>
  );
};
