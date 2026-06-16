import { SignUp } from "@clerk/nextjs";

export const metadata = { title: "Sign up" };

export default function SignUpPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-16">
      <SignUp />
    </div>
  );
}
