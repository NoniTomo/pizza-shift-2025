import type { InputHTMLAttributes } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'

export type TextFieldProps = {
  label?: string
  id: string
  register: UseFormRegisterReturn
  isDisabled?: boolean
  isRequired?: boolean
  placeholder?: string
  error?: string
} & InputHTMLAttributes<HTMLInputElement>

export function TextField({
  label,
  id,
  register,
  isDisabled = false,
  isRequired = false,
  className,
  placeholder,
  error,
  ...props
}: TextFieldProps) {
  return (
    <div className={`relative flex flex-col gap-1 ${className}`}>
      <label htmlFor={id} className="mb-1">
        {label}
        <span>{isRequired ? '*' : ''}</span>
      </label>
      <input
        {...props}
        {...register}
        placeholder={placeholder}
        autoComplete="off"
        disabled={isDisabled}
        id={id}
        type="text"
        className={`rounded-xl border-2 border-solid border-gray-300 p-3 pr-2 outline-none transition-all focus:m-0 focus:border-[#4C94FF] ${isDisabled && 'border-gray-400 bg-[#e6e7e9]'} ${error && 'm-0 mb-7 border-[#F64C4C] hover:bg-red-50 focus:mb-7 focus:border-[#F64C4C] focus:bg-red-50'}`}
      />
      <span className="absolute bottom-0 left-2 text-[#F64C4C]">{error}</span>
    </div>
  )
}
