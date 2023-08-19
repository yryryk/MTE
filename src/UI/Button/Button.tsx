import styles from './Button.module.css';

interface ButtonProps {
  text: string;
  className?: string;
  spanClassName?: string;
  defaultStyle?: boolean;
  type: 'button' | 'submit';
  handleClick: (evt?: React.MouseEvent<HTMLButtonElement>) => void;
}

function Button({
  text, className, spanClassName, defaultStyle, type, handleClick
}: ButtonProps) {
  return (
    <button
      type={type === 'button' ? 'button' : 'submit'}
      onClick={handleClick}
      className={`${styles.button}${defaultStyle ? ` ${styles.defaultStyle}` : ''}${className ? ` ${className}` : ''}`}
    >
      <span className={spanClassName ? ` ${spanClassName}` : ''}>
        {text}
      </span>
    </button>
  );
}

Button.defaultProps = {
  className: '',
  spanClassName: '',
  defaultStyle: true
};

export default Button;
