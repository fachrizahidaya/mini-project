import { Box, Button, Flex, Stack } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { AddPicBlog } from "./AddPic";
import { FieldBlog, FielSelectdBlog } from "./FIeldBlog";
import { TextEditor } from "./TextEditor";
import * as Yup from "yup";
import { KeyrwordForm } from "./KeywordForm";

export const BlogForm = () => {
  const validationSchema = Yup.object().shape({
    tittle: Yup.string().required("title is required"),
    content: Yup.string().required("content is required"),
    keyword: Yup.string().required("keyword is required"),
    categoryId: Yup.number().required("category is required"),
    file: Yup.mixed()
      .required("image is required")
      .test(
        "fileSize",
        "File too large",
        (value) => value === null || (value && value.size <= 1000000)
      ),
  });

  const handleSubmit = (
    values,
    { setSubmitting, setFieldValue, resetForm }
  ) => {
    // do some stuff here
    console.log(values);

    // reset the form to its initial state
    resetForm();

    // clear the content field using setFieldValue
    setFieldValue("content", "");
    setFieldValue("categoryId", "");

    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{
        tittle: "",
        categoryId: "",
        content: "",
        file: "",
        keyword: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, dirty, setFieldValue }) => {
        return (
          <>
            <Box w={{ xl: "1150px", base: "full" }} mt="4">
              <Form>
                <Flex
                  gap={4}
                  w="inherit"
                  display={{ md: "flex", base: "block" }}
                >
                  <Stack
                    spacing={4}
                    maxW={{ md: "400", base: "900" }}
                    w="full"
                    h="fit-content"
                    p="4"
                    border="1px"
                    borderRadius="2xl"
                    borderColor="gray.200"
                    position={{ md: "sticky", base: "relative" }}
                    top={{ md: "20", base: "none" }}
                  >
                    <FieldBlog name="tittle" type="text" placeholder="Tittle" />
                    <FielSelectdBlog
                      name="categoriId"
                      placeholder=" -- category -- "
                      values={values}
                      setFieldValue={setFieldValue}
                    />
                    <AddPicBlog values={values} setFieldValue={setFieldValue} />
                    <KeyrwordForm
                      values={values}
                      setFieldValue={setFieldValue}
                    />
                    <Button
                      variant="outline"
                      color="white"
                      fontSize="14px"
                      bgColor="orange.300"
                      type="submit"
                    >
                      Submit
                    </Button>
                  </Stack>
                  <Stack
                    spacing={4}
                    w="full"
                    p="4"
                    h="fit-content"
                    border="1px"
                    borderRadius="2xl"
                    borderColor="gray.200"
                    mt={{ md: "0", base: "4" }}
                  >
                    <TextEditor values={values} setFieldValue={setFieldValue} />
                  </Stack>
                </Flex>
              </Form>
            </Box>
          </>
        );
      }}
    </Formik>
  );
};
