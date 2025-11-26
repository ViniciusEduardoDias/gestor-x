import { HTMLProps } from "react";

function TextArea({ ...rest }: HTMLProps<HTMLTextAreaElement>) {
  return <textarea className="w-full px-4 py-2" {...rest} />;
}

export default TextArea;
