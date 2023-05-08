import { Box, Center, Input, Select, Stack, Button } from "@chakra-ui/react";
import { Form, Formik, Field } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { axios } from "../../helper/axios";

export const SearchForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const handleSubmit = ({ search, category, sort }, { setSubmitting }) => {
    setTimeout(() => {
      navigate(
        `/search?search=${search}&sort=${sort}&category=${category}&page=1`
      );
      setSubmitting(false);
      window.location.reload();
    }, 1000);
  };

  const [data, setData] = useState([]);
  const getData = async () => {
    const { data } = await axios.get("/blog/allCategory");
    setData(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Center>
      <Box
        maxW={"320px"}
        border="1px"
        borderRadius="2xl"
        borderColor="gray.200"
        w={"full"}
        p={4}
        textAlign={"center"}
      >
        <Formik
          initialValues={{
            search: searchParams.get("search"),
            category: searchParams.get("category"),
            sort: searchParams.get("sort"),
          }}
          onSubmit={handleSubmit}
        >
          {({ dirty, setFieldValue, values, isSubmitting }) => (
            <Form>
              <Stack>
                <Field
                  as={Input}
                  name="search"
                  placeholder="title or keyword"
                  type="search"
                />
                <Select
                  name="category"
                  value={values.category || ""}
                  placeholder=" ~ category ~ "
                  onChange={(e) => setFieldValue("category", e.target.value)}
                >
                  {data.map(({ id, name }) => {
                    return (
                      <option key={id} value={id}>
                        {name}
                      </option>
                    );
                  })}
                </Select>
                {/* <Select as={Field} placeholder=" ~ sort by ~ ">
                  <option>Politik</option>
                  <option>Olahraga</option>
                  <option>Fiksi</option>
                  <option>Politik</option>
                </Select> */}
                <Select
                  name="sort"
                  value={values.sort}
                  onChange={(e) => setFieldValue("sort", e.target.value)}
                >
                  <option value="Desc">Desc</option>
                  <option value="Asc">Asc</option>
                </Select>
                <Button
                  colorScheme="blue"
                  isDisabled={!dirty || isSubmitting}
                  isLoading={isSubmitting}
                  loadingText="Loading .. "
                  type="submit"
                >
                  Submit
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Box>
    </Center>
  );
};
