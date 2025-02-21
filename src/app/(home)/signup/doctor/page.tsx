import { DoctorSignUp } from "@/components/signup/DoctorSignup";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DoctorRegister() {
  return (
    <div className="w-full flex flex-col gap-4">
      <DoctorSignUp />
      <Link href="/signin" className="w-full">
        <Button size={`lg`} variant={`tertiary`} className="w-full">
          Voltar
        </Button>
      </Link>
    </div>
  );
}
