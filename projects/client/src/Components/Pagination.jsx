import { Button, Flex, Icon } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export const Pagination = ({ currentPage, totalPages }) => {
  const { search, pathname } = useLocation();
  const params = new URLSearchParams(search);
  const navigate = useNavigate();
  const [page, setPage] = useState(currentPage);

  const handleClick = (page) => {
    setPage(page);
    params.set("page", page);
    const newSearch = params.toString();
    navigate(`${pathname}?${newSearch}`);
  };

  const renderPages = () => {
    const pages = [];

    if (page > 1) {
      pages.push(page - 1);
    }
    pages.push(page);
    if (page < totalPages) {
      pages.push(page + 1);
    }

    return pages.map((p) => (
      <Flex
        cursor="pointer"
        justifyContent="center"
        align="center"
        bgColor={currentPage === p ? "blue.500" : "blue.200"}
        key={p}
        w="10"
        onClick={() => handleClick(p)}
        boxShadow="lg"
      >
        {p}
      </Flex>
    ));
  };

  return (
    <Flex w="full" gap="1" justify="center" h="30px" color="white">
      <Button
        bgColor="blue.500"
        borderStartRadius="50%"
        borderEndRadius="none"
        isDisabled={page === 1}
        onClick={() => handleClick(page - 1)}
        h="30px"
        w="30px"
        boxShadow="lg"
      >
        <Icon as={ArrowBackIcon} boxSize={4} />
      </Button>
      {renderPages()}
      <Button
        bgColor="blue.500"
        borderStartRadius="none"
        borderEndRadius="50%"
        isDisabled={page === totalPages}
        onClick={() => handleClick(page + 1)}
        h="30px"
        w="30px"
        boxShadow="lg"
      >
        <Icon as={ArrowForwardIcon} boxSize={4} />
      </Button>
    </Flex>
  );
};
