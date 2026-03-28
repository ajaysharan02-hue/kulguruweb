import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="academy-bg">
      <Container className="py-20">
        <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-soft">
          <div className="text-sm font-semibold uppercase tracking-wider text-slate-500">
            404
          </div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
            Page not found
          </h1>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            The page you’re looking for doesn’t exist or has been moved.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Button as="link" href="/">
              Go home
            </Button>
            <Link
              href="/contact"
              className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-slate-900 ring-1 ring-slate-200 hover:bg-white/90"
            >
              Contact admissions
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}

