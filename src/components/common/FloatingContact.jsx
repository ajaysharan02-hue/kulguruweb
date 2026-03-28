"use client";
import { useState, useMemo } from "react";

export default function FloatingContact({ phone, whatsappUrl }) {
    const [open, setOpen] = useState(false);

    const whatsappHref = useMemo(() => {
        if (whatsappUrl) return whatsappUrl;
        if (!phone) return null;
        const digits = String(phone).replace(/[^\d+]/g, "");
        if (!digits) return null;
        return `https://wa.me/${digits.replace(/^\+/, "")}`;
    }, [whatsappUrl, phone]);

    const telHref = useMemo(() => {
        if (!phone) return null;
        const digits = String(phone).replace(/[^\d+]/g, "");
        return `tel:${digits}`;
    }, [phone]);

    if (!telHref && !whatsappHref) return null;

    const handleCallClick = (e) => {
        // Keep the href for environments that honor tel: on anchor
        // Add robust fallbacks for desktop (Windows) where tel: may not be handled
        try {
            if (typeof window === "undefined") return;
            const ua = navigator.userAgent || "";
            const isMobile =
                /Android|iPhone|iPad|iPod|IEMobile|Opera Mini/i.test(ua) ||
                (window.matchMedia && window.matchMedia("(pointer: coarse)").matches);

            if (isMobile) {
                // Let tel: handle mobile; ensure navigation
                if (telHref) window.location.href = telHref;
                return;
            }

            // Desktop fallback: try callto: (Skype/Teams or associated dialer)
            const digits = String(phone || "").replace(/[^\d+]/g, "").replace(/^\+/, "");
            const callto = digits ? `callto:${digits}` : null;
            if (callto) {
                window.location.href = callto;
            }

            // Helpful clipboard copy for users without a dialer association
            if (navigator.clipboard && digits) {
                navigator.clipboard.writeText(`+${digits}`).catch(() => { });
            }
        } catch (_) {
            // no-op
        }
    };

    return (
        <div className="fixed right-4 bottom-24 md:bottom-6 z-50">
            <div className="flex flex-col items-end gap-3">
                {open && (
                    <>
                        {whatsappHref && (
                            <a
                                href={whatsappHref}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 rounded-full bg-green-500 text-white px-4 py-2 shadow-lg hover:bg-green-600 transition"
                            >
                                <WhatsAppIcon />
                                <span className="text-sm font-medium">WhatsApp</span>
                            </a>
                        )}
                        {telHref && (
                            <a
                                href={telHref}
                                onClick={handleCallClick}
                                className="flex items-center gap-2 rounded-full bg-blue-600 text-white px-4 py-2 shadow-lg hover:bg-blue-700 transition"
                            >
                                <CallIcon />
                                <span className="text-sm font-medium">Call</span>
                            </a>
                        )}
                    </>
                )}

                <button
                    type="button"
                    onClick={() => setOpen((v) => !v)}
                    aria-label="Contact actions"
                    className="h-14 w-14 rounded-full bg-emerald-600 text-white shadow-xl hover:bg-emerald-700 transition grid place-items-center"
                >
                    {open ? <CloseIcon /> : whatsappHref ? <WhatsAppIcon /> : <ChatIcon />}
                </button>
            </div>
        </div>
    );
}

function ChatIcon(props) {
    return (
        <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M7 17l-3 3V7a5 5 0 015-5h6a5 5 0 015 5v6a5 5 0 01-5 5H7z" stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.15" />
            <path d="M8 9h8M8 13h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
    );
}

function CloseIcon(props) {
    return (
        <svg {...props} width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
    );
}

function WhatsAppIcon(props) {
    return (
        <svg {...props} width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M20.52 3.48A11.94 11.94 0 0012.06 0C5.49 0 .18 5.31.18 11.88c0 2.1.54 4.12 1.58 5.93L0 24l6.35-1.65a11.77 11.77 0 005.71 1.46h.01c6.57 0 11.88-5.31 11.88-11.88 0-3.18-1.24-6.17-3.41-8.45zM12.06 21.4h-.01a9.5 9.5 0 01-4.84-1.33l-.35-.2-3.76.98 1.01-3.66-.23-.38a9.47 9.47 0 01-1.45-5.02c0-5.23 4.26-9.49 9.5-9.49 2.54 0 4.93.99 6.73 2.8a9.42 9.42 0 012.77 6.69c0 5.24-4.26 9.49-9.49 9.49zm5.39-7.06c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.96-.95 1.16-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.48-1.73-1.65-2.03-.17-.3-.02-.47.13-.62.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.05 1.03-1.05 2.52 0 1.5 1.08 2.95 1.23 3.15.15.2 2.12 3.25 5.14 4.55.72.31 1.28.49 1.72.63.72.23 1.38.2 1.9.12.58-.09 1.76-.72 2.01-1.41.25-.7.25-1.3.17-1.41-.08-.11-.27-.17-.57-.32z" />
        </svg>
    );
}

function CallIcon(props) {
    return (
        <svg {...props} width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.11.37 2.31.57 3.58.57a1 1 0 011 1V21a1 1 0 01-1 1C11.4 22 2 12.6 2 2a1 1 0 011-1h4.49a1 1 0 011 1c0 1.27.2 2.47.57 3.58a1 1 0 01-.24 1.01l-2.2 2.2z" />
        </svg>
    );
}

