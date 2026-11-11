import { Column, Row, Section, Text } from 'react-email';
import {
  Actions,
  Cta,
  Details,
  Divider,
  Eyebrow,
  Label,
  Layout,
  Lead,
  SITE,
  Steps,
  Title,
  event,
  firstName,
  links,
} from './_components/brand';

interface RegistrationConfirmedProps {
  name: string;
  passId: string;
  department: string;
  interests: string[];
}

export default function RegistrationConfirmed({ name, passId, department, interests }: RegistrationConfirmedProps) {
  return (
    <Layout
      preview={`You're registered. Your ID is ${passId}: keep it for check-in.`}
      reason="You received this because you registered at nw27.nacosaksu.com.ng."
    >
      <Section className="px-[36px] pt-[44px]">
        <Eyebrow>Registration confirmed</Eyebrow>
        <Title>You&apos;re in, {firstName(name)}.</Title>
        <Lead>
          Your place at NACOS Week 2027: Confluence is held. Keep this email. Your registration ID is your key at
          the door.
        </Lead>
      </Section>

      {/* The ticket: main body plus a tear-off stub */}
      <Section className="px-[36px] pt-[28px]">
        <Section className="rounded-[14px] bg-deep">
          <Section className="px-[24px] pt-[24px] pb-[20px]">
            <Text className="m-0 font-display text-[10px] font-bold uppercase tracking-[2.4px] text-mint">
              Admit one &middot; Delegate
            </Text>
            <Text className="m-0 mt-[14px] font-display text-[24px] font-extrabold leading-[29px] text-white">{name}</Text>
            <Text className="m-0 mt-[4px] text-[13px] leading-[19px] text-[#B9D8B6]">{department}</Text>
          </Section>
          {/* Tear line: horizontal so the ticket holds together on any screen width */}
          <Section className="px-[24px] pt-[18px] pb-[22px]" style={{ borderTop: '2px dashed #3A7A47' }}>
            <Row>
              <Column className="align-top">
                <Text className="m-0 text-[10px] font-semibold uppercase tracking-[1.8px] text-mint">Reg. ID</Text>
                <Text className="m-0 mt-[6px] font-display text-[22px] font-extrabold tracking-[0.6px] text-white">
                  {passId}
                </Text>
              </Column>
              <Column align="right" className="align-top">
                <Text className="m-0 text-right text-[10px] font-semibold uppercase tracking-[1.8px] text-mint">Dates</Text>
                <Text className="m-0 mt-[8px] text-right text-[13px] font-medium text-white">{event.datesLabel}</Text>
              </Column>
            </Row>
          </Section>
        </Section>
      </Section>

      <Section className="px-[36px] pt-[24px]">
        <Details
          rows={[
            ['When', `${event.datesLabel}, ${event.time}`],
            ['Where', `${event.venue}, ${event.location}`],
            [
              'Your events',
              interests.length
                ? interests.map((item) => (
                    <span
                      key={item}
                      className="mb-[6px] mr-[6px] inline-block rounded-[999px] bg-pale px-[11px] py-[4px] text-[12px] font-semibold text-deep"
                    >
                      {item}
                    </span>
                  ))
                : 'All of them. We will keep you posted.',
            ],
          ]}
        />
        <Text className="m-0 mt-[6px] text-[12px] leading-[18px] text-faint">
          {event.datesNote}. We&apos;ll email you the moment they&apos;re set.
        </Text>
      </Section>

      <Section className="px-[36px]">
        <Divider />
        <Label>What happens next</Label>
        <Steps
          items={[
            ['Watch your inbox', 'Exact dates, hackathon briefs and final passes come to this address first.'],
            ['Join the channel', 'Line-ups, venue changes and last-minute news land on our WhatsApp channel.'],
            ['Bring your ID', `Show ${passId} at the registration desk. Lost this email? Find your pass on the website.`],
          ]}
        />
      </Section>

      <Section className="px-[36px] pb-[36px]">
        <Actions>
          <Cta href={links.whatsapp}>Join the WhatsApp channel</Cta>
          <Cta href={`${SITE}/auth`} variant="ghost">
            Find my pass
          </Cta>
        </Actions>
      </Section>
    </Layout>
  );
}

RegistrationConfirmed.PreviewProps = {
  name: 'Victoria Etim',
  passId: 'NW27-0142',
  department: 'Computer Science, 300 Level',
  interests: ['Hackathon', 'Tech Conference', 'Dinner & Award Night'],
} satisfies RegistrationConfirmedProps;
