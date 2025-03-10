

class Quiz {
    questions: { question: string; choices: string[]; correctAnswer: string }[];
    currentIndex: number;
    score: number;
    isAnswered: boolean;

    constructor(questions: { question: string; choices: string[]; correctAnswer: string }[]) {
        this.questions = questions;
        this.currentIndex = 0;
        this.score = 0;
        this.isAnswered = false;
    }

    getCurrentQuestion(): { question: string; choices: string[]; correctAnswer: string } {
        return this.questions[this.currentIndex];
    }

    displayQuestion(): void {
        const currentQuestion = this.getCurrentQuestion();
        const questionDisplay = document.getElementById('question-display')!;
        const answerButtons = document.getElementById('answer-buttons')!;
        const nextButton = document.getElementById('next-button')!;

        questionDisplay.innerText = currentQuestion.question;
        answerButtons.innerHTML = ''; 

        currentQuestion.choices.forEach(choice => {
            const button = document.createElement('button');
            button.className = 'btn btn-secondary mb-2';
            button.innerText = choice;
            button.onclick = () => this.handleAnswer(choice, button);
            answerButtons.appendChild(button);
        });

        nextButton.style.display = 'none';  
    }

    handleAnswer(answer: string, button: HTMLButtonElement): void {
        
        const buttons = document.querySelectorAll('.btn-secondary');
        buttons.forEach(button => button.classList.remove('active'));

        
        button.classList.add('active');

        this.isAnswered = true; 

        const nextButton = document.getElementById('next-button')!;
        nextButton.style.display = 'inline-block'; 
    }

    nextQuestion(): void {
        const selectedButton = document.querySelector('.btn-secondary.active') as HTMLButtonElement;

        if (selectedButton) {
            const answer = selectedButton.innerText; 
            const currentQuestion = this.getCurrentQuestion();

            
            if (answer === currentQuestion.correctAnswer) {
                this.score++;
            }
        }

        this.isAnswered = false; 
        this.currentIndex++;

        if (this.currentIndex < this.questions.length) {
            this.displayQuestion(); 
        } else {
            this.showFinalScore(); 
        }
    }

    showFinalScore(): void {
        const finalScoreDisplay = document.getElementById('score-display')!;
        const finalScore = document.getElementById('final-score')!;
        finalScore!.innerText = this.score.toString();
        finalScoreDisplay.style.display = 'block';
    }

    startQuiz(): void {
        const startButton = document.getElementById('start-quiz-button')!;
        startButton.style.display = 'none';  
        this.displayQuestion(); 
    }
}

// Initialize questions
const questions = [
    {
        question: 'What is the capital of France?',
        choices: ['Berlin', 'Madrid', 'Paris', 'Rome'],
        correctAnswer: 'Paris'
    },
    {
        question: 'What is 2 + 2?',
        choices: ['3', '4', '5', '6'],
        correctAnswer: '4'
    },
    {
        question: 'Which planet is known as the Red Planet?',
        choices: ['Earth', 'Mars', 'Jupiter', 'Venus'],
        correctAnswer: 'Mars'
    },
    {
        question: 'What is the largest mammal on Earth?',
        choices: ['Elephant', 'Blue Whale', 'Giraffe', 'Shark'],
        correctAnswer: 'Blue Whale'
    },
    {
        question: 'Which gas do plants absorb from the atmosphere?',
        choices: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen'],
        correctAnswer: 'Carbon Dioxide'
    },
    {
        question: 'Who wrote the play "Romeo and Juliet"?',
        choices: ['William Shakespeare', 'Charles Dickens', 'Jane Austen', 'Leo Tolstoy'],
        correctAnswer: 'William Shakespeare'
    },
    {
        question: 'What is the capital of Japan?',
        choices: ['Beijing', 'Seoul', 'Tokyo', 'Bangkok'],
        correctAnswer: 'Tokyo'
    },
    {
        question: 'Which programming language is used for web development?',
        choices: ['Python', 'C++', 'JavaScript', 'Swift'],
        correctAnswer: 'JavaScript'
    },
    {
        question: 'What is the square root of 64?',
        choices: ['6', '7', '8', '9'],
        correctAnswer: '8'
    },
    {
        question: 'Which ocean is the largest by surface area?',
        choices: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
        correctAnswer: 'Pacific Ocean'
    },
    {
        question: 'What is the chemical symbol for Gold?',
        choices: ['Au', 'Ag', 'Pb', 'Fe'],
        correctAnswer: 'Au'
    },
    {
        question: 'Who developed the theory of relativity?',
        choices: ['Isaac Newton', 'Albert Einstein', 'Galileo Galilei', 'Nikola Tesla'],
        correctAnswer: 'Albert Einstein'
    },
    {
        question: 'Which country is famous for the Great Wall?',
        choices: ['India', 'China', 'Japan', 'Egypt'],
        correctAnswer: 'China'
    },
    {
        question: 'How many continents are there on Earth?',
        choices: ['5', '6', '7', '8'],
        correctAnswer: '7'
    },
    {
        question: 'Which animal is known as the King of the Jungle?',
        choices: ['Tiger', 'Elephant', 'Lion', 'Cheetah'],
        correctAnswer: 'Lion'
    }
];



const quiz = new Quiz(questions);


function startQuiz() {
    quiz.startQuiz();
}


function nextQuestion() {
    if (quiz.isAnswered) {
        quiz.nextQuestion();
    }
}
