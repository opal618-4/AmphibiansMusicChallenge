export interface FrogSpecies {
  id: string
  commonName: string
  scientificName: string
  image: string
  habitatImage: string
  description: string
  habitat: string
  funFact: string
  audioSrc: string
  learnMore: string
  audioPattern: 'spring-peeper' | 'common-toad' | 'wood-frog' | 'red-eyed-tree-frog' | 'poison-dart-frog' | 'american-bullfrog' | 'pacific-tree-frog' | 'coqui-frog' | 'green-tree-frog'
  kingdom: string
  genus: string
  frogClass: string
  family: string
  callDescription: string
  sizeImage?: string
  sizeText?: string
}

export interface GameLevel {
  levelNumber: number
  correctFrogId: string
  choices: string[] // frog IDs
}

export type GamePhase = 'welcome' | 'gallery' | 'detail' | 'playing' | 'correct-highlight' | 'correct-page' | 'info' | 'result'

export type AnswerState = 'idle' | 'correct' | 'wrong'

export interface GameState {
  phase: GamePhase
  currentLevel: number
  score: number
  selectedFrogId: string | null
  answerState: AnswerState
  levels: GameLevel[]
  completedLevels: number[]
  wrongAttempts: number
}
