export const PrimaryButton = ({ label, className }: { label: string, className?: string }) => {
  return (
    <button className={`bg-primary font-bold py-3 px-3 rounded-xl text-white w-max ${className}`}>{label}</button>
  )
}