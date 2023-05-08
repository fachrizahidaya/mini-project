import { FormControl, Input, Select } from "@chakra-ui/react";
import { ErrorMessage, Field } from "formik";
import { useEffect, useState } from "react";
import { axios } from "../../helper/axios";

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
  const [data, setData] = useState([]);
  const getData = async () => {
    const { data } = await axios.get("/blog/allCategory");
    setData(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <FormControl>
      <Select
        onChange={(e) => setFieldValue("CategoryId", e.target.value)}
        type={type}
        defaultValue={values.CategoryId}
        placeholder={placeholder}
        id="CategoryId"
      >
        {data.map((item, index) => {
          return (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          );
        })}
      </Select>
      <ErrorMessage
        component="div"
        name="CategoryId"
        style={{ color: "red", fontSize: "12px" }}
      />
    </FormControl>
  );
};
