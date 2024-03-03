import { useState, useEffect } from 'react';

import styles from './App.module.css';

import MessageEditor from '../Components/MessageEditor/MessageEditor';
import MessagePreview from '../Components/MessagePreview/MessagePreview';
import useLocalStorage from '../Hooks/useLocalStorage';
import IfThenElseFormValues from '../Interfaces/IfThenElseFormValues';
import inputValues from '../Interfaces/InputValues';
import Button from '../UI/Button/Button';

function App() {
  const [isMessageEditorOpen, setIsMessageEditorOpen] = useState(false);
  const [isMessagePreviewOpen, setIsMessagePreviewOpen] = useState(false);
  const [isStartWindowOpen, setIsStartWindowOpen] = useState(true);
  const [currentTemplate, setCurrentTemplate] = useState<IfThenElseFormValues>({});
  const [variables, setVariables] = useState<inputValues>({});
  const [arrVarNames, setArrVarNames] = useState<string[]>([]);
  const [template, setTemplate] = useLocalStorage<IfThenElseFormValues>('template', {
    counter: '0',
    main: ''
  });
  useEffect(() => {
    setArrVarNames(['firstname', 'lastname', 'company', 'position']);
  }, []);
  useEffect(() => {
    setCurrentTemplate(template);
  }, [template]);
  const handleOpenMessageEditor = (): void => {
    setIsMessageEditorOpen(true);
    setIsMessagePreviewOpen(false);
    setIsStartWindowOpen(false);
  };
  const handleOpenStartWindow = (): void => {
    setIsMessageEditorOpen(false);
    setIsMessagePreviewOpen(false);
    setIsStartWindowOpen(true);
  };
  const handleOpenMessagePreview = (): void => {
    setIsMessageEditorOpen(false);
    setIsMessagePreviewOpen(true);
    setIsStartWindowOpen(false);
  };
  const callbackSave = async (newTemplate: IfThenElseFormValues): Promise<void> => {
    await setTemplate(newTemplate);
  };

  return (
    <main className={styles.page}>
      {isMessageEditorOpen && (
      <MessageEditor
        arrVarNames={arrVarNames}
        template={currentTemplate}
        callbackSave={callbackSave}
        handleCloseMessageEditor={handleOpenStartWindow}
        handleOpenMessagePreview={handleOpenMessagePreview}
        setTemplate={setCurrentTemplate}
      />
      )}
      {isMessagePreviewOpen && (
      <MessagePreview
        arrVarNames={['firstname', 'lastname', 'company', 'position']}
        template={currentTemplate}
        handleCloseMessagePreview={handleOpenMessageEditor}
        variables={variables}
        setVariables={setVariables}
      />
      )}
      {isStartWindowOpen && <Button type="button" text="Open MTE" handleClick={handleOpenMessageEditor} />}
    </main>
  );
}

export default App;
