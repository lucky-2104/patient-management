"use client";

import { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomForm from "@/components/forms/CustomForm";
import SubmitButton from "../SubmitButton";
import { UserFormValidation } from '@/lib/validation';
import { useRouter } from 'next/navigation';
import { createUser } from '@/lib/actions/patient.actions';

export enum FormFieldType {
  INPUT = 'input',
  TEXTAREA = 'textarea',
  PHONE_INPUT = 'phoneInput',
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = 'select',
  SKELETON = 'skeleton',
}

export const PatientForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: ""
    },
  });

  async function onSubmit(data: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);
    try {
      const userData = {
        name: data.name,
        email: data.email,
        phone: data.phone
      };

      const user = await createUser(userData);
      if (user) {
        router.push(`/patients/${user.$id}/register`);
      } else {
        console.log('No user returned');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header">Hi there</h1>
          <p className="text-dark-700">Schedule your appointment with us.</p>
        </section>
        <CustomForm
          fieldtype={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="Full Name"
          placeholder="Raj Singh"
          iconSrc="/assets/icons/user.svg"
          iconAlt="User Icon"
        />
        <CustomForm
          fieldtype={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label="Email Address"
          placeholder="emailaddress@gmail.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="Email Icon"
        />
        <CustomForm
          fieldtype={FormFieldType.PHONE_INPUT}
          control={form.control}
          name="phone"
          label="Phone Number"
          placeholder="0000-0000-00"
        />
        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
};

export default PatientForm;
