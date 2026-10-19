"use client";

import { useEffect, useRef, useState } from "react";
import Image from "@/components/SiteImage";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getSubserviceArea } from "@/data/subservices";
import { siteData } from "@/data/site";

type MegaItem = (typeof siteData.navigation)[number] & {
  mega: true;
  megaLinks: readonly { label: string; href: string }[];
};

type DropdownItem = (typeof siteData.navigation)[number] & {
  dropdownLinks: readonly { label: string; href: string }[];
};

function focusablesIn(root: HTMLElement) {
  return Array.from(
    root.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")
  );
}

function isDesktopNav() {
  return typeof window !== "undefined" && window.matchMedia("(min-width: 992px)").matches;
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [openMega, setOpenMega] = useState<string | null>(null);
  const [selectedMegaService, setSelectedMegaService] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const megaOpen = Boolean(openMega);
  const megaTriggerRef = useRef<HTMLButtonElement>(null);
  const megaPanelRef = useRef<HTMLDivElement>(null);

  const megaItems = siteData.navigation.filter(
    (item): item is MegaItem => "mega" in item && Boolean(item.mega)
  );
  const dropdownItems = siteData.navigation.filter(
    (item): item is DropdownItem => "dropdownLinks" in item
  );

  const closeAll = () => {
    setOpen(false);
    setOpenMega(null);
    setSelectedMegaService(null);
  };

  const closeMega = () => {
    setOpenMega(null);
    setSelectedMegaService(null);
    megaTriggerRef.current?.focus();
  };

  const toggleMega = (label: string) => {
    setOpenMega((current) => {
      const next = current === label ? null : label;
      if (!next) setSelectedMegaService(null);
      return next;
    });
    // Desktop mega is a separate overlay; mobile expands inside the drawer.
    if (isDesktopNav()) setOpen(false);
  };

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (openMega) {
          e.preventDefault();
          closeMega();
          return;
        }
        setOpen(false);
      }
    };
    const onResize = () => {
      if (window.innerWidth >= 992) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [openMega]);

  useEffect(() => {
    const lock = open || (megaOpen && isDesktopNav());
    document.body.style.overflow = lock ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, megaOpen]);

  useEffect(() => {
    setOpen(false);
    setOpenMega(null);
    setSelectedMegaService(null);
  }, [pathname]);

  useEffect(() => {
    if (!openMega || !isDesktopNav()) return;
    const panel = megaPanelRef.current;
    if (!panel) return;
    const items = focusablesIn(panel);
    items[0]?.focus();

    const onKey = (event: KeyboardEvent) => {
      const list = focusablesIn(panel);
      if (!list.length) return;
      const index = list.indexOf(document.activeElement as HTMLElement);

      if (event.key === "Tab") {
        event.preventDefault();
        const next = event.shiftKey
          ? index <= 0
            ? list.length - 1
            : index - 1
          : (index + 1) % list.length;
        list[next]?.focus();
        return;
      }

      if (event.key === "ArrowDown" || event.key === "ArrowRight") {
        event.preventDefault();
        list[(index + 1) % list.length]?.focus();
        return;
      }

      if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
        event.preventDefault();
        list[index <= 0 ? list.length - 1 : index - 1]?.focus();
      }
    };

    panel.addEventListener("keydown", onKey);
    return () => panel.removeEventListener("keydown", onKey);
  }, [openMega]);

  const solid = !isHome || scrolled || open || megaOpen;

  return (
    <header
      className={`site-header${solid ? " is-solid" : " is-transparent"}${open ? " is-open" : ""}${megaOpen ? " is-mega-open" : ""}`}
    >
      <nav className="site-navbar" aria-label="Primary">
        <div className="site-navbar-inner">
          <Link
            className="nav-brand"
            href="/"
            onClick={closeAll}
            aria-label={siteData.brand.name}
          >
            <Image
              src={solid ? "/brand/BBA.svg" : "/brand/BBA-white.svg"}
              alt={siteData.brand.name}
              width={220}
              height={56}
              className="brand-logo brand-logo-nav"
              priority
            />
          </Link>

          <div className={`nav-panel${open ? " is-open" : ""}`} id="mainNav">
            <ul className="nav-list">
              {siteData.navigation.map((item) => {
                const isMega = "mega" in item && item.mega;
                const isDropdown = "dropdownLinks" in item;
                const pathOnly = item.href.split("#")[0];
                const active =
                  !isMega &&
                  (pathname === pathOnly ||
                    (pathOnly.length > 1 && pathname.startsWith(`${pathOnly}/`)));
                const menuActive =
                  (isMega || isDropdown) && openMega === item.label;

                if (isMega || isDropdown) {
                  const menuId = isMega
                    ? "services-mega-panel"
                    : "about-dropdown-panel";
                  const nestedLinks = isMega
                    ? (item as MegaItem).megaLinks
                    : (item as DropdownItem).dropdownLinks;

                  return (
                    <li
                      key={item.label}
                      className={`nav-item-expandable${menuActive ? " is-expanded" : ""}`}
                    >
                      <button
                        ref={isMega ? megaTriggerRef : undefined}
                        type="button"
                        id={
                          isMega
                            ? "services-mega-trigger"
                            : "about-dropdown-trigger"
                        }
                        className={`nav-link nav-link-mega${menuActive ? " is-active" : ""}`}
                        aria-expanded={menuActive}
                        aria-haspopup={isMega ? "dialog" : "menu"}
                        aria-controls={menuId}
                        onClick={() => toggleMega(item.label)}
                      >
                        {item.label}
                        <span className="nav-chevron" aria-hidden="true" />
                      </button>
                      <ul
                        className={`nav-mobile-sub${menuActive ? " is-open" : ""}`}
                        id={`${menuId}-mobile`}
                        hidden={!menuActive}
                      >
                        {nestedLinks.map((link) => (
                          <li key={link.label}>
                            <Link href={link.href} onClick={closeAll}>
                              {link.label}
                            </Link>
                            {isMega ? (
                              <details className="nav-mobile-service-details">
                                <summary>View sub-services</summary>
                                <ul>
                                  {getSubserviceArea(link.href.split("/").pop() ?? "")?.services.map((service) => (
                                    <li key={service.slug}>
                                      <Link href={`${link.href}/${service.slug}`} onClick={closeAll}>{service.title}</Link>
                                    </li>
                                  ))}
                                </ul>
                              </details>
                            ) : null}
                          </li>
                        ))}
                      </ul>
                    </li>
                  );
                }

                return (
                  <li key={item.label}>
                    <Link
                      className={`nav-link${active ? " is-active" : ""}`}
                      href={item.href}
                      onClick={closeAll}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <Link
              className="nav-cta nav-cta-mobile"
              href={siteData.navCta.href}
              onClick={closeAll}
            >
              {siteData.navCta.label}
            </Link>
          </div>

          <div className="nav-end">
            <Link className="nav-cta nav-cta-desktop" href={siteData.navCta.href}>
              {siteData.navCta.label}
            </Link>

            <button
              className={`nav-toggle${open ? " is-open" : ""}`}
              type="button"
              aria-controls="mainNav"
              aria-expanded={open}
              aria-label={open ? "Close navigation" : "Open navigation"}
              onClick={() => {
                setOpen((v) => !v);
                setOpenMega(null);
              }}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      {megaItems.map((item) => {
        const isOpen = openMega === item.label;
        const activeService =
          item.megaLinks.find((link) => link.href === selectedMegaService) ??
          item.megaLinks[0];
        const subservices = getSubserviceArea(activeService?.href.split("/").pop() ?? "")?.services ?? [];

        return (
          <div
            key={item.label}
            ref={isOpen ? megaPanelRef : undefined}
            className={`mega-menu mega-menu-desktop${isOpen ? " is-open" : ""}`}
            id="services-mega-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="services-mega-trigger"
            aria-hidden={!isOpen}
            {...(!isOpen ? { inert: true } : {})}
          >
            <div className="mega-menu-services">
              <div className="mega-menu-services-head">
                <Link href="/services" onClick={closeAll}>All services</Link>
                <button
                  type="button"
                  className="mega-menu-close mega-menu-close-mobile-position"
                  aria-label={`Close ${item.label} menu`}
                  onClick={closeMega}
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <ul className="mega-menu-service-list" aria-label="Service lines">
                {item.megaLinks.map((link) => {
                  const isSelected = link.href === activeService?.href;
                  return (
                    <li key={link.href}>
                      <button
                        type="button"
                        className={`mega-menu-service-button${isSelected ? " is-selected" : ""}`}
                        aria-pressed={isSelected}
                        onClick={() => setSelectedMegaService(link.href)}
                        onMouseEnter={() => setSelectedMegaService(link.href)}
                        onFocus={() => setSelectedMegaService(link.href)}
                      >
                        <span>{link.label}</span>
                        <span className="mega-menu-service-arrow" aria-hidden="true">→</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="mega-menu-subservices">
              <div className="mega-menu-main-head">
                <div>
                  <p className="mega-menu-eyebrow">Sub-services</p>
                  <h2 className="mega-menu-title">{activeService?.label}</h2>
                </div>
                <button
                  type="button"
                  className="mega-menu-close"
                  aria-label={`Close ${item.label} menu`}
                  onClick={closeMega}
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>

              <div className="mega-menu-subservices-content">
                <ul className="mega-menu-subservice-list">
                  {subservices.map((subservice) => (
                    <li key={subservice.slug}>
                      <Link href={`${activeService.href}/${subservice.slug}`} onClick={closeAll}>
                        {subservice.title}
                      </Link>
                    </li>
                  ))}
                </ul>
                {activeService ? (
                  <Link
                    className="mega-menu-service-cta"
                    href={activeService.href}
                    onClick={closeAll}
                  >
                    Explore {activeService.label} <span aria-hidden="true">→</span>
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        );
      })}

      {dropdownItems.map((item) => {
        const isOpen = openMega === item.label;
        return (
          <div
            key={item.label}
            ref={isOpen ? megaPanelRef : undefined}
            className={`nav-dropdown nav-dropdown-desktop${isOpen ? " is-open" : ""}`}
            id="about-dropdown-panel"
            role="menu"
            aria-labelledby="about-dropdown-trigger"
            aria-hidden={!isOpen}
            {...(!isOpen ? { inert: true } : {})}
          >
            {item.dropdownLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                role="menuitem"
                onClick={closeAll}
              >
                {link.label}
              </Link>
            ))}
          </div>
        );
      })}

      <button
        type="button"
        className={`nav-backdrop${open || megaOpen ? " is-visible" : ""}`}
        aria-label="Close navigation"
        tabIndex={open || megaOpen ? 0 : -1}
        onClick={() => {
          if (openMega && isDesktopNav()) closeMega();
          else closeAll();
        }}
      />
    </header>
  );
}
