import { useState, useEffect } from 'react';

import styles from './App.module.css';

import MessageEditor from '../Components/MessageEditor/MessageEditor';
import MessagePreview from '../Components/MessagePreview/MessagePreview';
import IfThenElseFormValues from '../Interfaces/IfThenElseFormValues';
import inputValues from '../Interfaces/InputValues';
import Button from '../UI/Button/Button';

function App() {
  const [isMessageEditorOpen, setIsMessageEditorOpen] = useState(false);
  const [isMessagePreviewOpen, setIsMessagePreviewOpen] = useState(false);
  const [isStartWindowOpen, setIsStartWindowOpen] = useState(true);
  const [template, setTemplate] = useState<IfThenElseFormValues>({});
  const [variables, setVariables] = useState<inputValues>({});
  const [arrVarNames, setArrVarNames] = useState<string[]>([]);
  useEffect(() => {
    setTemplate({
      counter: '1',
      main: {
        first: 'first_0',
        last: 'last_0',
        if: 'if_0',
        then: 'then_0',
        else: 'else_0'
      },
      first_0: 'превед',
      last_0: ' медвед',
      if_0: '{firstname}',
      then_0: ' {firstname}!',
      else_0: ' {lastname}!'
    });
    setArrVarNames(['firstname', 'lastname', 'company', 'position']);
  }, []);
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

  return (
    <main className={styles.page}>
      {isMessageEditorOpen && (
      <MessageEditor
        arrVarNames={arrVarNames}
        template={template}
        callbackSave={handleOpenStartWindow}
        handleCloseMessageEditor={handleOpenStartWindow}
        handleOpenMessagePreview={handleOpenMessagePreview}
        setTemplate={setTemplate}
      />
      )}
      {isMessagePreviewOpen && (
      <MessagePreview
        arrVarNames={['firstname', 'lastname', 'company', 'position']}
        template={template}
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
