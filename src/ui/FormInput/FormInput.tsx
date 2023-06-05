import { ReportingDataType } from "@/pages/reporting";
import SearchIcon from "@mui/icons-material/Search";
import { InputProps } from "@mui/material";
import { DetailedHTMLProps, InputHTMLAttributes, Ref } from "react";
import ReactSearchBox from "react-search-box";
import Select from "react-select";

interface FormInputPropType
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string;
  type: string;
  setSellerOption: any;
  setData: React.Dispatch<React.SetStateAction<ReportingDataType>>;
  searchOptions: Array<{
    key: string;
    label: string;
  }>;
}

export const FormInput = ({
  label,
  type,
  setSellerOption,
  setData,
  searchOptions,
  ...rest
}: FormInputPropType) => {
  const SearchInputType = () => {
    return (
      <div className="rounded-lg bg-labelBg">
        <Select
          options={searchOptions}
          onChange={(e) => {
            setData((prev) => {
              //@ts-ignore
              var newdata = prev;
              console.log(prev);
              //@ts-ignore
              newdata["poultryShop"] = e;

              return newdata;
            });
          }}
        />
      </div>
    );
  };

  return (
    <div className="flex flex-col mt-2">
      <label className="text-lg">{label}</label>
      {type == "search" ? (
        <SearchInputType />
      ) : (
        <input
          className="p-2 h-12 border-2 border-light rounded-lg bg-labelBg placeholder-lightPlaceholder-100 focus:outline-none "
          type={type}
          {...rest}
        />
      )}
    </div>
  );
};
