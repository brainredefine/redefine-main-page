import { cookies } from "next/headers";

const COOKIE_NAME = "hub_auth";

export function LogoutButton() {
  async function logout() {
    "use server";
    (await cookies()).delete(COOKIE_NAME);
  }

  return (
    <form action={logout}>
      <button className="text-xs text-zinc-400 hover:text-zinc-200 underline">
        Logout
      </button>
    </form>
  );
}
