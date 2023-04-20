import { Flex, Text, Icon } from "@chakra-ui/react";

export const OptButton = ({ icon, title, opt, index, ...props }) => {
  return (
    <Flex
      gap="3"
      p="2"
      w="full"
      align="center"
      bgColor={opt === index ? "blue.100" : "none"}
      borderRight={opt === index ? "4px" : "none"}
      borderColor="blue.500"
      cursor="pointer"
      {...props}
    >
      <Icon as={icon} color={opt === index ? "blue.500" : "none"} />
      <Text fontSize="12px">{title}</Text>
    </Flex>
  );
};
