import { Icon, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";

export const MenuEdit = () => {
  return (
    <>
      <Menu>
        <MenuButton>
          <Icon as={BsThreeDotsVertical} />
        </MenuButton>
        <MenuList right='10px'>
          <MenuItem>Edit</MenuItem>
          <MenuItem>Delete</MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};
