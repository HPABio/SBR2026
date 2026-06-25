import { useState } from "react";

type SubmitState = "idle" | "submitting" | "success" | "error";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<SubmitState>("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Newsletter signup failed");
      }

      setEmail("");
      setState("success");
    } catch {
      setState("error");
    }
  }

  return (
    <form className="flex flex-col justify-center gap-4" onSubmit={handleSubmit}>
      <label className="font-quicksand text-xs uppercase tracking-[0.25em] text-muted-foreground" htmlFor="newsletter-email">
        Email address
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          className="min-h-12 flex-1 rounded-xl border border-white/10 bg-black/50 px-4 font-quicksand text-sm text-white outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
        />
        <button
          type="submit"
          disabled={state === "submitting"}
          className="min-h-12 rounded-xl bg-primary px-6 font-anton text-2xl uppercase tracking-tight text-black transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {state === "submitting" ? "Sending" : "Subscribe"}
        </button>
      </div>
      {state === "success" && (
        <p className="font-quicksand text-sm tracking-widest text-primary">
          Thanks. You are on the newsletter list.
        </p>
      )}
      {state === "error" && (
        <p className="font-quicksand text-sm tracking-widest text-muted-foreground">
          Signup is not available right now. Please try again later.
        </p>
      )}
    </form>
  );
}
