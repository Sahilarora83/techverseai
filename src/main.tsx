import React from "react";
import ReactDOM, { type Root } from "react-dom/client";
import { ArrowRight, Menu, X } from "lucide-react";
import lottie, { type AnimationItem } from "lottie-web";
import { ChromaFlow, FilmGrain, FlutedGlass, Shader, Swirl } from "shaders/react";
import analyticsAnimation from "./assets/services/analytics.json";
import croAnimation from "./assets/services/cro.json";
import seoAnimation from "./assets/services/seo.json";
import webAnimation from "./assets/services/web.json";
import "./index.css";

const logoSrc = "/logo2-cropped.png";
const footerLogoSrc = "/footer-logo.png";
const serviceAnimations = {
  web: webAnimation,
  seo: seoAnimation,
  cro: croAnimation,
  analytics: analyticsAnimation,
};

function useMediaQuery(query: string) {
  const [matches, setMatches] = React.useState(false);

  React.useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);

    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [query]);

  return matches;
}

function RollingText({ children }: { children: React.ReactNode }) {
  return (
    <span className="block h-[20px] overflow-hidden">
      <span className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-1/2">
        <span className="h-[20px] leading-[20px]">{children}</span>
        <span className="h-[20px] leading-[20px]">{children}</span>
      </span>
    </span>
  );
}

function PartnerIcon() {
  return (
    <svg className="h-5 w-5 fill-current text-[#E8704E] sm:h-6 sm:w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <path d="m19.6 66.5 19.7-11 .3-1-.3-.5h-1l-3.3-.2-11.2-.3L14 53l-9.5-.5-2.4-.5L0 49l.2-1.5 2-1.3 2.9.2 6.3.5 9.5.6 6.9.4L38 49.1h1.6l.2-.7-.5-.4-.4-.4L29 41l-10.6-7-5.6-4.1-3-2-1.5-2-.6-4.2 2.7-3 3.7.3.9.2 3.7 2.9 8 6.1L37 36l1.5 1.2.6-.4.1-.3-.7-1.1L33 25l-6-10.4-2.7-4.3-.7-2.6c-.3-1-.4-2-.4-3l3-4.2L28 0l4.2.6L33.8 2l2.6 6 4.1 9.3L47 29.9l2 3.8 1 3.4.3 1h.7v-.5l.5-7.2 1-8.7 1-11.2.3-3.2 1.6-3.8 3-2L61 2.6l2 2.9-.3 1.8-1.1 7.7L59 27.1l-1.5 8.2h.9l1-1.1 4.1-5.4 6.9-8.6 3-3.5L77 13l2.3-1.8h4.3l3.1 4.7-1.4 4.9-4.4 5.6-3.7 4.7-5.3 7.1-3.2 5.7.3.4h.7l12-2.6 6.4-1.1 7.6-1.3 3.5 1.6.4 1.6-1.4 3.4-8.2 2-9.6 2-14.3 3.3-.2.1.2.3 6.4.6 2.8.2h6.8l12.6 1 3.3 2 1.9 2.7-.3 2-5.1 2.6-6.8-1.6-16-3.8-5.4-1.3h-.8v.4l4.6 4.5 8.3 7.5L89 80.1l.5 2.4-1.3 2-1.4-.2-9.2-7-3.6-3-8-6.8h-.5v.7l1.8 2.7 9.8 14.7.5 4.5-.7 1.4-2.6 1-2.7-.6-5.8-8-6-9-4.7-8.2-.5.4-2.9 30.2-1.3 1.5-3 1.2-2.5-2-1.4-3 1.4-6.2 1.6-8 1.3-6.4 1.2-7.9.7-2.6v-.2H49L43 72l-9 12.3-7.2 7.6-1.7.7-3-1.5.3-2.8L24 86l10-12.8 6-7.9 4-4.6-.1-.5h-.3L17.2 77.4l-4.7.6-2-2 .2-3 1-1 8-5.5Z" />
    </svg>
  );
}

function ArrowButton({ children, className = "", circleClassName = "", iconClassName = "" }: { children: React.ReactNode; className?: string; circleClassName?: string; iconClassName?: string }) {
  return (
    <button className={`group inline-flex items-center gap-3 rounded-full text-[13px] font-medium leading-[14px] transition-colors duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${className}`}>
      <RollingText>{children}</RollingText>
      <span className={`flex shrink-0 items-center justify-center rounded-full transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45 ${circleClassName}`}>
        <ArrowRight size={15} className={iconClassName} />
      </span>
    </button>
  );
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className={`fixed inset-0 z-50 md:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}>
      <button aria-label="Close menu backdrop" onClick={onClose} className={`absolute inset-0 bg-black/60 transition-opacity duration-500 ${open ? "opacity-100" : "opacity-0"}`} />
      <div className={`absolute inset-x-0 bottom-0 mx-3 mb-3 max-h-[calc(100vh-24px)] overflow-y-auto rounded-2xl bg-white p-5 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${open ? "translate-y-0" : "translate-y-full"}`}>
        <nav className="flex flex-col gap-4 text-[clamp(2rem,10vw,3.2rem)] font-medium leading-[0.96] tracking-[-0.04em] text-gray-900">
          {["Projects", "Studio", "Journal", "Connect"].map((item) => (
            <a key={item} href="#" onClick={onClose}>
              {item}
            </a>
          ))}
        </nav>
        <button className="mt-8 flex w-full items-center justify-between rounded-full bg-[#F26522] py-2 pl-5 pr-2 text-left text-[13px] font-medium leading-[14px] text-white">
          Start a project
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#F26522]">
            <ArrowRight size={15} />
          </span>
        </button>
      </div>
    </div>
  );
}

function Hero() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const isCompact = useMediaQuery("(max-width: 899px)");
  const useShader = useMediaQuery("(prefers-reduced-motion: no-preference)");

  return (
    <section className="relative flex min-h-screen overflow-hidden bg-[#EFEFEF]">
      {useShader ? (
        <div className="pointer-events-none absolute inset-0 z-10">
          <Shader className="h-full w-full">
            <Swirl colorA="#ffffff" colorB="#f0f0f0" detail={isCompact ? 0.85 : 1.35} />
            <ChromaFlow baseColor="#ffffff" downColor="#ff5f03" leftColor="#ff5f03" rightColor="#ff5f03" upColor="#ff5f03" momentum={isCompact ? 4 : 8} radius={isCompact ? 2.2 : 3} />
            <FlutedGlass aberration={isCompact ? 0.18 : 0.36} angle={31} frequency={isCompact ? 4 : 6} highlight={0.1} highlightSoftness={0} lightAngle={-90} refraction={isCompact ? 1.8 : 3} shape="rounded" softness={1} speed={isCompact ? 0.035 : 0.08} />
            <FilmGrain strength={isCompact ? 0.012 : 0.025} />
          </Shader>
        </div>
      ) : (
        <div className="hero-light-fallback pointer-events-none absolute inset-0 z-10" />
      )}

      <div className="relative z-20 flex min-h-screen w-full flex-col">
        <header className="hero-header mx-auto w-full max-w-[1440px] p-2 sm:p-3">
          <div className="hero-nav grid grid-cols-[1fr_auto_1fr] items-center rounded-full bg-white p-[5px]">
            <div className="flex min-w-0 items-center">
              <span className="hero-logo flex h-10 w-40 shrink-0 items-center justify-start overflow-hidden sm:h-11 sm:w-48 lg:h-12 lg:w-56">
                <img src={logoSrc} alt="techverse AI logo" className="h-full w-full object-contain object-left p-0" />
              </span>
            </div>
            <nav className="hidden items-center justify-center gap-8 text-[16px] text-gray-900 md:flex lg:gap-10 lg:text-[18px]">
              {["Projects", "Studio", "Journal", "Connect"].map((item) => (
                <a key={item} className="transition-colors duration-300 hover:text-gray-500" href="#">
                  {item}
                </a>
              ))}
            </nav>
            <div className="hidden items-center justify-end md:flex">
              <ArrowButton className="bg-gray-900 py-2 pl-5 pr-2 text-white" circleClassName="h-6 w-6 bg-white text-gray-900">
                Book a strategy call
              </ArrowButton>
            </div>
            <button onClick={() => setMenuOpen((value) => !value)} className="col-start-3 flex h-10 w-10 items-center justify-center justify-self-end rounded-full bg-gray-900 text-white md:hidden" aria-label="Toggle menu">
              {menuOpen ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>
        </header>

        <div className="flex-1" />

        <div className="mx-auto w-full max-w-[1440px] px-5 pb-14 sm:px-8 sm:pb-16 lg:px-12 lg:pb-20">
          <p className="mb-5 text-[13px] leading-[14px] tracking-wide text-gray-900 sm:mb-8">techverse AI</p>
          <h1 className="text-[clamp(1.75rem,7vw,4.2rem)] font-medium leading-[1.08] tracking-[-0.03em] text-gray-900 sm:text-[clamp(2.5rem,5vw,4.2rem)]">
            We craft digital experiences<span className="sm:hidden"> </span>
            <br className="hidden sm:block" />
            for brands ready to dominate<span className="sm:hidden"> </span>
            <br className="hidden sm:block" />
            their category online.
          </h1>
          <div className="mt-8 flex flex-col gap-4 sm:mt-12 sm:flex-row sm:items-center sm:gap-5">
            <ArrowButton className="w-fit bg-[#F26522] py-2 pl-5 pr-2 text-white hover:bg-[#e05a1a] sm:pl-6" circleClassName="h-7 w-7 bg-white text-[#F26522] sm:h-8 sm:w-8">
              Start a project
            </ArrowButton>
            <div className="flex w-fit items-center gap-2.5 rounded-[4px] bg-white px-3 py-2 text-gray-900 shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-shadow duration-300 hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] sm:px-4">
              <PartnerIcon />
              <span className="text-[13px] font-medium leading-[14px]">Certified Partner</span>
              <span className="rounded bg-gray-900 px-1.5 py-0.5 text-[10px] leading-[11px] text-white sm:px-2">Featured</span>
            </div>
          </div>
        </div>
      </div>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </section>
  );
}

function LogoStrip() {
  const brands = [
    "Amazon",
    "Flipkart",
    "Google",
    "Microsoft",
    "Meta",
    "Netflix",
    "Shopify",
    "Adobe",
  ];
  const topRowBrands = [...brands, ...brands, ...brands];
  const bottomRowBrands = [...brands.slice(4), ...brands.slice(0, 4), ...brands, ...brands];

  return (
    <div className="bg-white py-9 sm:py-12">
      <div className="brand-marquee overflow-hidden">
        <div className="brand-marquee-track brand-marquee-track-left flex items-center">
          {topRowBrands.map((brand, index) => (
            <span key={`top-${brand}-${index}`} className="brand-logo-word">
              {brand}
            </span>
          ))}
        </div>
        <div className="brand-marquee-track brand-marquee-track-right mt-8 flex items-center sm:mt-10">
          {bottomRowBrands.map((brand, index) => (
            <span key={`bottom-${brand}-${index}`} className="brand-logo-word">
              {brand}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function SectionBadge({ number, label, border = "border-gray-200" }: { number: string; label: string; border?: string }) {
  return (
    <div className="mb-6 flex items-center gap-3 px-5 sm:mb-8 sm:px-8 lg:px-12">
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-[11px] font-semibold leading-[12px] text-white sm:h-7 sm:w-7">{number}</span>
      <span className={`rounded-full border ${border} px-3 py-1 text-[12px] font-medium leading-[13px] sm:px-4 sm:py-1.5`}>{label}</span>
    </div>
  );
}

function About() {
  const features = [
    {
      title: "Custom Development",
      text: "Monitor your finances live with clear, intuitive dashboards.",
      image: "https://www.futuredesks.com/home/features1.png",
    },
    {
      title: "SaaS Prebuilt @ 50,000 /-",
      text: "Monitor your finances live with clear, intuitive dashboards.",
      image: "https://www.futuredesks.com/home/features2.png",
    },
  ];

  return (
    <section className="overflow-hidden bg-white py-16">
      <div className="mx-auto flex w-full flex-col items-center">
        <div className="mb-8 flex justify-center sm:mb-10">
          <span className="rounded-full bg-white px-5 py-2 text-[14px] font-medium leading-none text-[#536071] shadow-[0_8px_24px_rgba(15,23,42,0.12)] ring-1 ring-gray-100">Features</span>
        </div>

        <h2 className="mx-auto mb-12 max-w-[760px] px-4 text-center text-[clamp(2.05rem,3.25vw,3.75rem)] font-normal leading-[1.28] tracking-[-0.025em] text-[#111827] sm:mb-14">
          Streamline Business with our
          <br className="hidden sm:block" />
          Flexible Options
        </h2>

        <div className="grid w-full max-w-6xl grid-cols-1 justify-center gap-8 px-4 sm:grid-cols-2 sm:gap-10">
          {features.map((feature) => (
            <article key={feature.title} className="mx-auto flex w-full max-w-[500px] flex-col items-center overflow-hidden rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-200 md:max-w-[465px]">
              <div className="mb-4 flex h-[200px] w-full items-center justify-center overflow-hidden sm:h-[250px]">
                <img src={feature.image} alt={feature.title} className="max-h-full max-w-full object-contain" />
              </div>
              <div className="w-full px-2">
                <h3 className="mb-2 text-[18px] font-semibold leading-7 tracking-[-0.02em] text-gray-950 sm:text-[24px] sm:leading-8">{feature.title}</h3>
                <p className="text-[14px] leading-[23px] text-gray-600 sm:leading-[26px]">{feature.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceVisual({ type }: { type: "web" | "seo" | "cro" | "analytics" }) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animation: AnimationItem | null = null;
    const loadAnimation = () => {
      if (animation) return animation;

      animation = lottie.loadAnimation({
        container,
        renderer: "svg",
        loop: true,
        autoplay: false,
        animationData: serviceAnimations[type],
        rendererSettings: {
          preserveAspectRatio: "xMidYMid meet",
          progressiveLoad: true,
        },
      });

      animation.setSpeed(0.85);
      return animation;
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadAnimation().play();
        } else if (animation) {
          animation.pause();
        }
      },
      { rootMargin: "160px 0px", threshold: 0.08 },
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
      animation?.destroy();
    };
  }, [type]);

  return (
    <div className="service-visual-root relative mx-auto flex min-h-[300px] w-full max-w-[560px] items-center justify-center">
      <div ref={containerRef} className={`service-lottie service-lottie-${type}`} aria-hidden="true" />
    </div>
  );
}

function ProjectVideo({ src, title }: { src: string; title: string }) {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { rootMargin: "220px 0px", threshold: 0.05 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={`${title} project preview`}
      className="h-full w-full object-cover"
    />
  );
}

function Services() {
  const headingRef = React.useRef<HTMLDivElement>(null);
  const stackRef = React.useRef<HTMLDivElement>(null);
  const services = [
    {
      title: "Web Design",
      text: "Custom designs with a focus on luxury and functionality. We blend aesthetic clarity with user-centric functionality to craft digital experiences that resonate with your audience.",
      visual: "web" as const,
      bg: "rgb(210, 228, 199)",
    },
    {
      title: "SEO",
      text: "Data-driven improvements that grow qualified visibility. We optimize content, structure, and technical signals so your brand can be discovered by the right customers.",
      visual: "seo" as const,
      bg: "rgb(149, 185, 255)",
    },
    {
      title: "CRO",
      text: "Conversion-focused testing and page refinement. We improve every touchpoint to transform visitors into loyal customers, using insights and iteration for maximum impact.",
      visual: "cro" as const,
      bg: "rgb(202, 193, 255)",
    },
    {
      title: "Analytics",
      text: "Performance tracking for strategic decision-making. Our analytics solutions provide actionable insights into your website's performance, empowering you to make informed decisions that drive growth and efficiency.",
      visual: "analytics" as const,
      bg: "rgb(255, 237, 175)",
    },
  ];

  React.useEffect(() => {
    const heading = headingRef.current;
    const stack = stackRef.current;
    if (!heading || !stack) return;

    let frame = 0;
    const updateHeadingRelease = () => {
      frame = 0;
      const lastCard = stack.querySelector<HTMLElement>(".service-scroll-step:last-child");
      if (!lastCard) return;

      const headingBottom = heading.getBoundingClientRect().bottom;
      const lastCardTop = lastCard.getBoundingClientRect().top;
      heading.classList.toggle("services-heading-pin--released", lastCardTop <= headingBottom + 16);
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateHeadingRelease);
    };

    updateHeadingRelease();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <section className="services-motion bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-[1680px]">
        <div ref={headingRef} className="services-heading-pin mb-28 grid gap-8 sm:mb-32 sm:grid-cols-[1.15fr_0.85fr] sm:items-end lg:mb-40">
          <div>
            <p className="services-kicker mb-7 text-[clamp(1.125rem,1.6vw,1.875rem)] font-medium leading-none text-black">— Our Services</p>
            <h2 className="services-title text-[clamp(3rem,5.4vw,6.25rem)] font-medium leading-[0.9] tracking-[-0.055em] text-black">
              What We <span className="font-normal italic text-[#0042BD]">Offer!</span>
            </h2>
          </div>
          <div className="services-intro flex flex-col gap-10 sm:pb-2">
            <p className="max-w-[560px] text-[clamp(1.125rem,1.55vw,1.875rem)] leading-[1.32] tracking-[-0.02em] text-[#5f5f5f]">
              From design to optimization, our services are tailored to elevate your brand and drive digital growth.
            </p>
            <button className="services-main-cta service-link w-fit pb-2 text-[clamp(1.125rem,1.5vw,1.75rem)] font-normal leading-none tracking-[-0.02em] text-[#555]">
              Contact Us
            </button>
          </div>
        </div>

        <div ref={stackRef} className="service-stack">
          {services.map((service, index) => (
            <article key={service.title} className="service-showcase service-scroll-step" style={{ zIndex: index + 1 }}>
              <div className="service-sticky-panel service-panel-body grid min-h-[383px] overflow-hidden px-6 py-12 sm:grid-cols-[50%_1fr] sm:px-10 lg:px-28 lg:py-12" style={{ backgroundColor: service.bg }}>
                <ServiceVisual type={service.visual} />
                <div className="service-copy flex flex-col justify-center py-4 text-black">
                  <h3 className="mb-7 text-[clamp(1.875rem,2.4vw,2.75rem)] font-medium leading-none tracking-[-0.03em]">{service.title}</h3>
                  <p className="max-w-[650px] text-[clamp(1rem,1.35vw,1.375rem)] leading-[1.35] tracking-[-0.02em]">{service.text}</p>
                  <button className="service-link mt-10 w-fit pb-2 text-[clamp(1.125rem,1.45vw,1.5rem)] font-normal text-[#555]">Learn More</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function LinkGlyph() {
  return (
    <svg className="h-[14px] w-[14px] shrink-0 transition-transform duration-300 ease-in-out group-hover:rotate-0 -rotate-45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

function CaseStudies() {
  const projects = [
    {
      title: "Narrativ",
      label: "Learn more",
      description: "Winner of Site of the Month 2025 - an interactive 3D showcase driving record engagement",
      video: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260516_122702_390f5305-8719-41d5-ae80-d23ab3796c28.mp4",
      buttonClassName: "bg-white text-gray-900",
      icon: <LinkGlyph />,
    },
    {
      title: "Luminar",
      label: "View case study",
      description: "Transforming a dated platform into a conversion-focused brand experience",
      video: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260516_123323_f909c2b8-ff6c-4edf-882b-8ebcdbe389b5.mp4",
      buttonClassName: "bg-gray-900 text-white",
      icon: <ArrowRight size={14} className="-rotate-45 transition-transform duration-300 ease-in-out group-hover:rotate-0" />,
    },
  ];
  const reversedProjects = [...projects].reverse();
  const topRow = [...projects, ...projects, ...projects, ...projects];
  const bottomRow = [...reversedProjects, ...reversedProjects, ...reversedProjects, ...reversedProjects];

  return (
    <section className="overflow-hidden bg-[#F5F5F5] pb-16 pt-16 sm:pb-20 sm:pt-20 lg:pb-28 lg:pt-28">
      <div className="mx-auto max-w-[1440px]">
        <SectionBadge number="2" label="Featured client work" border="border-gray-300" />
        <h2 className="mb-10 px-5 text-[clamp(1.75rem,7vw,4.2rem)] font-medium leading-[1.08] tracking-[-0.03em] text-gray-900 sm:mb-14 sm:px-8 sm:text-[clamp(2.5rem,5vw,4.2rem)] lg:mb-16 lg:px-12">Our projects</h2>
      </div>
      <div className="project-marquee space-y-6 sm:space-y-8">
        <div className="project-marquee-row project-marquee-row-right">
          {topRow.map((project, index) => (
            <ProjectCard key={`top-${project.title}-${index}`} project={project} />
          ))}
        </div>
        <div className="project-marquee-row project-marquee-row-left">
          {bottomRow.map((project, index) => (
            <ProjectCard key={`bottom-${project.title}-${index}`} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: { title: string; label: string; description: string; video: string; buttonClassName: string; icon: React.ReactNode } }) {
  return (
    <article className="project-card">
      <div className="group project-card-media relative aspect-[329/246] cursor-pointer overflow-hidden rounded-2xl bg-[#1a1d2e]">
        <ProjectVideo src={project.video} title={project.title} />
        <button className={`absolute bottom-4 left-4 flex h-9 w-9 items-center justify-end overflow-hidden rounded-full px-[11px] transition-all duration-300 ease-in-out group-hover:w-[168px] group-hover:justify-between ${project.buttonClassName}`}>
          <span className="whitespace-nowrap text-[13px] font-medium opacity-0 transition-opacity delay-100 duration-300 group-hover:opacity-100">{project.label}</span>
          {project.icon}
        </button>
      </div>
      <p className="mt-4 text-[13px] leading-relaxed text-gray-600">{project.description}</p>
      <h3 className="mt-1 text-[14px] font-semibold leading-[15px] text-gray-900">{project.title}</h3>
    </article>
  );
}

function Footer() {
  return (
    <footer className="overflow-hidden bg-[#070B12] text-white">
      <div className="footer-cta-card relative flex min-h-[520px] w-full items-center justify-center overflow-hidden px-5 py-16 text-center shadow-[0_24px_80px_rgba(0,0,0,0.32)] sm:px-8 sm:py-20 lg:min-h-[620px] lg:py-24">
        <div className="footer-cta-grid absolute inset-0 z-0" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-3xl">
            <p className="mb-4 text-[12px] font-medium uppercase tracking-[0.18em] text-white/70">Ready to grow online?</p>
            <h2 className="mx-auto max-w-2xl text-[clamp(2rem,4.5vw,4.6rem)] font-medium leading-[0.96] tracking-[-0.05em] text-white">
              Upgrade your brand with digital experiences built to convert.
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-[15px] leading-[1.6] text-white/72 sm:text-[17px]">
              Schedule a strategy call and let's map the website, funnel, and content system your next stage needs.
            </p>
            <ArrowButton className="mx-auto mt-8 bg-white py-2 pl-5 pr-2 text-gray-950 hover:bg-orange-50 sm:pl-6" circleClassName="h-8 w-8 bg-[#F26522] text-white">
              Let's Chat
            </ArrowButton>
        </div>
      </div>

      <div className="footer-main-panel border-t border-white/10 bg-[#070B12] px-5 py-10 shadow-[0_-24px_70px_rgba(0,0,0,0.22)] sm:px-8 sm:py-12 lg:px-12 lg:py-16">
        <div className="mx-auto max-w-[1600px]">
          <div className="grid gap-12 border-b border-white/10 pb-10 lg:grid-cols-[1.05fr_1fr] lg:items-start lg:pb-12">
            <div>
              <div className="mb-6 flex items-center gap-3">
                <img src={footerLogoSrc} alt="techverse AI logo" className="h-24 w-80 object-contain object-left p-0 sm:h-28 sm:w-[420px] lg:h-32 lg:w-[520px]" />
              </div>
              <p className="max-w-xl text-[clamp(1rem,1.25vw,1.25rem)] leading-[1.6] tracking-[-0.01em] text-white/62">
                Strategy, design, development and growth systems for brands that want a sharper digital presence.
              </p>
              <div className="mt-8 flex flex-wrap gap-6 text-[15px] font-medium text-white/72">
                {["Instagram", "LinkedIn", "X", "Awwwards"].map((item) => (
                  <a key={item} href="#" className="transition-colors duration-300 hover:text-white">
                    {item}
                  </a>
                ))}
              </div>
            </div>

            <div className="grid gap-10 sm:grid-cols-3">
              <div>
                <p className="mb-5 text-[12px] uppercase tracking-[0.2em] text-white/40">Company</p>
                <nav className="flex flex-col gap-3 text-[15px] leading-none text-white/74">
                  {["Home", "Studio", "Services", "Projects"].map((item) => (
                    <a key={item} href="#" className="w-fit transition-colors duration-300 hover:text-white">
                      {item}
                    </a>
                  ))}
                </nav>
              </div>
              <div>
                <p className="mb-5 text-[12px] uppercase tracking-[0.2em] text-white/40">Resources</p>
                <nav className="flex flex-col gap-3 text-[15px] leading-none text-white/74">
                  {["Blog", "FAQs", "Pricing", "Support"].map((item) => (
                    <a key={item} href="#" className="w-fit transition-colors duration-300 hover:text-white">
                      {item}
                    </a>
                  ))}
                </nav>
              </div>
              <div>
                <p className="mb-5 text-[12px] uppercase tracking-[0.2em] text-white/40">Contact</p>
                <nav className="flex flex-col gap-3 text-[15px] leading-none text-white/74">
                  <a href="mailto:hello@axion.studio" className="w-fit transition-colors duration-300 hover:text-white">
                    hello@axion.studio
                  </a>
                  <a href="#" className="w-fit transition-colors duration-300 hover:text-white">
                    Book a call
                  </a>
                  <a href="#" className="w-fit transition-colors duration-300 hover:text-white">
                    Start project
                  </a>
                </nav>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 py-8 text-[13px] leading-none text-white/46 sm:flex-row sm:items-center sm:justify-between">
            <p>&copy; 2026 techverse AI. All Rights Reserved.</p>
            <div className="flex flex-wrap gap-4">
              {["Privacy Policy", "Terms of Service", "Cookies Setting"].map((item) => (
                <a key={item} href="#" className="underline decoration-white/20 underline-offset-4 transition-colors duration-300 hover:text-white">
                  {item}
                </a>
              ))}
            </div>
          </div>
          <p className="footer-tech-word pointer-events-none select-none pb-2 pt-6 text-center font-semibold text-white sm:pt-8">
            Tech Verse
          </p>
        </div>
      </div>
    </footer>
  );
}

function App() {
  return (
    <>
      <Hero />
      <LogoStrip />
      <About />
      <Services />
      <CaseStudies />
      <Footer />
    </>
  );
}

const rootElement = document.getElementById("root")!;
const root = (window as typeof window & { __axionRoot?: Root }).__axionRoot ?? ReactDOM.createRoot(rootElement);
(window as typeof window & { __axionRoot?: Root }).__axionRoot = root;
root.render(<App />);
