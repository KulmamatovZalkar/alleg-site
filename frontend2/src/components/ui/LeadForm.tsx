"use client";

import { motion } from "framer-motion";
import { Check, Send } from "lucide-react";
import { useState } from "react";

import { submitLead } from "@/lib/api";

interface Props {
  source?: string;
  selectedTariff?: string;
  title?: string;
  subtitle?: string;
}

export default function LeadForm({
  source = "contact_form",
  selectedTariff,
  title = "Оставьте заявку — Аллег свяжется лично",
  subtitle = "Мы перезвоним в течение 2 часов в рабочее время.",
}: Props) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    telegram: "",
    message: "",
    honeypot: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">(
    "idle"
  );
  const [error, setError] = useState("");

  const onChange =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setError("");
    const res = await submitLead({
      ...form,
      source,
      selected_tariff: selectedTariff,
    });
    if (res.ok) {
      setStatus("ok");
      setForm({ name: "", phone: "", telegram: "", message: "", honeypot: "" });
    } else {
      setStatus("err");
      setError(res.error || "Что-то пошло не так. Попробуйте ещё раз.");
    }
  };

  if (status === "ok") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-3xl border border-gold-300/30 bg-gold-50 p-10 text-center shadow-soft"
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold-gradient text-white">
          <Check size={28} strokeWidth={3} />
        </div>
        <h3 className="mt-5 font-serif text-2xl text-body">Заявка получена</h3>
        <p className="mt-2 text-body-muted">
          Аллег или его команда свяжется с вами в ближайшее время.
        </p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl border border-ink-700 bg-white p-7 shadow-soft sm:p-10"
    >
      <h3 className="font-serif text-2xl text-body sm:text-3xl">{title}</h3>
      {subtitle && <p className="mt-2 text-body-muted">{subtitle}</p>}

      <div className="mt-7 grid gap-4 sm:grid-cols-2">
        <input
          required
          value={form.name}
          onChange={onChange("name")}
          placeholder="Ваше имя"
          className="input-field"
        />
        <input
          required
          value={form.phone}
          onChange={onChange("phone")}
          placeholder="Телефон / WhatsApp"
          className="input-field"
        />
        <input
          value={form.telegram}
          onChange={onChange("telegram")}
          placeholder="Telegram / соцсеть (необязательно)"
          className="input-field sm:col-span-2"
        />
        <textarea
          value={form.message}
          onChange={onChange("message")}
          placeholder="Кратко о задаче или вопросе"
          rows={3}
          className="input-field sm:col-span-2"
        />

        {/* honeypot */}
        <input
          tabIndex={-1}
          autoComplete="off"
          value={form.honeypot}
          onChange={onChange("honeypot")}
          name="website"
          className="hidden"
          aria-hidden="true"
        />
      </div>

      {error && (
        <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-gold mt-6 w-full disabled:opacity-60"
      >
        {status === "loading" ? "Отправляем…" : "Отправить заявку"}
        <Send size={16} />
      </button>

      <p className="mt-4 text-center text-xs text-body-muted">
        Отправляя форму, вы соглашаетесь с обработкой персональных данных.
      </p>

      <style jsx>{`
        :global(.input-field) {
          width: 100%;
          padding: 0.85rem 1rem;
          border-radius: 0.875rem;
          border: 1px solid #ECE9F5;
          background: #FAF9FE;
          color: #1B1726;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
          outline: none;
          font-size: 0.95rem;
        }
        :global(.input-field::placeholder) {
          color: #9A93AE;
        }
        :global(.input-field:focus) {
          border-color: #A78BFA;
          background: #fff;
          box-shadow: 0 0 0 4px rgba(167, 139, 250, 0.14);
        }
      `}</style>
    </form>
  );
}
