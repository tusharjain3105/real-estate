"use client";

import { useFormStatus } from "react-dom";
import { Button, ButtonProps } from "./ui/button";

const SubmitButton = (props: ButtonProps) => {
  const { pending } = useFormStatus();

  return <Button disabled={pending} {...props} />;
};
export default SubmitButton;
