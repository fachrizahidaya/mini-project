import { useToast } from "@chakra-ui/react";

export const useCustomToast = () => {
  const toast = useToast({
    duration: 3000,
    isClosable: true,
    position: 'top'
  });

  const customToast = ({ title, description, status }) => {
    return toast({
      title,
      description,
      status,
    });
  };

  return customToast;
};
