import { useState } from "react";
import { useLocation } from "wouter";
import { Send } from "lucide-react";
import {
  isWeb3FormsConfigured,
  mailtoFallback,
  submitIntake,
} from "@/lib/web3forms";
import { MAIN_PHONE } from "@/data/commercial";

const REQUEST_TYPES = [
  { value: "Active loss - need help now", label: "Active loss — need help now" },
  { value: "Priority list - free site walk", label: "Get on the priority list (free site walk)" },
  { value: "Bid / estimate for planned work", label: "Bid or estimate for planned work" },
  { value: "Other commercial question", label: "Other question" },
];

const PROPERTY_TYPES = [
  "Apartment / multi-family",
  "HOA / condominium",
  "Medical / dental",
  "Hotel / hospitality",
  "School / public building",
  "Office / retail",
  "Other commercial",
];

const ROLES = [
  "Property manager",
  "Owner",
  "Facility / maintenance manager",
  "HOA board member",
  "Insurance adjuster",
  "Other",
];

/**
 * Commercial intake form. Sends through the same Web3Forms pipeline as the
 * main contact form, with the commercial fields packed into the message.
 */
export default function CommercialInquiry({
  defaultRequest = "",
}: {
  defaultRequest?: string;
}) {
  const [, setLocation] = useLocation();
  const [form, setForm] = useState({
    name: "",
    company: "",
    role: "",
    phone: "",
    email: "",
    request: defaultRequest,
    propertyType: "",
    units: "",
    address: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const onChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const botField = (
      e.currentTarget.elements.namedItem("botcheck") as HTMLInputElement | null
    )?.checked;
    if (botField) return;

    const payload = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      service: `COMMERCIAL - ${form.request || "General"}`,
      message: [
        `Company / property: ${form.company}`,
        `Role: ${form.role}`,
        `Property type: ${form.propertyType}`,
        `Units / sq ft: ${form.units}`,
        `Property address: ${form.address}`,
        "",
        form.message,
      ].join("\n"),
    };

    if (!isWeb3FormsConfigured()) {
      mailtoFallback(payload);
      return;
    }

    setSending(true);
    try {
      const ok = await submitIntake(payload);
      if (ok) {
        setLocation("/thank-you");
      } else {
        setError(
          `Something went wrong submitting your request. Please call us at ${MAIN_PHONE}.`
        );
      }
    } catch {
      setError(
        `Network error. Please try again or call us directly at ${MAIN_PHONE}.`
      );
    } finally {
      setSending(false);
    }
  };

  const inputClass =
    "w-full bg-[#FAFAF8] border border-[#3F4143]/12 focus:border-[#8DBD42] focus:ring-2 focus:ring-[#8DBD42]/20 focus:outline-none px-4 py-3.5 transition-all duration-300 text-[16px] text-[#2F3335] rounded-none placeholder:text-[#3F4143]/35 hover:border-[#3F4143]/25";
  const labelClass =
    "block mb-1.5 text-[11px] font-black uppercase tracking-[0.12em] text-[#3F4143]/60";

  return (
    <form onSubmit={onSubmit} className="space-y-5 font-sans">
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        style={{ display: "none" }}
        tabIndex={-1}
        autoComplete="off"
      />

      <div>
        <label htmlFor="ci-request" className={labelClass}>
          What do you need? <span className="text-[#8DBD42]">*</span>
        </label>
        <select
          id="ci-request"
          name="request"
          required
          value={form.request}
          onChange={onChange}
          className={`${inputClass} cursor-pointer`}
        >
          <option value="">Choose one...</option>
          {REQUEST_TYPES.map(r => (
            <option key={r.value} value={r.value}>
              {r.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="ci-name" className={labelClass}>
            Your name <span className="text-[#8DBD42]">*</span>
          </label>
          <input
            id="ci-name"
            name="name"
            required
            autoComplete="name"
            value={form.name}
            onChange={onChange}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="ci-company" className={labelClass}>
            Company / property name
          </label>
          <input
            id="ci-company"
            name="company"
            autoComplete="organization"
            value={form.company}
            onChange={onChange}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="ci-phone" className={labelClass}>
            Phone <span className="text-[#8DBD42]">*</span>
          </label>
          <input
            id="ci-phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            inputMode="tel"
            value={form.phone}
            onChange={onChange}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="ci-email" className={labelClass}>
            Email <span className="text-[#8DBD42]">*</span>
          </label>
          <input
            id="ci-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={onChange}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="ci-role" className={labelClass}>
            Your role
          </label>
          <select
            id="ci-role"
            name="role"
            value={form.role}
            onChange={onChange}
            className={`${inputClass} cursor-pointer`}
          >
            <option value="">Select...</option>
            {ROLES.map(r => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="ci-ptype" className={labelClass}>
            Property type
          </label>
          <select
            id="ci-ptype"
            name="propertyType"
            value={form.propertyType}
            onChange={onChange}
            className={`${inputClass} cursor-pointer`}
          >
            <option value="">Select...</option>
            {PROPERTY_TYPES.map(p => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="ci-units" className={labelClass}>
            Units or square footage
          </label>
          <input
            id="ci-units"
            name="units"
            placeholder="e.g. 48 units"
            value={form.units}
            onChange={onChange}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="ci-address" className={labelClass}>
            Property address
          </label>
          <input
            id="ci-address"
            name="address"
            autoComplete="street-address"
            value={form.address}
            onChange={onChange}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="ci-message" className={labelClass}>
          Details
        </label>
        <textarea
          id="ci-message"
          name="message"
          rows={4}
          placeholder="What happened, which units or areas are affected, and your insurance carrier if known."
          value={form.message}
          onChange={onChange}
          className={`${inputClass} resize-y`}
        />
      </div>

      {error && (
        <p className="text-sm text-red-700 bg-red-50 border border-red-200 px-4 py-3">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={sending}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#8DBD42] hover:bg-[#7bc034] disabled:opacity-60 text-white font-bold px-8 py-4 uppercase tracking-[0.14em] text-xs transition-colors rounded-none shadow-md"
      >
        <Send size={14} /> {sending ? "Sending..." : "Send to our commercial team"}
      </button>
      <p className="text-xs text-[#3F4143]/55">
        Active damage? Don't wait on the form — call {MAIN_PHONE}, dispatch
        answers 24/7.
      </p>
    </form>
  );
}
