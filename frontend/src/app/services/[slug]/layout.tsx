import { Metadata } from "next";
import { getServiceBySlug } from "@/data/servicesData";

interface Props {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service Details",
      alternates: {
        canonical: `/services/${slug}`,
      },
    };
  }

  return {
    title: `${service.title} | Enterprise Services`,
    description: service.shortDescription,
    alternates: {
      canonical: `/services/${slug}`,
    },
    openGraph: {
      title: `${service.title} | ERAAO Enterprise Services`,
      description: service.shortDescription,
      url: `https://www.eraao.com/services/${slug}`,
      images: service.imageUrl ? [{ url: service.imageUrl }] : undefined,
    },
  };
}

export default function ServiceDetailLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
