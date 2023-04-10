import React from "react";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  Text,
  Stack,
  Drawer,
  DrawerContent,
  DrawerBody
} from '@chakra-ui/react';
import { RxHamburgerMenu } from "react-icons/rx";
import { CgClose } from "react-icons/cg";
import { BiSearchAlt } from "react-icons/bi";
import { useLocation, useNavigate } from 'react-router-dom';



export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  return (
    <>
      <Box bgColor='blue.500' px={{ base: '6', md: '4' }}>
        <Flex h={"7.5vh"} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            bgColor={'blue.500'}
            color='white'
            size={'md'}
            icon={isOpen ? <CgClose /> : < RxHamburgerMenu />}
            aria-label={'Open Menu'}
            display={{ lg: 'none' }}
            onClick={isOpen ? onClose : onOpen}
            fontSize='20px'
          />
          <HStack spacing={2} alignItems={'center'}>
            <Text fontWeight='bold' fontSize={{ base: 'md', md: '2xl'}} color='white' className='test' pr='8' display={{ md: 'flex' }} as='button' onClick={() => navigate('/landing')}>
              MY BLOG
            </Text>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', lg: 'flex' }}>
                    <Menu>
                      <Button color='white' _hover={{color: 'orange'}} variant='ghost' onClick={() => navigate('/landing')}>Product</Button>
                      <Button color='white' _hover={{color: 'orange'}} variant='ghost' onClick={() => navigate('/account')}>Account</Button>
                      <Button color='white' _hover={{color: 'orange'}} variant='ghost' onClick={() => navigate('/category')}>Categories</Button>
                    </Menu>
            </HStack>
          </HStack>

          <HStack display={{base: 'none', lg: 'flex'}} alignItems={'center'}>
                <Menu>
                    <Button bgColor='orange' color='white' _hover={{bgColor:'white', color:'orange'}} variant='solid' onClick={() => navigate('/login')}>Login</Button>
                    <Button color='white' _hover={{color: 'orange'}} variant='ghost' onClick={() => navigate('/register')}>Register</Button>
                </Menu>
          </HStack>

            <IconButton
                display={{base: 'flex', lg: 'none'}}
                bgColor={'blue.500'}
                color='white'
                size={'md'}
                icon={<BiSearchAlt />}
                fontSize='20px'
            />
        </Flex>

        {isOpen ? (
          <Drawer placement='left' onClose={onClose} isOpen={isOpen} size='full'>
          <DrawerContent>
            <DrawerBody bgColor='blue.500'>
                <Box pb={4} display={{ lg: 'none' }}>
                <Stack as={'nav'} spacing={4}>
                    <Flex justify='space-between'>
                        <Text fontWeight='bold' fontSize={{ base: 'md', md: '2xl'}} color='white' display={{ md: 'flex' }} as='button'>
                            MY BLOG
                        </Text>
                        <IconButton
                            bgColor={'orange'}
                            color='white'
                            size={'md'}
                            icon={<CgClose />}
                            onClick={onClose}
                        />
                    </Flex>
                    <Button color='white' _hover={{color: 'orange'}} variant='ghost' onClick={() => navigate('/landing')}>Product</Button>
                    <Button color='white' _hover={{color: 'orange'}} variant='ghost' onClick={() => navigate('/account')}>Account</Button>
                    <Button color='white' _hover={{color: 'orange'}} variant='ghost' onClick={() => navigate('/category')}>Categories</Button>
                    <Button bgColor='orange' color='white' _hover={{bgColor:'white', color:'orange'}} variant='solid' onClick={() => navigate('/login')}>Login</Button>
                    <Button color='white' _hover={{color: 'orange'}} variant='ghost' onClick={() => navigate('/register')}>Register</Button>
                </Stack>
            </Box>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
        ) : null}
      </Box>
    </>
  );
}
