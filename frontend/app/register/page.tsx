import RegisterDetails from "@/components/user-components/register/registerDetails";
import RegisterForm from "@/components/user-components/register/registerForm";


export default function RegisterPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Interesting content with gradient */}
    <RegisterDetails />

      {/* Right side - Register form */}
      <RegisterForm />
    </div>
  )
}
