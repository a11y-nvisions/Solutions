'use strict';
let pageDirectory=location.pathname.split('/');
let CURRENT_DIR=pageDirectory[pageDirectory.length-2];
let temp=``;
temp+=`
<ul aria-label="해결방안 카테고리" data-simplebar data-simplebar-scrollbar-min-size="8">`
for(let i = 0; i<SolutionPage.length; i++){
    temp+=`<li><strong aria-hidden="true" id="GroupHeader${i+1}">${SolutionPage[i].GroupName}</strong>`
    for(let c in SolutionPage[i] ){
        if( SolutionPage[i][c] instanceof Array){
            temp+=`<ul aria-labelledby="GroupHeader${i+1}">`
            for(let j=0; j<SolutionPage[i][c].length; j++){
                if(SolutionPage[i][c][j]["STATE"] === 'OPEN' ){
               temp+=`<li><a href="${SolutionPage[i][c][j]["URL"]}">${SolutionPage[i][c][j]["TEXT"]}</a></li>`
                }
            }
            temp+='</ul>'
        }
    }
    temp+='</li>'
}
temp+=`</ul>`
const GNB=document.querySelector('.GNB');
GNB.innerHTML=temp;

const links=GNB.querySelectorAll('a');
for(let i=0; i<links.length; i++){
    if( links[i].href.indexOf(CURRENT_DIR) != -1){
        links[i].setAttribute('aria-current','page');
    }
}