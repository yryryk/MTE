import { useState, useEffect } from 'react';

import styles from './MessagePreview.module.css';

import useForm from '../../Hooks/UseForm';
import IfThenElseFormValues from '../../Interfaces/IfThenElseFormValues';
import inputValues from '../../Interfaces/InputValues';
import Button from '../../UI/Button/Button';
import generateKeyFromWord from '../../utils/generateKeyFromWord';
import generateText from '../../utils/generateText';

interface MessagePreviewProps {
  arrVarNames: string[],
  template: IfThenElseFormValues
  handleCloseMessagePreview: () => void,
  variables: inputValues,
  setVariables: (values: inputValues) => void
}

function MessagePreview({
  arrVarNames,
  template,
  handleCloseMessagePreview,
  variables,
  setVariables,
}: MessagePreviewProps) {
  const { values, handleChange } = useForm(variables);
  const [text, setText] = useState('');
  useEffect(() => {
    setText(generateText(template, values));
  }, [template, values]);
  const handleClose = () => {
    handleCloseMessagePreview();
    setVariables(values);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Message Preview</h1>
      <p className={styles.mainArea}>{text}</p>
      <div className={styles.variablesContainer}>
        {arrVarNames.map((item) => (
          <div key={generateKeyFromWord(item)} className={styles.variablesInputContainer}>
            <label htmlFor={item}>{item}</label>
            <input name={item} id={item} className={styles.variablesInput} type="text" placeholder="Введите значение" onChange={handleChange} value={values[item] || ''} />
          </div>
        ))}
      </div>
      <Button className={styles.button} type="button" text="Close" handleClick={handleClose} />
    </div>
  );
}

export default MessagePreview;
