export interface LeaderboardEntry {
  rank: number
  username: string
  title: string
  score: number
  totalQuestions: number
  accuracy: number
  avatarColor: string
}

export const mockLeaderboard: LeaderboardEntry[] = [
  {
    rank: 1,
    username: 'Angele_Arnang',
    title: 'Master Explorer',
    score: 5,
    totalQuestions: 5,
    accuracy: 100,
    avatarColor: '#8BC34A'
  },
  {
    rank: 2,
    username: 'Froggy_Friend',
    title: 'Pond Dweller',
    score: 4,
    totalQuestions: 5,
    accuracy: 80,
    avatarColor: '#78909C'
  },
  {
    rank: 3,
    username: 'OuboubRere',
    title: 'Marsh Wanderer',
    score: 3,
    totalQuestions: 5,
    accuracy: 60,
    avatarColor: '#AB47BC'
  },
  {
    rank: 4,
    username: 'LilyPadKing',
    title: 'Tadpole Scout',
    score: 3,
    totalQuestions: 5,
    accuracy: 60,
    avatarColor: '#42A5F5'
  },
  {
    rank: 5,
    username: 'NightCroaker',
    title: 'Pond Visitor',
    score: 2,
    totalQuestions: 5,
    accuracy: 40,
    avatarColor: '#FF7043'
  }
]
