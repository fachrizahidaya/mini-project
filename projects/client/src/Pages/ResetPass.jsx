import {
  Flex,
  Box,
  Stack,
  Heading,
  useColorModeValue,
  Text,
  Button,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { TextField } from "../components/TextField";

export const ResetPass = () => {
  const navigate = useNavigate();

  const onLogin = async (item) => {
    try {
      console.log(item);
    } catch (err) {}
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
              <Heading fontSize={"4xl"}>Reset password</Heading>
              <Text fontSize="12px" color="gray.600">
                Request an email reset link
              </Text>
            </Stack>
            <Formik
              initialValues={{
                email: "",
              }}
              validationSchema={Yup.object({
                email: Yup.string()
                  .email("invalid email")
                  .required("email is required"),
              })}
              onSubmit={(values, action) => {
                onLogin(values);
                action.resetForm();
              }}
            >
              {(props) => {
                return (
                  <>
                    <Form>
                      <Stack spacing={4}>
                        <TextField label="Email" type="email" name="email" />
                        <Button
                          bg={"blue.400"}
                          color={"white"}
                          _hover={{
                            bg: "blue.500",
                          }}
                          type="submit"
                        >
                          Send link
                        </Button>
                        <Stack align='center'>
                          <Text fontSize='12px'>
                            Not registered ?{" "}
                            <Text
                              as={RouterLink}
                              color="blue.500"
                              to={"/register"}
                            >
                              Sign up
                            </Text>
                          </Text>
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
