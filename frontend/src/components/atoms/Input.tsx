import { Input as FormInput } from '@nextui-org/react'
import { useController, useFormContext } from 'react-hook-form'

export const Input = ({
    label,
    required,
}: {
    label: string
    required?: boolean
}) => {
    const { control } = useFormContext()

    const {
        field,
        fieldState: { invalid, error },
    } = useController({
        name: label,
        control,
    })

    return (
        <FormInput
            label={label}
            value={field.value}
            name={field.name}
            onChange={field.onChange}
            onBlur={field.onBlur}
            ref={field.ref}
            required={Boolean(required)}
            color={invalid ? 'danger' : 'default'}
            validationState={invalid ? 'invalid' : 'valid'}
            errorMessage={invalid ? error?.message : undefined}
        />
    )
}
