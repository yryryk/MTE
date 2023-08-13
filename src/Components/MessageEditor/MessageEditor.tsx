import { useEffect, useState } from 'react';

import styles from './MessageEditor.module.css';

import TextAreasResult from './TextAreasResult/TextAreasResult';

import UseIfThenElseForm from '../../Hooks/UseIfThenElseForm';

import IfThenElseFormValues from '../../Interfaces/IfThenElseFormValues';
import Button from '../../UI/Button/Button';

interface MessageEditorProps {
  arrVarNames: string[],
  callbackSave: () => void,
  template?: IfThenElseFormValues
}

function MessageEditor({
  arrVarNames,
  callbackSave,
  template
}:MessageEditorProps) {
  const {
    values,
    nameOfRemovedBlockString,
    handleChange,
    insertIfThenElseBlock,
    removeIfThenElseBlock,
    sublevelString
  } = UseIfThenElseForm({ ...template });
  const [counter, setCounter] = useState(Number(values.counter));
  const [cursorPosition, setCursorPosition] = useState({ name: sublevelString('main', 'first'), cursorPosition: 0 });
  useEffect(() => {
    if (nameOfRemovedBlockString) {
      setCursorPosition({ name: nameOfRemovedBlockString, cursorPosition: 0 });
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

  const handleButtonClick = (): void => {
    console.log(values);
  };
  const retrieveCursorPosition = (evt: { target: { name: any; selectionStart: any; }; }): void => {
    setCursorPosition({ name: evt.target.name, cursorPosition: evt.target.selectionStart });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Message Template Editor</h1>
      <div className={styles.buttonsSubstitutesContainer}>
        {[...arrVarNames].map((item) => (
          <Button key={item} type="button" text={`{${item}}`} handleClick={handleButtonClick} />
        ))}
      </div>
      <Button type="button" text="Add If-Then-Else Block" handleClick={handleAddClick} />
      <form name="message-editor" className={styles.form}>
        <div className={styles.textAreasContainer}>
          <TextAreasResult name="main" values={values} handleChange={handleChange} retrieveCursorPosition={retrieveCursorPosition} removeIfThenElseBlock={removeIfThenElseBlock} />
        </div>
        <div className={styles.buttonsConditionsContainer}>
          <Button type="button" text="Preview" handleClick={handleButtonClick} />
          <Button type="submit" text="Save" handleClick={callbackSave} />
          <Button type="button" text="Close" handleClick={handleButtonClick} />
        </div>
      </form>
    </div>
  );
}

MessageEditor.defaultProps = {
  template: { main: 'test1234567890', counter: '0', },
};

export default MessageEditor;
