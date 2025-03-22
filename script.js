// Game content
const gameContent = {
    animals: [
        { word: 'Dog', emoji: '🐶' },
        { word: 'Cat', emoji: '🐱' },
        { word: 'Bird', emoji: '🐦' },
        { word: 'Fish', emoji: '🐠' },
        { word: 'Lion', emoji: '🦁' },
        { word: 'Elephant', emoji: '🐘' },
        { word: 'Monkey', emoji: '🐵' },
        { word: 'Penguin', emoji: '🐧' }
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
        { word: 'Eight', number: '8' }
    ]
};

// Initialize speech synthesis
const speech = new SpeechSynthesisUtterance();
speech.lang = 'en-US';
speech.rate = 0.8; // Slower rate for better understanding

let currentVoices = [];
let preferredGender = 'female'; // Default to female voice

// Function to update voice based on gender preference
function updateVoice() {
    const voices = currentVoices;
    // Try to find a voice matching the preferred gender
    const preferredVoice = voices.find(voice => 
        voice.name.toLowerCase().includes(preferredGender) && 
        voice.lang.startsWith('en-')
    ) || voices.find(voice => 
        voice.lang.startsWith('en-')
    ); // Fallback to any English voice
    
    if (preferredVoice) {
        speech.voice = preferredVoice;
    }
}

// Set up voice handling
window.speechSynthesis.onvoiceschanged = () => {
    currentVoices = window.speechSynthesis.getVoices();
    updateVoice();
};

// Function to set voice gender
function setVoiceGender(gender) {
    preferredGender = gender;
    updateVoice();
    
    // Update button styles
    document.getElementById('femaleVoice').classList.toggle('active', gender === 'female');
    document.getElementById('maleVoice').classList.toggle('active', gender === 'male');
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
            // For animals, create a div with large emoji
            const animalBox = document.createElement('div');
            animalBox.style.width = '100%';
            animalBox.style.height = '150px';
            animalBox.style.display = 'flex';
            animalBox.style.alignItems = 'center';
            animalBox.style.justifyContent = 'center';
            animalBox.style.fontSize = '100px';
            animalBox.textContent = item.emoji;
            card.appendChild(animalBox);
        }
        
        const span = document.createElement('span');
        span.textContent = item.word;
        card.appendChild(span);
        
        // Add click event to play word
        card.addEventListener('click', () => {
            speech.text = item.word;
            window.speechSynthesis.speak(speech);
            
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