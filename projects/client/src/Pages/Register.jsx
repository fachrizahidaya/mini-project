import {
  Flex,
  Box,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { motion } from "framer-motion";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { PassField, TextField } from "../Components/TextField";
import { axios } from "../helper/axios";
import { useCustomToast } from "../Components/Toast";

export const RegistrationForm = () => {
  const navigate = useNavigate();
  const customToast = useCustomToast();

  const validationRegister = Yup.object().shape({
    username: Yup.string()
      .required("username is required")
      .min(3, "username should be at least three characters"),
    email: Yup.string().email("invalid email").required("email is required"),
    phone: Yup.string()
      .matches(/^08\d{10,}$/, "Invalid phone number") // UK phone number format: 0XXXXXXXXXX
      .required("Phone number is required"),
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

  const onRegister = async (item) => {
    try {
      await axios.post("/authUser/register", item);
      customToast({
        title: "Success",
        description:
          "register succes, please check your email to verify account",
        status: "success",
      });
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      console.log(err);
      customToast({
        title: "Warning",
        description: `${err.data || err.data.message}`,
        status: "warning",
      });
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      background="linear-gradient(to bottom, #185a9d, #43cea2)"
    >
      <Stack spacing={8} w="full" maxW={"480px"} py={12} px={6}>
        <motion.div
          key={1}
          initial={{ opacity: 0, x: "-100%" }}
          animate={{ opacity: 1, x: "0%" }}
          exit={{ opacity: 0, x: "100%" }}
          transition={{ duration: 0.9 }}
        >
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
            bgColor="whiteAlpha.500"
          >
            <Stack mb="4" align={"center"}>
              <Heading fontSize={"4xl"} textAlign={"center"}>
                Sign up
              </Heading>
              <Text fontSize="12px">
                Already a member ?{" "}
                <Text as={RouterLink} color="blue.500" to={"/login"}>
                  Sign in
                </Text>
              </Text>
            </Stack>
            <Formik
              initialValues={{
                username: "",
                email: "",
                phone: "",
                password: "",
                confirmPassword: "",
              }}
              validationSchema={validationRegister}
              onSubmit={(values, action) => {
                onRegister(values);
                action.resetForm();
              }}
            >
              {(props) => {
                return (
                  <>
                    <Form>
                      <Stack spacing={3}>
                        <TextField
                          label="Username"
                          type="text"
                          name="username"
                        />
                        <TextField label="Email" type="text" name="email" />
                        <TextField
                          label="Phone Number"
                          type="text"
                          name="phone"
                        />
                        <Flex gap="2" display={{ md: "flex", base: "block" }}>
                          <PassField label="Password" name="password" />
                          <PassField
                            label="Confirm Password"
                            name="confirmPassword"
                          />
                        </Flex>
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
                            Sign up
                          </Button>
                        </Stack>
                      </Stack>
                    </Form>
                  </>
                );
              }}
            </Formik>
          </Box>
        </motion.div>
      </Stack>
    </Flex>
  );
};