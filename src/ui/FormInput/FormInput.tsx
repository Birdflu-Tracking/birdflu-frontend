import SearchIcon from '@mui/icons-material/Search';

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