// ── Web3Forms ──────────────────────────────────────────────
// Free, unlimited, no backend required (works on static Vercel hosting).
// Get a free access key at https://web3forms.com (enter nick@firewaterstorm.com)
// and paste it below. This single key powers every form on the site.
export const WEB3FORMS_ACCESS_KEY: string = "d24301a7-5309-42d4-add4-71414251a69a";

const CONTACT_EMAIL = "nick@firewaterstorm.com";

export type IntakePayload = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

/** True once a real access key has been configured. */
export function isWeb3FormsConfigured(): boolean {
  return WEB3FORMS_ACCESS_KEY !== "YOUR_WEB3FORMS_ACCESS_KEY";
}

/** Submit an intake inquiry to Web3Forms. Returns true on success. */
export async function submitIntake(
  payload: IntakePayload,
  signal?: AbortSignal
): Promise<boolean> {
  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: `New Intake Inquiry - ${payload.service || "General"} - ${payload.name}`,
      from_name: "Heritage Restoration Website",
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      service: payload.service,
      message: payload.message,
    }),
    signal,
  });
  const data = await res.json();
  return Boolean(data?.success);
}

/**
 * Graceful fallback used before a Web3Forms key is configured: opens the
 * visitor's email client with the inquiry pre-filled.
 */
export function mailtoFallback(payload: IntakePayload): void {
  const subject = encodeURIComponent(
    `Intake Inquiry - ${payload.service || "General"} - ${payload.name}`
  );
  const body = encodeURIComponent(
    `Name: ${payload.name}\nPhone: ${payload.phone}\nEmail: ${payload.email}\nService: ${payload.service}\n\nMessage:\n${payload.message}`
  );
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
}
