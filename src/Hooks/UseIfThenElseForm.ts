import { ChangeEvent, useState } from 'react';

import IfThenElseFormValues from '../Interfaces/IfThenElseFormValues';

// Пользовательский хук
// Передать аргументами начальные значения для полей вода
export default function UseIfThenElseForm(inputValues: IfThenElseFormValues) {
  const [values, setValues] = useState(inputValues);
  const [nameOfRemovedBlockString, setNameOfRemovedBlockString] = useState('');
  // Функция возвращающая переданный объект без переданного свойства
  const removeProperty = (prop: string) => ({ [prop]: _, ...rest }) => rest;
  // Переназначить value в useState для изменившегося поля ввода
  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };
  // Заменить строку на соответствующий комплект ссылок на новые строки и добавить эти строки
  const insertIfThenElseBlock = (
    name: string,
    names: { [key: string]: string },
    location: number,
    counter: string
  ) => {
    // Разделить строку в указанном месте
    const firstString = String(values[name]).slice(0, location);
    const lastString = String(values[name]).slice(location);
    setValues({
      ...values,
      [name]: names,
      [names.first]: firstString,
      [names.last]: lastString,
      [names.if]: '',
      [names.then]: '',
      [names.else]: '',
      counter
    });
  };
  const sublevelString = (name: string, type: string): string => {
    const block = values[name];
    if (typeof block !== 'string') {
      const value = values[block[type]];
      if (typeof value !== 'string') {
        return sublevelString(block[type], type);
      }
      return block[type];
    }
    return name;
  };
  // Удалить блок и все вложеные в него вернув прежнее значение
  const removeIfThenElseBlock = (nameOfBlock: string) => {
    // Рекурсивная функция для удаления
    const removeAll = (name: string) => {
      if (typeof values[name] !== 'string') {
        Object.values(values[name]).forEach((item) => removeAll(item));
      }
      setValues((state) => removeProperty(name)(state));
    };
    const obj = values[nameOfBlock];
    if (typeof obj !== 'string') {
      // Вытащить ссылки
      const { first, last } = obj;
      // Достать значения по этим ссылкам
      const firstValue = values[first];
      const lastValue = values[last];
      let oldVersion;
      // Если блок не имеет соседей
      if (typeof firstValue === 'string' && typeof lastValue === 'string') {
        oldVersion = firstValue + lastValue;
        setValues({ ...values, [nameOfBlock]: oldVersion });
        removeAll(first);
        removeAll(last);
        setNameOfRemovedBlockString(nameOfBlock);
      }
      // Если блок имеет соседей
      if (typeof firstValue !== 'string' && typeof lastValue === 'string') {
        const newFirstLink = sublevelString(first, 'last');
        const newFirstValue = values[newFirstLink];
        oldVersion = String(newFirstValue) + lastValue;
        setValues({ ...values, [nameOfBlock]: { ...firstValue }, [newFirstLink]: oldVersion });
        setValues((state) => removeProperty(first)(state));
        removeAll(last);
        setNameOfRemovedBlockString(sublevelString(nameOfBlock, 'first'));
      }
      if (typeof firstValue === 'string' && typeof lastValue !== 'string') {
        const newLastLink = sublevelString(last, 'first');
        const newLastValue = values[newLastLink];
        oldVersion = firstValue + String(newLastValue);
        setValues({ ...values, [nameOfBlock]: { ...lastValue }, [newLastLink]: oldVersion });
        removeAll(first);
        setValues((state) => removeProperty(last)(state));
        setNameOfRemovedBlockString(sublevelString(nameOfBlock, 'first'));
      }
      if (typeof firstValue !== 'string' && typeof lastValue !== 'string') {
        const newFirstLink = sublevelString(first, 'last');
        const newLastLink = sublevelString(last, 'first');
        const newFirstValue = values[newFirstLink];
        const newLastValue = values[newLastLink];
        oldVersion = String(newFirstValue) + String(newLastValue);
        setValues({
          ...values,
          [nameOfBlock]: { ...firstValue },
          [newFirstLink]: { ...lastValue },
          [newLastLink]: oldVersion
        });
        setValues((state) => removeProperty(first)(state));
        setValues((state) => removeProperty(last)(state));
        setNameOfRemovedBlockString(sublevelString(nameOfBlock, 'first'));
      }
      removeAll(obj.if);
      removeAll(obj.then);
      removeAll(obj.else);
    }
  };
  // Вернуть созданные инструменты
  return {
    values,
    nameOfRemovedBlockString,
    handleChange,
    setValues,
    insertIfThenElseBlock,
    removeIfThenElseBlock,
    sublevelString
  };
}
