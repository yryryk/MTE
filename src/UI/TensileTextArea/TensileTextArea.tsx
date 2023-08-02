import { ChangeEvent } from 'react';

import styles from './TensileTextArea.module.css';

import IfThenElseFormValues from '../../Interfaces/IfThenElseFormValues';

interface TensileTextAreaProps {
  name: string
  values: IfThenElseFormValues
  className?: string
  handleTextAreaChange: (evt: ChangeEvent<HTMLTextAreaElement>) => void
}

function TensileTextArea({
  name, values, className, handleTextAreaChange
}: TensileTextAreaProps) {
  // Вычислить и применить новые значения для высоты элемента при каждом вводе
  const handleChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    const elem = evt.target;
    // Получить текущие стили
    const computedStyle = getComputedStyle(elem);
    // Уменьшить высоту элемента при удалении символов
    elem.style.height = 'auto';
    // Увеличить высоту элемента при вводе символов
    elem.style.height = `${
      elem.scrollHeight
      - (parseInt(computedStyle.paddingTop, 10)
        + parseInt(computedStyle.paddingBottom, 10)
        + parseInt(computedStyle.borderTopWidth, 10)
        + parseInt(computedStyle.borderBottomWidth, 10))
    }px`;
    // Добавить внешний обработчик из пропсов
    handleTextAreaChange(evt);
  };
  return (
    <textarea
      name={name}
      rows={1}
      onChange={handleChange}
      className={`${styles.textarea}${className ? ` ${className}` : ''}`}
      value={String(values[name]) || ''}
    />
  );
}

TensileTextArea.defaultProps = {
  className: '',
};

export default TensileTextArea;
