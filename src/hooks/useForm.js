import { useState } from "react";

export const useForm = (initialState = {}) => {
  const [formState, setFormState] = useState(initialState);
  const handleInputChange = ({ target }) => {
    setFormState({
      ...formState,
      [target.name]: target.value,
    });
  };
  const reset = (newFormState = initialState) => {
    setFormState(newFormState);
  };

  return { formState, handleInputChange, reset, ...formState };
};
