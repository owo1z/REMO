"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV, SITE } from "@/lib/content";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="border-b border-dashed border-ink bg-paper">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-4 md:px-16 md:py-6">
        <Link
          href="/"
          className="font-display text-[20px] tracking-[0.22em] text-ink md:text-[23px]"
        >
          {SITE.name}
        </Link>

        {/* 데스크톱 메뉴 */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={
                isActive(item.href)
                  ? "border-b-2 border-flame pb-[3px] text-sm font-medium text-ink"
                  : "text-sm text-muted transition-colors hover:text-flame"
              }
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className={`rounded-[2px] px-5 py-3 text-xs tracking-[0.16em] text-paper transition-colors ${
              isActive("/contact") ? "bg-flame" : "bg-ink hover:bg-flame"
            }`}
          >
            고객 상담
          </Link>
        </nav>

        {/* 모바일 메뉴 버튼 */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          className="flex h-11 w-11 flex-col items-end justify-center gap-[5px] md:hidden"
        >
          <span className="block h-[1.5px] w-6 bg-ink" />
          <span className="block h-[1.5px] w-6 bg-ink" />
          <span className="block h-[1.5px] w-[15px] bg-flame" />
        </button>
      </div>

      {/* 모바일 메뉴 */}
      {open && (
        <nav
          id="mobile-nav"
          className="border-t border-dashed border-line bg-white px-6 pb-4 md:hidden"
        >
          {[...NAV, { href: "/contact", label: "고객 상담" }].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`block border-b border-dashed border-line py-4 text-sm last:border-b-0 ${
                isActive(item.href) ? "font-medium text-flame" : "text-body"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
