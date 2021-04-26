import { useState } from "react";

const useInput = (name) => {
  const [value, setValue] = useState("");
  const onChange = ({ target: { value } }) => setValue(value);
  return { value, onChange, name };
};

export default useInput;
