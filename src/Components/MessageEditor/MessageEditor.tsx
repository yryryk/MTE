import styles from './MessageEditor.module.css';

import UseIfThenElseForm from '../../Hooks/UseIfThenElseForm';

import IfThenElseFormValues from '../../Interfaces/IfThenElseFormValues';
import Button from '../../UI/Button/Button';
import TensileTextArea from '../../UI/TensileTextArea/TensileTextArea';

interface CallbackSave {
  callbackSave: (template: IfThenElseFormValues) => void
}

function MessageEditor(
  arrVarNames: string[],
  callbackSave: CallbackSave,
  template?: IfThenElseFormValues
) {
  const { values, handleChange } = UseIfThenElseForm(template || { main: 'test1' });

  const handleButtonClick = (): void => {
    console.log(333);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Message Template Editor</h1>
      <div className={styles.buttonsSubstitutesContainer}>
        {[...arrVarNames].map((item) => (
          <Button key={item} type="button" text={`{${item}}`} handleClick={handleButtonClick} />
        ))}
      </div>
      <Button type="button" text="Add If-Then-Else Block" handleClick={handleButtonClick} />
      <form name="message-editor" className={styles.form}>
        <div className={styles.textAreasContainer}>
          <TensileTextArea name="main" values={values} handleTextAreaChange={handleChange} />
        </div>
        <div className={styles.buttonsConditionsContainer}>
          <Button type="button" text="Preview" handleClick={handleButtonClick} />
          <Button type="submit" text="Save" handleClick={handleButtonClick} />
          <Button type="button" text="Close" handleClick={handleButtonClick} />
        </div>
      </form>
    </div>
  );
}

MessageEditor.defaultProps = {
  template: { main: 'test2' },
};

export default MessageEditor;
