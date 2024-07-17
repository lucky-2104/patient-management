import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { getPatient } from "@/lib/actions/patient.actions";
import AppointmentForm from "@/components/forms/AppointmentForm";
export default async function NewAppointment({params:{userId}} : SearchParamProps) {
    const patient = await getPatient(userId);
  return (
    <div className="flex h-screen max-h-screen">

      {/* TODO : OTP verification  */}


      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <Image
            src="/assets/icons/logo-full.svg"
            alt="patient"
            width={1000}
            height={1000}    
            className="mb-12 h-10 w-fit"
          />
                  <AppointmentForm
                      type="create"
                      userId={userId}
                      patientId = {patient.$id}
                      
                  />
          {/* <div className="text-14-regular mt-20 flex justify-between"> */}
            <p className = "copyright mt-10 py-10">
              © 2024 CarePlus
            </p>
          {/* </div> */}
        </div>
      </section>

      <Image
        src="/assets/images/appointment-img.png"
        width={1000}
        height={1000}
        alt="appointment"
        className="side-img max-w-[390px] bg-bottom"
      />
    </div>
  );

}
