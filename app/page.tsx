import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

import PatientForm from '@/components/forms/PatientForm';
export default function Home() {

  return (
    <div className="flex h-screen max-h-screen">

      {/* TODO : OTP verification  */}


      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[498px]">
          <Image
            src="/assets/icons/logo-full.svg"
            alt="patient"
            width={1000}
            height={1000}    
            className="mb-12 h-10 w-fit"
          />
          <PatientForm />
          <div className="text-14-regular mt-20 flex justify-between">
            <p className = "justify-items-end text-dark-600">
              © 2024 CarePlus
            </p>
            <Link href = "/?admin=true" className = "text-green-500">
              Admin
            </Link>
          </div>
        </div>
      </section>

      <Image
        src="/assets/images/onboarding-img.png"
        width={1000}
        height={1000}
        alt="patient"
        className="side-img max-w-[50%]"
      />
    </div>
  );

}
