import { SITE } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="border-t border-dashed border-ink">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-2 px-6 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between md:px-16">
        <span className="tracking-[0.16em]">
          {SITE.name} · {SITE.domain}
        </span>
        <span className="tracking-[0.16em]">
          © {new Date().getFullYear()} {SITE.name}
        </span>
      </div>
    </footer>
  );
}
