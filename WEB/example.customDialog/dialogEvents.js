const Q1UserName = document.querySelector('#WhatsYourName');
let Q1Dialog;
let greetingResult = document.querySelector('.greeting-result')
Q1UserName.addEventListener('click',function(){
    Q1Dialog=new Dialog({
        LangCode:'en',
        Type:2,
        ButtonText:{
            OK:'Answer Now',
            Cancel:'Answer Later',
            Ignore:'Ignore Question'
        },
        Title:"What's your name?",
        Content:`<div>
            <p class="centerParagraph" id="introduceDialog"><strong>Hello? I'm dialog! I want to know your name. Would I ask your name?</strong></p>
            <p class="centerParagraph"><label for="myName">My name is...</label> <input type="text" lang="en" placeholder="e.g. John Doe" id="myName" name="myName" aria-describedby="introduceDialog" />.</p>
        </div>`,
        CustomReturnFocusPoint:document.querySelector('.greeting-result'),
        DialogRoot:document.querySelector('.dialog-layerRoot'),
        PageWrapper:document.querySelector('.wrapper'),
        trueCallback:function(){
            greetingResult.innerHTML='You want to converse with me, press the dialog open button above.';
            const name = document.querySelector('#myName').value;
            if(name.length > 0){
                greetingResult.innerHTML=`
                    <h2>Hello! I'm very happy you tell your cool name for me.</h2>
                    <p>Nice to meet you, <strong>${name}</strong>. You've cool name!</p>
                `
            }else{
                greetingResult.innerHTML=`
                    <h2>You're not ready to conversation with me yet.</h2>
                    <p>I want to see you again, come here anytime when you're ready.</p>
                `
            }
        },
        falseCallback:function(){
            greetingResult.innerHTML=`
                <h2>You're not ready to conversation with me yet.</h2>
                <p>I want to see you again, come here anytime when you're ready.</p>
            `
        }
    })
})


const ja = document.querySelector('#sample_ja');
let JapaneseDialog;
const en = document.querySelector('#sample_en');
let EnglishDialog;
const ko = document.querySelector('#sample_ko');
let KoreanDialog;

ja.addEventListener('click',function(){
    JapaneseDialog=new Dialog({
        LangCode:'ja',
        DialogRoot:document.querySelector('.dialog-layerRoot'),
        PageWrapper:document.querySelector('.wrapper')
    })
})
en.addEventListener('click',function(){
    EnglishDialog=new Dialog({
        LangCode:'en',
        DialogRoot:document.querySelector('.dialog-layerRoot'),
        PageWrapper:document.querySelector('.wrapper')
    })
})
ko.addEventListener('click',function(){
    KoreanDialog=new Dialog({
        LangCode:'ko',
        DialogRoot:document.querySelector('.dialog-layerRoot'),
        PageWrapper:document.querySelector('.wrapper')
    })
})