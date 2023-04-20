import { Heading, Avatar, Box, Center, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { BsHeart, BsListUl, BsPerson, BsKey } from "react-icons/bs";
import { OptButton } from "./OptButton";
import { useNavigate, useLocation } from "react-router-dom";

const option = [
  {
    icon: BsListUl,
    title: "My Article",
  },
  {
    icon: BsHeart,
    title: "Favorite Article",
  },
  {
    icon: BsPerson,
    title: "Profile Setting",
  },
  {
    icon: BsKey,
    title: "Change Password",
  },
];

export const ProfileCard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const current = location.pathname
    .split("/")[2]
    .split("-")
    .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
    .join(" ");
  const opt = option.findIndex((item) => item.title === current);

  const handleClick = (item) => {
    navigate(item.replace(" ", "-").toLowerCase());
  };

  useEffect(() => {
    window.scroll(0, 0);
  });

  return (
    <Center>
      <Box
        maxW={"320px"}
        border="1px"
        borderRadius="2xl"
        borderColor="gray.200"
        w={"full"}
        p={4}
        textAlign={"center"}
      >
        <Avatar name="ilham" size={"xl"} src="https://bit.ly/dan-abramov" />
        <Heading mt="4" fontSize={"2xl"}>
          Ilham hidayatulloh
        </Heading>
        <Text fontSize="12px" color={"blue.500"} mb={4}>
          ilhamhidayatulloh@gmail.com
        </Text>

        <Box w="inherit">
          {option.map((item, index) => {
            return (
              <OptButton
                key={index}
                icon={item.icon}
                title={item.title}
                opt={opt}
                index={index}
                onClick={() => handleClick(item.title)}
              />
            );
          })}
        </Box>
      </Box>
    </Center>
  );
};
