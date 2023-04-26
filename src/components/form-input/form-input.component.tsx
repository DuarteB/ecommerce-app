import './form-input.styles.scss';

export const FormInput = ({ label , ...otherProps }: { label: string, value: string }) => {
  return(
    <div className="group">
      <input className="form-input" {...otherProps} />
      {label && (
          <label className={`${
              otherProps.value.length ? 'shrink' : ''
            } form-input-label`}
          >
            {label}
          </label>
      )}
    </div>
  )
}