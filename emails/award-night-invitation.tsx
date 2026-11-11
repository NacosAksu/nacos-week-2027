import { Column, Heading, Row, Section, Text } from 'react-email';
import { Actions, Cta, Divider, Layout } from './_components/brand';

interface AwardNightInvitationProps {
  guestName: string;
  dateLabel: string;
  time: string;
  venue: string;
  dressCode: string;
  rsvpUrl: string;
  rsvpBy: string;
  seats: number | string;
  /** Set when the guest is up for an award. */
  nomination?: string;
}

/** Short centred rule, like the line under a name on printed stationery. */
function Flourish() {
  return (
    <Row>
      <Column align="center">
        <table role="presentation" cellPadding={0} cellSpacing={0} style={{ margin: '0 auto' }}>
          <tbody>
            <tr>
              <td style={{ width: 28, height: 2, background: '#089002', fontSize: 0, lineHeight: 0 }}>&nbsp;</td>
              <td style={{ width: 8, fontSize: 0 }}>&nbsp;</td>
              <td style={{ width: 6, height: 2, background: '#8DE085', fontSize: 0, lineHeight: 0 }}>&nbsp;</td>
            </tr>
          </tbody>
        </table>
      </Column>
    </Row>
  );
}

export default function AwardNightInvitation({
  guestName,
  dateLabel,
  time,
  venue,
  dressCode,
  rsvpUrl,
  rsvpBy,
  seats,
  nomination,
}: AwardNightInvitationProps) {
  const facts: [string, string][] = [
    ['Date', dateLabel],
    ['Time', time],
    ['Venue', venue],
  ];
  return (
    <Layout
      tone="night"
      preview={`${guestName}, you're invited to the NACOS Week 2027 Dinner & Award Night. Kindly RSVP by ${rsvpBy}.`}
      reason="You received this invitation from the NACOS AKSU Executive Council."
    >
      <Section className="px-[40px] pt-[56px] text-center">
        <Text className="m-0 font-display text-[11px] font-bold uppercase tracking-[3.2px] text-soft">
          The Executive Council of NACOS AKSU
        </Text>
        <Text className="m-0 mt-[18px] text-[15px] leading-[24px] text-[#B7C2BA]">
          requests the pleasure of the company of
        </Text>
        <Text className="m-0 mt-[14px] font-display text-[26px] font-bold leading-[32px] text-white">{guestName}</Text>
        <Text className="m-0 mt-[14px] mb-[30px] text-[15px] leading-[24px] text-[#B7C2BA]">at the</Text>

        <Heading
          as="h1"
          className="m-0 font-display text-[46px] font-extrabold uppercase leading-[48px] tracking-[1px] text-off"
        >
          Dinner &amp;
          <br />
          Award Night
        </Heading>
        <Text className="m-0 mt-[16px] mb-[26px] font-display text-[12px] font-bold uppercase tracking-[4px] text-mint">
          NACOS Week 2027 &middot; Confluence
        </Text>
        <Flourish />
      </Section>

      <Section className="px-[28px] pt-[30px]">
        <Row>
          {facts.map(([label, value]) => (
            <Column key={label} align="center" className="w-1/3 px-[6px] align-top">
              <Text className="m-0 text-[10px] font-semibold uppercase tracking-[2.2px] text-faint">{label}</Text>
              <Text className="m-0 mt-[8px] font-display text-[15px] font-bold leading-[21px] text-off">{value}</Text>
            </Column>
          ))}
        </Row>
      </Section>

      {nomination && (
        <Section className="px-[40px] pt-[34px]">
          <Section className="rounded-[12px] px-[22px] py-[20px] text-center" style={{ border: '1px solid #2F6B3A', background: '#0E1A11' }}>
            <Text className="m-0 text-[10px] font-semibold uppercase tracking-[2.4px] text-mint">You have been nominated</Text>
            <Text className="m-0 mt-[8px] font-display text-[19px] font-extrabold leading-[25px] text-white">{nomination}</Text>
            <Text className="m-0 mt-[6px] text-[13px] leading-[20px] text-[#B7C2BA]">
              Winners are announced on the night. We&apos;d be honoured to see you there.
            </Text>
          </Section>
        </Section>
      )}

      <Section className="px-[40px] pt-[36px] text-center">
        <Actions>
          <Cta href={rsvpUrl}>Accept with pleasure</Cta>
        </Actions>
        <Text className="m-0 text-[13px] leading-[20px] text-[#B7C2BA]">
          Kindly respond by {rsvpBy}. Seats reserved for you: {seats}.
        </Text>
      </Section>

      <Section className="px-[40px] pb-[48px] text-center">
        <Divider night space={30} />
        <Text className="m-0 text-[10px] font-semibold uppercase tracking-[2.2px] text-faint">Dress code</Text>
        <Text className="m-0 mt-[8px] font-display text-[15px] font-bold text-off">{dressCode}</Text>
      </Section>
    </Layout>
  );
}

AwardNightInvitation.PreviewProps = {
  guestName: 'Dr. Ekemini Bassey',
  dateLabel: 'Friday, 12 February 2027',
  time: '6:00 PM for 7:00 PM',
  venue: 'Conference Centre, Perm Site',
  dressCode: 'Black tie, with a touch of green',
  rsvpUrl: 'https://nw27.nacosaksu.com.ng/',
  rsvpBy: '1 February 2027',
  seats: 2,
  nomination: 'Distinguished Leadership Award',
} satisfies AwardNightInvitationProps;
