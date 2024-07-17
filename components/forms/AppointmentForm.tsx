"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormFieldType } from './PatientForm';
import { Form, FormControl } from "@/components/ui/form";
import { SelectItem } from "@/components/ui/select";
import { Doctors } from "@/constants";
import CustomForm from "./CustomForm";
import { CreateAppointmentSchema, getAppointmentSchema, UserFormValidation } from "@/lib/validation";

import SubmitButton from "../SubmitButton";
import { createAppointment } from "@/lib/actions/appointment.actions";


export const AppointmentForm = (
    { userId, patientId, type }:
        {
            userId: string; patientId: string; type: "create" | "cancel" | "schedule" 
            
        })=>{
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
    const AppointmentFormValidation = getAppointmentSchema(type);
  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
      defaultValues: {
          primaryPhysician: "",
          schedule: new Date(),
          reason: "",
          note: "",
          cancellationReason :"",

    },
  });

  async function onSubmit(values: z.infer<typeof AppointmentFormValidation>) {
      setIsLoading(true);
      let status;
      switch (type) {
          case 'schedule':
              status = 'scheduled';
              break;
          case 'cancel':
              status = "cancelled";
              break;
          default:
              status = "pending"
              break;
      }
      try {
          if (type === 'create' && patientId) {
              const appointmentData = {
                  userId,
                  patient: patientId,
                  primaryPhysician: values.primaryPhysician,
                  schedule: new Date(values.schedule),
                  reason: values.reason!,
                  note: values.note,
                  status : status as Status
              }
              const appointment = await createAppointment(appointmentData)
              if (appointment)
              {
                  form.reset();
                  router.push(`/patients/${userId}/new-appointments/success?appointmentId=${appointment.$id}`);
                  }
          }
        
        
      } catch (error) {
          console.log(error);
        
      }

    }
    
    let buttonLabel;
    switch (type) {
        case 'cancel':
            buttonLabel = 'Cancel Appointment';
            break;
        case 'create':
            buttonLabel = 'Appoint';
            break;
        case 'schedule':
            buttonLabel = "Schedule Appointment";
            break;
        default:
            break;
    }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header">New Appointment</h1>
          <p className="text-dark-700">Schedule your appointment with us within 10 seconds.</p>
              </section>
              {type !== "cancel" && (
        <>
            <CustomForm
            fieldtype={FormFieldType.SELECT}
            control={form.control}
            name="primaryPhysician"
            label="Doctor"
            placeholder="Select a Doctor"
          >
            {Doctors.map((doctor, i) => (
              <SelectItem key={doctor.name + i} value={doctor.name}>
                <div className="flex cursor-pointer items-center gap-2">
                  <Image
                    src={doctor.image}
                    width={32}
                    height={32}
                    alt="doctor"
                    className="rounded-full border border-dark-500"
                  />
                  <p>{doctor.name}</p>
                </div>
              </SelectItem>
            ))}
                      </CustomForm>
                      
            <CustomForm
                fieldtype={FormFieldType.DATE_PICKER}
                control={form.control}
                name="schedule"
                label="Expected appointment date"
                showTimeSelect
                dateFormat="MM/dd/yyyy - h:mm aa"
                      />

            <div className="flex flex-col gap-6 xl:flex-row">
                <CustomForm
                fieldtype={FormFieldType.TEXTAREA}
                control={form.control}
                name="reason"
                label="Reason of Appointment"
                placeholder="Enter reason for appointment"
                />

                <CustomForm
                fieldtype={FormFieldType.TEXTAREA}
                control={form.control}
                name="note"
                label="Notes"
                placeholder="Enter notes"
            />
          </div>
                    
        </>
              )}
              
              {type === "cancel" && (
                  <CustomForm
                  fieldtype={FormFieldType.TEXTAREA}
                  control={form.control}
                  name="cancellationReason"
                  label="Reason for cancellation"
                  placeholder="Enter reason for cancellation"
              />
                  
        )}
        
              <SubmitButton isLoading={isLoading}
                  className={`${type === 'cancel' ?
                      'shad-danger-btn xl:flex-row' :
                      'shad-primary-btn xl:flex-row'}`}>
                  {buttonLabel}
              </SubmitButton>
      </form>
    </Form>
  );
};

export default AppointmentForm;
