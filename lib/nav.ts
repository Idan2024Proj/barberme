import { t } from "@/lib/content";

export function footerLinkLabel(href: string): string {
  for (const column of t.footer.columns) {
    const match = column.links.find((link) => link.href === href);
    if (match) {
      return match.label;
    }
  }
  return t.site.name;
}
