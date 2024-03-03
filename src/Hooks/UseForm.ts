import { ChangeEvent, useState } from 'react';

import InputValues from '../Interfaces/InputValues';

// Пользовательский хук
// Передать аргументами начальные значения для полей вода
export default function useForm(inputValues: InputValues) {
  const [values, setValues] = useState(inputValues);
  // Обработчик переназначает value в useState для изменившегося поля ввода
  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };
  // Вернуть созданные инструменты
  return { values, handleChange, setValues };
}
