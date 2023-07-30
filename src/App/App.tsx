import styles from './App.module.css';

import UseForm from '../Hooks/UseForm';

import Button from '../UI/Button/Button';
import TensileTextArea from '../UI/TensileTextArea/TensileTextArea';

function App() {
  const { values, handleChange } = UseForm({
    test: 'test',
  });

  const handleButtonClick = (): void => {
    console.log(333);
  };

  return (
    <main className={styles.container}>
      <TensileTextArea name="test" values={values} handleTextAreaChange={handleChange} />
      <Button type="button" text="KH0nKA" handleClick={handleButtonClick} />
    </main>
  );
}

export default App;
