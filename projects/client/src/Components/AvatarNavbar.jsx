import {
  Menu,
  MenuButton,
  Flex,
  Avatar,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAuth } from "../redux/userSlice";

export const AvatarNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { imgProfile } = useSelector((state) => state.user.value);

  const onLogout = () => {
    localStorage.removeItem("token");
    dispatch(
      setAuth({
        username: "",
        email: "",
        phone: "",
        imgProfile: "",
      })
    );
    navigate("/login");
  };
  return (
    <Menu>
      <MenuButton>
        <Flex align="center">
          <Avatar
            size={{ base: "sm", md: "md" }}
            src={
              `http://localhost:8000/${imgProfile}` ||
              "https://bit.ly/broken-link"
            }
          />
        </Flex>
      </MenuButton>
      <MenuList alignItems={"center"}>
        <MenuItem onClick={() => navigate("/account/my-article")}>
          Profile
        </MenuItem>
        <MenuItem onClick={onLogout}>Sign Out</MenuItem>
      </MenuList>
    </Menu>
  );
};
