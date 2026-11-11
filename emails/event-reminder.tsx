import { Column, Row, Section, Text } from 'react-email';
import {
  Actions,
  Cta,
  Divider,
  Label,
  Layout,
  SITE,
  event,
  firstName,
} from './_components/brand';

interface ScheduleDay {
  day: string;
  date: string;
  title: string;
  detail: string;
}

interface EventReminderProps {
  name: string;
  passId: string;
  daysToGo: number | string;
  datesLabel: string;
  schedule: ScheduleDay[];
}

const checklist: [string, string][] = [
  ['Your registration ID', 'On your phone or printed. It is how we check you in.'],
  ['Your student ID card', 'Handy if the desk needs to confirm who you are.'],
  ['Laptop and charger', 'Hackathon teams: your demo runs on it.'],
  ['A power bank', 'It is a long, loud, photo-heavy week.'],
];

const directions = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Akwa Ibom State University, Ikot Akpaden')}`;

export default function EventReminder({ name, passId, daysToGo, datesLabel, schedule }: EventReminderProps) {
  const unit = daysToGo === 1 ? 'day' : 'days';
  return (
    <Layout
      preview={`${daysToGo} ${unit} to NACOS Week 2027. Your ID is ${passId}. Here's the week, day by day.`}
      reason="You received this because you registered for NACOS Week 2027."
    >
      {/* Countdown */}
      <Section className="px-[36px] pt-[44px]">
        <Row>
          <Column className="w-[150px] align-middle">
            <Text className="m-0 font-display text-[112px] font-extrabold leading-[100px] tracking-[-5px] text-green">
              {daysToGo}
            </Text>
          </Column>
          <Column className="align-middle">
            <Text className="m-0 font-display text-[11px] font-bold uppercase tracking-[2.6px] text-green">
              {unit} to go
            </Text>
            <Text className="m-0 mt-[8px] font-display text-[28px] font-extrabold leading-[33px] tracking-[-0.4px] text-ink">
              See you soon, {firstName(name)}.
            </Text>
          </Column>
        </Row>
        <Text className="m-0 mt-[22px] text-[16px] leading-[27px] text-muted">
          NACOS Week 2027: Confluence opens on {datesLabel} at the {event.venue}. Here is everything you need to walk
          in on day one.
        </Text>
      </Section>

      {/* ID strip */}
      <Section className="px-[36px] pt-[22px]">
        <Section className="rounded-[12px] bg-pale px-[22px] py-[16px]">
          <Text className="m-0 text-[11px] font-semibold uppercase tracking-[1.6px] text-deep">Your registration ID</Text>
          <Text className="m-0 mt-[4px] font-display text-[26px] font-extrabold tracking-[0.6px] text-deep">{passId}</Text>
          <Text className="m-0 mt-[2px] text-[13px] text-muted">Show it at the desk from {event.time.replace(' daily', '')}.</Text>
        </Section>
      </Section>

      {/* Day by day */}
      <Section className="px-[36px]">
        <Divider />
        <Label>The week, day by day</Label>
        {schedule.map((d, i) => (
          <Row key={d.date} className={i ? 'mt-[2px]' : ''}>
            <Column className="w-[64px] py-[12px] align-top">
              <Text className="m-0 font-display text-[11px] font-bold uppercase tracking-[1.6px] text-faint">{d.day}</Text>
              <Text className="m-0 font-display text-[24px] font-extrabold leading-[28px] text-ink">{d.date}</Text>
            </Column>
            <Column className="py-[12px] pl-[16px] align-top" style={{ borderLeft: '2px solid #E6F2E3' }}>
              <Text className="m-0 font-display text-[16px] font-bold text-ink">{d.title}</Text>
              <Text className="m-0 mt-[3px] text-[13px] leading-[20px] text-muted">{d.detail}</Text>
            </Column>
          </Row>
        ))}
      </Section>

      {/* Checklist */}
      <Section className="px-[36px]">
        <Divider />
        <Label>Pack these</Label>
        {checklist.map(([item, why]) => (
          <Row key={item} className="mb-[12px]">
            <Column className="w-[34px] align-top">
              <Text className="m-0 h-[22px] w-[22px] rounded-[6px] bg-green text-center text-[13px] font-bold leading-[22px] text-white">
                &#10003;
              </Text>
            </Column>
            <Column className="align-top">
              <Text className="m-0 text-[15px] font-semibold leading-[22px] text-ink">{item}</Text>
              <Text className="m-0 text-[13px] leading-[20px] text-muted">{why}</Text>
            </Column>
          </Row>
        ))}
      </Section>

      <Section className="px-[36px] pt-[12px] pb-[36px]">
        <Actions>
          <Cta href={directions}>Get directions</Cta>
          <Cta href={`${SITE}/programme`} variant="ghost">
            Full programme
          </Cta>
        </Actions>
      </Section>
    </Layout>
  );
}

EventReminder.PreviewProps = {
  name: 'Victoria Etim',
  passId: 'NW27-0142',
  daysToGo: 7,
  datesLabel: 'Monday 8 February',
  schedule: [
    { day: 'Mon', date: '08', title: 'Opening & Trade Fair', detail: 'Accreditation from 10:00 AM, then the exhibition floor opens.' },
    { day: 'Tue', date: '09', title: 'Tech Conference Day', detail: 'Keynotes, sector panels and live hackathon judging.' },
    { day: 'Wed', date: '10', title: 'Football Tournament', detail: 'Inter-faculty matches at the stadium. Bring your voice.' },
    { day: 'Thu', date: '11', title: 'Fashion & Pageantry', detail: 'The runway and the crowning of the Royal Council.' },
    { day: 'Fri', date: '12', title: 'Dinner & Award Night', detail: 'Black tie. Doors at 6:00 PM. Invitation only.' },
  ],
} satisfies EventReminderProps;
