import { FormControl, Input, Select } from "@chakra-ui/react";
import { ErrorMessage, Field } from "formik";
import { useEffect } from "react";

export const FieldBlog = ({ type, name, placeholder, ...props }) => {
  return (
    <FormControl>
      <Field
        as={Input}
        type={type}
        {...props}
        name={name}
        placeholder={placeholder}
      />
      <ErrorMessage
        component="div"
        name={name}
        style={{ color: "red", fontSize: "12px" }}
      />
    </FormControl>
  );
};

export const FielSelectdBlog = ({
  type,
  placeholder,
  setFieldValue,
  values,
}) => {
  useEffect(() => {
    document.getElementById("categoryId").value = values?.categoryId;
  }, [values?.categoryId]);

  return (
    <FormControl>
      <Select
        onChange={(e) => setFieldValue("categoryId", e.target.value)}
        type={type}
        placeholder={placeholder}
        id="categoryId"
      >
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </Select>
      <ErrorMessage
        component="div"
        name="categoryId"
        style={{ color: "red", fontSize: "12px" }}
      />
    </FormControl>
  );
};
