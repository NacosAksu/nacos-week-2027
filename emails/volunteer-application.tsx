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
  Steps,
  Title,
  event,
  firstName,
  links,
} from './_components/brand';

interface VolunteerApplicationProps {
  name: string;
  volunteerId: string;
  team: string;
  availability: string;
  /** Committee WhatsApp link. Worked out from `team` when not given. */
  groupUrl?: string;
}

// Same matching as getTeamWhatsAppLink_ in backend/registration.gs
function teamGroup(team: string) {
  const t = team.toLowerCase();
  if (t.includes('media')) return links.mediaTeamWhatsApp;
  if (t.includes('protocol')) return links.protocolTeamWhatsApp;
  if (t.includes('welfare') || t.includes('logistics')) return links.welfareLogisticsWhatsApp;
  if (t.includes('registration') || t.includes('accreditation')) return links.registrationTeamWhatsApp;
  if (t.includes('sponsor') || t.includes('collaboration')) return links.sponsorshipTeamWhatsApp;
  return '';
}

export default function VolunteerApplication({ name, volunteerId, team, availability, groupUrl }: VolunteerApplicationProps) {
  const group = groupUrl ?? teamGroup(team);
  return (
    <Layout
      preview={`Application received for the ${team}. Your crew ID is ${volunteerId}.`}
      reason="You received this because you applied to volunteer at nw27.nacosaksu.com.ng."
    >
      <Section className="px-[36px] pt-[44px]">
        <Eyebrow>Organizing Crew &middot; Application received</Eyebrow>
        <Title>Thanks for stepping up, {firstName(name)}.</Title>
        <Lead>
          A week like Confluence runs on people who show up early and leave last. Your application is in, and the
          Planning Committee will be in touch with roles and orientation.
        </Lead>
      </Section>

      {/* Crew badge */}
      <Section className="px-[36px] pt-[28px]">
        <Section className="rounded-[14px] bg-ink">
          <Row>
            <Column className="rounded-t-[14px] bg-green px-[24px] py-[10px]">
              <Text className="m-0 font-display text-[10px] font-extrabold uppercase tracking-[3px] text-white">
                Organizing Crew &middot; NW27
              </Text>
            </Column>
          </Row>
          <Section className="px-[24px] pt-[22px] pb-[20px]">
            <Text className="m-0 text-[10px] font-semibold uppercase tracking-[1.8px] text-soft">Crew member</Text>
            <Text className="m-0 mt-[6px] font-display text-[24px] font-extrabold leading-[29px] text-white">{name}</Text>
            <Text className="m-0 mt-[6px] text-[13px] leading-[19px] text-mint">{team}</Text>
          </Section>
          <Section className="px-[24px] pt-[16px] pb-[22px]" style={{ borderTop: '1px solid #2A332D' }}>
            <Text className="m-0 text-[10px] font-semibold uppercase tracking-[1.8px] text-soft">Crew ID</Text>
            <Text className="m-0 mt-[6px] font-display text-[20px] font-extrabold tracking-[0.6px] text-white">{volunteerId}</Text>
          </Section>
        </Section>
      </Section>

      <Section className="px-[36px] pt-[24px]">
        <Details
          rows={[
            ['Committee', team],
            ['Availability', availability || 'Full festival week'],
            ['Base', `${event.venue}, Akwa Ibom State University`],
          ]}
        />
      </Section>

      {group && (
        <Section className="px-[36px] pt-[20px]">
          <Section className="rounded-[12px] bg-pale px-[22px] py-[20px]" style={{ borderLeft: '4px solid #089002' }}>
            <Text className="m-0 font-display text-[15px] font-bold text-ink">Your committee has a group. Join it today.</Text>
            <Text className="m-0 mt-[6px] text-[14px] leading-[22px] text-muted">
              Briefings, rosters and call times for the {team} go out there first.
            </Text>
            <Actions>
              <Cta href={group}>Join the {team} group</Cta>
            </Actions>
          </Section>
        </Section>
      )}

      <Section className="px-[36px] pb-[28px]">
        <Divider />
        <Label>The road to February</Label>
        <Steps
          items={[
            ['Review', 'Committee leads read every application and confirm roles over the coming weeks.'],
            ['Orientation', 'A short briefing on the week, your duties and who you report to.'],
            ['Crew kit', 'Your accreditation and crew wear are issued before the week opens.'],
          ]}
        />
      </Section>
    </Layout>
  );
}

VolunteerApplication.PreviewProps = {
  name: 'Emmanuel Ita',
  volunteerId: 'NW27-VOL-0031',
  team: 'Media & Publicity Team',
  availability: 'Full festival week',
} satisfies VolunteerApplicationProps;
