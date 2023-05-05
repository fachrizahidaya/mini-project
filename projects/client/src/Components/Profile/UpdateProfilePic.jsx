import {
  Input,
  Avatar,
  AvatarBadge,
  Icon,
  Button,
  Stack,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRef, useState } from "react";
import * as Yup from "yup";
import { BsCamera } from "react-icons/bs";
import { useSelector } from "react-redux";
import { axios } from "../../helper/axios";

export const UpdateProfilePic = () => {
  const token = localStorage.getItem("token");
  const { imgProfile } = useSelector((state) => state.user.value);
  const fileRef = useRef(null);
  const [image, setImage] = useState(null);
  const validationSchema = Yup.object().shape({
    file: Yup.mixed()
      .required("Browse your image")
      .test(
        "fileSize",
        "File too large",
        (value) => value === null || (value && value.size <= 1000000)
      ),
  });

  const handleUpload = async () => {
    try {
      const data = new FormData();
      data.append("userId", 1);
      data.append("file", image);
      await axios.post("/profile/single-uploaded", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        "Content-Type": "multipart/form-data",
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Formik
      initialValues={{
        file: `${
          `http://localhost:8000/${imgProfile}` || "https://bit.ly/broken-link"
        }`,
      }}
      validationSchema={validationSchema}
      onSubmit={() => {
        handleUpload();
      }}
    >
      {({ values, setFieldValue, dirty }) => {
        return (
          <Form>
            <Input
              ref={fileRef}
              hidden
              as={Input}
              type="file"
              name="file"
              accept="image/png, image/jpeg, image/webp"
              onChange={(e) => {
                setFieldValue("file", e.target.files[0]);
                setImage(e.target.files[0]);
              }}
            />
            <Stack>
              <Avatar
                size={"xl"}
                src={image ? URL.createObjectURL(image) : values.file}
              >
                <AvatarBadge
                  onClick={() => fileRef.current.click()}
                  w="inherit"
                  cursor="pointer"
                  boxSize="1em"
                  bg="blue.500"
                >
                  <Icon as={BsCamera} fontSize="12px" />
                </AvatarBadge>
              </Avatar>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                size="xs"
                type="submit"
                isDisabled={!dirty}
              >
                Change
              </Button>
            </Stack>
          </Form>
        );
      }}
    </Formik>
  );
};
