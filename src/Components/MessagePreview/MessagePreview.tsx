// import styles from './MessageEditor.module.css';

import Button from '../../UI/Button/Button';

function MessageEditor() {
  const handleButtonClick = (): void => {
    console.log(333);
  };

  return (
    <Button type="button" text="KH0nKA" handleClick={handleButtonClick} />
  );
}

export default MessageEditor;
