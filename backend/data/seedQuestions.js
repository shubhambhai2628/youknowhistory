import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Question from '../models/Question.js';

dotenv.config();

const sampleQuestions = [
    // History Questions
    {
        question: "Who was the first Emperor of unified China?",
        options: ["Liu Bang", "Qin Shi Huang", "Emperor Wu", "Confucius"],
        correctOptionIndex: 1,
        category: "History",
        difficulty: "Easy",
        explanation: "Qin Shi Huang unified China in 221 BCE and became its first emperor, establishing the Qin Dynasty."
    },
    {
        question: "In which year did World War II end?",
        options: ["1943", "1944", "1945", "1946"],
        correctOptionIndex: 2,
        category: "History",
        difficulty: "Easy",
        explanation: "World War II ended in 1945 with Germany's surrender in May and Japan's surrender in September."
    },
    {
        question: "Who was known as the Iron Lady?",
        options: ["Indira Gandhi", "Margaret Thatcher", "Golda Meir", "Angela Merkel"],
        correctOptionIndex: 1,
        category: "History",
        difficulty: "Medium",
        explanation: "Margaret Thatcher, the British Prime Minister from 1979-1990, was nicknamed the 'Iron Lady' for her uncompromising politics."
    },
    {
        question: "The French Revolution began in which year?",
        options: ["1789", "1799", "1776", "1804"],
        correctOptionIndex: 0,
        category: "History",
        difficulty: "Medium",
        explanation: "The French Revolution began in 1789 with the storming of the Bastille on July 14."
    },
    {
        question: "Who was the founder of the Maurya Empire?",
        options: ["Ashoka", "Chandragupta Maurya", "Bindusara", "Samudragupta"],
        correctOptionIndex: 1,
        category: "History",
        difficulty: "Medium",
        explanation: "Chandragupta Maurya founded the Maurya Empire around 321 BCE after overthrowing the Nanda Dynasty."
    },
    {
        question: "The Battle of Plassey was fought in which year?",
        options: ["1757", "1764", "1772", "1780"],
        correctOptionIndex: 0,
        category: "History",
        difficulty: "Medium",
        explanation: "The Battle of Plassey was fought on June 23, 1757, marking the beginning of British colonial rule in India."
    },
    {
        question: "Who built the Taj Mahal?",
        options: ["Akbar", "Jahangir", "Shah Jahan", "Aurangzeb"],
        correctOptionIndex: 2,
        category: "History",
        difficulty: "Easy",
        explanation: "Shah Jahan built the Taj Mahal in memory of his wife Mumtaz Mahal between 1632 and 1653."
    },
    {
        question: "The Renaissance began in which country?",
        options: ["France", "Italy", "England", "Spain"],
        correctOptionIndex: 1,
        category: "History",
        difficulty: "Easy",
        explanation: "The Renaissance began in Italy in the 14th century, particularly in Florence."
    },
    {
        question: "Who discovered America in 1492?",
        options: ["Ferdinand Magellan", "Vasco da Gama", "Christopher Columbus", "Amerigo Vespucci"],
        correctOptionIndex: 2,
        category: "History",
        difficulty: "Easy",
        explanation: "Christopher Columbus reached the Americas in 1492, though he believed he had reached Asia."
    },
    {
        question: "The Berlin Wall fell in which year?",
        options: ["1987", "1988", "1989", "1990"],
        correctOptionIndex: 2,
        category: "History",
        difficulty: "Medium",
        explanation: "The Berlin Wall fell on November 9, 1989, marking a major event in the end of the Cold War."
    },
    {
        question: "Who was the first President of the United States?",
        options: ["Thomas Jefferson", "George Washington", "John Adams", "Benjamin Franklin"],
        correctOptionIndex: 1,
        category: "History",
        difficulty: "Easy",
        explanation: "George Washington served as the first President of the United States from 1789 to 1797."
    },
    {
        question: "The ancient city of Pompeii was destroyed by which volcano?",
        options: ["Etna", "Vesuvius", "Stromboli", "Vulcano"],
        correctOptionIndex: 1,
        category: "History",
        difficulty: "Medium",
        explanation: "Mount Vesuvius erupted in 79 AD, destroying the Roman cities of Pompeii and Herculaneum."
    },
    {
        question: "Who wrote the Communist Manifesto?",
        options: ["Vladimir Lenin", "Joseph Stalin", "Karl Marx and Friedrich Engels", "Leon Trotsky"],
        correctOptionIndex: 2,
        category: "History",
        difficulty: "Medium",
        explanation: "Karl Marx and Friedrich Engels wrote The Communist Manifesto, published in 1848."
    },
    {
        question: "The Magna Carta was signed in which year?",
        options: ["1066", "1215", "1314", "1415"],
        correctOptionIndex: 1,
        category: "History",
        difficulty: "Hard",
        explanation: "The Magna Carta was signed on June 15, 1215, limiting the power of the English monarch."
    },
    {
        question: "Who was the last Tsar of Russia?",
        options: ["Nicholas I", "Alexander III", "Nicholas II", "Alexander II"],
        correctOptionIndex: 2,
        category: "History",
        difficulty: "Medium",
        explanation: "Nicholas II was the last Tsar of Russia, ruling from 1894 until his abdication in 1917."
    },
    {
        question: "The Indus Valley Civilization flourished around which period?",
        options: ["5000-3000 BCE", "3300-1300 BCE", "2000-500 BCE", "1000 BCE-500 CE"],
        correctOptionIndex: 1,
        category: "History",
        difficulty: "Hard",
        explanation: "The Indus Valley Civilization flourished from approximately 3300 to 1300 BCE in present-day Pakistan and India."
    },
    {
        question: "Who was the prime minister of India during the Emergency (1975-1977)?",
        options: ["Jawaharlal Nehru", "Lal Bahadur Shastri", "Indira Gandhi", "Morarji Desai"],
        correctOptionIndex: 2,
        category: "History",
        difficulty: "Medium",
        explanation: "Indira Gandhi declared a state of emergency in India from 1975 to 1977."
    },

    // Geography Questions
    {
        question: "What is the largest desert in the world?",
        options: ["Sahara", "Arabian", "Antarctic", "Gobi"],
        correctOptionIndex: 2,
        category: "Geography",
        difficulty: "Hard",
        explanation: "Antarctica is the largest desert in the world. Deserts are defined by low precipitation, not temperature."
    },
    {
        question: "Which is the longest river in the world?",
        options: ["Amazon", "Nile", "Yangtze", "Mississippi"],
        correctOptionIndex: 1,
        category: "Geography",
        difficulty: "Medium",
        explanation: "The Nile River in Africa is generally considered the longest river at approximately 6,650 km."
    },
    {
        question: "Mount Everest is located in which mountain range?",
        options: ["Alps", "Andes", "Himalayas", "Rockies"],
        correctOptionIndex: 2,
        category: "Geography",
        difficulty: "Easy",
        explanation: "Mount Everest is part of the Himalayan mountain range on the border of Nepal and Tibet."
    },
    {
        question: "Which country has the most natural lakes?",
        options: ["United States", "Russia", "Canada", "Finland"],
        correctOptionIndex: 2,
        category: "Geography",
        difficulty: "Medium",
        explanation: "Canada has more natural lakes than any other country, with over 2 million lakes."
    },
    {
        question: "The Great Barrier Reef is located off the coast of which country?",
        options: ["Indonesia", "Philippines", "Australia", "New Zealand"],
        correctOptionIndex: 2,
        category: "Geography",
        difficulty: "Easy",
        explanation: "The Great Barrier Reef is located off the coast of Queensland, Australia."
    },
    {
        question: "What is the capital of Australia?",
        options: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
        correctOptionIndex: 2,
        category: "Geography",
        difficulty: "Medium",
        explanation: "Canberra is the capital of Australia, chosen as a compromise between Sydney and Melbourne."
    },
    {
        question: "Which ocean is the largest?",
        options: ["Atlantic", "Indian", "Pacific", "Arctic"],
        correctOptionIndex: 2,
        category: "Geography",
        difficulty: "Easy",
        explanation: "The Pacific Ocean is the largest ocean, covering about 46% of Earth's water surface."
    },
    {
        question: "The Sahara Desert is primarily located in which continent?",
        options: ["Asia", "Africa", "Australia", "South America"],
        correctOptionIndex: 1,
        category: "Geography",
        difficulty: "Easy",
        explanation: "The Sahara Desert is located in North Africa and is the largest hot desert in the world."
    },
    {
        question: "Which country has the longest coastline in the world?",
        options: ["Australia", "Russia", "Canada", "Indonesia"],
        correctOptionIndex: 2,
        category: "Geography",
        difficulty: "Medium",
        explanation: "Canada has the world's longest coastline at over 202,000 km."
    },
    {
        question: "The Dead Sea is bordered by which two countries?",
        options: ["Egypt and Sudan", "Israel and Jordan", "Iraq and Iran", "Turkey and Syria"],
        correctOptionIndex: 1,
        category: "Geography",
        difficulty: "Medium",
        explanation: "The Dead Sea is bordered by Israel to the west and Jordan to the east."
    },
    {
        question: "Which is the smallest country in the world?",
        options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"],
        correctOptionIndex: 1,
        category: "Geography",
        difficulty: "Easy",
        explanation: "Vatican City is the smallest country in the world with an area of about 0.44 square kilometers."
    },
    {
        question: "The Amazon Rainforest is primarily located in which country?",
        options: ["Colombia", "Peru", "Brazil", "Venezuela"],
        correctOptionIndex: 2,
        category: "Geography",
        difficulty: "Easy",
        explanation: "About 60% of the Amazon Rainforest is located in Brazil."
    },
    {
        question: "What is the deepest ocean trench in the world?",
        options: ["Puerto Rico Trench", "Java Trench", "Mariana Trench", "Tonga Trench"],
        correctOptionIndex: 2,
        category: "Geography",
        difficulty: "Medium",
        explanation: "The Mariana Trench is the deepest part of the world's oceans, reaching depths of about 11,000 meters."
    },
    {
        question: "Which river flows through the Grand Canyon?",
        options: ["Mississippi River", "Colorado River", "Rio Grande", "Snake River"],
        correctOptionIndex: 1,
        category: "Geography",
        difficulty: "Medium",
        explanation: "The Colorado River carved the Grand Canyon over millions of years."
    },
    {
        question: "India shares its longest border with which country?",
        options: ["China", "Pakistan", "Bangladesh", "Nepal"],
        correctOptionIndex: 2,
        category: "Geography",
        difficulty: "Medium",
        explanation: "India shares its longest land border with Bangladesh, spanning about 4,096 km."
    },
    {
        question: "Which Indian state has the longest coastline?",
        options: ["Maharashtra", "Tamil Nadu", "Gujarat", "Andhra Pradesh"],
        correctOptionIndex: 2,
        category: "Geography",
        difficulty: "Medium",
        explanation: "Gujarat has the longest coastline of any Indian state at approximately 1,600 km."
    },
    {
        question: "The Tropic of Cancer passes through how many Indian states?",
        options: ["6", "7", "8", "9"],
        correctOptionIndex: 2,
        category: "Geography",
        difficulty: "Hard",
        explanation: "The Tropic of Cancer passes through 8 Indian states: Gujarat, Rajasthan, Madhya Pradesh, Chhattisgarh, Jharkhand, West Bengal, Tripura, and Mizoram."
    },

    // Politics Questions
    {
        question: "How many members are there in the Rajya Sabha?",
        options: ["238", "245", "250", "255"],
        correctOptionIndex: 1,
        category: "Politics",
        difficulty: "Medium",
        explanation: "The Rajya Sabha has a maximum strength of 245 members, with 233 representing states and union territories."
    },
    {
        question: "Who is known as the Father of the Indian Constitution?",
        options: ["Jawaharlal Nehru", "B.R. Ambedkar", "Mahatma Gandhi", "Sardar Patel"],
        correctOptionIndex: 1,
        category: "Politics",
        difficulty: "Easy",
        explanation: "Dr. B.R. Ambedkar is known as the Father of the Indian Constitution for his role as chairman of the drafting committee."
    },
    {
        question: "The Indian Constitution was adopted on which date?",
        options: ["15 August 1947", "26 January 1950", "26 November 1949", "2 October 1950"],
        correctOptionIndex: 2,
        category: "Politics",
        difficulty: "Medium",
        explanation: "The Indian Constitution was adopted on November 26, 1949, and came into effect on January 26, 1950."
    },
    {
        question: "What is the term of office for the President of India?",
        options: ["4 years", "5 years", "6 years", "7 years"],
        correctOptionIndex: 1,
        category: "Politics",
        difficulty: "Easy",
        explanation: "The President of India serves a term of 5 years from the date they assume office."
    },
    {
        question: "Which article of the Indian Constitution abolished untouchability?",
        options: ["Article 14", "Article 15", "Article 17", "Article 19"],
        correctOptionIndex: 2,
        category: "Politics",
        difficulty: "Hard",
        explanation: "Article 17 of the Indian Constitution abolishes untouchability and forbids its practice in any form."
    },
    {
        question: "The United Nations was founded in which year?",
        options: ["1942", "1944", "1945", "1946"],
        correctOptionIndex: 2,
        category: "Politics",
        difficulty: "Medium",
        explanation: "The United Nations was founded on October 24, 1945, after World War II."
    },
    {
        question: "How many permanent members are there in the UN Security Council?",
        options: ["4", "5", "6", "7"],
        correctOptionIndex: 1,
        category: "Politics",
        difficulty: "Easy",
        explanation: "The UN Security Council has 5 permanent members: USA, UK, France, Russia, and China."
    },
    {
        question: "Which amendment is known as the Mini Constitution?",
        options: ["42nd Amendment", "44th Amendment", "52nd Amendment", "61st Amendment"],
        correctOptionIndex: 0,
        category: "Politics",
        difficulty: "Hard",
        explanation: "The 42nd Amendment (1976) is known as the Mini Constitution due to its extensive changes to the Constitution."
    },
    {
        question: "The Right to Education became a fundamental right under which article?",
        options: ["Article 19", "Article 20", "Article 21", "Article 21A"],
        correctOptionIndex: 3,
        category: "Politics",
        difficulty: "Medium",
        explanation: "Article 21A makes free and compulsory education a fundamental right for children aged 6-14 years."
    },
    {
        question: "Who appoints the Chief Justice of India?",
        options: ["Prime Minister", "President", "Parliament", "Supreme Court Collegium"],
        correctOptionIndex: 1,
        category: "Politics",
        difficulty: "Medium",
        explanation: "The President of India appoints the Chief Justice of India, usually the senior-most judge."
    },
    {
        question: "The concept of Public Interest Litigation (PIL) originated in which country?",
        options: ["India", "United Kingdom", "United States", "Canada"],
        correctOptionIndex: 2,
        category: "Politics",
        difficulty: "Hard",
        explanation: "Public Interest Litigation originated in the United States and was introduced in India in the 1980s."
    },
    {
        question: "Which part of the Indian Constitution deals with Fundamental Rights?",
        options: ["Part II", "Part III", "Part IV", "Part V"],
        correctOptionIndex: 1,
        category: "Politics",
        difficulty: "Medium",
        explanation: "Part III of the Indian Constitution (Articles 12-35) deals with Fundamental Rights."
    },
    {
        question: "The Panchayati Raj system was introduced by which constitutional amendment?",
        options: ["42nd", "52nd", "73rd", "86th"],
        correctOptionIndex: 2,
        category: "Politics",
        difficulty: "Hard",
        explanation: "The 73rd Amendment Act (1992) gave constitutional status to Panchayati Raj institutions."
    },
    {
        question: "Who has the power to declare a national emergency in India?",
        options: ["Prime Minister", "President", "Parliament", "Cabinet"],
        correctOptionIndex: 1,
        category: "Politics",
        difficulty: "Easy",
        explanation: "The President of India has the power to declare a national emergency under Article 352."
    },
    {
        question: "The Directive Principles of State Policy are borrowed from which country's constitution?",
        options: ["USA", "UK", "Ireland", "France"],
        correctOptionIndex: 2,
        category: "Politics",
        difficulty: "Hard",
        explanation: "The Directive Principles of State Policy were borrowed from the Irish Constitution."
    },
    {
        question: "What is the quorum required for a meeting of the Lok Sabha?",
        options: ["1/5th of total members", "1/6th of total members", "1/10th of total members", "1/4th of total members"],
        correctOptionIndex: 2,
        category: "Politics",
        difficulty: "Hard",
        explanation: "The quorum for a Lok Sabha meeting is one-tenth (1/10th) of the total number of members."
    },
    {
        question: "Which schedule of the Indian Constitution deals with the languages?",
        options: ["7th Schedule", "8th Schedule", "9th Schedule", "10th Schedule"],
        correctOptionIndex: 1,
        category: "Politics",
        difficulty: "Medium",
        explanation: "The 8th Schedule of the Indian Constitution lists the 22 officially recognized languages."
    },
    {
        question: "The concept of Judicial Review in India is borrowed from which country?",
        options: ["United Kingdom", "United States", "Canada", "Australia"],
        correctOptionIndex: 1,
        category: "Politics",
        difficulty: "Medium",
        explanation: "The concept of Judicial Review is borrowed from the United States Constitution."
    }
];

const seedDatabase = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Clear existing questions
        await Question.deleteMany({});
        console.log('🗑️  Cleared existing questions');

        // Insert sample questions
        await Question.insertMany(sampleQuestions);
        console.log(`✅ Inserted ${sampleQuestions.length} sample questions`);

        // Show count by category
        const historyCount = await Question.countDocuments({ category: 'History' });
        const geographyCount = await Question.countDocuments({ category: 'Geography' });
        const politicsCount = await Question.countDocuments({ category: 'Politics' });

        console.log('\n📊 Questions by category:');
        console.log(`   History: ${historyCount}`);
        console.log(`   Geography: ${geographyCount}`);
        console.log(`   Politics: ${politicsCount}`);

        console.log('\n✅ Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
