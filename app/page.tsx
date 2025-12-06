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
        href: "https://rr-abgleich.vercel.app",
        lastUpdate: "16.10.2025",
        statusColor: "green",
      },
      {
        title: "Facility Management Checklist",
        description:
          "When you are on site to rate the outlook of an asset, a building.",
        href: "https://facilitymanagementchecklist-psi.vercel.app/",
        lastUpdate: "25.07.2025",
        statusColor: "orange", // <--- Mis en ORANGE comme demandé
      },
      {
        title: "Mangelmeldung - Property Management",
        description: "Ticketsystem from the tenants",
        href: "https://mangel.vercel.app/dashboard",
        lastUpdate: "05.12.2025",
        statusColor: "green",
      },
      {
        title: "Fees Calculator",
        description: "To calculate our fees for new tenants or renewals.",
        href: "https://fees-calculator-jhzq.vercel.app/",
        lastUpdate: "05.12.2025",
        statusColor: "green",
      },
      {
        title: "Lease end information",
        description: "A list of upcoming lease expirations.",
        href: "https://end-lease-dashboard.vercel.app/",
        lastUpdate: "29.09.2025",
        statusColor: "green", // Rouge pour signaler l'urgence/attention
      },
      {
        title: "Indexation",
        description: "A list of possible indexations.",
        href: "https://indexation.vercel.app",
        lastUpdate: "04.12.2025",
        statusColor: "green",
      },
      {
        title: "Storage System",
        description: "PUT data in our internal system (PM mandate).",
        href: "https://storage-sigma-one.vercel.app/",
        lastUpdate: "05.12.2025",
        statusColor: "green",
      },
      {
        title: "Document finder",
        description: "Find documents quickly (PM mandate).",
        href: "https://storage-sigma-one.vercel.app/get",
        lastUpdate: "05.12.2025",
        statusColor: "green",
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
        image: "/odoo.png", // Garde l'image ici si tu l'as, sinon efface la ligne pour avoir les initiales "OP"
      },
      {
        title: "Odoo Personal Account Page",
        description: "See tickets and invoices linked to you.",
        href: "https://main.redefine.opa.as/",
        image: "/odooprivate.png",
      },
      {
        title: "MIT Courses",
        description: "Educational resources.",
        href: "https://notebooklm.google.com/notebook/529e020f-5ca6-4a2f-8f3e-15deb715c256",
        image: "/mit.png",
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
        image: "/chatgpt.png",
      },
      {
        title: "Google Gemini",
        description: "Google's multimodal AI.",
        href: "https://gemini.google.com/",
        image: "/gemini.png",
      },
      {
        title: "Perplexity",
        description: "Answer engine with live search.",
        href: "https://www.perplexity.ai/",
        image: "/perplexity.png",
      },
      {
        title: "Claude AI",
        description: "Anthropic's multimodal AI.",
        href: "https://claude.ai.com/",
        image: "/claude.png",
      },
    ],
  },
];
// ————————————————————————————————————————————————————————

export default async function Page() {
  const authed = (await cookies()).get(COOKIE_NAME)?.value === "ok";
  if (!authed) return <PasswordGate />;

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-gray-200">
      <div className="max-w-6xl mx-auto p-6 md:p-10 space-y-10">
        {/* Header */}
        <header className="flex items-center justify-between pb-6 border-b border-gray-200">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              Hub Dashboard
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Central access to all workflows and tools.
            </p>
          </div>
          <LogoutButton />
        </header>

        {/* Contenu */}
        <ClientApp sections={SECTIONS} />

        {/* Footer */}
        <footer className="pt-10 text-center border-t border-gray-200 mt-10">
          <p className="text-xs text-gray-400 font-medium">
            Internal Hub &bull; Last sync: {new Date().toLocaleDateString()}
          </p>
        </footer>
      </div>
    </main>
  );
}

// ====== PASSWORD GATE ======
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
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-xs bg-white p-8 rounded-xl shadow-sm border border-gray-200">
        <form action={authenticate} className="space-y-6">
          <div className="text-center">
            <h1 className="text-xl font-semibold text-gray-900">Login</h1>
            <p className="text-xs text-gray-500 mt-1">Protected Environment</p>
          </div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-center focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all placeholder:text-gray-400"
            autoFocus
          />
          <button
            type="submit"
            className="w-full py-2 bg-gray-900 hover:bg-black text-white rounded-lg text-sm font-medium transition-colors"
          >
            Unlock
          </button>
        </form>
      </div>
    </main>
  );
}