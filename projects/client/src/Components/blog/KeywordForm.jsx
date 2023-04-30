import {
  Box,
  Button,
  Flex,
  FormControl,
  HStack,
  Input,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
} from "@chakra-ui/react";
import { ErrorMessage } from "formik";
import { useEffect, useState } from "react";

export const KeyrwordForm = ({ setFieldValue, values }) => {
  const [keywords, setKeywords] = useState(
    values.keyword ? values.keyword.split(" ") : []
  );

  const onAdd = () => {
    setKeywords([...keywords, document.getElementById("keyword").value]);
    document.getElementById("keyword").value = "";
  };

  const onDelete = (index) => {
    const newKeywords = [...keywords];
    newKeywords.splice(index, 1);
    setKeywords(newKeywords);
  };

  useEffect(() => {
    setFieldValue("keyword", keywords.join(" "));
  }, [keywords]);

  return (
    <Box>
      <FormControl>
        <HStack>
          <Input id="keyword" placeholder="Type a keyword" />
          <Button fontSize="14px" variant="outline" onClick={onAdd}>
            add
          </Button>
        </HStack>
      </FormControl>
      <ErrorMessage
        component="div"
        name="keyword"
        style={{ color: "red", fontSize: "12px" }}
      />
      <Flex gap={2} m="2" flexWrap="wrap">
        {(values.keyword ? values.keyword.split(" ") : []).map(
          (item, index) => {
            return (
              <Tag
                fontSize="12px"
                size="md"
                key={index}
                borderRadius="full"
                variant="solid"
                colorScheme="blue"
              >
                <TagLabel>{item}</TagLabel>
                <TagCloseButton onClick={() => onDelete(index)} />
              </Tag>
            );
          }
        )}
      </Flex>
    </Box>
  );
};
