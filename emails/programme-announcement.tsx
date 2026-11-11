import { Img, Link, Section, Text } from 'react-email';
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
  asset,
  event,
} from './_components/brand';

interface ProgrammeAnnouncementProps {
  /** Leave empty for a broadcast. */
  recipientName?: string;
}

const pillars = [
  {
    num: '01',
    kind: 'Flagship',
    name: 'Hackathon',
    sub: 'A 4-week build across 4 industry tracks',
    body: 'Student teams build real solutions to briefs set by sector sponsors, then pitch them live at the Tech Conference.',
    img: '/assets/photos/pillar-hackathon-800.jpg',
    href: '/hackathon',
  },
  {
    num: '02',
    kind: 'Conference',
    name: 'Tech Conference Day',
    sub: 'Energy, FinTech, Oil & Gas, Medicine',
    body: 'Keynotes and panels from industry, the hackathon exhibition, and live judging on the main stage.',
    img: '/assets/photos/pillar-conference-800.jpg',
    href: '/programme',
  },
  {
    num: '03',
    kind: 'Sports',
    name: 'Football Tournament',
    sub: 'Inter-faculty, open crowd',
    body: 'The whole campus on the touchline. Sportsmanship, rivalry and the loudest afternoon of the week.',
    img: '/assets/photos/pillar-football-800.jpg',
    href: '/programme',
  },
  {
    num: '04',
    kind: 'Culture',
    name: 'Fashion & Pageantry',
    sub: 'Crowning the Royal Council',
    body: 'Runway, student creativity, and the selection of brand campus ambassadors for the year ahead.',
    img: '/assets/photos/pillar-fashion-800.jpg',
    href: '/programme',
  },
  {
    num: '05',
    kind: 'Celebration',
    name: 'Dinner & Award Night',
    sub: 'Black tie, green carpet',
    body: 'A formal evening to dine, network and honour students for character, scholarship and leadership.',
    img: '/assets/photos/pillar-dinner-800.jpg',
    href: '/programme',
  },
];

export default function ProgrammeAnnouncement({ recipientName }: ProgrammeAnnouncementProps) {
  return (
    <Layout
      preview="A hackathon, a conference, football, fashion and an awards night. Here is the week."
      reason="You received this because you follow NACOS Week 2027 updates."
    >
      <Img
        src={asset('/assets/hero/hero-1-1600.jpg')}
        width="600"
        alt="Students celebrating on stage at a previous NACOS AKSU event"
        className="block h-auto w-full"
      />

      <Section className="px-[36px] pt-[40px]">
        <Eyebrow>The programme &middot; {event.datesLabel}</Eyebrow>
        <Title>Five events. One flagship week.</Title>
        <Lead>
          {recipientName ? `${recipientName}, this` : 'This'} is the year NACOS Week opens to the whole university.
          Every faculty and every student, meeting in one place. Here&apos;s what&apos;s on.
        </Lead>
      </Section>

      <Section className="px-[36px] pt-[12px]">
        {pillars.map((p) => (
          <Section key={p.num}>
            <Divider space={28} />
            {/* Photo stacked above text: holds up on phones without media queries */}
            <Link href={`${SITE}${p.href}`}>
              <Img
                src={asset(p.img)}
                width="528"
                alt={`${p.name}, ${p.kind.toLowerCase()} pillar: see details on the website`}
                className="block h-auto w-full rounded-[12px]"
              />
            </Link>
            <Text className="m-0 mt-[18px] font-display text-[10px] font-bold uppercase tracking-[2.2px] text-green">
              {p.num} / {p.kind}
            </Text>
            <Text className="m-0 mt-[8px] font-display text-[21px] font-extrabold leading-[26px] text-ink">{p.name}</Text>
            <Text className="m-0 mt-[4px] text-[12px] font-semibold text-faint">{p.sub}</Text>
            <Text className="m-0 mt-[8px] text-[15px] leading-[24px] text-muted">{p.body}</Text>
          </Section>
        ))}
      </Section>

      <Section className="mt-[36px]">
        <NumbersBand />
      </Section>

      <Section className="px-[36px] pt-[34px] pb-[36px] text-center">
        <Label>Seats in the main hall are limited</Label>
        <Text className="m-0 font-display text-[22px] font-extrabold leading-[28px] text-ink">
          Register once. Pick the events you want.
        </Text>
        <Text className="m-0 mt-[8px] text-[14px] leading-[22px] text-muted">
          Admission is free for all AKSU students. You&apos;ll get a registration ID to show at the door.
        </Text>
        <Actions>
          <Cta href={`${SITE}/register`}>Register for NACOS Week</Cta>
          <Cta href={`${SITE}/programme`} variant="ghost">
            Full programme
          </Cta>
        </Actions>
      </Section>
    </Layout>
  );
}

ProgrammeAnnouncement.PreviewProps = {
  recipientName: 'Victoria',
} satisfies ProgrammeAnnouncementProps;
