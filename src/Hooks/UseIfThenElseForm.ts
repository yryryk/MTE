import { ChangeEvent, useState } from 'react';

import IfThenElseFormValues from '../Interfaces/IfThenElseFormValues';

// Пользовательский хук
// Передать аргументами начальные значения для полей вода
export default function UseIfThenElseForm(inputValues: IfThenElseFormValues) {
  // Функция возвращающая переданный объект без переданного свойства
  const removeProperty = (prop: string) => ({ [prop]: _, ...rest }) => rest;
  const [values, setValues] = useState(inputValues);
  // Переназначить value в useState для изменившегося поля ввода
  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };
  // Заменить строку на соответствующий комплект ссылок на новые строки и добавить эти строки
  const insertIfThenElseBlock = (
    name: string,
    names: { [key: string]: string },
    location: number
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
      [names.else]: ''
    });
  };
  // Удалить блок и все вложеные в него вернув прежнее значение
  const removeIfThenElseBlock = (nameOfBlock: string) => {
    // Рекурсивная функция для удаления
    const removeAll = (name: string) => {
      if (typeof values[name] !== 'string') {
        Object.values(values[name]).forEach((item) => removeAll(item));
      }
      setValues(removeProperty(name)(values));
    };
    const obj = values[nameOfBlock];
    if (typeof obj !== 'string') {
      removeAll(obj.if);
      removeAll(obj.then);
      removeAll(obj.else);
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
        setValues(removeProperty(first)(values));
        setValues(removeProperty(last)(values));
      }
      // Если блок имеет соседей
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
      if (typeof firstValue !== 'string' && typeof lastValue === 'string') {
        const newFirstValue = values[sublevelString(first, 'last')];
        oldVersion = String(newFirstValue) + lastValue;
        setValues({ ...values, [nameOfBlock]: { ...firstValue, first: oldVersion } });
        setValues(removeProperty(last)(values));
        removeAll(obj.first);
      }
      if (typeof firstValue === 'string' && typeof lastValue !== 'string') {
        const newLastValue = values[sublevelString(last, 'first')];
        oldVersion = firstValue + String(newLastValue);
        setValues({ ...values, [nameOfBlock]: { ...lastValue, last: oldVersion } });
        setValues(removeProperty(first)(values));
        removeAll(obj.last);
      }
      if (typeof firstValue !== 'string' && typeof lastValue !== 'string') {
        const newFirstValue = values[sublevelString(first, 'last')];
        const newLastValue = values[sublevelString(last, 'first')];
        oldVersion = String(newFirstValue) + String(newLastValue);
        setValues({ ...values, [last]: { ...lastValue, first: oldVersion } });
        setValues({ ...values, [nameOfBlock]: { ...firstValue, last } });
        removeAll(obj.first);
      }
    }
  };
  // Вернуть созданные инструменты
  return {
    values,
    handleChange,
    setValues,
    insertIfThenElseBlock,
    removeIfThenElseBlock
  };
}
