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
} from "@chakra-ui/react";
import { ErrorMessage } from "formik";
import { useEffect, useState } from "react";

export const KeyrwordForm = ({ setFieldValue, values }) => {
  const [keywords, setKeywords] = useState(
    values.keyword ? values.keyword.split(" ") : []
  );

  const onAdd = () => {
    setKeywords([...keywords, document.getElementById("keywords").value]);
    document.getElementById("keywords").value = "";
  };

  const onDelete = (index) => {
    const newKeywords = [...keywords];
    newKeywords.splice(index, 1);
    setKeywords(newKeywords);
  };

  useEffect(() => {
    setFieldValue("keywords", keywords.join(" "));
  }, [keywords]);

  return (
    <Box>
      <FormControl>
        <HStack>
          <Input id="keywords" placeholder="Type a keyword" />
          <Button fontSize="14px" variant="outline" onClick={onAdd}>
            add
          </Button>
        </HStack>
      </FormControl>
      <ErrorMessage
        component="div"
        name="keywords"
        style={{ color: "red", fontSize: "12px" }}
      />
      <Flex gap={2} m="2" flexWrap="wrap">
        {(values.keywords ? values.keywords.split(" ") : []).map(
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
