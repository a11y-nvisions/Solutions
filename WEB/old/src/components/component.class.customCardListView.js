'use strict'

class CardListView extends HTMLElement{
    constructor(){
        super();
    }
    
    __init__(){
        this.setAttribute('role',"list");
        this.setAttribute('aria-roleDescription','카드 목록');
        const listItems = this.querySelectorAll('card-li')
        for (let i = 0; i < listItems.length; i++) {
            const elem = listItems[i];
            elem.setAttribute('aria-posinset',(i+1));       
        }
    }

    connectedCallback(){
        this.__init__();
    }
}customElements.define('card-list',CardListView)
class CardListItems extends HTMLElement{
    constructor(){
        super();
    }

    setLevel(){
        const parents=getParentElements(this);
        let ListParents=[];
        for (let i = 0; i < parents.length; i++) {
            const element = parents[i];
            if(element.constructor === CardListView){
                ListParents.push(element)
                element.setAttribute('data-depth-level',(i+1))
            }
        }
        this.setAttribute('aria-level', ListParents.length);
    }

    __init__(){
        this.setAttribute('role','listitem');
        this.setAttribute('aria-roledescription','카드 항목');
        this.setLevel();
    }

    connectedCallback(){
        this.__init__();
    }

    
}customElements.define('card-li',CardListItems)

function getParentElements(elem){
    const parents = [];
    let node = elem;
    while(node != document){
        parents.push(node.parentNode);
        node = node.parentNode;
    }
    return parents;
}
const flipItems = document.querySelectorAll('card-li')
for (let i = 0; i < flipItems.length; i++) {
    let element = flipItems[i];
    if(!element.querySelector('.flip-wrapper').classList.contains('front') || !element.querySelector('.flip-wrapper').classList.contains('back')){
        element.querySelector('.flip-wrapper').classList.add('front');
    }

    const FlipContentScroller = element.querySelectorAll('.scroller');
    if( FlipContentScroller.length > 0){
        for (let el = 0; el < FlipContentScroller.length; el++) {
            const element = FlipContentScroller[el];
            document.addEventListener('DOMContentLoaded',function(){
                const scrollbox = new SimpleBar(element);
                const scroller = scrollbox.getScrollElement();
                scroller.setAttribute('tabindex',-1)
                
            })
        }
    }

    const flipButton = document.createElement('button');
    element.appendChild(flipButton);
    flipButton.classList.add('btn_flip')
    flipButton.setAttribute('aria-label','뒷면으로 뒤집어 보기')
    flipButton.addEventListener('click',function(){
        flipHandler();
    })

}

function flipHandler(){
        const flipWrapper = event.target.parentElement.querySelector('.flip-wrapper');
        flipWrapper.classList.contains('front') ? 
        (
            flipWrapper.classList.replace('front','back'),
            event.target.setAttribute('aria-label','앞면으로 뒤집어 보기'),
            flipWrapper.querySelector('.flipped-content .scroller .simplebar-content-wrapper').focus()
        ) : flipWrapper.classList.contains('back') ? (
            flipWrapper.classList.replace('back','front'),
            event.target.setAttribute('aria-label','뒷면으로 뒤집어 보기'),
            flipWrapper.querySelector('.title-side .scroller .simplebar-content-wrapper').focus()
        )
    : false;
}