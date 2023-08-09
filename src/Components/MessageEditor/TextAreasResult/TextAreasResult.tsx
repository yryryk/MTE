import { ChangeEvent } from 'react';

import styles from './TextAreasResult.module.css';

import IfThenElseFormValues from '../../../Interfaces/IfThenElseFormValues';
import TensileTextArea from '../../../UI/TensileTextArea/TensileTextArea';

interface TextAreasResultProps {
  name: string
  values: IfThenElseFormValues
  handleChange: (evt: ChangeEvent<HTMLTextAreaElement>) => void
  retrieveCursorPosition: (evt: ChangeEvent<HTMLTextAreaElement>) => void
}

interface TextAreasBlockProps {
  values: IfThenElseFormValues
  handleChange: (evt: ChangeEvent<HTMLTextAreaElement>) => void
  retrieveCursorPosition: (evt: ChangeEvent<HTMLTextAreaElement>) => void
  parentName: string
  names: { [key: string]: string; }
}

function TextAreasResult({
  values, name, handleChange, retrieveCursorPosition
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
  values, handleChange, retrieveCursorPosition, parentName, names
}: TextAreasBlockProps) {
  return (
    <div className={styles.block} data-name={parentName}>
      <TextAreasResult
        name={names.first}
        values={values}
        handleChange={handleChange}
        retrieveCursorPosition={retrieveCursorPosition}
      />
      <div className={styles.subblock}>
        <TextAreasResult
          name={names.if}
          values={values}
          handleChange={handleChange}
          retrieveCursorPosition={retrieveCursorPosition}
        />
        <TextAreasResult
          name={names.then}
          values={values}
          handleChange={handleChange}
          retrieveCursorPosition={retrieveCursorPosition}
        />
        <TextAreasResult
          name={names.else}
          values={values}
          handleChange={handleChange}
          retrieveCursorPosition={retrieveCursorPosition}
        />
      </div>
      <TextAreasResult
        name={names.last}
        values={values}
        handleChange={handleChange}
        retrieveCursorPosition={retrieveCursorPosition}
      />
    </div>
  );
}

export default TextAreasResult;
