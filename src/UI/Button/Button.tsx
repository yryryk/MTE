import styles from './Button.module.css';

interface ButtonProps {
  text: string;
  className?: string;
  defaultStyle?: boolean;
  type: 'button' | 'submit';
  handleClick: () => void;
}

function Button({
  text, className, defaultStyle, type, handleClick
}: ButtonProps) {
  return (
    <button
      type={type === 'button' ? 'button' : 'submit'}
      onClick={handleClick}
      className={`${styles.button}${defaultStyle ? ` ${styles.defaultStyle}` : ''}${className ? ` ${className}` : ''}`}
    >
      {text}
    </button>
  );
}

Button.defaultProps = {
  className: '',
  defaultStyle: true
};

export default Button;
