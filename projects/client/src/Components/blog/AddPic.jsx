import { Box, Button, Image, Input } from "@chakra-ui/react";
import { ErrorMessage } from "formik";
import { useRef } from "react";

export const AddPicBlog = ({ setFieldValue, values }) => {
  const fileRef = useRef(null);
  return (
    <Box>
      <Input
        ref={fileRef}
        hidden
        as={Input}
        type="file"
        name="file"
        accept="image/png, image/jpeg, image/webp"
        onChange={(e) => {
          setFieldValue("file", e.target.files[0]);
        }}
      />
      {values?.file ? (
        <Box
          mb="4"
          height="300px"
          backgroundImage={`url(${
            values?.file ? URL.createObjectURL(values?.file) : null
          })`}
          backgroundRepeat="no-repeat"
          backgroundSize="cover"
          backgroundPosition={"center center"}
          border="1px"
          borderColor="gray.200"
          borderStyle="dashed"
        />
      ) : null}
      <Button
        variant="outline"
        fontSize="14px"
        onClick={() => fileRef.current.click()}
      >
        {values?.file ? "Change" : "Add Pic"}
      </Button>
      <ErrorMessage
        component="div"
        name="file"
        style={{ color: "red", fontSize: "12px" }}
      />
    </Box>
  );
};
