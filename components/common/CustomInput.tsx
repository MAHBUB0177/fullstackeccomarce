import { Input } from "antd";
import React from "react";
interface InputProps {
    type: string;
    labelText: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
  }

const CustomInput = ({ type, labelText, onChange, value}:InputProps) => {
  return (
    <div className="my-0">
      <label className="flex justify-start text-base pb-2">{labelText}</label>
      {type === "password" ? (
        <Input.Password size="large" placeholder="**********" onChange={(e)=>onChange(e)} value={value}/>
      ) : (
        <Input type={type} size="large" placeholder={labelText} onChange={(e)=>onChange(e)} value={value}/>
      )}
    </div>
  );
};

export default CustomInput;