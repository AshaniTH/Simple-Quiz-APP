const questions = [
    {
        question:"What is the fundamental concept of Object-Oriented Programming?",
        answers:[
            {text: "Functions", correct: false},
            {text: "Class and Objects", correct: true},
            {text: "Loops", correct: false},
            {text: "Arrays", correct: false},
        ]
    },
    {
      
        question:"Which of the following is not a feature of OOP in Java?",
        answers:[
            {text: "Encapsulation", correct: false},
            {text: "Polymorphism", correct: false},
            {text: "Inheritance", correct: false},
            {text: "Compilation", correct: true},
        ]  
    },

{

    
    question:"In Java, what is the correct syntax to declare a class?",
    answers:[
        {text: "class MyClass { }", correct: true},
        {text: "public void MyClass() { }", correct: false},
        {text: "define MyClass { }", correct: false},
        {text: "create MyClass { }", correct: false},
    ]
},

{
    
    question:"What is the purpose of encapsulation in OOP?",
    answers:[
        {text: "To allow direct access to all data members", correct: false},
        {text: "To hide the internal details and protect object integrity", correct: true},
        {text: " To execute multiple methods simultaneously", correct: false},
        {text: "To define the parent-child relationship between classes", correct: false},
    ]
},

{
    
    question:"Which of the following statements about inheritance in Java is true?",
    answers:[
        {text: " Java allows multiple inheritance.", correct: false},
        {text: "A class can inherit multiple interfaces but only one class.", correct: true},
        {text: "Private methods can be inherited.", correct: false},
        {text: "Inheritance breaks encapsulation.", correct: false},
    ]
},

{
    
    question:"What is polymorphism in OOP?",
    answers:[
        {text: "The ability of a class to have only one method", correct: false},
        {text: "The ability of a variable or method to take on multiple forms", correct: true},
        {text: "The process of defining multiple classes", correct: false},
        {text: "The process of breaking down large problems", correct: false},
    ]
},

{
    
    question:"Which of the following is an example of method overloading in Java?",
    answers:[
        {text: "Two methods with the same name but different parameter types", correct: true},
        {text: " Two methods with the same name and same parameters", correct: false},
        {text: "Two methods in different classes with the same name", correct: false},
        {text: "A method inside a class calling another method", correct: false},
    ]
},

{
    
    question:"Which keyword is used in Java to inherit a class?",
    answers:[
        {text: "implements", correct: false},
        {text: "inherits", correct: false},
        {text: "extends", correct: true},
        {text: "derives", correct: false},
    ]
},

{
    
    question:"What is the purpose of the super keyword in Java?",
    answers:[
        {text: "It is used to create objects of a class.", correct: false},
        {text: "It initializes static variables.", correct: false},
        {text: "It initializes static variables.", correct: false},
        {text: " It refers to the immediate parent class constructor or method.", correct: true},
    ]
},

{
    
    question:"Which of the following is an example of an abstract class in Java?",
    answers:[
        {text: "class A {}", correct: false},
        {text: "public abstract class B { abstract void display(); }", correct: true},
        {text: "interface C { void display(); }", correct: false},
        {text: "public class D { void show() { } }", correct: false},
    ]
}
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;
 
function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". "+ currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);



        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);

    });

    const buttons = document.querySelectorAll(".btn"); // Select all answer buttons
    buttons.forEach(button => {
        if (button.innerHTML === "Answer 1" || 
            button.innerHTML === "Answer 2" || 
            button.innerHTML === "Answer 3" || 
            button.innerHTML === "Answer 4") {
            button.style.display = 'none';  // Hide these specific buttons
        }
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();

    }
    else{
        showScore();
    }
}
nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})
startQuiz();


