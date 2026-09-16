import { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return {
    title: "Certificate Verification — ERAAO Ledger",
    description: `Official cryptographic verification ledger for ERAAO credential ${id}.`,
    alternates: {
      canonical: `/verify/${id}`,
    },
    openGraph: {
      title: "ERAAO Cryptographic Certificate Verification",
      description: `Official digital verification for credential ID ${id}.`,
      url: `https://www.eraao.com/verify/${id}`,
    },
  };
}

export default function VerifyDetailLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
