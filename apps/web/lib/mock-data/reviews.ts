export interface DetailedReview {
  id: string;
  proId: string;
  proName: string;
  reviewerName: string;
  reviewerAvatar: string;
  rating: number;
  qualityRating: number;
  punctualityRating: number;
  communicationRating: number;
  valueRating: number;
  title: string;
  comment: string;
  photos: string[];
  proResponse: string | null;
  createdAt: string;
  helpfulCount: number;
}

export const mockDetailedReviews: DetailedReview[] = [
  {
    id: 'r1',
    proId: '1',
    proName: 'Marcus Johnson',
    reviewerName: 'Jennifer S.',
    reviewerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    rating: 5,
    qualityRating: 5,
    punctualityRating: 5,
    communicationRating: 5,
    valueRating: 5,
    title: 'Exceptional electrical panel upgrade',
    comment: 'Marcus was absolutely fantastic! He upgraded our electrical panel and installed new outlets in our basement. Very professional, clean, and explained everything clearly. He even noticed a potential safety issue with our old wiring and fixed it on the spot. Would hire again in a heartbeat.',
    photos: [
      'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=300&h=300&fit=crop',
    ],
    proResponse: 'Thank you so much, Jennifer! It was a pleasure working on your home. That old wiring definitely needed attention — glad we caught it early. Don\'t hesitate to reach out if you need anything else!',
    createdAt: '2024-11-15',
    helpfulCount: 12,
  },
  {
    id: 'r2',
    proId: '1',
    proName: 'Marcus Johnson',
    reviewerName: 'Robert K.',
    reviewerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    rating: 5,
    qualityRating: 5,
    punctualityRating: 5,
    communicationRating: 4,
    valueRating: 5,
    title: 'Perfect EV charger installation',
    comment: 'Installed an EV charger in our garage. Marcus was on time, provided a detailed quote upfront, and finished ahead of schedule. The work was impeccable and he walked me through how everything works. Highly recommend for any electrical work.',
    photos: [
      'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=300&h=300&fit=crop',
    ],
    proResponse: 'Thanks Robert! EV charger installs are one of my specialties. Enjoy the new setup and feel free to call if you have any questions about optimal charging schedules.',
    createdAt: '2024-10-28',
    helpfulCount: 8,
  },
  {
    id: 'r3',
    proId: '1',
    proName: 'Marcus Johnson',
    reviewerName: 'Linda M.',
    reviewerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    rating: 4,
    qualityRating: 5,
    punctualityRating: 3,
    communicationRating: 4,
    valueRating: 4,
    title: 'Great kitchen lighting, minor delay',
    comment: 'Good work on the kitchen lighting upgrade. There was a minor scheduling delay — Marcus had to push back our appointment by a day due to a previous job running long. But he communicated well about it and the final result was great. The recessed lighting looks amazing.',
    photos: [],
    proResponse: 'Thank you for understanding about the schedule change, Linda. I always want to make sure each job gets the attention it deserves. Glad you love the new lighting!',
    createdAt: '2024-10-05',
    helpfulCount: 5,
  },
  {
    id: 'r4',
    proId: '1',
    proName: 'Marcus Johnson',
    reviewerName: 'David P.',
    reviewerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    rating: 5,
    qualityRating: 5,
    punctualityRating: 5,
    communicationRating: 5,
    valueRating: 4,
    title: 'Smart home wiring done right',
    comment: 'Had Marcus wire our entire home for a smart home system. He pre-wired for speakers, cameras, and smart switches throughout the house. Incredibly thorough — he labeled every wire and left detailed documentation. The price was fair for the amount of work involved.',
    photos: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=300&h=300&fit=crop',
    ],
    proResponse: null,
    createdAt: '2024-09-20',
    helpfulCount: 15,
  },
  {
    id: 'r5',
    proId: '1',
    proName: 'Marcus Johnson',
    reviewerName: 'Sarah T.',
    reviewerAvatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop&crop=face',
    rating: 5,
    qualityRating: 5,
    punctualityRating: 5,
    communicationRating: 5,
    valueRating: 5,
    title: 'Emergency repair saved us',
    comment: 'Our power went out on a Saturday night and Marcus came within an hour. Found the issue quickly — a tripped main breaker due to a faulty GFCI outlet. Fixed it and inspected the rest of our panel while he was there. Can\'t thank him enough for the fast response.',
    photos: [],
    proResponse: 'Electrical emergencies can be scary — glad I could help quickly, Sarah. Your panel is in great shape now!',
    createdAt: '2024-09-10',
    helpfulCount: 22,
  },
  {
    id: 'r6',
    proId: '1',
    proName: 'Marcus Johnson',
    reviewerName: 'Michael B.',
    reviewerAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face',
    rating: 4,
    qualityRating: 4,
    punctualityRating: 5,
    communicationRating: 4,
    valueRating: 3,
    title: 'Solid work, slightly pricey',
    comment: 'Marcus did a good job installing outdoor landscape lighting. Work quality was solid and he was very punctual. The only reason I\'m giving 4 stars is the final cost came in a bit above the initial estimate due to some unexpected conduit work. He did explain why, but it was still more than I budgeted.',
    photos: [],
    proResponse: 'Thanks for the feedback, Michael. I understand the cost concern — the buried conduit was necessary per code but I should have flagged that possibility earlier in the quote. I\'ll work on being more thorough with initial estimates.',
    createdAt: '2024-08-25',
    helpfulCount: 7,
  },
  {
    id: 'r7',
    proId: '1',
    proName: 'Marcus Johnson',
    reviewerName: 'Anna W.',
    reviewerAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
    rating: 5,
    qualityRating: 5,
    punctualityRating: 5,
    communicationRating: 5,
    valueRating: 5,
    title: 'Complete home rewire — flawless',
    comment: 'We bought a 1960s home that needed a complete electrical overhaul. Marcus rewired the entire house, upgraded the panel to 200A, and installed modern outlets throughout. The project took about a week and he was incredibly organized, keeping everything tidy each day. Best contractor experience I\'ve ever had.',
    photos: [
      'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=300&h=300&fit=crop',
    ],
    proResponse: null,
    createdAt: '2024-08-12',
    helpfulCount: 18,
  },
  {
    id: 'r8',
    proId: '1',
    proName: 'Marcus Johnson',
    reviewerName: 'Chris L.',
    reviewerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    rating: 5,
    qualityRating: 5,
    punctualityRating: 4,
    communicationRating: 5,
    valueRating: 5,
    title: 'Basement electrical for home office',
    comment: 'Marcus set up dedicated circuits for my home office in the basement. He installed plenty of outlets, proper lighting, and even ran ethernet cables alongside the electrical. Very knowledgeable about what a home office needs for power. Quick turnaround too.',
    photos: [],
    proResponse: 'Thanks Chris! Home offices need proper power planning — glad you went with dedicated circuits. Let me know if you ever need to expand the setup.',
    createdAt: '2024-07-30',
    helpfulCount: 9,
  },
  {
    id: 'r9',
    proId: '1',
    proName: 'Marcus Johnson',
    reviewerName: 'Emily R.',
    reviewerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
    rating: 5,
    qualityRating: 5,
    punctualityRating: 5,
    communicationRating: 5,
    valueRating: 4,
    title: 'Bathroom fan and lighting upgrade',
    comment: 'Had Marcus replace our old bathroom fan with a whisper-quiet model and upgrade the vanity lighting. He also added a GFCI outlet near the sink (we somehow didn\'t have one!). Clean work, professional demeanor, and he cleaned up after himself.',
    photos: [],
    proResponse: null,
    createdAt: '2024-07-15',
    helpfulCount: 4,
  },
  {
    id: 'r10',
    proId: '1',
    proName: 'Marcus Johnson',
    reviewerName: 'James H.',
    reviewerAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face',
    rating: 3,
    qualityRating: 4,
    punctualityRating: 2,
    communicationRating: 3,
    valueRating: 3,
    title: 'Good work but scheduling issues',
    comment: 'The actual electrical work Marcus did was good quality. However, we had to reschedule twice before he could come out, and communication about the delays wasn\'t great. Once he was here, the job went smoothly. I\'d probably use him again but would want better scheduling reliability.',
    photos: [],
    proResponse: 'I appreciate your honest feedback, James. You\'re right that my scheduling was off during that period — I was short-staffed and should have communicated better. I\'ve since hired an assistant to help manage bookings. Hope to earn your trust again.',
    createdAt: '2024-07-01',
    helpfulCount: 11,
  },
];

export function getReviewsForPro(proId: string): DetailedReview[] {
  return mockDetailedReviews.filter((r) => r.proId === proId);
}

export function getAverageSubRatings(proId: string) {
  const reviews = getReviewsForPro(proId);
  if (reviews.length === 0) return { quality: 0, punctuality: 0, communication: 0, value: 0 };

  const sum = reviews.reduce(
    (acc, r) => ({
      quality: acc.quality + r.qualityRating,
      punctuality: acc.punctuality + r.punctualityRating,
      communication: acc.communication + r.communicationRating,
      value: acc.value + r.valueRating,
    }),
    { quality: 0, punctuality: 0, communication: 0, value: 0 }
  );

  const count = reviews.length;
  return {
    quality: Math.round((sum.quality / count) * 10) / 10,
    punctuality: Math.round((sum.punctuality / count) * 10) / 10,
    communication: Math.round((sum.communication / count) * 10) / 10,
    value: Math.round((sum.value / count) * 10) / 10,
  };
}
