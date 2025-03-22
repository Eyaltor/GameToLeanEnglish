// Game content
const gameContent = {
    animals: [
        { word: 'Dog', emoji: '🐶', sound: 'woof' },
        { word: 'Cat', emoji: '🐱', sound: 'meow' },
        { word: 'Bird', emoji: '🐦', sound: 'tweet' },
        { word: 'Fish', emoji: '🐠', sound: 'blub' },
        { word: 'Lion', emoji: '🦁', sound: 'roar' },
        { word: 'Elephant', emoji: '🐘', sound: 'trumpet' },
        { word: 'Monkey', emoji: '🐵', sound: 'ooh ooh' },
        { word: 'Penguin', emoji: '🐧', sound: 'squawk' },
        { word: 'Rabbit', emoji: '🐰', sound: 'squeak' },
        { word: 'Tiger', emoji: '🐯', sound: 'roar' },
        { word: 'Bear', emoji: '🐻', sound: 'growl' },
        { word: 'Pig', emoji: '🐷', sound: 'oink' },
        { word: 'Duck', emoji: '🦆', sound: 'quack' },
        { word: 'Giraffe', emoji: '🦒', sound: 'hum' },
        { word: 'Zebra', emoji: '🦓', sound: 'neigh' },
        { word: 'Panda', emoji: '🐼', sound: 'squeak' },
        { word: 'Hippo', emoji: '🦛', sound: 'grunt' },
        { word: 'Koala', emoji: '🐨', sound: 'growl' },
        { word: 'Mouse', emoji: '🐭', sound: 'squeak' },
        { word: 'Horse', emoji: '🐴', sound: 'neigh' },
        { word: 'Cow', emoji: '🐮', sound: 'moo' },
        { word: 'Sheep', emoji: '🐑', sound: 'baa' },
        { word: 'Fox', emoji: '🦊', sound: 'yip' },
        { word: 'Owl', emoji: '🦉', sound: 'hoot' }
    ],
    colors: [
        { word: 'Red', image: './images/red.html' },
        { word: 'Blue', image: './images/blue.html' },
        { word: 'Green', image: './images/green.html' },
        { word: 'Yellow', image: './images/yellow.html' },
        { word: 'Purple', image: './images/purple.html' },
        { word: 'Orange', image: './images/orange.html' },
        { word: 'Pink', image: './images/pink.html' },
        { word: 'Brown', image: './images/brown.html' }
    ],
    numbers: [
        { word: 'One', number: '1' },
        { word: 'Two', number: '2' },
        { word: 'Three', number: '3' },
        { word: 'Four', number: '4' },
        { word: 'Five', number: '5' },
        { word: 'Six', number: '6' },
        { word: 'Seven', number: '7' },
        { word: 'Eight', number: '8' },
        { word: 'Nine', number: '9' },
        { word: 'Ten', number: '10' },
        { word: 'Eleven', number: '11' },
        { word: 'Twelve', number: '12' },
        { word: 'Thirteen', number: '13' },
        { word: 'Fourteen', number: '14' },
        { word: 'Fifteen', number: '15' },
        { word: 'Sixteen', number: '16' },
        { word: 'Seventeen', number: '17' },
        { word: 'Eighteen', number: '18' },
        { word: 'Nineteen', number: '19' },
        { word: 'Twenty', number: '20' }
    ]
};

// Initialize speech synthesis
let currentVoices = [];
let preferredGender = 'female'; // Default to female voice
let speech = new SpeechSynthesisUtterance();
speech.lang = 'en-US'; // Specifically set to US English
speech.rate = 0.85; // Slightly faster but still clear
speech.pitch = 1.0; // Natural pitch

// Function to update voice based on gender preference
function updateVoice() {
    const voices = window.speechSynthesis.getVoices();
    
    // Filter for natural-sounding American voices
    const naturalVoices = voices.filter(voice => {
        const voiceName = voice.name.toLowerCase();
        return (voice.lang === 'en-US' || voice.lang.startsWith('en-US')) && 
               !voiceName.includes('uk') &&
               !voiceName.includes('british');
    });

    // Try to find a voice matching the preferred gender
    let matchingVoice = naturalVoices.find(voice => {
        const voiceName = voice.name.toLowerCase();
        if (preferredGender === 'male') {
            return (voiceName.includes('male') || 
                   voiceName.includes('guy') ||
                   voiceName.includes('alex') ||
                   voiceName.includes('david') || 
                   voiceName.includes('james') || 
                   voiceName.includes('john'));
        } else {
            return (voiceName.includes('female') || 
                   voiceName.includes('girl') ||
                   voiceName.includes('samantha') || 
                   voiceName.includes('victoria') ||
                   voiceName.includes('karen') || 
                   voiceName.includes('sarah') ||
                   voiceName.includes('sandy'));
        }
    });

    // If no matching voice found, try Microsoft voices
    if (!matchingVoice) {
        matchingVoice = voices.find(voice => {
            const voiceName = voice.name.toLowerCase();
            if (preferredGender === 'female') {
                return voiceName.includes('microsoft') && 
                       (voiceName.includes('zira') || 
                        voiceName.includes('aria'));
            } else {
                return voiceName.includes('microsoft') && 
                       voiceName.includes('david');
            }
        });
    }

    // Final fallback to any US English voice
    if (!matchingVoice) {
        matchingVoice = voices.find(voice => voice.lang === 'en-US');
    }

    if (matchingVoice) {
        speech.voice = matchingVoice;
        // Adjust parameters based on voice type
        if (matchingVoice.name.toLowerCase().includes('microsoft')) {
            speech.rate = 0.9; // Slightly faster for Microsoft voices
            speech.pitch = 1.1; // Slightly higher pitch
        } else {
            speech.rate = 0.85;
            speech.pitch = 1.0;
        }
        console.log('Selected voice:', matchingVoice.name, matchingVoice.lang);
    }
}

// Set up voice handling
if (window.speechSynthesis) {
    // Initial voice load
    window.speechSynthesis.onvoiceschanged = () => {
        currentVoices = window.speechSynthesis.getVoices();
        updateVoice();
    };
    
    // Try to load voices immediately in case they're already available
    if (window.speechSynthesis.getVoices().length > 0) {
        currentVoices = window.speechSynthesis.getVoices();
        updateVoice();
    }
}

// Function to set voice gender
function setVoiceGender(gender) {
    preferredGender = gender;
    updateVoice();
    
    // Update button styles
    document.getElementById('femaleVoice').classList.toggle('active', gender === 'female');
    document.getElementById('maleVoice').classList.toggle('active', gender === 'male');
    
    // Test the voice change with a more American greeting
    speech.text = "Hi there!";
    window.speechSynthesis.speak(speech);
}

// Function to show category
function showCategory(category) {
    const gameArea = document.getElementById('game-area');
    gameArea.innerHTML = ''; // Clear previous content

    // Create cards for the selected category
    gameContent[category].forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        
        if (category === 'colors') {
            // For colors, create a div with background color
            const colorBox = document.createElement('div');
            colorBox.style.width = '100%';
            colorBox.style.height = '150px';
            colorBox.style.backgroundColor = item.word.toLowerCase();
            colorBox.style.borderRadius = '10px';
            card.appendChild(colorBox);
        } else if (category === 'numbers') {
            // For numbers, create a div with large, colorful number
            const numberBox = document.createElement('div');
            numberBox.style.width = '100%';
            numberBox.style.height = '150px';
            numberBox.style.display = 'flex';
            numberBox.style.alignItems = 'center';
            numberBox.style.justifyContent = 'center';
            numberBox.style.fontSize = '100px';
            numberBox.style.fontWeight = 'bold';
            numberBox.style.color = '#FF6B6B';
            numberBox.style.fontFamily = "'Comic Sans MS', cursive, sans-serif";
            numberBox.style.textShadow = '2px 2px 4px rgba(0,0,0,0.2)';
            numberBox.textContent = item.number;
            card.appendChild(numberBox);
        } else if (category === 'animals') {
            // For animals, create a div with large emoji and sound icon
            const animalBox = document.createElement('div');
            animalBox.style.width = '100%';
            animalBox.style.height = '150px';
            animalBox.style.display = 'flex';
            animalBox.style.alignItems = 'center';
            animalBox.style.justifyContent = 'center';
            animalBox.style.fontSize = '100px';
            animalBox.textContent = item.emoji;
            card.appendChild(animalBox);

            // Add sound icon
            const soundIcon = document.createElement('div');
            soundIcon.innerHTML = '🔊';
            soundIcon.style.position = 'absolute';
            soundIcon.style.top = '10px';
            soundIcon.style.right = '10px';
            soundIcon.style.fontSize = '24px';
            soundIcon.style.cursor = 'pointer';
            soundIcon.style.padding = '5px';
            soundIcon.style.borderRadius = '50%';
            soundIcon.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
            soundIcon.style.transition = 'transform 0.2s';
            
            soundIcon.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent card click event
                const utterance = new SpeechSynthesisUtterance(item.sound);
                utterance.voice = speech.voice;
                utterance.rate = speech.rate;
                utterance.lang = speech.lang;
                window.speechSynthesis.speak(utterance);
                
                // Add animation
                soundIcon.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    soundIcon.style.transform = 'scale(1)';
                }, 200);
            });
            
            card.appendChild(soundIcon);
        }
        
        const span = document.createElement('span');
        span.textContent = item.word;
        card.appendChild(span);
        
        // Add click event to play word
        card.addEventListener('click', () => {
            // Create a new utterance for each speak event
            const utterance = new SpeechSynthesisUtterance(item.word);
            utterance.voice = speech.voice;
            utterance.rate = speech.rate;
            utterance.lang = speech.lang;
            
            window.speechSynthesis.speak(utterance);
            
            // Add animation
            card.style.transform = 'scale(1.1)';
            setTimeout(() => {
                card.style.transform = 'scale(1)';
            }, 200);
        });
        
        gameArea.appendChild(card);
    });
}

// Show animals category by default
showCategory('animals'); 