import { Box, Button, Flex, Stack } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { AddPicBlog } from "./AddPic";
import { FieldBlog, FielSelectdBlog } from "./FieldBlog";
import { TextEditor } from "./TextEditor";
import * as Yup from "yup";
import { KeyrwordForm } from "./KeywordForm";
import { axios } from "../../helper/axios";
import { useCustomToast } from "../Toast";
import { useNavigate } from "react-router-dom";

export const BlogForm = () => {
  const customToast = useCustomToast();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("title is required"),
    content: Yup.string().required("content is required"),
    keywords: Yup.string().required("keyword is required"),
    CategoryId: Yup.number().required("category is required"),
    file: Yup.mixed()
      .required("image is required")
      .test(
        "fileSize",
        "File too large",
        (value) => value === null || (value && value.size <= 1000000)
      ),
  });

  const handleSubmit = async (
    values,
    { setSubmitting, setFieldValue, resetForm }
  ) => {
    try {
      const { title, content, keywords, CategoryId, file } = values;
      const data = new FormData();
      data.append("title", title);
      data.append("content", content);
      data.append("keywords", keywords);
      data.append("CategoryId", CategoryId);
      data.append("file", file);
      console.log(data);

      await axios.post("/blog/", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        "Content-Type": "multipart/form-data",
      });

      customToast({
        title: "Success",
        description: "Blog Created",
        status: "success",
      });

      setTimeout(() => {
        navigate("/account/my-article");
      }, 1000);

      // reset the form to its initial state
      resetForm();

      setSubmitting(false);
    } catch (err) {
      console.log(err);
      customToast({
        title: "Warning",
        description: `${err.response.data}`,
        status: "warning",
      });
    }
  };

  return (
    <Formik
      initialValues={{
        title: "",
        CategoryId: "",
        content: "",
        file: "",
        keywords: "",
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
                    <FieldBlog name="title" type="text" placeholder="Title" />
                    <FielSelectdBlog
                      name="CategoryId"
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
