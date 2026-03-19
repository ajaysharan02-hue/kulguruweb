import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for website visitors and inquiries.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-slate-50">
      <Container className="py-12">
        <SectionHeading
          eyebrow="Legal"
          title="Privacy Policy"
          description="We respect your privacy. This page explains how we use inquiry data."
        />
        <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-8 text-sm leading-7 text-slate-600 shadow-soft">
          <p>
            When you submit an inquiry, we collect the details you provide (such as
            name, phone, email, and message) only to contact you and assist with
            admissions.
          </p>
          <p className="mt-4">
            We do not sell your data. We may store inquiry information for follow-up
            and record-keeping purposes.
          </p>
        </div>
      </Container>
    </div>
  );
}

