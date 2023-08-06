import {
  ChangeEvent, useEffect, useRef
} from 'react';

import styles from './TensileTextArea.module.css';

import IfThenElseFormValues from '../../Interfaces/IfThenElseFormValues';

interface TensileTextAreaProps {
  name: string
  values: IfThenElseFormValues
  className?: string
  handleTextAreaChange: (evt: ChangeEvent<HTMLTextAreaElement>) => void
  retrieveCursorPosition: (evt: ChangeEvent<HTMLTextAreaElement>) => void
}

function TensileTextArea({
  name, values, className, handleTextAreaChange, retrieveCursorPosition
}: TensileTextAreaProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  // Вычислить и применить новые значения для высоты элемента
  const resizeTextarea = () => {
    if (textareaRef) {
      const textareaElement = textareaRef.current;
      if (textareaElement) {
        // Получить текущие стили
        const computedStyle = getComputedStyle(textareaElement);
        // Уменьшить высоту элемента при удалении символов
        textareaElement.style.height = 'auto';
        // Увеличить высоту элемента при вводе символов
        textareaElement.style.height = `${
          textareaElement.scrollHeight
          - (parseInt(computedStyle.paddingTop, 10)
            + parseInt(computedStyle.paddingBottom, 10)
            + parseInt(computedStyle.borderTopWidth, 10)
            + parseInt(computedStyle.borderBottomWidth, 10))
        }px`;
      }
    }
  };
  useEffect(() => {
    resizeTextarea();
  }, []);
  const handleChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    resizeTextarea();
    // Добавить внешний обработчик из пропсов
    handleTextAreaChange(evt);
  };

  return (
    <textarea
      ref={textareaRef}
      name={name}
      rows={1}
      onChange={handleChange}
      onBlur={retrieveCursorPosition}
      className={`${styles.textarea}${className ? ` ${className}` : ''}`}
      value={String(values[name]) || ''}
    />
  );
}

TensileTextArea.defaultProps = {
  className: '',
};

export default TensileTextArea;
