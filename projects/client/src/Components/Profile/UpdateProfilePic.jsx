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

export const UpdateProfilePic = () => {
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
    const data = new FormData();
    data.append("userId", 1);
    data.append("fileUploaded", image);
    console.log(data);
  };
  return (
    <Formik
      initialValues={{
        file: "https://bit.ly/dan-abramov",
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
                name="ilham"
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
