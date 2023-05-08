import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Box } from "@chakra-ui/react";
import { ErrorMessage, Field } from "formik";

export const TextEditor = ({ setFieldValue, values }) => {

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setFieldValue("content", data);
  };

  const editorConfig = {
    toolbar: {
      items: [
        "|",
        "bold",
        "italic",
        "link",
        "bulletedList",
        "numberedList",
        "undo",
        "redo",
      ],
      viewportTopOffset: 62,
    },
    language: "en",
    placeholder: "Type something...",
  };

  return (
    <Box w="full">
      <CKEditor
        name="content"
        as={Field}
        editor={ClassicEditor}
        onChange={handleEditorChange}
        data={values?.content}
        config={editorConfig}
      />
      <ErrorMessage
        component="div"
        name="content"
        style={{ color: "red", fontSize: "12px" }}
      />
    </Box>
  );
};
