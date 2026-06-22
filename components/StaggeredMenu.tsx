"use client";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { gsap } from "gsap";
import Link from "next/link";

export interface StaggeredMenuItem {
  label: string;
  ariaLabel: string;
  link: string;
}
export interface StaggeredMenuSocialItem {
  label: string;
  link: string;
}

export interface StaggeredMenuProps {
  position?: "left" | "right";
  colors?: string[];
  items?: StaggeredMenuItem[];
  socialItems?: StaggeredMenuSocialItem[];
  displaySocials?: boolean;
  displayItemNumbering?: boolean;
  className?: string;
  logoUrl?: string;
  menuButtonColor?: string;
  openMenuButtonColor?: string;
  accentColor?: string;
  isFixed: boolean;
  changeMenuColorOnOpen?: boolean;
  closeOnClickAway?: boolean;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
}

export const StaggeredMenu: React.FC<StaggeredMenuProps> = ({
  position = "right",
  colors = ["#B497CF", "#5227FF"],
  items = [],
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  className,
  menuButtonColor = "#fff",
  openMenuButtonColor = "#fff",
  changeMenuColorOnOpen = true,
  accentColor = "#5227FF",
  isFixed = false,
  closeOnClickAway = true,
  onMenuOpen,
  onMenuClose,
}: StaggeredMenuProps) => {
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [cartTotal, setCartTotal] = useState(0);

  const cartCount = cartItems.reduce(
    (sum: number, item: any) => sum + item.quantity,
    0,
  );

  const [checkoutUrl, setCheckoutUrl] = useState<string>("");

  async function fetchCart() {
    try {
      const res = await fetch("/api/cart");
      const data = await res.json();
      setCartItems(data.items ?? []);
      setCartTotal(data.total_price ?? 0);
      setCheckoutUrl(data.checkout_url ?? "");
    } catch {}
  }

  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    const handler = () => fetchCart();
    window.addEventListener("cart:updated", handler);
    return () => window.removeEventListener("cart:updated", handler);
  }, []);

  const openRef = useRef(false);
  const cartOpenRef = useRef(false);

  const panelRef = useRef<HTMLDivElement | null>(null);
  const preLayersRef = useRef<HTMLDivElement | null>(null);
  const preLayerElsRef = useRef<HTMLElement[]>([]);

  const cartPanelRef = useRef<HTMLDivElement | null>(null);
  const cartPreLayersRef = useRef<HTMLDivElement | null>(null);
  const cartPreLayerElsRef = useRef<HTMLElement[]>([]);

  const textInnerRef = useRef<HTMLSpanElement | null>(null);
  const textWrapRef = useRef<HTMLSpanElement | null>(null);
  const [textLines, setTextLines] = useState<string[]>(["Menu", "Close"]);

  const cartTextInnerRef = useRef<HTMLSpanElement | null>(null);
  const cartTextWrapRef = useRef<HTMLSpanElement | null>(null);
  const [cartTextLines, setCartTextLines] = useState<string[]>([
    "Cart",
    "Close",
  ]);
  const cartTextCycleAnimRef = useRef<gsap.core.Tween | null>(null);

  const openTlRef = useRef<gsap.core.Timeline | null>(null);
  const closeTweenRef = useRef<gsap.core.Tween | null>(null);
  const cartOpenTlRef = useRef<gsap.core.Timeline | null>(null);
  const cartCloseTweenRef = useRef<gsap.core.Tween | null>(null);
  const textCycleAnimRef = useRef<gsap.core.Tween | null>(null);
  const colorTweenRef = useRef<gsap.core.Tween | null>(null);
  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);
  const busyRef = useRef(false);
  const itemEntranceTweenRef = useRef<gsap.core.Tween | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const preContainer = preLayersRef.current;
      const cartPanel = cartPanelRef.current;
      const cartPreContainer = cartPreLayersRef.current;
      const textInner = textInnerRef.current;

      if (!panel || !textInner) return;

      let preLayers: HTMLElement[] = [];
      if (preContainer) {
        preLayers = Array.from(
          preContainer.querySelectorAll(".sm-prelayer"),
        ) as HTMLElement[];
      }
      preLayerElsRef.current = preLayers;

      let cartPreLayers: HTMLElement[] = [];
      if (cartPreContainer) {
        cartPreLayers = Array.from(
          cartPreContainer.querySelectorAll(".sm-cart-prelayer"),
        ) as HTMLElement[];
      }
      cartPreLayerElsRef.current = cartPreLayers;

      const offscreen = position === "left" ? -100 : 100;

      gsap.set([panel, ...preLayers], { xPercent: offscreen, opacity: 1 });
      if (preContainer) gsap.set(preContainer, { xPercent: 0, opacity: 1 });

      if (cartPanel)
        gsap.set([cartPanel, ...cartPreLayers], {
          xPercent: offscreen,
          opacity: 1,
        });
      if (cartPreContainer)
        gsap.set(cartPreContainer, { xPercent: 0, opacity: 1 });

      gsap.set(textInner, { yPercent: 0 });

      if (cartTextInnerRef.current)
        gsap.set(cartTextInnerRef.current, { yPercent: 0 });

      if (toggleBtnRef.current)
        gsap.set(toggleBtnRef.current, { color: menuButtonColor });
    });
    return () => ctx.revert();
  }, [menuButtonColor, position]);

  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return null;

    openTlRef.current?.kill();
    if (closeTweenRef.current) {
      closeTweenRef.current.kill();
      closeTweenRef.current = null;
    }
    itemEntranceTweenRef.current?.kill();

    const itemEls = Array.from(
      panel.querySelectorAll(".sm-panel-itemLabel"),
    ) as HTMLElement[];
    const numberEls = Array.from(
      panel.querySelectorAll(".sm-panel-list[data-numbering] .sm-panel-item"),
    ) as HTMLElement[];
    const socialTitle = panel.querySelector(
      ".sm-socials-title",
    ) as HTMLElement | null;
    const socialLinks = Array.from(
      panel.querySelectorAll(".sm-socials-link"),
    ) as HTMLElement[];

    const offscreen = position === "left" ? -100 : 100;
    const layerStates = layers.map((el) => ({ el, start: offscreen }));
    const panelStart = offscreen;

    if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });
    if (numberEls.length)
      gsap.set(numberEls, { ["--sm-num-opacity" as any]: 0 });
    if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
    if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    layerStates.forEach((ls, i) => {
      tl.fromTo(
        ls.el,
        { xPercent: ls.start },
        { xPercent: 0, duration: 0.5, ease: "power4.out" },
        i * 0.07,
      );
    });

    const lastTime = layerStates.length ? (layerStates.length - 1) * 0.07 : 0;
    const panelInsertTime = lastTime + (layerStates.length ? 0.08 : 0);
    const panelDuration = 0.65;

    tl.fromTo(
      panel,
      { xPercent: panelStart },
      { xPercent: 0, duration: panelDuration, ease: "power4.out" },
      panelInsertTime,
    );

    if (itemEls.length) {
      const itemsStart = panelInsertTime + panelDuration * 0.15;
      tl.to(
        itemEls,
        {
          yPercent: 0,
          rotate: 0,
          duration: 1,
          ease: "power4.out",
          stagger: { each: 0.1, from: "start" },
        },
        itemsStart,
      );
      if (numberEls.length) {
        tl.to(
          numberEls,
          {
            duration: 0.6,
            ease: "power2.out",
            ["--sm-num-opacity" as any]: 1,
            stagger: { each: 0.08, from: "start" },
          },
          itemsStart + 0.1,
        );
      }
    }

    if (socialTitle || socialLinks.length) {
      const socialsStart = panelInsertTime + panelDuration * 0.4;
      if (socialTitle)
        tl.to(
          socialTitle,
          { opacity: 1, duration: 0.5, ease: "power2.out" },
          socialsStart,
        );
      if (socialLinks.length) {
        tl.to(
          socialLinks,
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: "power3.out",
            stagger: { each: 0.08, from: "start" },
            onComplete: () => gsap.set(socialLinks, { clearProps: "opacity" }),
          },
          socialsStart + 0.04,
        );
      }
    }

    openTlRef.current = tl;
    return tl;
  }, [position]);

  const buildCartOpenTimeline = useCallback(() => {
    const panel = cartPanelRef.current;
    const layers = cartPreLayerElsRef.current;
    if (!panel) return null;

    cartOpenTlRef.current?.kill();
    if (cartCloseTweenRef.current) {
      cartCloseTweenRef.current.kill();
      cartCloseTweenRef.current = null;
    }

    const offscreen = position === "left" ? -100 : 100;
    const layerStates = layers.map((el) => ({ el, start: offscreen }));
    const panelStart = offscreen;

    const tl = gsap.timeline({ paused: true });

    layerStates.forEach((ls, i) => {
      tl.fromTo(
        ls.el,
        { xPercent: ls.start },
        { xPercent: 0, duration: 0.5, ease: "power4.out" },
        i * 0.07,
      );
    });

    const lastTime = layerStates.length ? (layerStates.length - 1) * 0.07 : 0;
    const panelInsertTime = lastTime + (layerStates.length ? 0.08 : 0);

    tl.fromTo(
      panel,
      { xPercent: panelStart },
      { xPercent: 0, duration: 0.65, ease: "power4.out" },
      panelInsertTime,
    );

    cartOpenTlRef.current = tl;
    return tl;
  }, [position]);

  const playOpen = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;
    const tl = buildOpenTimeline();
    if (tl) {
      tl.eventCallback("onComplete", () => {
        busyRef.current = false;
      });
      tl.play(0);
    } else {
      busyRef.current = false;
    }
  }, [buildOpenTimeline]);

  const playClose = useCallback(() => {
    openTlRef.current?.kill();
    openTlRef.current = null;
    itemEntranceTweenRef.current?.kill();

    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return;

    const all: HTMLElement[] = [...layers, panel];
    closeTweenRef.current?.kill();
    const offscreen = position === "left" ? -100 : 100;

    closeTweenRef.current = gsap.to(all, {
      xPercent: offscreen,
      duration: 0.32,
      ease: "power3.in",
      overwrite: "auto",
      onComplete: () => {
        const itemEls = Array.from(
          panel.querySelectorAll(".sm-panel-itemLabel"),
        ) as HTMLElement[];
        if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });
        const numberEls = Array.from(
          panel.querySelectorAll(
            ".sm-panel-list[data-numbering] .sm-panel-item",
          ),
        ) as HTMLElement[];
        if (numberEls.length)
          gsap.set(numberEls, { ["--sm-num-opacity" as any]: 0 });
        const socialTitle = panel.querySelector(
          ".sm-socials-title",
        ) as HTMLElement | null;
        const socialLinks = Array.from(
          panel.querySelectorAll(".sm-socials-link"),
        ) as HTMLElement[];
        if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
        if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });
        busyRef.current = false;
      },
    });
  }, [position]);

  const playCartOpen = useCallback(() => {
    const tl = buildCartOpenTimeline();
    if (tl) tl.play(0);
  }, [buildCartOpenTimeline]);

  const playCartClose = useCallback(() => {
    cartOpenTlRef.current?.kill();
    cartOpenTlRef.current = null;

    const panel = cartPanelRef.current;
    const layers = cartPreLayerElsRef.current;
    if (!panel) return;

    const all: HTMLElement[] = [...layers, panel];
    cartCloseTweenRef.current?.kill();
    const offscreen = position === "left" ? -100 : 100;

    cartCloseTweenRef.current = gsap.to(all, {
      xPercent: offscreen,
      duration: 0.32,
      ease: "power3.in",
      overwrite: "auto",
    });
  }, [position]);

  const animateColor = useCallback(
    (opening: boolean) => {
      const btn = toggleBtnRef.current;
      if (!btn) return;
      colorTweenRef.current?.kill();
      if (changeMenuColorOnOpen) {
        const targetColor = opening ? openMenuButtonColor : menuButtonColor;
        colorTweenRef.current = gsap.to(btn, {
          color: targetColor,
          delay: 0.18,
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        gsap.set(btn, { color: menuButtonColor });
      }
    },
    [openMenuButtonColor, menuButtonColor, changeMenuColorOnOpen],
  );

  React.useEffect(() => {
    if (toggleBtnRef.current) {
      if (changeMenuColorOnOpen) {
        const targetColor = openRef.current
          ? openMenuButtonColor
          : menuButtonColor;
        gsap.set(toggleBtnRef.current, { color: targetColor });
      } else {
        gsap.set(toggleBtnRef.current, { color: menuButtonColor });
      }
    }
  }, [changeMenuColorOnOpen, menuButtonColor, openMenuButtonColor]);

  const animateText = useCallback((opening: boolean) => {
    const inner = textInnerRef.current;
    if (!inner) return;
    textCycleAnimRef.current?.kill();
    const currentLabel = opening ? "Menu" : "Close";
    const targetLabel = opening ? "Close" : "Menu";
    const cycles = 3;
    const seq: string[] = [currentLabel];
    let last = currentLabel;
    for (let i = 0; i < cycles; i++) {
      last = last === "Menu" ? "Close" : "Menu";
      seq.push(last);
    }
    if (last !== targetLabel) seq.push(targetLabel);
    seq.push(targetLabel);
    setTextLines(seq);
    gsap.set(inner, { yPercent: 0 });
    const lineCount = seq.length;
    const finalShift = ((lineCount - 1) / lineCount) * 100;
    textCycleAnimRef.current = gsap.to(inner, {
      yPercent: -finalShift,
      duration: 0.5 + lineCount * 0.07,
      ease: "power4.out",
    });
  }, []);

  const animateCartText = useCallback((opening: boolean) => {
    const inner = cartTextInnerRef.current;
    if (!inner) return;
    cartTextCycleAnimRef.current?.kill();
    const currentLabel = opening ? "Cart" : "Close";
    const targetLabel = opening ? "Close" : "Cart";
    const cycles = 3;
    const seq: string[] = [currentLabel];
    let last = currentLabel;
    for (let i = 0; i < cycles; i++) {
      last = last === "Cart" ? "Close" : "Cart";
      seq.push(last);
    }
    if (last !== targetLabel) seq.push(targetLabel);
    seq.push(targetLabel);
    setCartTextLines(seq);
    gsap.set(inner, { yPercent: 0 });
    const lineCount = seq.length;
    const finalShift = ((lineCount - 1) / lineCount) * 100;
    cartTextCycleAnimRef.current = gsap.to(inner, {
      yPercent: -finalShift,
      duration: 0.5 + lineCount * 0.07,
      ease: "power4.out",
    });
  }, []);

  const toggleMenu = useCallback(() => {
    const target = !openRef.current;
    openRef.current = target;
    setOpen(target);
    if (target) {
      onMenuOpen?.();
      playOpen();
    } else {
      onMenuClose?.();
      playClose();
    }
    animateColor(target);
    animateText(target);
  }, [playOpen, playClose, animateColor, animateText, onMenuOpen, onMenuClose]);

  const closeMenu = useCallback(() => {
    if (openRef.current) {
      openRef.current = false;
      setOpen(false);
      onMenuClose?.();
      playClose();
      animateColor(false);
      animateText(false);
    }
  }, [playClose, animateColor, animateText, onMenuClose]);

  const closeCart = useCallback(() => {
    if (cartOpenRef.current) {
      cartOpenRef.current = false;
      setCartOpen(false);
      playCartClose();
      animateCartText(false);
    }
  }, [playCartClose, animateCartText]);

  // Click-outside for menu panel
  React.useEffect(() => {
    if (!closeOnClickAway || !open) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node) &&
        toggleBtnRef.current &&
        !toggleBtnRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeOnClickAway, open, closeMenu]);

  // Click-outside for cart panel (all devices)
  React.useEffect(() => {
    if (!cartOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      // Find the cart button — it's the sibling of the menu toggle button
      const cartBtn = document.querySelector(".sm-cart-btn");
      if (
        cartPanelRef.current &&
        !cartPanelRef.current.contains(event.target as Node) &&
        cartBtn &&
        !cartBtn.contains(event.target as Node)
      ) {
        closeCart();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [cartOpen, closeCart]);

  const rawColors =
    colors && colors.length ? colors.slice(0, 4) : ["#1e1e22", "#35353c"];
  let cartLayerColors = [...rawColors];
  if (cartLayerColors.length >= 3) {
    const mid = Math.floor(cartLayerColors.length / 2);
    cartLayerColors.splice(mid, 1);
  }

  return (
    <div
      className={`sm-scope font-prestiregular z-40 pointer-events-none ${
        isFixed
          ? "fixed top-0 left-0 w-screen h-screen overflow-hidden"
          : "w-full h-full"
      }`}
      data-menu-open={open ? "true" : "false"}
    >
      <div
        className={
          (className ? className + " " : "") +
          "staggered-menu-wrapper pointer-events-none relative w-full h-full z-40"
        }
        style={
          accentColor
            ? ({ ["--sm-accent" as any]: accentColor } as React.CSSProperties)
            : undefined
        }
        data-position={position}
        data-open={open || undefined}
      >
        {/* Menu pre-layers */}
        <div
          ref={preLayersRef}
          className="sm-prelayers absolute top-0 left-0 bottom-0 pointer-events-none z-[5]"
          aria-hidden="true"
        >
          {(() => {
            const raw =
              colors && colors.length
                ? colors.slice(0, 4)
                : ["#1e1e22", "#35353c"];
            let arr = [...raw];
            if (arr.length >= 3) {
              const mid = Math.floor(arr.length / 2);
              arr.splice(mid, 1);
            }
            return arr.map((c, i) => (
              <div
                key={i}
                className="sm-prelayer absolute top-0 left-0 h-full w-full translate-x-0"
                style={{ background: c }}
              />
            ));
          })()}
        </div>

        {/* Cart pre-layers */}
        <div
          ref={cartPreLayersRef}
          className="absolute top-0 left-0 bottom-0 pointer-events-none z-[15]"
          aria-hidden="true"
          style={{ width: "clamp(360px, 42vw, 540px)" }}
        >
          {cartLayerColors.map((c, i) => (
            <div
              key={i}
              className="sm-cart-prelayer absolute top-0 left-0 h-full w-full"
              style={{ background: c }}
            />
          ))}
        </div>

        <header
          className="staggered-menu-header absolute top-0 left-0 w-full flex items-center justify-between p-[2em] bg-transparent pointer-events-none z-20"
          aria-label="Main navigation header"
        >
          <div
            className="sm-logo flex items-center select-none pointer-events-auto"
            aria-label="Logo"
          >
            <Link
              href="/"
              className="font-prestiregular text-black text-sm md:text-3xl sm:text-sm tracking-wide no-underline"
            >
              WINNIESWIM
            </Link>
          </div>

          <div className="flex items-center gap-6 pointer-events-auto">
            {/* Menu button */}
            <button
              ref={toggleBtnRef}
              className={`sm-toggle relative inline-flex items-center gap-[0.3rem] bg-transparent border-0 cursor-pointer font-medium leading-none overflow-visible pointer-events-auto min-w-[3.5rem] ${
                open ? "text-black" : "text-black"
              }`}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="staggered-menu-panel"
              onClick={toggleMenu}
              type="button"
            >
              <span
                ref={textWrapRef}
                className="sm-toggle-textWrap relative inline-block overflow-hidden whitespace-nowrap"
                style={{ height: "1em", lineHeight: 1 }}
                aria-hidden="true"
                a-hidden="true"
              >
                <span
                  ref={textInnerRef}
                  className="sm-toggle-textInner flex flex-col leading-none"
                >
                  {textLines.map((l, i) => (
                    <span
                      className="sm-toggle-line block h-[1em] leading-none"
                      key={i}
                    >
                      {l}
                    </span>
                  ))}
                </span>
              </span>
            </button>

            {/* Cart button */}
            <button
              onClick={() => {
                const target = !cartOpenRef.current;
                cartOpenRef.current = target;
                setCartOpen(target);
                if (target) {
                  fetchCart();
                  playCartOpen();
                } else {
                  playCartClose();
                }
                animateCartText(target);
              }}
              className="sm-cart-btn sm-toggle relative inline-flex items-center gap-[0.3rem] bg-transparent border-0 cursor-pointer font-medium leading-none overflow-visible pointer-events-auto text-black min-w-[3rem]"
              aria-label={cartOpen ? "Close cart" : "Open cart"}
              type="button"
            >
              <span
                ref={cartTextWrapRef}
                className="sm-toggle-textWrap relative inline-block overflow-hidden whitespace-nowrap"
                style={{ height: "1em", lineHeight: 1 }}
                aria-hidden="true"
              >
                <span
                  ref={cartTextInnerRef}
                  className="sm-toggle-textInner flex flex-col leading-none"
                >
                  {cartTextLines.map((l, i) => (
                    <span
                      className="sm-toggle-line block h-[1em] leading-none"
                      key={i}
                    >
                      {l}
                    </span>
                  ))}
                </span>
              </span>
              {/* Cart count badge */}
              {cartCount > 0 && !cartOpen && (
                <span className="text-sm font-prestisemibold text-gray-600">
                  ({cartCount})
                </span>
              )}
            </button>
          </div>
        </header>

        {/* Menu panel */}
        <aside
          id="staggered-menu-panel"
          ref={panelRef}
          className="staggered-menu-panel absolute top-0 left-0 h-full bg-white flex flex-col p-[6em_2em_2em_2em] overflow-y-auto z-10 backdrop-blur-[12px] pointer-events-auto"
          style={{ WebkitBackdropFilter: "blur(12px)" }}
          aria-hidden={!open}
        >
          {/* Mobile-only close button */}
          <button
            onClick={closeMenu}
            className="sm-panel-close-btn md:hidden absolute top-5 right-5 w-9 h-9 flex items-center justify-center bg-transparent border-0 cursor-pointer text-black"
            aria-label="Close menu"
            type="button"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <line
                x1="1"
                y1="1"
                x2="17"
                y2="17"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <line
                x1="17"
                y1="1"
                x2="1"
                y2="17"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <div className="sm-panel-inner flex-1 flex flex-col gap-5">
            <ul
              className="sm-panel-list list-none m-0 p-0 flex flex-col gap-2"
              role="list"
              data-numbering={displayItemNumbering || undefined}
            >
              {items && items.length ? (
                items.map((it, idx) => (
                  <li
                    className="sm-panel-itemWrap relative overflow-hidden leading-none"
                    key={it.label + idx}
                  >
                    <a
                      className="sm-panel-item relative text-black font-semibold text-[4rem] cursor-pointer leading-none tracking-[-2px] uppercase transition-[background,color] duration-150 ease-linear inline-block no-underline pr-[1.4em]"
                      href={it.link}
                      aria-label={it.ariaLabel}
                      data-index={idx + 1}
                    >
                      <span className="sm-panel-itemLabel inline-block [transform-origin:50%_100%] will-change-transform">
                        {it.label}
                      </span>
                    </a>
                  </li>
                ))
              ) : (
                <li
                  className="sm-panel-itemWrap relative overflow-hidden leading-none"
                  aria-hidden="true"
                >
                  <span className="sm-panel-item relative text-black font-semibold text-[4rem] cursor-pointer leading-none tracking-[-2px] uppercase transition-[background,color] duration-150 ease-linear inline-block no-underline pr-[1.4em]">
                    <span className="sm-panel-itemLabel inline-block [transform-origin:50%_100%] will-change-transform">
                      No items
                    </span>
                  </span>
                </li>
              )}
            </ul>

            {displaySocials && socialItems && socialItems.length > 0 && (
              <div
                className="sm-socials mt-auto pt-8 flex flex-col gap-3"
                aria-label="Social links"
              >
                <h3 className="sm-socials-title m-0 text-base font-medium [color:var(--sm-accent,#ff0000)]">
                  Socials
                </h3>
                <ul
                  className="sm-socials-list list-none m-0 p-0 flex flex-row items-center gap-4 flex-wrap"
                  role="list"
                >
                  {socialItems.map((s, i) => (
                    <li key={s.label + i} className="sm-socials-item">
                      <a
                        href={s.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="sm-socials-link text-[1.2rem] font-medium text-[#111] no-underline relative inline-block py-[2px] transition-[color,opacity] duration-300 ease-linear"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </aside>

        {/* Cart panel */}
        <div
          ref={cartPanelRef}
          className="absolute top-0 left-0 h-full bg-white flex flex-col p-[6em_2em_2em_2em] overflow-y-auto z-20 pointer-events-auto"
          style={{ width: "clamp(360px, 42vw, 540px)" }}
          aria-hidden={!cartOpen}
        >
          {/* Mobile-only close button */}
          <button
            onClick={closeCart}
            className="sm-panel-close-btn md:hidden absolute top-5 right-5 w-9 h-9 flex items-center justify-center bg-transparent border-0 cursor-pointer text-black"
            aria-label="Close cart"
            type="button"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <line
                x1="1"
                y1="1"
                x2="17"
                y2="17"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <line
                x1="17"
                y1="1"
                x2="1"
                y2="17"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <div className="flex-1 flex flex-col gap-5">
            <div className="mb-4">
              <h2 className="font-prestregular text-4xl leading-none tracking-[-2px] uppercase">
                Cart
              </h2>
            </div>

            {cartItems.length === 0 ? (
              <p className="text-sm text-gray-600">Your cart is empty.</p>
            ) : (
              <div className="flex flex-col flex-1">
                <ul className="space-y-6 flex-1">
                  {cartItems.map((item: any) => (
                    <li key={item.key} className="flex gap-4 border-b pb-6">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.product_title}
                          className="h-24 w-16 rounded-lg object-cover"
                        />
                      )}
                      <div className="flex flex-1 flex-col justify-between">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-lg text-gray-900">
                              {item.product_title}
                            </p>
                            {/* size /*/}
                            <p className="text-md font-prestisemibold text-gray-700">
                              {item.variant_title}
                            </p>
                          </div>
                          <button
                            onClick={async () => {
                              await fetch("/api/cart/update", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                  lineId: item.key,
                                  quantity: 0,
                                }),
                              });
                              fetchCart();
                            }}
                            className="text-gray-300 hover:text-gray-600 bg-transparent border-0 cursor-pointer text-xs ml-2"
                          >
                            <img
                              src="/trash-icon.png"
                              alt="Remove"
                              className="h-4 w-4"
                            />
                          </button>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={async () => {
                                await fetch("/api/cart/update", {
                                  method: "POST",
                                  headers: {
                                    "Content-Type": "application/json",
                                  },
                                  body: JSON.stringify({
                                    lineId: item.key,
                                    quantity: item.quantity - 1,
                                  }),
                                });
                                fetchCart();
                              }}
                              className="w-6 h-6 flex items-center justify-center rounded-full border border-gray-400 text-gray-900 hover:border-gray-800 bg-transparent cursor-pointer text-sm leading-none"
                            >
                              −
                            </button>
                            {/* Quantity display */}
                            <span className="text-md font-prestisemibold text-gray-700 w-4 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={async () => {
                                await fetch("/api/cart/update", {
                                  method: "POST",
                                  headers: {
                                    "Content-Type": "application/json",
                                  },
                                  body: JSON.stringify({
                                    lineId: item.key,
                                    quantity: item.quantity + 1,
                                  }),
                                });
                                fetchCart();
                              }}
                              className="w-6 h-6 flex items-center justify-center rounded-full border border-gray-400 text-gray-900 hover:border-gray-800 bg-transparent cursor-pointer text-sm leading-none"
                            >
                              +
                            </button>
                          </div>
                          <p className="text-sm text-gray-900">
                            ${(item.final_line_price / 100).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 border-t pt-6">
                  <div className="flex justify-between mb-6">
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="text-sm text-gray-900">
                      ${(cartTotal / 100).toFixed(2)}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      if (checkoutUrl) window.location.href = checkoutUrl;
                    }}
                    className="checkout-shimmer-btn block w-full rounded-full px-8 py-4 text-center text-lg uppercase font-prestisemibold text-white transition-colors cursor-pointer border-0"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
      .checkout-shimmer-btn {
  background: #212121;
  position: relative;
  overflow: hidden;
}
.checkout-shimmer-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 60%;
  height: 100%;
  background: linear-gradient(
    120deg,
    transparent 0%,
    rgba(255, 255, 255, 0.18) 40%,
    rgba(255, 255, 255, 0.45) 50%,
    rgba(255, 255, 255, 0.18) 60%,
    transparent 100%
  );
  animation: shimmer 2.2s ease-in-out infinite;
}
@keyframes shimmer {
  0%   { left: -100%; }
  60%  { left: 150%; }
  100% { left: 150%; }
}
.checkout-shimmer-btn:hover {
  background: #222;
}
.sm-scope .staggered-menu-wrapper { position: relative; width: 100%; height: 100%; z-index: 40; pointer-events: none; }
.sm-scope .staggered-menu-header { position: absolute; top: 0; left: 0; width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 2em; background: transparent; pointer-events: none; z-index: 20; }
.sm-scope .staggered-menu-header > * { pointer-events: auto; }
.sm-scope .sm-logo { display: flex; align-items: center; user-select: none; }
.sm-scope .sm-toggle { position: relative; display: inline-flex; align-items: center; gap: 0.3rem; background: transparent; border: none; cursor: pointer; color: #000; font-weight: 500; line-height: 1; overflow: visible; }
.sm-scope .sm-toggle:focus-visible { outline: 2px solid #ffffffaa; outline-offset: 4px; border-radius: 4px; }
.sm-scope .sm-toggle-textWrap { position: relative; display: inline-block; height: 1em; line-height: 1; overflow: hidden; white-space: nowrap; }
.sm-scope .sm-toggle-textInner { display: flex; flex-direction: column; line-height: 1; }
.sm-scope .sm-toggle-line { display: block; height: 1em; line-height: 1; }
.sm-scope .sm-panel-itemWrap { position: relative; overflow: hidden; line-height: 1; }
.sm-scope .sm-line { display: none !important; }
.sm-scope .staggered-menu-panel { position: absolute; top: 0; left: 0; width: clamp(360px, 42vw, 540px); height: 100%; background: white; backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); display: flex; flex-direction: column; padding: 6em 2em 2em 2em; overflow-y: auto; z-index: 10; }
.sm-scope .sm-prelayers { position: absolute; top: 0; left: 0; bottom: 0; width: clamp(360px, 42vw, 540px); pointer-events: none; z-index: 5; }
.sm-scope .sm-prelayer { position: absolute; top: 0; left: 0; height: 100%; width: 100%; transform: translateX(0); }
.sm-scope .sm-cart-prelayer { position: absolute; top: 0; left: 0; height: 100%; width: 100%; }
.sm-scope .sm-panel-inner { flex: 1; display: flex; flex-direction: column; gap: 1.25rem; }
.sm-scope .sm-socials { margin-top: auto; padding-top: 2rem; display: flex; flex-direction: column; gap: 0.75rem; }
.sm-scope .sm-socials-title { margin: 0; font-size: 1rem; font-weight: 500; color: var(--sm-accent, #ff0000); }
.sm-scope .sm-socials-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: row; align-items: center; gap: 1rem; flex-wrap: wrap; }
.sm-scope .sm-socials-list .sm-socials-link { opacity: 1; transition: opacity 0.3s ease; }
.sm-scope .sm-socials-list:hover .sm-socials-link:not(:hover) { opacity: 0.35; }
.sm-scope .sm-socials-list:focus-within .sm-socials-link:not(:focus-visible) { opacity: 0.35; }
.sm-scope .sm-socials-list .sm-socials-link:hover, .sm-scope .sm-socials-list .sm-socials-link:focus-visible { opacity: 1; }
.sm-scope .sm-socials-link:focus-visible { outline: 2px solid var(--sm-accent, #ff0000); outline-offset: 3px; }
.sm-scope .sm-socials-link { font-size: 1.2rem; font-weight: 500; color: #111; text-decoration: none; position: relative; padding: 2px 0; display: inline-block; transition: color 0.3s ease, opacity 0.3s ease; }
.sm-scope .sm-socials-link:hover { color: var(--sm-accent, #ff0000); }
.sm-scope .sm-panel-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.5rem; }
.sm-scope .sm-panel-item { position: relative; color: #000; font-weight: 600; font-size: clamp(2.25rem, 3.4vw, 3rem); cursor: pointer; line-height: 0.95; letter-spacing: -1.5px; text-transform: uppercase; transition: background 0.25s, color 0.25s; display: inline-block; text-decoration: none; padding-right: 1.7em; }
.sm-scope .sm-panel-itemLabel { display: inline-block; will-change: transform; transform-origin: 50% 100%; }
.sm-scope .sm-panel-item:hover { color: var(--sm-accent, #ff0000); }
.sm-scope .sm-panel-list[data-numbering] { counter-reset: smItem; }
.sm-scope .sm-panel-list[data-numbering] .sm-panel-item::after { counter-increment: smItem; content: counter(smItem, decimal-leading-zero); position: absolute; top: 0.1em; right: 3.2em; font-size: 18px; font-weight: 400; color: var(--sm-accent, #ff0000); letter-spacing: 0; pointer-events: none; user-select: none; opacity: var(--sm-num-opacity, 0); }
.sm-scope .sm-panel-close-btn { position: absolute; top: 1.25rem; right: 1.25rem; width: 2.25rem; height: 2.25rem; display: flex; align-items: center; justify-content: center; background: transparent; border: none; cursor: pointer; color: #000; z-index: 10; padding: 0; }
.sm-scope .sm-panel-close-btn:hover { opacity: 0.5; }
@media (min-width: 768px) { .sm-scope .sm-panel-close-btn { display: none !important; } }
@media (max-width: 1024px) { .sm-scope .staggered-menu-panel { width: 100%; left: 0; right: 0; } }
@media (max-width: 640px) { .sm-scope .staggered-menu-panel { width: 100%; left: 0; right: 0; } }
@media (max-width: 767px) {
  .sm-scope .sm-panel-item { font-size: clamp(1.75rem, 8vw, 2.25rem); display: inline-block; padding-right: 1.1em; }
  .sm-scope .sm-panel-list[data-numbering] .sm-panel-item::after { top: 0.1em; right: 1.5em; font-size: 11px; }
  [data-menu-open="true"].sm-scope .staggered-menu-header .sm-toggle,
  [data-menu-open="true"].sm-scope .staggered-menu-header .sm-cart-btn { visibility: hidden; pointer-events: none; }
}
      `}</style>
    </div>
  );
};

export default StaggeredMenu;
