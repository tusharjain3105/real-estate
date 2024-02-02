"use client";
import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";

const TinyMCEEditor = ({
  defaultValue,
  onChange = (value: string) => {},
  name = null,
}) => {
  const editorRef = useRef(null);
  return (
    <>
      <Editor
        apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={defaultValue}
        onChange={(e: any) => onChange(e.level.content)}
        textareaName={name}
        init={{
          height: 500,
          plugins:
            "preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons",

          menubar: "file edit view insert format tools table help",
          toolbar:
            "fullscreen preview | undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | save print | insertfile image media template link anchor codesample | ltr rtl",
          toolbar_sticky: true,
          toolbar_sticky_offset: 108,
          quickbars_selection_toolbar:
            "bold italic | quicklink h2 h3 blockquote quickimage quicktable",
          toolbar_mode: "sliding",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
    </>
  );
};
export default TinyMCEEditor;
