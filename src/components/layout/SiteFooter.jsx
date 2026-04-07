import Link from "next/link";
import { Container } from "@/components/ui/Container";

function SocialIcon({ id }) {
  const cls = "h-5 w-5";
  switch (id) {
    case "facebook":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.3-1.5 1.6-1.5H16.7V5.1c-.3 0-1.5-.1-2.8-.1-2.8 0-4.7 1.7-4.7 4.8V11H6.6v3h2.6v8h4.3Z" />
        </svg>
      );
    case "instagram":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9Zm4.5 4.2A3.8 3.8 0 1 1 8.2 12 3.8 3.8 0 0 1 12 8.2Zm0 2A1.8 1.8 0 1 0 13.8 12 1.8 1.8 0 0 0 12 10.2ZM17.8 6.7a.9.9 0 1 1-.9.9.9.9 0 0 1 .9-.9Z" />
        </svg>
      );
    case "youtube":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M21.6 7.2a3 3 0 0 0-2.1-2.1C17.7 4.6 12 4.6 12 4.6s-5.7 0-7.5.5A3 3 0 0 0 2.4 7.2 31.5 31.5 0 0 0 2 12a31.5 31.5 0 0 0 .4 4.8 3 3 0 0 0 2.1 2.1c1.8.5 7.5.5 7.5.5s5.7 0 7.5-.5a3 3 0 0 0 2.1-2.1A31.5 31.5 0 0 0 22 12a31.5 31.5 0 0 0-.4-4.8ZM10.4 15.2V8.8L15.9 12l-5.5 3.2Z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M6.9 6.7a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2ZM5 21h3.8V9H5v12Zm6.1-12H15v1.6h.1A4.2 4.2 0 0 1 19 8.6c4 0 4.8 2.6 4.8 6V21H20v-5.2c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V21h-3.8V9Z" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2a10 10 0 0 0-8.5 15.3L2 22l4.9-1.4A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A8 8 0 1 1 12 20Zm4.7-5.8c-.3-.1-1.7-.8-2-.9s-.5-.1-.7.2-.8.9-1 .9-.4.1-.7-.1a6.6 6.6 0 0 1-1.9-1.1 7.2 7.2 0 0 1-1.3-1.6c-.1-.3 0-.5.1-.6l.4-.5c.1-.1.1-.3.2-.4a.6.6 0 0 0 0-.5c-.1-.1-.7-1.6-1-2.2-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.7.4s-.9.9-.9 2.1.9 2.5 1 2.7a10.5 10.5 0 0 0 4 4c.5.2.9.4 1.2.5.5.2 1 .2 1.4.1.4-.1 1.7-.7 2-1.4.2-.6.2-1.2.1-1.4-.1-.1-.3-.2-.6-.4Z" />
        </svg>
      );
    default:
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm1 17.9V20h-2v-.1a8.1 8.1 0 0 1-6.9-6.9H4v-2h.1A8.1 8.1 0 0 1 11 4.1V4h2v.1a8.1 8.1 0 0 1 6.9 6.9H20v2h-.1A8.1 8.1 0 0 1 13 19.9Z" />
        </svg>
      );
  }
}

export function SiteFooter({ brandName = "Kulgurusp Institute", logo, address, phone, email, socials = [] }) {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden border-t border-[#1f8a62] bg-[#0f6b4c] text-white">

      <Container className="relative grid gap-10 py-14 md:grid-cols-12">
        {/* Brand */}
        <div className="md:col-span-5">
          <div className="flex items-center gap-3">
            {logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={logo}
                alt={brandName}
                className="h-11 w-11 rounded-2xl object-contain ring-1 ring-white/25 bg-white/10"
              />
            ) : (
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/15 text-base font-semibold text-white ring-1 ring-white/25">
                {String(brandName || "K").slice(0, 1).toUpperCase()}
              </span>
            )}
            <div className="text-lg font-semibold tracking-tight">{brandName}</div>
          </div>
          <p className="mt-4 max-w-md text-sm leading-6 text-white/80">
            Professional programs and degrees with enrollment guidance and student support.
          </p>

          <div className="mt-6 flex flex-wrap gap-2 text-xs text-white/85">
            <span className="rounded-full bg-white/12 px-3 py-1 ring-1 ring-white/20">
              Admissions support
            </span>
            <span className="rounded-full bg-white/12 px-3 py-1 ring-1 ring-white/20">
              Transparent fees
            </span>
            <span className="rounded-full bg-white/12 px-3 py-1 ring-1 ring-white/20">
              Student-first
            </span>
          </div>

          <div className="mt-8 flex items-center gap-3 text-xs text-white/75">
            <span className="h-1.5 w-1.5 rounded-full bg-white/85" />
            <span>Admissions open — Enroll now</span>
          </div>

          {socials?.length ? (
            <div className="mt-7 flex flex-wrap items-center gap-2">
              {socials.map((s) => (
                <a
                  key={s.id}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  title={s.label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/12 text-white ring-1 ring-white/25 transition hover:bg-white/20"
                >
                  <SocialIcon id={s.id} />
                </a>
              ))}
            </div>
          ) : null}
        </div>

        {/* Links */}
        <div className="grid gap-8 sm:grid-cols-2 md:col-span-4 md:grid-cols-1">
          <div className="text-sm">
            <div className="text-xs font-semibold uppercase tracking-wider text-white/70">
              Quick links
            </div>
            <ul className="mt-4 space-y-2.5 text-white/82">
              <li>
                <Link href="/programs" className="hover:text-white">
                  Programs
                </Link>
              </li>
              <li>
                <Link href="/notices" className="hover:text-white">
                  Notices
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Enroll / Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact */}
        <div className="md:col-span-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-white/70">
            Contact
          </div>
          <ul className="mt-4 space-y-3 text-sm text-white/82">
            {address ? (
              <li className="flex gap-3">
                <span className="mt-1.5 h-2 w-2 rounded-full bg-white/90" />
                <span className="leading-6">{address}</span>
              </li>
            ) : null}
            {phone ? (
              <li className="flex gap-3">
                <span className="mt-1.5 h-2 w-2 rounded-full bg-white/90" />
                <span className="leading-6">Phone: {phone}</span>
              </li>
            ) : null}
            {email ? (
              <li className="flex gap-3">
                <span className="mt-1.5 h-2 w-2 rounded-full bg-white/90" />
                <span className="leading-6">Email: {email}</span>
              </li>
            ) : null}
          </ul>
        </div>
      </Container>

      {/* Bottom bar */}
      <div className="relative border-t border-white/15">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 text-xs text-white/70 sm:flex-row">
          <span>
            © {year} {brandName}. All rights reserved.
          </span>
          <span className="text-white/70">
            Design &amp; developed by{" "}
            <a
              href="https://in.linkedin.com/in/ajay-sharan-bb2335103"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-white hover:underline"
            >
              Ajay Sharan
            </a>
          </span>
          <span className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-white">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms
            </Link>
          </span>
        </Container>
      </div>
    </footer>
  );
}

