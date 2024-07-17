
import React from 'react'
import Image from "next/image";
import { Button } from "@/components/ui/button"
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { E164Number } from "libphonenumber-js/core";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Textarea } from '../ui/textarea';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Control } from 'react-hook-form';
import { FormFieldType } from './PatientForm';
import { Select, SelectValue,SelectContent } from '@/components/ui/select';
import { SelectTrigger } from '@/components/ui/select';
import { Checkbox } from '../ui/checkbox';


interface CustomProps { 
  control: Control<any>,
  fieldtype: FormFieldType,
  name: string,
  label?: string,
  placeholder?: string,
  iconSrc?: string,
  iconAlt?: string,
  disabled?: boolean,
  dateFormat?: string,
  showTimeSelect?: boolean,
  children?: React.ReactNode,
  renderSkeleton?:(field : any) => React.ReactNode ,
}


const RenderInput = ({ field, props }: { field: any; props: CustomProps }) => {
  const {fieldtype, placeholder, iconSrc , iconAlt ,disabled,renderSkeleton, dateFormat, showTimeSelect } = props;
  switch (fieldtype) {
    case FormFieldType.INPUT:
      return (
        <div className ="flex rounded-md border border-dark-500 bg-dark-400">
          {iconSrc && (
            <Image
              src={iconSrc}
              alt={iconAlt || "icon"}
              height={24}
              width={24}
              className='ml-2'
            />
          )}
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              className = 'shad-input border-0'
            />
          </FormControl>
        </div>
      )
    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry='IN'
            placeholder={placeholder}
            international
            withCountryCallingCode
            value={field.value as E164Number | undefined}
            onChange = {field.onChange}
          className = 'input-phone'
        />
      </FormControl>
      )
    case FormFieldType.DATE_PICKER:
      return (
        <div className='flex rounded-md border border-dark-500 bg-dark-400'>
          <Image
            src="/assets/icons/calendar.svg"
            height={24}
            width={24}
            alt="calender"
            className='ml-2'
          />
          <FormControl>
            <DatePicker
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              dateFormat={dateFormat?? 'dd/MM/yyyy'}
              showTimeSelect={showTimeSelect?? false }
              wrapperClassName='date-picker'
            />
      </FormControl>
        </div>
      )
      
      case FormFieldType.SELECT:
        return (
          <FormControl>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="shad-select-trigger">
                  <SelectValue placeholder={props.placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="shad-select-content">
                {props.children}
              </SelectContent>
            </Select>
          </FormControl>
        );
    case FormFieldType.SKELETON:
      return props.renderSkeleton ? props.renderSkeleton(field) : null;
    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            placeholder={placeholder}
            {...field}
            className='shad-textArea'
            disabled={props.disabled}
          ></Textarea>
        </FormControl>
      )
    case FormFieldType.CHECKBOX:
      return (
        <FormControl>
          <div className='flex items-center gap-4'>
            <Checkbox
              id={props.name}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
            <label htmlFor='props.name' className='checkbox-label'>
              {props.label}
            </label>
          </div>
        </FormControl>
      );
      default:
        return null;
    }
  };
const CustomForm = ( props : CustomProps) => {
  const { control, fieldtype, name, label } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {
            fieldtype !== FormFieldType.CHECKBOX && label && (
              <FormLabel>  { label }  </FormLabel>
            )
          }
          <RenderInput field={field} props={props} />
          <FormMessage className = "shad-error "/>
        </FormItem>
      )} 
          />
  )
}

export default CustomForm;