import './buttons.styles.scss';

interface IButtonType {
  google: string,
  inverted: string
}

interface IButtonProps {
  children: any,
  buttonType: IButtonType
}

const BUTTON_TYPES_CLASSES: IButtonType = {
  google: 'google-sign-in',
  inverted: 'inverted'
}

const Button = ({ children, buttonType, ...otherProps }: IButtonProps) => {
  return(
    <button
      className={`button-container ${BUTTON_TYPES_CLASSES[buttonType]}`}
      {...otherProps}
    >
      {children}
    </button>
  )
}

export default Button;