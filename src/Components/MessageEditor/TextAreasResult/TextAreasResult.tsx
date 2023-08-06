/* eslint-disable import/no-cycle */
import { ChangeEvent } from 'react';

import IfThenElseFormValues from '../../../Interfaces/IfThenElseFormValues';
import TensileTextArea from '../../../UI/TensileTextArea/TensileTextArea';
import TextAreasBlock from '../TextAreasBlock/TextAreasBlock';

interface TextAreasResultProps {
  name: string
  values: IfThenElseFormValues
  handleChange: (evt: ChangeEvent<HTMLTextAreaElement>) => void
  retrieveCursorPosition: (evt: ChangeEvent<HTMLTextAreaElement>) => void
}

function TextAreasResult({
  values, name, handleChange, retrieveCursorPosition
}: TextAreasResultProps) {
  const nameFromValues = values[name];
  return (
    typeof nameFromValues === 'object'
      ? (
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

export default TextAreasResult;
