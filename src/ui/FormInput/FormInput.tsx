import SearchIcon from '@mui/icons-material/Search';
import { InputProps } from '@mui/material';
import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

interface FormInputPropType extends InputHTMLAttributes<HTMLInputElement> { label: string, type: string}

export const FormInput = ({ label, type ,...rest}: FormInputPropType) => {

  const SearchInputType = () => {
    return <div className='flex items-center p-2 h-12 border-2 border-light rounded-lg bg-labelBg'>
      <SearchIcon className='mr-2' />
      <input className='bg-transparent placeholder-lightPlaceholder-100 w-full' type={type} {...rest}/>
    </div>
  }

  return (
    <div className='flex flex-col mt-2'>
      <label className='text-lg'>{label}</label>
      {
        type == "search" ? <SearchInputType /> :
          <input className='p-2 h-12 border-2 border-light rounded-lg bg-labelBg placeholder-lightPlaceholder-100' type={type} {...rest} />
      }

    </div>
  )
}