
// Simple sentiment analysis utility
// In a real Node.js application, you would use libraries like 'sentiment' or 'natural'

interface SentimentResult {
  sentiment: 'positive' | 'negative' | 'neutral';
  score: number;
}

const positiveWords = [
  // English positive words
  'love', 'great', 'awesome', 'amazing', 'wonderful', 'excellent', 'fantastic',
  'good', 'nice', 'beautiful', 'happy', 'joy', 'excited', 'perfect', 'best',
  'yes', 'sure', 'okay', 'fine', 'cool', 'thanks', 'thank you', 'please',
  
  // Indonesian positive words
  'bagus', 'baik', 'senang', 'gembira', 'mantap', 'keren', 'asik', 'asyik',
  'hebat', 'luar biasa', 'indah', 'cantik', 'ganteng', 'terima kasih', 'makasih',
  'sip', 'oke', 'okeh', 'siap', 'setuju', 'suka', 'cinta', 'sayang', 'lucu',
  'manis', 'imut', 'gemesin', 'menggemaskan', 'top', 'recommended', 'rekomen',
  'worth it', 'worthit', 'gas', 'ayo', 'semangat', 'fighting', 'goodluck',
  'sukses', 'berhasil', 'joss', 'jos', 'gandos', 'lit', 'fire'
];

const negativeWords = [
  // English negative words
  'hate', 'terrible', 'awful', 'bad', 'horrible', 'disgusting', 'ugly',
  'sad', 'angry', 'mad', 'furious', 'annoying', 'stupid', 'dumb', 'idiot',
  'no', 'never', 'can\'t', 'won\'t', 'refuse', 'deny', 'reject',
  
  // Indonesian negative words and curse words
  'jelek', 'buruk', 'parah', 'najis', 'jijik', 'menjijikkan', 'benci', 'kesel',
  'sebel', 'dongkol', 'marah', 'geram', 'murka', 'sedih', 'kecewa', 'galau',
  'stress', 'males', 'malas', 'capek', 'lelah', 'bosan', 'jenuh', 'muak',
  
  // Indonesian curse words (mild to moderate)
  'babi', 'anjing', 'kampret', 'bangsat', 'bajingan', 'sialan', 'sial',
  'goblok', 'goblog', 'tolol', 'bodoh', 'dungu', 'bego', 'ngentot', 'entot',
  'pepek', 'memek', 'kontol', 'tai', 'taik', 'tahi', 'shit', 'fuck', 'damn',
  'hell', 'ass', 'bitch', 'bastard', 'asshole', 'crap', 'piss', 'pissed',
  
  // Indonesian slang negative words
  'kampungan', 'norak', 'cupu', 'lebay', 'alay', 'songong', 'sombong',
  'nyebelin', 'menyebalkan', 'toxic', 'toksik', 'cringe', 'awkward',
  'fail', 'gagal', 'zonk', 'boong', 'bohong', 'hoax', 'fake', 'palsu',
  'ribet', 'rumit', 'susah', 'sulit', 'impossible', 'mustahil', 'gabisa',
  'ga bisa', 'tidak bisa', 'engga', 'enggak', 'gak', 'nggak', 'kagak'
];

const neutralWords = [
  // Common neutral/filler words that shouldn't affect sentiment
  'mungkin', 'maybe', 'perhaps', 'kali', 'kayak', 'kayaknya', 'seperti',
  'sepertinya', 'agak', 'lumayan', 'biasa', 'normal', 'standar', 'ok',
  'oke', 'hmm', 'eh', 'oh', 'ah', 'ya', 'iya', 'yah', 'sih', 'deh',
  'aja', 'ajah', 'gitu', 'gitu sih', 'begitu', 'jadi', 'terus', 'lalu',
  'kemudian', 'habis', 'abis', 'udah', 'sudah', 'belum', 'blm'
];

export const analyzeSentiment = (text: string): SentimentResult => {
  const words = text.toLowerCase().split(/\s+/);
  let score = 0;

  words.forEach(word => {
    // Remove punctuation and emoji
    const cleanWord = word.replace(/[^\w]/g, '');
    
    if (positiveWords.includes(cleanWord)) {
      score += 1;
    } else if (negativeWords.includes(cleanWord)) {
      score -= 1;
    }
    // Neutral words don't affect the score
  });

  let sentiment: 'positive' | 'negative' | 'neutral';
  
  if (score > 0) {
    sentiment = 'positive';
  } else if (score < 0) {
    sentiment = 'negative';
  } else {
    sentiment = 'neutral';
  }

  return { sentiment, score };
};

export const detectAbusiveContent = (text: string): boolean => {
  const abusiveWords = [
    // English abusive words
    'abuse', 'violent', 'threat', 'kill', 'die', 'hurt', 'pain',
    'stupid', 'idiot', 'moron', 'dumb', 'loser', 'fuck', 'shit',
    'bitch', 'asshole', 'bastard', 'damn', 'hell',
    
    // Indonesian abusive words
    'babi', 'anjing', 'kampret', 'bangsat', 'bajingan', 'sialan',
    'goblok', 'goblog', 'tolol', 'bodoh', 'bego', 'ngentot', 'entot',
    'pepek', 'memek', 'kontol', 'tai', 'taik', 'tahi', 'bencong',
    'pelacur', 'lonte', 'perek', 'jablay', 'sundal', 'lacur',
    'bunuh', 'mati', 'mokad', 'gebuk', 'hajar', 'bogem', 'tonjok'
  ];

  const words = text.toLowerCase().split(/\s+/);
  return words.some(word => {
    const cleanWord = word.replace(/[^\w]/g, '');
    return abusiveWords.some(abusive => cleanWord.includes(abusive));
  });
};
