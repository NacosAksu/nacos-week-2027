// What the bulk emails say. Fill these in, run `npm run email:export`, then paste
// backend/email-templates.gs into Apps Script (see backend/SETUP.md).
// A campaign left as null is not built, and its send function in Apps Script refuses to run,
// so nobody gets an email with placeholder dates.

export interface ScheduleDay {
  day: string; // "Mon"
  date: string; // "08"
  title: string;
  detail: string;
}

/** The countdown email. Set once the dates are confirmed. */
export const reminder: { datesLabel: string; schedule: ScheduleDay[] } | null = null;
// Example:
// export const reminder = {
//   datesLabel: 'Monday 8 February',
//   schedule: [
//     { day: 'Mon', date: '08', title: 'Opening & Trade Fair', detail: 'Accreditation from 10:00 AM.' },
//   ],
// };

/** The Dinner & Award Night invitation. Set once the night is confirmed. */
export const awardNight: {
  dateLabel: string;
  time: string;
  venue: string;
  dressCode: string;
  rsvpUrl: string;
  rsvpBy: string;
} | null = null;

/** Who signs the partnership invitation. */
export const partnership = {
  sender: 'The Sponsorship Team',
  senderRole: 'Sponsorship & Collaboration',
};
