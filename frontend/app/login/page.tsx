import LoginDetails from "@/components/user-components/login/loginDetail";
import LoginForm from "@/components/user-components/login/loginForm";


export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Interesting content with gradient */}
      <LoginDetails />

      {/* Right side - Login form */}
      <LoginForm />
    </div>
  )
}
