import React from "react";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  Menu,
  useDisclosure,
  Text,
  Stack,
  Drawer,
  DrawerContent,
  DrawerBody,
} from "@chakra-ui/react";
import { RxHamburgerMenu } from "react-icons/rx";
import { CgClose } from "react-icons/cg";
import { BiSearchAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { AvatarNavbar } from "./AvatarNavbar";

export const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  return (
    <>
      <Box
        backdropFilter="10px"
        background="blue.500"
        px={{ base: "6", md: "4" }}
        position="fixed"
        w="full"
        zIndex="10"
      >
        <Flex
          pr={{ base: "none", xl: "40" }}
          pl={{ base: "none", xl: "40" }}
          h={"7.5vh"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <IconButton
            bgColor={"blue.500"}
            color="white"
            size={"md"}
            icon={isOpen ? <CgClose /> : <RxHamburgerMenu />}
            aria-label={"Open Menu"}
            display={{ lg: "none" }}
            onClick={isOpen ? onClose : onOpen}
            fontSize="20px"
          />
          <HStack spacing={2} alignItems={"center"}>
            <Text
              fontWeight="bold"
              fontSize={{ base: "md", md: "2xl" }}
              color="white"
              className="test"
              pr="8"
              display={{ md: "flex" }}
              as="button"
              onClick={() => navigate("/")}
            >
              MY BLOG
            </Text>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", lg: "flex" }}
            >
              <Menu>
                <Button
                  color="white"
                  _hover={{ color: "orange" }}
                  variant="ghost"
                  onClick={() => navigate("/landing")}
                >
                  Product
                </Button>
                <Button
                  color="white"
                  _hover={{ color: "orange" }}
                  variant="ghost"
                  onClick={() => navigate("/account/my-article")}
                >
                  Account
                </Button>
                <Button
                  color="white"
                  _hover={{ color: "orange" }}
                  variant="ghost"
                  onClick={() => navigate("/category")}
                >
                  Categories
                </Button>
              </Menu>
            </HStack>
          </HStack>

          {token ? (
            <Flex
              display={{ base: "none", lg: "flex" }}
              alignItems={"center"}
              gap="4"
            >
              <AvatarNavbar />
              <Button
                bgColor="orange"
                size="sm"
                color="white"
                onClick={() => navigate("/create")}
              >
                Create
              </Button>
            </Flex>
          ) : (
            <HStack
              display={{ base: "none", lg: "flex" }}
              spacing="3"
              alignItems={"center"}
            >
              <Menu>
                <Button
                  bgColor="orange"
                  color="white"
                  _hover={{ bgColor: "white", color: "orange" }}
                  variant="solid"
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
                <Button
                  color="white"
                  _hover={{ color: "orange" }}
                  variant="ghost"
                  onClick={() => navigate("/register")}
                >
                  Register
                </Button>
              </Menu>
            </HStack>
          )}

          <HStack display={{ base: "flex", lg: "none" }} alignItems={"center"}>
            {token ? <AvatarNavbar /> : null}
          </HStack>
        </Flex>

        {isOpen ? (
          <Drawer
            placement="left"
            onClose={onClose}
            isOpen={isOpen}
            size="full"
          >
            <DrawerContent>
              <DrawerBody bgColor="blue.500">
                <Box pb={4} display={{ lg: "none" }}>
                  <Stack as={"nav"} spacing={4}>
                    <Flex justify="space-between">
                      <Text
                        fontWeight="bold"
                        fontSize={{ base: "md", md: "2xl" }}
                        color="white"
                        display={{ md: "flex" }}
                        as="button"
                      >
                        MY BLOG
                      </Text>
                      <IconButton
                        bgColor={"orange"}
                        color="white"
                        size={"md"}
                        icon={<CgClose />}
                        onClick={onClose}
                      />
                    </Flex>
                    <Button
                      color="white"
                      _hover={{ color: "orange" }}
                      variant="ghost"
                      onClick={() => navigate("/landing")}
                    >
                      Product
                    </Button>
                    <Button
                      color="white"
                      _hover={{ color: "orange" }}
                      variant="ghost"
                      onClick={() => navigate("/account/my-article")}
                    >
                      Account
                    </Button>
                    <Button
                      color="white"
                      _hover={{ color: "orange" }}
                      variant="ghost"
                      onClick={() => navigate("/category")}
                    >
                      Categories
                    </Button>
                    {token ? (
                      <Button
                        color="white"
                        _hover={{ color: "orange" }}
                        variant="ghost"
                        onClick={() => navigate("/create")}
                      >
                        Create
                      </Button>
                    ) : (
                      <>
                        <Button
                          bgColor="orange"
                          color="white"
                          _hover={{ bgColor: "white", color: "orange" }}
                          variant="solid"
                          onClick={() => navigate("/login")}
                        >
                          Login
                        </Button>
                        <Button
                          color="white"
                          _hover={{ color: "orange" }}
                          variant="ghost"
                          onClick={() => navigate("/register")}
                        >
                          Register
                        </Button>
                      </>
                    )}
                  </Stack>
                </Box>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        ) : null}
      </Box>
    </>
  );
};
