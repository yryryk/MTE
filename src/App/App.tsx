import styles from './App.module.css';

import UseForm from '../Hooks/UseForm';

import logo from '../logo.svg';
import TensileTextArea from '../UI/TensileTextArea/TensileTextArea';

function App() {
  const { values, handleChange } = UseForm({
    test: 'test',
  });

  return (
    <div className={styles.app}>
      <header className={styles.appHeader}>
        <img src={logo} className={styles.appLogo} alt="logo" />
        <TensileTextArea name="test" values={values} handleTextAreaChange={handleChange} />
      </header>
    </div>
  );
}

export default App;
