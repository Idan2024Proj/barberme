import { InnerPage } from "@/components/ui/InnerPage";
import { t } from "@/lib/content";

type BookPageProps = {
  searchParams: {
    serviceId?: string;
    staffId?: string;
  };
};

export default function BookPage({ searchParams }: BookPageProps) {
  const service = t.services.items.find((item) => item.id === searchParams.serviceId);
  const staff = t.team.members.find((member) => member.id === searchParams.staffId);

  return (
    <InnerPage title={t.booking.modalTitle}>
      <p className="text-muted">{t.booking.step1.title}</p>
      <p className="mt-2 text-muted">{t.booking.step1.subtitle}</p>
      {service ? (
        <p className="mt-6">
          {t.booking.step6.whatLabel}: {service.name}
        </p>
      ) : null}
      {staff ? (
        <p className="mt-2">
          {t.booking.step6.whoLabel}: {staff.name}
        </p>
      ) : null}
    </InnerPage>
  );
}
