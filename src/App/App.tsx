import { useState } from 'react';

import styles from './App.module.css';

import MessageEditor from '../Components/MessageEditor/MessageEditor';
import Button from '../UI/Button/Button';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const handleButtonClick = (): void => {
    setIsOpen(true);
  };
  const handleCloseMessageEditor = (): void => {
    setIsOpen(false);
  };

  return (
    <main className={styles.page}>
      {isOpen && (
      <MessageEditor
        arrVarNames={['firstname', 'lastname', 'company', 'position']}
        template={{
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
          then_0: '{lastname}',
          else_0: '{company} {position}'
        }}
        callbackSave={handleCloseMessageEditor}
      />
      )}
      {!isOpen && <Button type="button" text="Open MTE" handleClick={handleButtonClick} />}
    </main>
  );
}

export default App;
