export type BookingContext = {
  serviceId?: string;
  staffId?: string;
};

export function bookingHref(context: BookingContext = {}): string {
  const params = new URLSearchParams();
  if (context.serviceId) {
    params.set("serviceId", context.serviceId);
  }
  if (context.staffId) {
    params.set("staffId", context.staffId);
  }
  const query = params.toString();
  return query ? `/book?${query}` : "/book";
}
