/* eslint-disable import/no-cycle */
import { ChangeEvent } from 'react';

import styles from './TextAreasBlock.module.css';

import IfThenElseFormValues from '../../../Interfaces/IfThenElseFormValues';

import TextAreasResult from '../TextAreasResult/TextAreasResult';

interface TextAreasBlockProps {
  values: IfThenElseFormValues
  handleChange: (evt: ChangeEvent<HTMLTextAreaElement>) => void
  retrieveCursorPosition: (evt: ChangeEvent<HTMLTextAreaElement>) => void
  parentName: string
  names: { [key: string]: string; }
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
      <TextAreasResult
        name={names.last}
        values={values}
        handleChange={handleChange}
        retrieveCursorPosition={retrieveCursorPosition}
      />
    </div>
  );
}

export default TextAreasBlock;
