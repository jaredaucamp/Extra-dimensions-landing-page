// Mock data for SalesHub. This will be replaced by Supabase queries later.

export const TODAY = '2026-07-07'

export const clients = [
  { id: 'c1', name: 'Thabo Nkosi', initials: 'TN', colour: '#378ADD' },
  { id: 'c2', name: 'Sarah van der Merwe', initials: 'SV', colour: '#1D9E75' },
  { id: 'c3', name: 'Michael Botha', initials: 'MB', colour: '#EF9F27' },
  { id: 'c4', name: 'Lindiwe Dlamini', initials: 'LD', colour: '#D85A30' },
  { id: 'c5', name: 'James Pretorius', initials: 'JP', colour: '#378ADD' },
  { id: 'c6', name: 'Naledi Khumalo', initials: 'NK', colour: '#1D9E75' },
]

// type: client-call | follow-up | new-lead | personal
// outcome: won | follow-up | lost | pending | none
export const meetings = [
  { id: 'm1', title: 'Contract review', date: '2026-07-07', time: '09:00', duration: 30, type: 'client-call', outcome: 'won', notes: 'Signed off on the renewal, upsell to premium tier accepted.', clientId: 'c1', earning: 8500 },
  { id: 'm2', title: 'Intro call', date: '2026-07-07', time: '11:00', duration: 45, type: 'new-lead', outcome: 'follow-up', notes: 'Interested but needs to check budget with finance team.', clientId: 'c3', earning: 0 },
  { id: 'm3', title: 'Check-in', date: '2026-07-07', time: '13:30', duration: 20, type: 'follow-up', outcome: 'pending', notes: '', clientId: 'c2', earning: 0 },
  { id: 'm4', title: 'Coffee catch-up', date: '2026-07-07', time: '17:00', duration: 30, type: 'personal', outcome: 'none', notes: '', clientId: null, earning: 0 },

  { id: 'm5', title: 'Discovery call', date: '2026-07-06', time: '10:00', duration: 30, type: 'new-lead', outcome: 'follow-up', notes: 'Good fit, sending proposal Wednesday.', clientId: 'c4', earning: 0 },
  { id: 'm6', title: 'Deposit collection', date: '2026-07-06', time: '14:00', duration: 15, type: 'client-call', outcome: 'won', notes: 'Deposit paid, kickoff scheduled for next month.', clientId: 'c5', earning: 4200 },

  { id: 'm7', title: 'Proposal walkthrough', date: '2026-07-08', time: '09:30', duration: 45, type: 'client-call', outcome: 'pending', notes: '', clientId: 'c6', earning: 0 },
  { id: 'm8', title: 'Follow-up call', date: '2026-07-08', time: '15:00', duration: 20, type: 'follow-up', outcome: 'pending', notes: '', clientId: 'c3', earning: 0 },

  { id: 'm9', title: 'Renewal discussion', date: '2026-07-09', time: '11:30', duration: 30, type: 'client-call', outcome: 'pending', notes: '', clientId: 'c2', earning: 0 },
  { id: 'm10', title: 'Cold intro', date: '2026-07-09', time: '16:00', duration: 30, type: 'new-lead', outcome: 'lost', notes: 'Went with a competitor on price.', clientId: 'c4', earning: 0 },

  { id: 'm11', title: 'Quarterly review', date: '2026-07-10', time: '10:00', duration: 60, type: 'client-call', outcome: 'pending', notes: '', clientId: 'c1', earning: 0 },

  { id: 'm12', title: 'Family lunch', date: '2026-07-11', time: '12:00', duration: 90, type: 'personal', outcome: 'none', notes: '', clientId: null, earning: 0 },

  { id: 'm13', title: 'Commission payout call', date: '2026-07-03', time: '09:00', duration: 20, type: 'client-call', outcome: 'won', notes: 'Full payment received for the referral deal.', clientId: 'c5', earning: 6300 },
  { id: 'm14', title: 'Follow-up on quote', date: '2026-07-02', time: '13:00', duration: 15, type: 'follow-up', outcome: 'won', notes: 'Client approved the quote, invoice sent.', clientId: 'c6', earning: 3100 },
  { id: 'm15', title: 'New lead intro', date: '2026-06-29', time: '10:30', duration: 30, type: 'new-lead', outcome: 'lost', notes: 'Not the right fit, budget too small.', clientId: 'c3', earning: 0 },
  { id: 'm16', title: 'Retainer check-in', date: '2026-06-25', time: '11:00', duration: 20, type: 'client-call', outcome: 'won', notes: 'Retainer renewed for another quarter.', clientId: 'c1', earning: 5400 },
]

export const earnings = [
  { id: 'e1', amount: 8500, clientId: 'c1', meetingId: 'm1', note: 'Full payment', date: '2026-07-07' },
  { id: 'e2', amount: 4200, clientId: 'c5', meetingId: 'm6', note: 'Deposit', date: '2026-07-06' },
  { id: 'e3', amount: 6300, clientId: 'c5', meetingId: 'm13', note: 'Commission', date: '2026-07-03' },
  { id: 'e4', amount: 3100, clientId: 'c6', meetingId: 'm14', note: 'Full payment', date: '2026-07-02' },
  { id: 'e5', amount: 5400, clientId: 'c1', meetingId: 'm16', note: 'Full payment', date: '2026-06-25' },
  { id: 'e6', amount: 2200, clientId: 'c2', meetingId: null, note: 'Deposit', date: '2026-06-18' },
  { id: 'e7', amount: 9800, clientId: 'c4', meetingId: null, note: 'Commission', date: '2026-06-12' },
]

export const reminders = [
  { id: 'r1', text: 'Send proposal to Lindiwe Dlamini', dueDate: '2026-07-08', dueTime: '10:00', done: false },
  { id: 'r2', text: 'Follow up with Michael Botha on budget', dueDate: '2026-07-09', dueTime: null, done: false },
  { id: 'r3', text: 'Call Sarah about renewal terms', dueDate: '2026-07-06', dueTime: '14:30', done: false },
  { id: 'r4', text: 'Chase invoice payment from Naledi Khumalo', dueDate: '2026-07-04', dueTime: null, done: false },
  { id: 'r5', text: 'Prepare quarterly review deck for Thabo', dueDate: '2026-07-10', dueTime: '09:00', done: false },
  { id: 'r6', text: 'Send thank-you note to James Pretorius', dueDate: '2026-07-05', dueTime: null, done: true },
]

export const dailyNotes = [
  { id: 'n1', date: '2026-07-07', content: 'Thabo signed the renewal and upgraded to premium. Need to loop in onboarding team by Friday.' },
  { id: 'n2', date: '2026-07-06', content: 'Good discovery call with Lindiwe. She wants case studies from similar-sized clients before committing.' },
  { id: 'n3', date: '2026-07-03', content: 'Referral deal closed with James. Ask him for another introduction next quarter.' },
  { id: 'n4', date: '2026-07-02', content: 'Naledi approved the quote quickly, this is a good template for future proposals.' },
  { id: 'n5', date: '2026-06-30', content: '' },
]
