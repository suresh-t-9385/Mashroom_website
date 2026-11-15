import { MessageCircle } from "lucide-react";

export default function WhatsAppCTA() {
  const number = import.meta.env.VITE_WHATSAPP_NUMBER || "919876543210";
  return (
    <section className="container-page pb-16">
      <div className="flex flex-col items-center justify-between gap-4 rounded-2xl bg-earth-900 px-6 py-8 text-center sm:flex-row sm:text-left">
        <div>
          <h2 className="text-xl font-semibold text-white">
            Need bulk pricing or a custom order?
          </h2>
          <p className="mt-1 text-sm text-earth-300">
            Chat with our farm team on WhatsApp — we reply within business
            hours.
          </p>
        </div>
        <a
          href={`https://wa.me/${number}?text=${encodeURIComponent("Hi FungiFresh, I would like to enquire about bulk mushroom supply.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn bg-[#25D366] px-6 py-3 text-earth-900 hover:bg-[#1fbe5a]"
        >
          <MessageCircle className="h-5 w-5" /> Chat on WhatsApp
        </a>
      </div>
    </section>
  );
}
