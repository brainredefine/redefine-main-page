import { cookies } from "next/headers";
import ClientApp from "@/components/ClientApp";
import { LogoutButton } from "@/components/LogoutButton";

const COOKIE_NAME = "hub_auth";

// ——— EDIT THIS DATA ONLY ———————————————————————————————
const SECTIONS = [
  {
    title: "Workflows",
    links: [
      {
        title: "RR Abgleich",
        description: "AM vs PM + updated comments.",
        href: "https://rr-five-chi.vercel.app/rr/overview",
        image:
          "/rrabgleich2.png",
      },
      {
        title: "Facility Management Checklist",
        description:
          "When you are on site to rate the outlook of an asset, a building.",
        href: "https://facilitymanagementchecklist-psi.vercel.app/",
        image: "/facilitymanagement.png", // /public/normal-view.jpg
      },
            {
        title: "Cost & Capex Estimation",
        description:
          "xxx",
        href: "https://www.hello-world.com/",
        image: "", // /public/normal-view.jpg
      },
                  {
        title: "PM Offer creation",
        description:
          "xxx",
        href: "https://www.hello-world.com/",
        image: "", // /public/normal-view.jpg
      },
                        {
        title: "Lease Contract Checker",
        description:
          "xxx",
        href: "https://www.hello-world.com/",
        image: "", // /public/normal-view.jpg
      },
                  {
        title: "Reporting Generator",
        description: "xxx",
        href: "https://main.redefine.opa.as/",
        image:
          "",
      },
                        {
        title: "Fees Calculator",
        description: "To calculate our fees when we have a new tenant (New) or a new contract with an existing tenant (Renewal)",
        href: "https://fees-calculator-jhzq.vercel.app/",
        image:
          "/feecalculator.png",
      },
                            {
        title: "Lease end information",
        description: "To calculate our fees when we have a new tenant (New) or a new contract with an existing tenant (Renewal)",
        href: "https://end-lease-dashboard.vercel.app/",
        image:
          "/leaseend.png",
      },
    ],
  },
  {
    title: "Useful sites",
    links: [
      {
        title: "Odoo Portal",
        description: "Properties, tenancies, tickets, attachments.",
        href: "https://main.redefine.opa.as/odoo",
        image:
          "/odoo.png",
      },
      {
        title: "Odoo Personal Account Page",
        description: "To see everything linked to your account (can also see tickets, invoices linked to you).",
        href: "https://main.redefine.opa.as/",
        image:
          "/odooprivate.png",
      },
            {
        title: "MIT Courses",
        description: "xxx",
        href: "https://notebooklm.google.com/notebook/529e020f-5ca6-4a2f-8f3e-15deb715c256",
        image:
          "/mit.png",
      },
    ],
  },
    {
    title: "AI Links",
    links: [
      {
        title: "ChatGPT",
description: "OpenAI assistant for chat and coding.",
href: "https://chat.openai.com/",
image: "/chatgpt.png", // put /public/ai/chatgpt.png
      },
      {
title: "Google Gemini",
description: "Google's multimodal AI (text, image).",
href: "https://gemini.google.com/",
image: "/gemini.png", // put /public/ai/gemini.png
      },
            {
title: "Perplexity",
description: "Answer engine with live search.",
href: "https://www.perplexity.ai/",
image: "/perplexity.png", // put /public/ai/perplexity.png
      },
            {
title: "Claude AI",
description: "Anthropic's multimodal AI (text, image).",
href: "https://claude.ai.com/",
image: "/claude.png", // put /public/ai/gemini.png
      },
    ],
  },
];
// ————————————————————————————————————————————————————————

export default async function Page() {
  const authed = (await cookies()).get(COOKIE_NAME)?.value === "ok";
  if (!authed) return <PasswordGate />;

  return (
    <>
      <ClientApp sections={SECTIONS} />
      {/* Footer aligné visuellement avec l'app (même max-width & border) */}
      <div className="bg-black text-zinc-500">
        <div className="mx-auto max-w-6xl px-6 border-t border-white/10 py-6 text-sm">
          <div className="flex items-center gap-4">
            <span>
              Edit the <code>SECTIONS</code> array in <code>app/page.tsx</code> to add new cards.
            </span>
            <LogoutButton />
          </div>
        </div>
      </div>
    </>
  );
}

// ====== PASSWORD GATE (Server Action) ======
function PasswordGate() {
  async function authenticate(formData: FormData) {
    "use server";
    const input = String(formData.get("password") || "");
    const expected = process.env.ACCESS_PASSWORD || "";

    const ok =
      input.length === expected.length &&
      [...input].every((ch, i) => ch === expected[i]);

    if (ok) {
      (await cookies()).set("hub_auth", "ok", {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
      });
    }
  }

  return (
    <main className="min-h-screen bg-black text-zinc-100 grid place-items-center p-6">
      <form action={authenticate} className="w-full max-w-sm">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-semibold">Welcome</h1>
          <p className="mt-2 text-sm text-zinc-400">Enter the access password</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full bg-transparent outline-none text-sm placeholder:text-zinc-500"
            autoFocus
          />
        </div>
        <button
          type="submit"
          className="mt-4 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-2 text-sm hover:bg-white/15"
        >
          Unlock
        </button>
        <p className="mt-3 text-xs text-zinc-500">
          Configure <code>ACCESS_PASSWORD</code> in Vercel env vars.
        </p>
      </form>
    </main>
  );
}