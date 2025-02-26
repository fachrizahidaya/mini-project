import {
  Flex,
  Box,
  Stack,
  Heading,
  Icon,
  useColorModeValue,
  Text,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { BsPhone, BsPerson, BsEnvelope } from "react-icons/bs";
import { motion } from "framer-motion";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { PassField, TextField } from "../Components/TextField";
import { useCustomToast } from "../Components/Toast";
import { axios } from "../helper/axios";
import { setAuth } from "../redux/userSlice";
import { useDispatch } from "react-redux";

const loginopt = [
  {
    icon: BsPerson,
    title: "username",
    label: "Username",
    type: "text",
    yup: Yup.string()
      .required("username is required")
      .min(3, "username should be at least three characters"),
  },
  {
    icon: BsEnvelope,
    title: "email",
    label: "Email",
    type: "email",
    yup: Yup.string().email("invalid email").required("email is required"),
  },
  {
    icon: BsPhone,
    title: "phone",
    label: "Phone Number",
    type: "text",
    yup: Yup.string()
      .matches(/^08\d{10,}$/, "Invalid phone number") // UK phone number format: 0XXXXXXXXXX
      .required("Phone number is required"),
  },
];

export const LoginForm = () => {
  const [current, setCurrent] = useState(0);
  const customToast = useCustomToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogin = async (item, { setSubmitting, resetForm }) => {
    try {
      const user = await axios.post("/auth/login", item);
      const { username, email, phone, imgProfile } = user.data.isAccountExist;

      customToast({
        title: "Success",
        description: "Login Succes",
        status: "success",
      });

      dispatch(setAuth({ username, email, phone, imgProfile }));
      localStorage.setItem("token", user.data.token);

      resetForm();

      setTimeout(() => {
        navigate("/");
        setSubmitting(false);
      }, 3000);
    } catch (err) {
      console.log(err);
      customToast({
        title: "Warning",
        description: `${err.response.data}`,
        status: "warning",
      });
    }
  };

  const handleCurrent = (item) => {
    setCurrent(item);
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      background="linear-gradient(to bottom, #185a9d, #43cea2)"
    >
      <Stack spacing={8} w="full" maxW={"420px"} py={12} px={6}>
        <motion.div
          key={current}
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
              <Heading fontSize={"4xl"}>Sign in</Heading>
              <Text fontSize="12px">
                Not verified ?{" "}
                <Text as={RouterLink} color="blue.500" to={"/verify"}>
                  verify
                </Text>
              </Text>
            </Stack>
            <Flex gap="4" w="full" justify="center" mb="4">
              {loginopt.map((item, index) => {
                return (
                  <Icon
                    key={index}
                    cursor="pointer"
                    color={
                      item.title === loginopt[current].title ? "white" : "black"
                    }
                    onClick={() => handleCurrent(index)}
                    as={item.icon}
                  />
                );
              })}
            </Flex>
            <Formik
              initialValues={{
                password: "",
                [loginopt[current].title]: "",
              }}
              validationSchema={Yup.object({
                password: Yup.string()
                  .required("Password is required")
                  .min(6, "Password is too short"),
                [loginopt[current].title]: loginopt[current].yup,
              })}
              onSubmit={onLogin}
            >
              {({ dirty, setFieldValue, values, isSubmitting }) => {
                return (
                  <>
                    <Form>
                      <Stack spacing={4}>
                        <TextField
                          label={loginopt[current].label}
                          type={loginopt[current].type}
                          name={loginopt[current].title}
                        />
                        <PassField label="Password" name="password" />
                        <Stack spacing={10}>
                          <Stack
                            direction={{ base: "column", sm: "row" }}
                            align={"start"}
                            justify={"space-between"}
                            fontSize="12px"
                          >
                            <Text>
                              New to our platform ?{" "}
                              <Text
                                as={RouterLink}
                                color="blue.500"
                                to={"/register"}
                              >
                                Sign up
                              </Text>
                            </Text>
                            <Text
                              as={RouterLink}
                              color="blue.500"
                              to={"/reset-password"}
                            >
                              forgot password ?
                            </Text>
                          </Stack>
                          <Button
                            bg={"blue.400"}
                            isDisabled={!dirty || isSubmitting}
                            isLoading={isSubmitting}
                            loadingText="Loading .. "
                            color={"white"}
                            _hover={{
                              bg: "blue.500",
                            }}
                            type="submit"
                          >
                            Sign in
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
