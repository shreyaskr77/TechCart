export const sampleReviews = {
  'lap-001': [
    { user: 'Rohit K.', rating: 5, date: '2026-08-12', comment: 'Handles video editing and gaming without breaking a sweat. The screen is gorgeous.' },
    { user: 'Ananya S.', rating: 4, date: '2026-07-30', comment: 'Great performance, but the fans get loud under full load.' },
  ],
  'phn-001': [
    { user: 'Karan M.', rating: 5, date: '2026-09-02', comment: 'Camera quality is unreal in low light. Titanium body feels premium.' },
    { user: 'Priya D.', rating: 5, date: '2026-08-20', comment: 'Battery easily lasts a full day of heavy use.' },
    { user: 'Vikram T.', rating: 4, date: '2026-07-15', comment: 'Excellent phone, just wish it came with a charger in the box.' },
  ],
  'hpn-001': [
    { user: 'Sneha R.', rating: 5, date: '2026-09-10', comment: 'Best ANC I have used. Great for long flights.' },
    { user: 'Arjun P.', rating: 5, date: '2026-06-18', comment: 'Comfortable for hours and the sound is very balanced.' },
  ],
}
export const getReviews = (id) =>
  sampleReviews[id] || [{ user: 'Meera N.', rating: 4, date: '2026-08-01', comment: 'Good value for money, works as described.' }]
