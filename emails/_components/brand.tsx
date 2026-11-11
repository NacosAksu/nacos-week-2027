import type { ReactNode } from 'react';
import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
  pixelBasedPreset,
} from 'react-email';
import { siteConfig } from '../../src/config/siteConfig';

// Images load from the live site so every client (and the dev preview) gets the same files.
export const SITE = 'https://nw27.nacosaksu.com.ng';
export const asset = (path: string) => `${SITE}${path}`;
export const { event, links } = siteConfig;

const tailwindConfig = {
  presets: [pixelBasedPreset],
  theme: {
    extend: {
      colors: {
        green: '#089002',
        deep: '#005012',
        off: '#F5F7F2',
        pale: '#E6F2E3',
        soft: '#78B978',
        mint: '#8DE085',
        ink: '#0B0F0C',
        night: '#121814',
        muted: '#4A554E',
        faint: '#738077',
        rule: '#DCE3D8',
        canvas: '#ECEFE8',
      },
      fontFamily: {
        display: ['Montserrat', 'Arial', 'Helvetica', 'sans-serif'],
        sans: ['Poppins', 'Arial', 'Helvetica', 'sans-serif'],
      },
    },
  },
};

interface LayoutProps {
  preview: string;
  /** Why this person got the email. Shown in the footer. */
  reason: string;
  children: ReactNode;
  /** "night" turns the whole email dark, for formal invitations. */
  tone?: 'day' | 'night';
}

export function Layout({ preview, reason, children, tone = 'day' }: LayoutProps) {
  const night = tone === 'night';
  return (
    <Html lang="en">
      <Tailwind config={tailwindConfig}>
        <Head>
          <meta name="color-scheme" content="light only" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&family=Poppins:wght@400;500;600&display=swap"
          />
        </Head>
        <Body className={`m-0 py-[32px] px-[12px] font-sans ${night ? 'bg-ink' : 'bg-canvas'}`}>
          <Preview>{preview}</Preview>
          <Container className="mx-auto w-full max-w-[600px]">
            {/* Masthead */}
            <Section className="rounded-t-[16px] bg-ink px-[26px] pt-[26px] pb-[22px]">
              <Row>
                <Column>
                  <Link href={SITE}>
                    <Img
                      src={asset('/assets/brand/nw27-email-logo.png')}
                      width="160"
                      height="33"
                      alt="NACOS Week 27"
                      className="block"
                    />
                  </Link>
                </Column>
                <Column align="right" className="align-bottom">
                  <Text className="m-0 font-display text-[10px] font-bold uppercase tracking-[2.4px] text-mint">
                    Confluence
                  </Text>
                  <Text className="m-0 mt-[2px] text-[11px] text-faint">{event.datesLabel}</Text>
                </Column>
              </Row>
            </Section>
            <ConfluenceStripe />

            <Section className={`rounded-b-[16px] ${night ? 'bg-night' : 'bg-white'}`}>{children}</Section>

            <Footer reason={reason} night={night} />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

/** Two streams meeting: the week's theme as a thin rule under the masthead. */
export function ConfluenceStripe() {
  return (
    <Section>
      <Row>
        <Column className="h-[4px] w-[68%] bg-green text-[0px] leading-[0px]">&nbsp;</Column>
        <Column className="h-[4px] w-[32%] bg-mint text-[0px] leading-[0px]">&nbsp;</Column>
      </Row>
    </Section>
  );
}

function Footer({ reason, night }: { reason: string; night: boolean }) {
  const linkClass = `font-semibold no-underline ${night ? 'text-mint' : 'text-deep'}`;
  return (
    <Section className="px-[24px] pt-[28px] text-center">
      <Text className={`m-0 font-display text-[12px] font-bold uppercase tracking-[2px] ${night ? 'text-off' : 'text-ink'}`}>
        NACOS Week 2027 &middot; Confluence
      </Text>
      <Text className="m-0 mt-[10px] text-[13px] leading-[20px]">
        <Link href={SITE} className={linkClass}>Website</Link>
        <span className="text-faint">&nbsp;&nbsp;&middot;&nbsp;&nbsp;</span>
        <Link href={links.instagram} className={linkClass}>Instagram</Link>
        <span className="text-faint">&nbsp;&nbsp;&middot;&nbsp;&nbsp;</span>
        <Link href={links.x} className={linkClass}>X</Link>
        <span className="text-faint">&nbsp;&nbsp;&middot;&nbsp;&nbsp;</span>
        <Link href={links.whatsapp} className={linkClass}>WhatsApp</Link>
      </Text>
      <Text className="m-0 mt-[14px] text-[12px] leading-[19px] text-faint">
        NACOS AKSU, Faculty of Computing &amp; Information Technology
        <br />
        Akwa Ibom State University, {event.location}
      </Text>
      <Text className="m-0 mt-[10px] text-[11px] leading-[17px] text-faint">
        {reason} Questions? Reply to this email or write to{' '}
        <Link href={`mailto:${links.generalEmail}`} className="text-faint underline">
          {links.generalEmail}
        </Link>
        .
      </Text>
    </Section>
  );
}

/* ---------- Building blocks shared by every template ---------- */

export function Eyebrow({ children, night = false }: { children: ReactNode; night?: boolean }) {
  return (
    <Text className={`m-0 mb-[14px] font-display text-[11px] font-bold uppercase tracking-[2.6px] ${night ? 'text-mint' : 'text-green'}`}>
      {children}
    </Text>
  );
}

export function Title({ children, night = false }: { children: ReactNode; night?: boolean }) {
  return (
    <Heading
      as="h1"
      className={`m-0 font-display text-[34px] font-extrabold leading-[40px] tracking-[-0.6px] ${night ? 'text-off' : 'text-ink'}`}
    >
      {children}
    </Heading>
  );
}

export function Lead({ children, night = false }: { children: ReactNode; night?: boolean }) {
  return (
    <Text className={`m-0 mt-[14px] text-[16px] leading-[27px] ${night ? 'text-[#B7C2BA]' : 'text-muted'}`}>{children}</Text>
  );
}

export function Cta({ href, children, variant = 'solid' }: { href: string; children: ReactNode; variant?: 'solid' | 'ghost' }) {
  const look =
    variant === 'solid'
      ? 'bg-green text-white'
      : 'border border-solid border-rule bg-white text-ink';
  return (
    <Button
      href={href}
      className={`mr-[10px] box-border inline-block rounded-[10px] leading-[20px] px-[26px] py-[15px] font-display text-[14px] font-bold tracking-[0.3px] no-underline ${look}`}
    >
      {children}
    </Button>
  );
}

/** Hairline divider. Inline style because Hr's default border beats the Tailwind reset in some clients. */
export function Divider({ night = false, space = 32 }: { night?: boolean; space?: number }) {
  return (
    <Hr
      style={{ border: 'none', borderTop: `1px solid ${night ? '#2A332D' : '#DCE3D8'}`, margin: `${space}px 0` }}
    />
  );
}

/** Small uppercase section label. */
export function Label({ children, night = false }: { children: ReactNode; night?: boolean }) {
  return (
    <Text className={`m-0 mb-[20px] font-display text-[11px] font-bold uppercase tracking-[2.4px] ${night ? 'text-soft' : 'text-faint'}`}>
      {children}
    </Text>
  );
}

/** Buttons sit inline so they pair up on desktop and stack on narrow screens. */
export function Actions({ children }: { children: ReactNode }) {
  return <Section className="pt-[14px] pb-[6px] leading-[64px]">{children}</Section>;
}

/** Label / value rows, like the back of a ticket. */
export function Details({ rows }: { rows: [label: string, value: ReactNode][] }) {
  return (
    <Section>
      {rows.map(([label, value], i) => (
        <Row key={label} className={i ? 'border-none border-t border-solid border-rule' : ''}>
          <Column className="w-[132px] py-[13px] align-top text-[11px] font-semibold uppercase tracking-[1.4px] text-faint">
            {label}
          </Column>
          <Column className="py-[13px] align-top text-[15px] font-medium leading-[22px] text-ink">{value}</Column>
        </Row>
      ))}
    </Section>
  );
}

/** Numbered steps: 01, 02, 03 down the left. */
export function Steps({ items }: { items: [title: string, body: string][] }) {
  return (
    <Section>
      {items.map(([title, body], i) => (
        <Row key={title} className="mb-[18px]">
          <Column className="w-[48px] align-top">
            <Text className="m-0 font-display text-[13px] font-extrabold text-green">{String(i + 1).padStart(2, '0')}</Text>
          </Column>
          <Column className="align-top">
            <Text className="m-0 font-display text-[15px] font-bold text-ink">{title}</Text>
            <Text className="m-0 mt-[4px] text-[14px] leading-[22px] text-muted">{body}</Text>
          </Column>
        </Row>
      ))}
    </Section>
  );
}

/** The week in four numbers (same figures as the About section on the site). */
export function NumbersBand() {
  const numbers: [string, string][] = [
    ['5', 'Flagship pillars'],
    ['4', 'Industry tracks'],
    ['500', 'Main hall seats'],
    ['30k+', 'Students on campus'],
  ];
  return (
    <Section className="bg-deep px-[8px] py-[30px]">
      <Row>
        {numbers.map(([n, label]) => (
          <Column key={label} align="center" className="w-1/4 px-[2px] align-top">
            <Text className="m-0 font-display text-[26px] font-extrabold leading-[30px] text-white">{n}</Text>
            <Text className="m-0 mt-[6px] text-[10px] font-medium uppercase leading-[14px] tracking-[0.3px] text-mint">
              {label}
            </Text>
          </Column>
        ))}
      </Row>
    </Section>
  );
}

export const firstName =(name: string) => name.trim().split(/\s+/)[0] || 'there';

export const naira = (n: number) => `${siteConfig.sponsorship.currency}${n.toLocaleString('en-NG')}`;
