import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import { ErrorMessage, Field } from "formik";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export const TextField = ({ label, type, name, ...props }) => {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Field as={Input} type={type} {...props} name={name} />
      <ErrorMessage
        component="div"
        name={name}
        style={{ color: "red", fontSize: "12px" }}
      />
    </FormControl>
  );
};

export const PassField = ({ label, name, ...props }) => {
  const [show, setShow] = useState(false);
  return (
    <FormControl {...props}>
      <FormLabel>{label}</FormLabel>
      <InputGroup>
        <Field as={Input} name={name} type={show ? "text" : "password"} />
        <InputRightElement h={"full"}>
          <Button variant={"ghost"} onClick={() => setShow((show) => !show)}>
            {show ? <ViewIcon /> : <ViewOffIcon />}
          </Button>
        </InputRightElement>
      </InputGroup>
      <ErrorMessage
        component="div"
        name={name}
        style={{ color: "red", fontSize: "12px" }}
      />
    </FormControl>
  );
};
