import { HeroHome } from "../Components/Home/Hero";
import { Stack } from "@chakra-ui/layout";
import { useSelector } from "react-redux";

export const BlogPage = () => {
  const userReducer = useSelector((state) => state.user.value);
  console.log(userReducer);
  return (
    <Stack align="center">
      <HeroHome />
    </Stack>
  );
};
