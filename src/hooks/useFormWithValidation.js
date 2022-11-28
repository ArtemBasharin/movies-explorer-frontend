import { useState, useCallback } from "react";
import isEmail from "validator/es/lib/isEmail";

export default function useFormWithValidation({ initialValues } = { initialValues: {} }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  // Set valid if have initial values
  const [isValid, setIsValid] = useState(Object.keys(initialValues).length ? true : false);

  const handleChange = (e) => {
    const input = e.target;
    const { value, name } = input;

    if (name === "name" && input.validity.patternMismatch) {
      input.setCustomValidity(
        "Имя должно содержать только латиницу, кириллицу, пробел или дефис."
      );
    } else {
      input.setCustomValidity("");
    }

    if (name === "email") {
      if (!isEmail(value)) {
        input.setCustomValidity("Некорректый адрес почты.");
      } else {
        input.setCustomValidity("");
      }
    }

    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: input.validationMessage });
    setIsValid(input.closest("form").checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, errors, isValid, handleChange, resetForm, setIsValid };
}
