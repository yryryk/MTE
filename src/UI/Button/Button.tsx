import styles from './Button.module.css';

interface ButtonProps {
  text: string;
  className?: string;
  type: 'button' | 'submit';
  handleClick: () => void;
}

function Button({
  text, className, type, handleClick
}: ButtonProps) {
  return (
    <button
      type={type === 'button' ? 'button' : 'submit'}
      onClick={handleClick}
      className={`${styles.button}${className ? ` ${className}` : ''}`}
    >
      {text}
    </button>
  );
}

Button.defaultProps = {
  className: '',
};

export default Button;
