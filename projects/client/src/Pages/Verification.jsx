import {
  Flex,
  Box,
  Stack,
  useColorModeValue,
  Heading,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link as RouterLink, useParams } from "react-router-dom";
import { CheckCircleIcon, CloseIcon } from "@chakra-ui/icons";
import { axios } from "../helper/axios";

export const Verification = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [isloading, setiIsLoading] = useState(true);
  const [succes, setSucces] = useState(true);

  const onVerify = async () => {
    try {
      await axios.patch(
        "/authUser/verify",
        {},
        {
          headers: {
            Authorization: `Bearer ${params.token}`,
          },
        }
      );
      setiIsLoading(false);
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      console.log(err);
      setSucces(false);
      setiIsLoading(false);
    }
  };

  useEffect(() => {
    onVerify();
  }, []);

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      background="linear-gradient(to bottom, #185a9d, #43cea2)"
    >
      <Stack spacing={8} w="full" maxW={"420px"} py={12} px={6}>
        {isloading ? (
          <LoadingSpinner />
        ) : succes ? (
          <AlertVerification
            heading="Verified !"
            message="You have succesfully verified the account."
            icon={<CheckCircleIcon boxSize={"80px"} color={"green"} />}
          />
        ) : (
          <AlertVerification
            heading="Failed !"
            message="Failed to verify you're account."
            icon={<FailedIcon />}
          />
        )}
      </Stack>
    </Flex>
  );
};

export const AlertVerification = ({ heading, message, icon }) => {
  return (
    <Box
      align="center"
      rounded={"lg"}
      bg={useColorModeValue("white", "gray.700")}
      boxShadow={"lg"}
      p={8}
      bgColor="whiteAlpha.500"
    >
      <motion.div animate={{ rotateY: 360 }} transition={{ duration: 1 }}>
        {icon}
      </motion.div>
      <Heading mt="4">{heading}</Heading>
      <Text>{message}</Text>
    </Box>
  );
};

export const FailedIcon = () => {
  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      bg={"red.500"}
      rounded={"50px"}
      w={"80px"}
      h={"80px"}
      textAlign="center"
    >
      <CloseIcon boxSize={"40px"} color={"white"} />
    </Flex>
  );
};

export const LoadingSpinner = () => {
  return (
    <Flex justify="center">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="orange.500"
        size="xl"
      />
    </Flex>
  );
};
