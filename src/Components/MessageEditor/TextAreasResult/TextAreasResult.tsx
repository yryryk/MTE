import { ChangeEvent } from 'react';

import styles from './TextAreasResult.module.css';

import IfThenElseFormValues from '../../../Interfaces/IfThenElseFormValues';
import TensileTextArea from '../../../UI/TensileTextArea/TensileTextArea';

interface TextAreasResultProps {
  name: string
  values: IfThenElseFormValues
  handleChange: (evt: ChangeEvent<HTMLTextAreaElement>) => void
  retrieveCursorPosition: (evt: ChangeEvent<HTMLTextAreaElement>) => void
  removeIfThenElseBlock: (nameOfBlock: string) => void
}

interface TextAreasBlockProps {
  values: IfThenElseFormValues
  handleChange: (evt: ChangeEvent<HTMLTextAreaElement>) => void
  retrieveCursorPosition: (evt: ChangeEvent<HTMLTextAreaElement>) => void
  removeIfThenElseBlock: (nameOfBlock: string) => void
  parentName: string
  names: { [key: string]: string; }
}

function TextAreasResult({
  values, name, handleChange, retrieveCursorPosition, removeIfThenElseBlock
}: TextAreasResultProps) {
  const nameFromValues = values[name];
  return (
    typeof nameFromValues === 'object'
      ? (
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        <TextAreasBlock
          parentName={name}
          values={values}
          handleChange={handleChange}
          retrieveCursorPosition={retrieveCursorPosition}
          removeIfThenElseBlock={removeIfThenElseBlock}
          names={nameFromValues}
        />
      )
      : (
        <TensileTextArea
          name={name}
          values={values}
          handleTextAreaChange={handleChange}
          retrieveCursorPosition={retrieveCursorPosition}
        />
      )
  );
}

function TextAreasBlock({
  values, handleChange, retrieveCursorPosition, removeIfThenElseBlock, parentName, names
}: TextAreasBlockProps) {
  const handleClose = () => {
    removeIfThenElseBlock(parentName);
  };
  return (
    <div className={styles.block} data-name={parentName}>
      <TextAreasResult
        name={names.first}
        values={values}
        handleChange={handleChange}
        retrieveCursorPosition={retrieveCursorPosition}
        removeIfThenElseBlock={removeIfThenElseBlock}
      />
      <div className={styles.subblock}>
        <button className={styles.closeBlockButton} onClick={handleClose} type="button">close</button>
        <TextAreasResult
          name={names.if}
          values={values}
          handleChange={handleChange}
          retrieveCursorPosition={retrieveCursorPosition}
          removeIfThenElseBlock={removeIfThenElseBlock}
        />
        <TextAreasResult
          name={names.then}
          values={values}
          handleChange={handleChange}
          retrieveCursorPosition={retrieveCursorPosition}
          removeIfThenElseBlock={removeIfThenElseBlock}
        />
        <TextAreasResult
          name={names.else}
          values={values}
          handleChange={handleChange}
          retrieveCursorPosition={retrieveCursorPosition}
          removeIfThenElseBlock={removeIfThenElseBlock}
        />
      </div>
      <TextAreasResult
        name={names.last}
        values={values}
        handleChange={handleChange}
        retrieveCursorPosition={retrieveCursorPosition}
        removeIfThenElseBlock={removeIfThenElseBlock}
      />
    </div>
  );
}

export default TextAreasResult;
