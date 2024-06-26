import { useEffect, useState } from 'react';

import styles from './MessageEditor.module.css';

import TextAreasResult from './TextAreasResult/TextAreasResult';

import useIfThenElseForm from '../../Hooks/useIfThenElseForm';

import IfThenElseFormValues from '../../Interfaces/IfThenElseFormValues';
import Button from '../../UI/Button/Button';
import generateKeyFromWord from '../../utils/generateKeyFromWord';

interface MessageEditorProps {
  arrVarNames: string[],
  callbackSave: (newTemplate: IfThenElseFormValues) => Promise<void>,
  template?: IfThenElseFormValues
  handleCloseMessageEditor: () => void,
  handleOpenMessagePreview: () => void,
  setTemplate: (newTemplate: IfThenElseFormValues) => void,
}

function MessageEditor({
  arrVarNames,
  callbackSave,
  template,
  handleCloseMessageEditor,
  handleOpenMessagePreview,
  setTemplate,
}:MessageEditorProps) {
  const {
    values,
    nameOfRemovedBlockString,
    setValues,
    handleChange,
    insertIfThenElseBlock,
    removeIfThenElseBlock,
    sublevelString
  } = useIfThenElseForm({ ...template });
  const [counter, setCounter] = useState(Number(values.counter));
  const [cursorPosition, setCursorPosition] = useState({ name: sublevelString('main', 'first'), cursorPosition: 0 });
  useEffect(() => {
    if (nameOfRemovedBlockString.name) {
      setCursorPosition({ name: nameOfRemovedBlockString.name, cursorPosition: 0 });
    }
  }, [nameOfRemovedBlockString]);
  const newCounter = +counter + 1;
  const handleAddClick = (): void => {
    if (!cursorPosition.name.includes('if')) {
      const names = {
        first: `first_${counter}`,
        last: `last_${counter}`,
        if: `if_${counter}`,
        then: `then_${counter}`,
        else: `else_${counter}`
      };
      insertIfThenElseBlock(
        cursorPosition.name,
        names,
        cursorPosition.cursorPosition,
        String(newCounter)
      );
      setCounter(newCounter);
      setCursorPosition({ name: names.then, cursorPosition: 0 });
    }
  };

  const handleInsertButtonClick = (evt: any): void => {
    const newString = String(values[cursorPosition.name]).slice(0, cursorPosition.cursorPosition)
      + evt.target.textContent
      + String(values[cursorPosition.name]).slice(cursorPosition.cursorPosition);
    setValues({ ...values, [cursorPosition.name]: newString });
    const textArea: HTMLTextAreaElement | null = document.querySelector(`[name = ${cursorPosition.name}]`);
    if (textArea) textArea.focus();
  };
  const retrieveCursorPosition = (evt: { target: { name: any; selectionStart: any; }; }): void => {
    setCursorPosition({ name: evt.target.name, cursorPosition: evt.target.selectionStart });
  };
  const handleUseMessagePreview = (): void => {
    handleOpenMessagePreview();
    setTemplate(values);
  };
  const handleSave = async (evt: any) => {
    evt.preventDefault();
    await callbackSave(values);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Message Template Editor</h1>
      <div className={styles.buttonsSubstitutesContainer}>
        {[...arrVarNames].map((item) => (
          <Button key={generateKeyFromWord(item)} type="button" text={`{${item}}`} handleClick={handleInsertButtonClick} />
        ))}
      </div>
      <Button type="button" text="Add If-Then-Else Block" handleClick={handleAddClick} />
      <form name="message-editor" className={styles.form}>
        <div className={styles.textAreasContainer}>
          <TextAreasResult name="main" values={values} handleChange={handleChange} retrieveCursorPosition={retrieveCursorPosition} removeIfThenElseBlock={removeIfThenElseBlock} />
        </div>
        <div className={styles.buttonsConditionsContainer}>
          <Button type="button" text="Preview" handleClick={handleUseMessagePreview} />
          <Button type="submit" text="Save" handleClick={handleSave} />
          <Button type="button" text="Close" handleClick={handleCloseMessageEditor} />
        </div>
      </form>
    </div>
  );
}

MessageEditor.defaultProps = {
  template: { main: '', counter: '0', },
};

export default MessageEditor;
