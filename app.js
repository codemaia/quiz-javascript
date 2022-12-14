const correctAnswer = ['C', 'D', 'C', 'B'];

const form = document.querySelector('form');
const pEn = document.querySelectorAll('#enus');
const pPt = document.querySelectorAll('#ptbr');
const labelEn = document.querySelector('.translate-en');
const labelPt = document.querySelector('.translate-pt');
const popup = document.querySelector('.popup-wrapper');
const popupContent = document.querySelector('.popup-content');
let idSetInterval;


//functions
const removeClasses = (element, className) => {
    element.classList.remove(className);
};


const translateForEnglish = () => {

    //maybe function
     pEn.forEach(p => {
        removeClasses(p, 'hidden')
    });

    pPt.forEach(p => {
        p.classList.add('hidden');
    });
    
};


const translateForPortuguese = () => {

    //maybe function
    pPt.forEach(p => {
        removeClasses(p, 'hidden');
    });

    pEn.forEach(p => {
        p.classList.add('hidden');
    });

};


const closeThePopup = event => {

    const getClassClicked = event.target.classList[0];

    if (getClassClicked !== null) {
        popup.classList.add('hidden');
    }

    document.location.reload(true);
    
};


const printResult = (paragrah, msg) => {
    paragrah.textContent = msg;
};



const resultAnswers = () => {
    let scoreUser = 0;

    const answerUser = [
        form.inputQuestion1.value,
        form.inputQuestion2.value,
        form.inputQuestion3.value,
        form.inputQuestion4.value
    ];

    answerUser.forEach((answer, index) => {
        
        if (answer === correctAnswer[index]) {
            scoreUser += 25;
        }

    });

    return scoreUser;
};



const logicOfQuiz = event => {
    event.preventDefault();
    
    resultAnswers();


    const popupContentParagraphPt = popupContent.childNodes[3];
    const popupContentParagraphEn = popupContent.childNodes[5];
    let count = 0;    

    
    if (resultAnswers() === 0) {
        
       removeClasses(popup, 'hidden');
       printResult(popupContentParagraphPt, `Calma jovem, tenta de novo <3! Voc?? n??o acertou nenhuma alternativa, mas n??o significa nada! =)`)
       printResult(popupContentParagraphEn, `Your score is 0 :(`); 
    

    } else if (resultAnswers() === 25) {
        
        removeClasses(popup, 'hidden');

        idSetInterval = setInterval(() => {

            if(resultAnswers() === count) {
                clearInterval(idSetInterval);
            }

            printResult(popupContentParagraphPt, `Boa, ${count}% do quiz! mas da pra melhorar!`);
            printResult(popupContentParagraphEn, `Nice, your score is ${count}% of the quiz!`);

            count++;

        }, 10);


    } else if (resultAnswers() === 50) {

        removeClasses(popup, 'hidden')

        idSetInterval = setInterval(() => {

            if (resultAnswers() === count) {
                clearInterval(idSetInterval);
            }

            printResult(popupContentParagraphPt, `Muito bom, ${count}% do quiz! Vamo que da pra fechar o quiz!`);
            printResult(popupContentParagraphEn, `Very good, your score is ${count}% of the quiz!`);

            count++

        }, 10);

    } else if (resultAnswers() === 75) {

        removeClasses(popup, 'hidden');
        
        idSetInterval = setInterval(() => {

            if (resultAnswers() === count) {
                clearInterval(idSetInterval);
            }

            printResult(popupContentParagraphPt, `Show, acertou ${count}%! Quase perfeito hein?! Vamo acertar tudo agora?`);
            printResult(popupContentParagraphEn, `Good job! Your score is ${count}% of the quiz!`);

            count++

        }, 10);

    } else {

        removeClasses(popup, 'hidden');

        idSetInterval = setInterval(() => {
            
            if (resultAnswers() === count) {
                clearInterval(idSetInterval);
            }
            
            printResult(popupContentParagraphPt, `Perfeito! voc?? acertou ${count}% do quiz`);
            printResult(popupContentParagraphEn, `Perfect! ${count}% of the quiz`);

            count++

        }, 10);

    };

    scrollTo(0,0);
};



// refactored
labelEn.addEventListener('click', translateForEnglish);

labelPt.addEventListener('click', translateForPortuguese);

form.addEventListener('submit', logicOfQuiz);



/** close popup */
popup.addEventListener('click', closeThePopup);