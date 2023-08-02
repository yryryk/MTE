import { useState } from 'react';

import styles from './App.module.css';

import MessageEditor from '../Components/MessageEditor/MessageEditor';
import Button from '../UI/Button/Button';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const handleButtonClick = (): void => {
    setIsOpen(true);
  };

  return (
    <main className={styles.page}>
      {isOpen && <MessageEditor arrVarNames={['kkdjf', 'kfjgo', 'kgjkeoo', 'hsfneid']} callbackSave={() => setIsOpen(true)} />}
      {!isOpen && <Button type="button" text="Open Message Template Editor" handleClick={handleButtonClick} />}
    </main>
  );
}

export default App;
