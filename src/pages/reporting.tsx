import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import SearchIcon from '@mui/icons-material/Search';

export default function reporting() {
  return (
    <div className='container mx-auto py-16 px-16'>
      <h1 className='text-3xl font-bold'>Reporting Form</h1>
      <form className='flex'>
        {/* Reporters user data */}
        <div>
          {
            [
              { label: "Full Name", placeholder: "Enter your full name", type: "text" },
              { label: "Address", placeholder: "Enter your address", type: "text" },
              { label: "Phone Number", placeholder: "Enter your phone number", type: "number" },
              { label: "Poultry shop", placeholder: "Search poultry shop", type: "search" },
              { label: "Symptoms starting date", placeholder: "", type: "date" }
            ].map((item) => {
              return <FormInput label={item.label} placeholder={item.placeholder} type={item.type} key={uuidv4()} />
            })
          }
          {/* Phone OTP */}
          <div className='flex'>
            <FormInput label='Verify Phone Number' placeholder='Enter OTP' type='text' />
            <PrimaryButton label='Send OTP' className={"ml-5 h-12 mt-auto"} />
          </div>
          <p className='mt-2'>Your data will be encrypted and stored on your server, we dont sell your use your data without your permissions.</p>
          <PrimaryButton label='Submit' className={"px-6 mt-2 h-12"} />
        </div>

        {/* Attachments */}
        <div className='px-20 py-8 text-center w-max'>
          <p className='text-xl mb-3'>Upload your doctors letter</p>
          <div className='p-10 text-center border-dotted border-2 border-primary rounded-lg'>
            <PrimaryButton label='Upload' className={"px-14 mb-1"} />
            <p>or Drag and drop files</p>
            <p>file format .jpeg, .png. max file size 1mb</p>
          </div>
        </div>
      </form>
    </div>
  )
}

type FormInputPropType = { label: string, type: string, placeholder: string }

export const FormInput = ({ label, type, placeholder }: FormInputPropType) => {

  const SearchInputType = () => {
    return <div className='flex items-center p-2 h-12 border-2 border-light rounded-lg bg-labelBg'>
      <SearchIcon className='mr-2' />
      <input className='bg-transparent placeholder-lightPlaceholder-100 w-full' type={type} placeholder={placeholder} />
    </div>
  }

  return (
    <div className='flex flex-col mt-2'>
      <label className='text-lg'>{label}</label>
      {
        type == "search" ? <SearchInputType /> :
          <input className='p-2 h-12 border-2 border-light rounded-lg bg-labelBg placeholder-lightPlaceholder-100' type={type} placeholder={placeholder} />
      }

    </div>
  )
}

export const PrimaryButton = ({ label, className }: { label: string, className?: string }) => {
  return (
    <button className={`bg-primary font-bold py-3 px-3 rounded-xl text-white w-max ${className}`}>{label}</button>
  )
}