import { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import { Controller } from "react-hook-form";

function RTE({
  name,
  control,
  label,
  defaultValue = "",
}: {
  name: string;
  control?: any;
  label: string;
  defaultValue?: string;
}) {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  // const config: { IJoditEditorProps: {} } = {
  //   placeholder: "Click Write Share. **Warning:** May cause blog addiction...",
  // };

  console.log(defaultValue)

  return (
    <div>
      {label && (
        <label className="inline-block mb-1 pl-1 text-xl font-semibold">
          {label}
        </label>
      )}
      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <JoditEditor
            ref={editor}
            value={content}
            onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
            // config={config}
            onChange={onChange}
          />
        )}
      />
    </div>
  );
}

export default RTE;
