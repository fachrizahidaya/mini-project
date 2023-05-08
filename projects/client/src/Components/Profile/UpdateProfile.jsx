import { Flex, Box, Stack, Button, useColorModeValue } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { TextField } from "../TextField";
import { UpdateProfilePic } from "./UpdateProfilePic";

export const UpdateProfile = ({ ...props }) => {
  const { username, email, phone } = useSelector((state) => state.user.value);
  const validation = Yup.object().shape({
    username: Yup.string()
      .required("username is required")
      .min(3, "username should be at least three characters"),
    email: Yup.string().email("invalid email").required("email is required"),
    phone: Yup.string()
      .matches(/^08\d{10,}$/, "Invalid phone number") // UK phone number format: 0XXXXXXXXXX
      .required("Phone number is required"),
  });

  const onChangePass = async (item) => {
    try {
      console.log(item);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Flex {...props} p="4">
      <Stack spacing={8} w="full">
        <Box
          borderRadius="2xl"
          border="1px"
          borderColor="gray.200"
          bg={useColorModeValue("white", "gray.700")}
          p={8}
        >
          <Flex gap="4" display={{ md: "flex", base: "block" }}>
            <Flex w={{ md: "300px", base: "full" }} justify="center">
              <UpdateProfilePic />
            </Flex>
            <Box w="full">
              <Formik
                initialValues={{
                  username,
                  email,
                  phone,
                }}
                validationSchema={validation}
                onSubmit={(values) => {
                  onChangePass(values);
                }}
              >
                {(props) => {
                  return (
                    <>
                      <Form>
                        <Stack spacing={3}>
                          <TextField
                            fontSize="14px"
                            label="Username"
                            name="username"
                          />
                          <TextField
                            fontSize="14px"
                            label="Email"
                            name="email"
                          />
                          <TextField
                            fontSize="14px"
                            label="Phone Number"
                            name="phone"
                          />
                        </Stack>
                        <Stack pt={4}>
                          <Button
                            loadingText="Submitting"
                            bg={"blue.400"}
                            color={"white"}
                            _hover={{
                              bg: "blue.500",
                            }}
                            type="submit"
                            isDisabled={!props.dirty}
                          >
                            Confirm
                          </Button>
                        </Stack>
                      </Form>
                    </>
                  );
                }}
              </Formik>
            </Box>
          </Flex>
        </Box>
      </Stack>
    </Flex>
  );
};
