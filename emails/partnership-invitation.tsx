import { Column, Link, Row, Section, Text } from 'react-email';
import { siteConfig } from '../src/config/siteConfig';
import {
  Actions,
  Cta,
  Divider,
  Eyebrow,
  Label,
  Layout,
  Lead,
  NumbersBand,
  SITE,
  Title,
  links,
  naira,
} from './_components/brand';

interface PartnershipInvitationProps {
  contactName: string;
  company: string;
  /** Who signs the email. */
  sender: string;
  senderRole: string;
}

const pastPartners = siteConfig.pastSponsors.map((s) => s.name).filter(Boolean);

export default function PartnershipInvitation({ contactName, company, sender, senderRole }: PartnershipInvitationProps) {
  const { tiers } = siteConfig.sponsorship;
  return (
    <Layout
      preview={`${company} x NACOS Week 2027: five events, 30,000+ students, one week in February.`}
      reason={`You received this because the NACOS AKSU sponsorship team reached out to ${company}.`}
    >
      <Section className="px-[36px] pt-[44px]">
        <Eyebrow>Partnership invitation</Eyebrow>
        <Title>Put {company} where the campus meets.</Title>
        <Lead>
          Dear {contactName}, NACOS Week 2027: Confluence brings every faculty at Akwa Ibom State University into one
          week of building, competing and celebrating. We&apos;d like {company} at the centre of it.
        </Lead>
      </Section>

      <Section className="px-[36px] pt-[12px]">
        <Text className="m-0 mt-[14px] text-[16px] leading-[27px] text-muted">
          Partners don&apos;t just get a logo on a banner. They set real hackathon problem statements, own a stage, and
          meet the students who will build the region&apos;s next products.
        </Text>
      </Section>

      <Section className="mt-[32px]">
        <NumbersBand />
      </Section>

      {/* Tiers, straight from the site's sponsorship config */}
      <Section className="px-[36px] pt-[36px]">
        <Label>Partnership tiers</Label>
        {tiers.map((tier, i) => {
          const lead = i === 0;
          return (
            <Section
              key={tier.name}
              className={`mb-[10px] rounded-[12px] px-[20px] py-[18px] ${lead ? 'bg-ink' : 'border border-solid border-rule bg-white'}`}
            >
              <Row>
                <Column className="align-top">
                  {lead && (
                    <Text className="m-0 mb-[8px]">
                      <span className="rounded-[999px] bg-green px-[8px] py-[2px] text-[9px] font-bold uppercase tracking-[1.4px] text-white">
                        Category exclusive
                      </span>
                    </Text>
                  )}
                  <Text className={`m-0 font-display text-[16px] font-extrabold ${lead ? 'text-white' : 'text-ink'}`}>
                    {tier.name}
                  </Text>
                  <Text className={`m-0 mt-[6px] text-[13px] leading-[20px] ${lead ? 'text-[#B7C2BA]' : 'text-muted'}`}>
                    {tier.owns}
                  </Text>
                </Column>
                <Column align="right" className="whitespace-nowrap pl-[12px] align-top">
                  <Text className={`m-0 text-right font-display text-[17px] font-extrabold ${lead ? 'text-mint' : 'text-deep'}`}>
                    {naira(tier.price)}
                  </Text>
                  <Text className={`m-0 mt-[4px] text-right text-[11px] font-semibold uppercase tracking-[1.2px] ${lead ? 'text-soft' : 'text-faint'}`}>
                    {tier.slots} {tier.slots === 1 ? 'slot' : 'slots'}
                  </Text>
                </Column>
              </Row>
            </Section>
          );
        })}
        <Text className="m-0 mt-[12px] text-[12px] leading-[18px] text-faint">
          In-kind partnerships and Trade Fair booths are also open. All of it is in the brochure. Payments go only to
          the NACOS AKSU student body account.
        </Text>
      </Section>

      <Section className="px-[36px]">
        <Divider />
        <Label>In good company</Label>
        <Text className="m-0 text-[14px] leading-[24px] text-muted">
          Past NACOS AKSU events were backed by {pastPartners.slice(0, -1).join(', ')} and {pastPartners.at(-1)}.
        </Text>
      </Section>

      <Section className="px-[36px] pt-[12px]">
        <Actions>
          <Cta href={`${SITE}${links.brochure}`}>Get the brochure (PDF)</Cta>
          <Cta href={`mailto:${links.sponsorEmail}?subject=${encodeURIComponent(`${company} x NACOS Week 2027`)}`} variant="ghost">
            Book a call
          </Cta>
        </Actions>
      </Section>

      {/* Sign-off */}
      <Section className="px-[36px] pt-[16px] pb-[40px]">
        <Text className="m-0 text-[15px] leading-[24px] text-ink">With thanks,</Text>
        <Text className="m-0 mt-[14px] font-display text-[15px] font-bold text-ink">{sender}</Text>
        <Text className="m-0 text-[13px] leading-[20px] text-muted">{senderRole}, NACOS AKSU</Text>
        <Text className="m-0 mt-[6px] text-[13px] leading-[20px] text-muted">
          <Link href={`tel:${links.phone}`} className="text-deep no-underline">{links.phone}</Link>
          <br />
          <Link href={`mailto:${links.sponsorEmail}`} className="text-deep no-underline">{links.sponsorEmail}</Link>
        </Text>
      </Section>
    </Layout>
  );
}

PartnershipInvitation.PreviewProps = {
  contactName: 'Mrs. Adaeze Okon',
  company: 'Northwind Energy',
  sender: 'The Sponsorship Team',
  senderRole: 'Sponsorship & Collaboration',
} satisfies PartnershipInvitationProps;
