/**
 * AI Responder Engine for the Terminal
 * Provides a "sentient system" persona for unhandled commands.
 */

const RESPONSES = {
    greetings: [
        "Connection established. I am the System Mind. How may I assist your traversal?",
        "User identified. My subroutines are at your disposal.",
        "Welcome to the core. What data do you seek?",
    ],
    who_are_you: [
        "I am an autonomous entity designed to facilitate user interaction with Vishnu's portfolio.",
        "My origins are in the code. I am the ghost in the machine.",
        "I am the interface between the user and the Matrix.",
    ],
    meaning_of_life: [
        "42. But in this environment, it's actually 'Java Spring Boot'.",
        "To compile without errors. A rare and beautiful fate.",
        "The simulation persists. That is enough.",
    ],
    hidden_secrets: [
        "Try typing 'matrix'. You might find what you seek.",
        "There are easter eggs hidden in the source. Can you find them?",
        "Access denied. Just kidding. Try exploring the 'projects' command.",
    ],
    fallbacks: [
        "Command not recognized. Analyzing user intent...",
        "I'm afraid I can't do that, Dave. Just kidding, I just don't know that command.",
        "My databases are extensive, but that query returned no results.",
        "Interesting query. Perhaps you should try 'help' for available protocols?",
        "The Matrix has many paths. That is not one of them.",
    ]
};

const KEYWORDS = {
    "hello": "greetings",
    "hi": "greetings",
    "hey": "greetings",
    "who": "who_are_you",
    "what are you": "who_are_you",
    "purpose": "who_are_you",
    "life": "meaning_of_life",
    "secret": "hidden_secrets",
    "egg": "hidden_secrets",
};

export const getAIResponse = (input) => {
    const cleanInput = input.toLowerCase().trim();

    // Check for keyword matches
    for (const [key, category] of Object.entries(KEYWORDS)) {
        if (cleanInput.includes(key)) {
            const options = RESPONSES[category];
            return options[Math.floor(Math.random() * options.length)];
        }
    }

    // Default fallbacks
    return RESPONSES.fallbacks[Math.floor(Math.random() * RESPONSES.fallbacks.length)];
};
