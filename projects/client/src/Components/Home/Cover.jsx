import { Flex, VStack, Heading, Text } from "@chakra-ui/layout";
import { Tag } from "@chakra-ui/tag";

export const CoverHome = () => {
  return (
    <Flex
      maxW={"750px"}
      w={"full"}
      h={{ xl: "inherit", md: "inherit", sm: "450px", base: "400px" }}
      backgroundImage={
        "url(https://s3.ap-southeast-1.amazonaws.com/static.lontara.app/ee543415-3914-44dc-8776-99716f1a7e81.jpg)"
      }
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      backgroundPosition={"center center"}
      borderRadius="2xl"
      transition="background-size 0.2s"
      _hover={{
        backgroundSize: "110%",
      }}
      cursor='pointer'
    >
      <Flex
        w="inherit"
        h="inherit"
        bgColor="blackAlpha.600"
        align="flex-end"
        borderRadius="2xl"
      >
        <VStack
          m="4"
          align="flex-start"
          p="4"
          color="white"
          justify="left"
          h={{ xl: "30%", base: "40%" }}
          w="inherit"
        >
          <Tag color="white" bgColor="orange">
            category
          </Tag>
          <Heading>Judul Artikel</Heading>
          <Text color="gray.300">Ilham Hidayatulloh . 20 Mei 2022</Text>
        </VStack>
      </Flex>
    </Flex>
  );
};
