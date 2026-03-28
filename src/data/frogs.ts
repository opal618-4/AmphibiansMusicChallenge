import type { FrogSpecies, GameLevel } from '../types'

import woodFrogImg from '/assets/images/wood-frog.png'
import woodFrogImg2 from '/assets/images/wood-frog-2.jpg'
import commonToadImg from '/assets/images/common-toad.png'
import commonToadImg2 from '/assets/images/common-toad-2.png'
import springPeeperImg from '/assets/images/spring-peeper.png'
import springPeeperImg2 from '/assets/images/spring-peeper-2.png'
import redEyedTreeFrogImg from '/assets/images/redEyedTree-frog.jpg'
import redEyedTreeFrogImg2 from '/assets/images/redEyedTree-frog-2.jpg'
import poisonDartFrogImg from '/assets/images/poison-dart-frog.png'
import poisonDartFrogImg2 from '/assets/images/Blue-Poison-Dart-Frog-2.jpg'
import americanBullfrogImg from '/assets/images/american-bullfrog-1.jpg'
import americanBullfrogImg2 from '/assets/images/american-bullfrog-2.png'
import pacificTreeFrogImg3 from '/assets/images/pacific-tree-frog-3.jpg'
import pacificTreeFrogImg2 from '/assets/images/pacific-tree-frog-2.jpg'
import coquiFrogImg from '/assets/images/coqui-frog.png'
import coquiFrogImg2 from '/assets/images/coqui-2.jpg'
import greenTreeFrogImg from '/assets/images/green-tree-frog.png'
import greenTreeFrogImg2 from '/assets/images/green-tree-frog-2.jpg'
import bullfrog from '/assets/audio/bull-frog.mp4'
import springpeeper from '/assets/audio/spring-peeper.mp4'
import redEyedTreeFrog from '/assets/audio/red-eyed-tree-frog.mp4'
import coquiFrog from '/assets/audio/coqui-frog.mp4'
import poisonDartFrog from '/assets/audio/poison-dart-frog.mp4'
import commonToad from '/assets/audio/common-toad.mp4'
import greenTreeFrog from '/assets/audio/green-tree-frog.mp4'
import pacificTreeFrog from '/assets/audio/pasific-tree-frog.mp4'
import woodFrog from '/assets/audio/wood-frog.mp4'
import woodFrogSize from '/assets/images/wood-frog-size.jpg'
import commonToadSize from '/assets/images/common-toad-size.svg'
import springPeeperSize from '/assets/images/spring-peeper-size.png'
import redEyedTreeFrogSize from '/assets/images/red-eyed-tree-frog-size.jpg'
import poisonDartFrogSize from '/assets/images/poison-dart-frog-size.jpg'
import americanBullfrogSize from '/assets/images/american-bullfrog-size.png'
import pacificTreeFrogSize from '/assets/images/pacific-tree-frog-size.jpg'
import coquiFrogSize from '/assets/images/coqui-size.jpg'
import greenTreeFrogSize from '/assets/images/green-tree-frog-size.png'

export const frogs: FrogSpecies[] = [
  {
    id: 'wood-frog',
    commonName: 'Wood Frog',
    scientificName: 'Lithobates sylvaticus',
    image: woodFrogImg2,
    habitatImage: woodFrogImg,
    description: 'The wood frog is a member of the Ranidae family. These frogs tend to be the ones that people think of when they picture a "frog". They have webbed hind feet and are excellent jumpers. Unlike most other frogs, they are unique in that they prefer to be on land more than in water.',
    habitat: 'Although found on the tundra in the north and occasionally in grasslands in the west, the wood frog is most commonly associated with moist woodlands and vernal woodland pools. When inactive, this frog hides in logs, humus and leaf litter or under logs and rocks.',
    funFact: 'Wood frogs can survive being frozen solid during winter!',
    audioSrc: woodFrog,
    audioPattern: 'wood-frog',
    learnMore: 'https://ontarionature.org/programs/community-science/reptile-amphibian-atlas/wood-frog/',
    kingdom: 'Animalia',
    genus: 'Lithobates',
    frogClass: 'Amphibia',
    family: 'Ranidae',
    callDescription: 'A short, raspy quacking sound similar to a duck, repeated in rapid bursts. Often heard near vernal pools in early spring.',
    sizeImage: woodFrogSize,
    sizeText: 'Size relative to human hand:',
  },
  {
    id: 'common-toad',
    commonName: 'Common Toad',
    scientificName: 'Bufo bufo',
    image: commonToadImg2,
    habitatImage: commonToadImg,
    description: 'The common toad is a widespread amphibian found throughout Europe. Known for their dry, warty skin, they move with a distinctive walking gait rather than hopping. They are mostly nocturnal and spend the day hiding under stones, logs, or in burrows.',
    habitat: 'Common toads inhabit a wide variety of habitats including gardens, woodlands, hedgerows, and scrubland. They require ponds or lakes for breeding but spend most of their life on land. During winter, they hibernate in compost heaps, under logs, or in burrows.',
    funFact: 'Common toads can live up to 40 years in captivity!',
    audioSrc: commonToad,
    audioPattern: 'common-toad',
    learnMore: 'https://www.wildlifetrusts.org/wildlife-explorer/amphibians/common-toad',
    kingdom: 'Animalia',
    genus: 'Bufo',
    frogClass: 'Amphibia',
    family: 'Bufonidae',
    callDescription: 'A high-pitched, squeaky trill lasting several seconds. Males produce this call during the breeding season to attract mates near ponds.',
    sizeImage: commonToadSize,
    sizeText: 'Size of common toad in dimension:',
  },
  {
    id: 'spring-peeper',
    commonName: 'Spring Peeper',
    scientificName: 'Pseudacris crucifer',
    image: springPeeperImg,
    habitatImage: springPeeperImg2,
    description: 'The spring peeper is a small chorus frog widespread throughout the eastern United States and Canada. Despite their tiny size (about 1 inch), they produce a remarkably loud, high-pitched peeping call that is one of the first signs of spring.',
    habitat: 'Spring peepers live in wooded areas near permanent or temporary ponds. They breed in marshy woods, ponds, and swamps. Outside of breeding season, they can be found in forest leaf litter, under bark, or in grassy areas.',
    funFact: 'A chorus of spring peepers can be heard up to half a mile away!',
    audioSrc: springpeeper,
    audioPattern: 'spring-peeper',
    learnMore: 'https://www.nationalgeographic.com/animals/amphibians/facts/spring-peeper',
    kingdom: 'Animalia',
    genus: 'Pseudacris',
    frogClass: 'Amphibia',
    family: 'Hylidae',
    callDescription: 'A high-pitched whistle or \'peep\' repeated about once per second. In a chorus, it sounds like sleigh bells.',
    sizeImage: springPeeperSize,
    sizeText: 'Size relative to paperclip:',
  },
  {
    id: 'red-eyed-tree-frog',
    commonName: 'Red-Eyed Tree Frog',
    scientificName: 'Agalychnis callidryas',
    image: redEyedTreeFrogImg2,
    habitatImage: redEyedTreeFrogImg,
    description: 'The red-eyed tree frog is one of the most iconic amphibians in the world. Their brilliant red eyes are thought to startle predators, a defense mechanism called "startle coloration." They are not poisonous despite their vibrant colors.',
    habitat: 'These frogs are found in tropical lowland rainforests from southern Mexico through Central America. They live in the canopy of the rainforest, sleeping on the undersides of large leaves during the day and hunting insects at night.',
    funFact: 'Their red eyes help scare away predators with a flash of color!',
    audioSrc: redEyedTreeFrog,
    audioPattern: 'red-eyed-tree-frog',
    learnMore: 'https://www.nationalgeographic.com/animals/amphibians/facts/red-eyed-tree-frog',
    kingdom: 'Animalia',
    genus: 'Agalychnis',
    frogClass: 'Amphibia',
    family: 'Phyllomedusidae',
    callDescription: 'A soft, low-pitched "chack" or clicking sound. Males call from vegetation above water during the rainy season.',
    sizeImage: redEyedTreeFrogSize,
    sizeText: 'Size relative to tea cup:',
  },
  {
    id: 'poison-dart-frog',
    commonName: 'Blue Poison Dart Frog',
    scientificName: 'Dendrobates tinctorius azureus',
    image: poisonDartFrogImg,
    habitatImage: poisonDartFrogImg2,
    description: 'The blue poison dart frog is one of the most striking amphibians on Earth. Their brilliant blue coloration serves as a warning to predators about their toxicity. Indigenous peoples have used their skin toxins to poison the tips of blowgun darts.',
    habitat: 'Found exclusively in the forests surrounding the Sipaliwini savanna in southern Suriname. They prefer humid areas near streams with mossy rocks. Unlike many frogs, they are active during the day, making them easier to spot.',
    funFact: 'One frog has enough poison to kill 10 grown men!',
    audioSrc: poisonDartFrog,
    audioPattern: 'poison-dart-frog',
    learnMore: 'https://kids.nationalgeographic.com/animals/amphibians/facts/poison-dart-frog',
    kingdom: 'Animalia',
    genus: 'Dendrobates',
    frogClass: 'Amphibia',
    family: 'Dendrobatidae',
    callDescription: 'A quiet buzzing trill produced during territorial displays. The sound is subtle and can only be heard from close range.',
    sizeImage: poisonDartFrogSize,
    sizeText: 'Size of baby frog relative to human hand:',
  },
  {
    id: 'american-bullfrog',
    commonName: 'American Bullfrog',
    scientificName: 'Lithobates catesbeianus',
    image: americanBullfrogImg,
    habitatImage: americanBullfrogImg2,
    description: 'The American bullfrog is the largest frog in North America. They are highly aggressive predators that will eat almost anything they can fit in their mouths, including insects, mice, snakes, fish, and even other frogs.',
    habitat: 'Bullfrogs are found in large, permanent bodies of water such as ponds, lakes, and slow-moving streams. They prefer warm, shallow water with abundant vegetation. They are one of the most adaptable amphibians in the world.',
    funFact: 'Their deep "jug-o-rum" call can be heard over a quarter mile away!',
    audioSrc: bullfrog,
    audioPattern: 'american-bullfrog',
    learnMore: 'https://www.nationalgeographic.com/animals/amphibians/facts/american-bullfrog',
    kingdom: 'Animalia',
    genus: 'Lithobates',
    frogClass: 'Amphibia',
    family: 'Ranidae',
    callDescription: 'A deep, resonant "jug-o-rum" bellowing call. One of the loudest frog calls in North America, audible over great distances.',
    sizeImage: americanBullfrogSize,
    sizeText: 'Size relative to a teacup:',
  },
  {
    id: 'pacific-tree-frog',
    commonName: 'Pacific Tree Frog',
    scientificName: 'Pseudacris regilla',
    image: pacificTreeFrogImg3,
    habitatImage: pacificTreeFrogImg2,
    description: 'The Pacific tree frog is one of the most commonly heard frogs on the Pacific coast of North America. Their classic "ribbit" call is actually the sound most often used in movies and TV shows to represent any frog.',
    habitat: 'Found from British Columbia to Baja California, these adaptable frogs live in a variety of habitats from sea level to over 10,000 feet. They can be found in forests, grasslands, chaparral, deserts, and even urban gardens.',
    funFact: 'Hollywood uses their call as the "default frog sound" in movies!',
    audioSrc: pacificTreeFrog,
    audioPattern: 'pacific-tree-frog',
    learnMore: 'https://wdfw.wa.gov/species-habitats/species/pseudacris-regilla',
    kingdom: 'Animalia',
    genus: 'Pseudacris',
    frogClass: 'Amphibia',
    family: 'Hylidae',
    callDescription: 'The classic two-note "rib-bit" call, the most commonly heard frog sound in movies and TV shows worldwide.',
    sizeImage: pacificTreeFrogSize,
    sizeText: 'Size relative to human hand:',
  },
  {
    id: 'coqui-frog',
    commonName: 'Coquí Frog',
    scientificName: 'Eleutherodactylus coqui',
    image: coquiFrogImg,
    habitatImage: coquiFrogImg2,
    description: 'The coquí is a tiny tree frog native to Puerto Rico and is the island\'s unofficial mascot. Named after its distinctive two-note call "co-quí," these frogs are deeply embedded in Puerto Rican culture and folklore.',
    habitat: 'Coquí frogs are found throughout Puerto Rico in a variety of habitats, from lowland forests to mountain cloud forests. They are commonly found on vegetation, in tree hollows, and under leaf litter. They are primarily nocturnal.',
    funFact: 'Their "co-quí" call is a national symbol of Puerto Rico!',
    audioSrc: coquiFrog,
    audioPattern: 'coqui-frog',
    learnMore: 'https://www.nwf.org/Educational-Resources/Wildlife-Guide/Amphibians/Puerto-Rican-Coqui',
    kingdom: 'Animalia',
    genus: 'Eleutherodactylus',
    frogClass: 'Amphibia',
    family: 'Eleutherodactylidae',
    callDescription: 'A loud, distinctive two-note "co-quí" call. The "co" warns rival males, while "quí" attracts females.',
    sizeImage: coquiFrogSize,
    sizeText: 'Size relative to human hand:',
  },
  {
    id: 'green-tree-frog',
    commonName: 'Green Tree Frog',
    scientificName: 'Litoria caerulea',
    image: greenTreeFrogImg,
    habitatImage: greenTreeFrogImg2,
    description: 'The Australian green tree frog, also known as White\'s tree frog or the dumpy tree frog, is a large, docile species popular in the pet trade. They are known for their calm temperament and distinctive "smiling" expression.',
    habitat: 'Native to Australia and New Guinea, these arboreal frogs are found in canopy areas near still water sources. They have adapted well to human-modified habitats and are often found in bathrooms, water tanks, and on windowsills of homes.',
    funFact: 'They secrete a substance that has been found to lower blood pressure!',
    audioSrc: greenTreeFrog,
    audioPattern: 'green-tree-frog',
    learnMore: 'https://www.nationalgeographic.com/animals/amphibians/facts/green-eyed-tree-frog',
    kingdom: 'Animalia',
    genus: 'Litoria',
    frogClass: 'Amphibia',
    family: 'Hylidae',
    callDescription: 'A loud, repeated "crawk-crawk-crawk" barking call. Often heard on warm, humid nights near water sources.',
    sizeImage: greenTreeFrogSize,
    sizeText: 'Size relative to a teacup:',
  }
]

export const gameLevels: GameLevel[] = [
  {
    levelNumber: 1 ,
    correctFrogId: 'american-bullfrog',
    choices: ['red-eyed-tree-frog', 'american-bullfrog', 'pacific-tree-frog']
  },
  {
    levelNumber: 2,
    correctFrogId: 'spring-peeper',
    choices: ['spring-peeper', 'common-toad', 'wood-frog']
  },
  {
    levelNumber: 3,
    correctFrogId: 'poison-dart-frog',
    choices: ['coqui-frog', 'poison-dart-frog', 'green-tree-frog']
  },
  {
    levelNumber: 4,
    correctFrogId: 'coqui-frog',
    choices: ['common-toad', 'american-bullfrog', 'coqui-frog']
  },
  {
    levelNumber: 5,
    correctFrogId: 'wood-frog',
    choices: ['wood-frog', 'spring-peeper', 'red-eyed-tree-frog']
  },
]

export function getFrogById(id: string): FrogSpecies | undefined {
  return frogs.find(f => f.id === id)
}
