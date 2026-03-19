import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata = {
  title: "Terms",
  description: "Website terms of use.",
};

export default function TermsPage() {
  return (
    <div className="bg-slate-50">
      <Container className="py-12">
        <SectionHeading
          eyebrow="Legal"
          title="Terms of Use"
          description="Basic terms for using this website."
        />
        <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-8 text-sm leading-7 text-slate-600 shadow-soft">
          <p>
            Website content is for information purposes. Program details and fees
            may change; please contact admissions for the latest confirmation.
          </p>
          <p className="mt-4">
            By using this website, you agree not to misuse forms or content and to
            provide accurate details when submitting inquiries.
          </p>
        </div>
      </Container>
    </div>
  );
}

