import LoginForm from "./LoginForm";
import { getSupabaseEnv } from "@/lib/supabase/env";

export default function LoginPage() {
  const configured = getSupabaseEnv() !== null;
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col justify-center px-5 py-12">
      <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-ink/55">ARWATS 2027</p>
      <h1 className="mb-8 text-3xl font-black tracking-tight">Staff sign in</h1>
      {configured ? (
        <LoginForm />
      ) : (
        <p className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
          The admin portal isn&apos;t configured yet. Add the Supabase environment
          variables (see SETUP.md).
        </p>
      )}
    </main>
  );
}
