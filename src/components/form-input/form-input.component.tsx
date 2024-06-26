import { FormInputLabel, Input, Group } from "./form-input.styles";

export const FormInput = ({
  label,
  ...otherProps
}: {
  label: string;
  value: string;
}) => {
  return (
    <Group>
      <Input {...otherProps} />
      {label && (
        <FormInputLabel shrink={otherProps.value.length}>
          {label}
        </FormInputLabel>
      )}
    </Group>
  );
};
