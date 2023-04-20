import {
  Flex,
  Box,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { PassField } from "../../Components/TextField";

export const ChangePass = ({ ...props }) => {
  const validationRegister = Yup.object().shape({
    oldPassword: Yup.string()
      .required("Old Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*.,])(?=.{6,})/,
        "Must Contain 6 Characters, One Uppercase, One Lowercase, One Number, and One Special Character"
      ),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*.,])(?=.{6,})/,
        "Must Contain 6 Characters, One Uppercase, One Lowercase, One Number, and One Special Character"
      ),
    confirmPassword: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("password"), null], "Password does not matched"),
  });

  console.log(process.env.REACT_APP_API_BASE_URL);

  const onChangePass = async (item) => {
    try {
      console.log(item);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Flex {...props} p="4">
      <Stack
        spacing={8}
        w="full"
        px={6}
        borderRadius="2xl"
        border="1px"
        borderColor="gray.200"
      >
        <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} p={8}>
          <Formik
            initialValues={{
              oldPassword: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={validationRegister}
            onSubmit={(values, action) => {
              onChangePass(values);
              action.resetForm();
            }}
          >
            {(props) => {
              return (
                <>
                  <Form>
                    <Stack spacing={3}>
                      <PassField
                        label="Old Password"
                        name="oldPassword"
                        w={{ md: "50%", base: "full" }}
                      />

                      <Flex gap="2" display={{ md: "flex", base: "block" }}>
                        <PassField label="New Password" name="password" />
                        <PassField
                          label="Confirm Password"
                          name="confirmPassword"
                        />
                      </Flex>
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
                      >
                        Change
                      </Button>
                    </Stack>
                  </Form>
                </>
              );
            }}
          </Formik>
        </Box>
      </Stack>
    </Flex>
  );
};
