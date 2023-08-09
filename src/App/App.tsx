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
        arrVarNames={['kkdjf', 'kfjgo', 'kgjkeoo', 'hsfneid']}
        // template={{
        //   counter: '1',
        //   main: {
        //     first: 'first_0',
        //     last: 'last_0',
        //     if: 'if_0',
        //     then: 'then_0',
        //     else: 'else_0'
        //   },
        //   first_0: 'ad',
        //   last_0: 'fg',
        //   if_0: 'hj',
        //   then_0: 'kl',
        //   else_0: 'e5'
        // }}
        callbackSave={handleCloseMessageEditor}
      />
      )}
      {!isOpen && <Button type="button" text="Open Message Template Editor" handleClick={handleButtonClick} />}
    </main>
  );
}

export default App;
