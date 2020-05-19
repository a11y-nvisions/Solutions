var AnnounceOrientation=document.querySelector('.announce-orientation')
if(!document.body.contains(AnnounceOrientation)){
    var AnnounceOrientationArea = document.createElement('div')
    AnnounceOrientationArea.setAttribute('aria-live','assertive')
    AnnounceOrientationArea.classList.add('announce-orientation');
    AnnounceOrientationArea.classList.add('live');
    AnnounceOrientationArea.id='announce-orientation';
    document.body.appendChild(AnnounceOrientationArea)
}

class TabList extends HTMLDivElement{
    constructor(){
        super();
        this.setAttribute('role','tablist')
        this.TempId='temp'
        this.orientation= this.getAttribute('aria-orientation') == 'vertical' ? 'vertical' : 'horizontal';

        this.setAttribute('aria-orientation',this.orientation)
        const TempTabLists=document.querySelectorAll('div[is="tab-list"]:not([id])');
        for(let num=0; num<TempTabLists.length; num++){
            if(!this.id){
                TempTabLists[num].id=(this.TempId)+(num+1);
            }
        }
    }
}

class TabItem extends HTMLButtonElement{
    constructor(){
        super();
        const root = this;
        this.setAttribute('role','tab');
        this.panels=document.querySelector(`[panel-controller=${this.parentElement.id}]`).children;
        if( this.parentElement.getAttribute('is') === 'tab-list'){
            this.items=this.parentElement.querySelectorAll('button[is="tab-item"]');
            this.itemsTemp=this.parentElement.querySelectorAll('button[is="tab-item"]:not([id])');
        }

        this.index=Array.prototype.indexOf.call(this.parentElement.children,this);

        for(let num=0; num<this.itemsTemp.length; num++){
            this.itemsTemp[num].id=this.parentElement.id+'_tab_item'+(num+1);
            this.itemsTemp[num].setAttribute('aria-controls',this.parentElement.id+'_panel'+(num+1))
        }
        
        for(let num=0; num<this.items.length; num++){
            this.items[num].id=this.parentElement.id+'_tab_item'+(num+1);
        }

    }
    get __selected__(){
        return this.selected;
    }
    
    set __selected__(val){
        this.selected = val;
        this.setAttribute('aria-selected',true);
        this.setAttribute('tabindex',0);
        this.panels[this.index].classList.add('selected');
        localStorage['selected_'+this.parentElement.id+'_tab_id']=this.id;
        for (var i =0; i<this.panels.length; i++){
            if(i !== this.index){
                this.items[i].setAttribute('aria-selected',false);
                this.items[i].setAttribute('tabindex',-1);
                this.panels[i].classList.remove('selected');
            }
        }
    }

    connectedCallback(root=this){
        const LocalSaving=localStorage['selected_'+this.parentElement.id+'_tab_id'];
        let selectElement=document.querySelector('#'+LocalSaving);
        window.addEventListener('DOMContentLoaded',function(){
            if( LocalSaving && selectElement){
                selectElement.click();
            } else {
                selectElement = root.items[0];
                selectElement.click();
            }
        })

        this.addEventListener('focusin',announceOrientationHandler);
        this.addEventListener('click',tabClickHandler)
        this.addEventListener('keyup',tabKeyboardHandler) 

        function tabClickHandler(e){
            if (e.type == 'click'){
                this.__selected__=true;
            }
        }

        function announceOrientationHandler(e){
            const orientationMessage = this.parentElement.getAttribute('aria-orientation') == 'vertical' ? ', 수직 탭 요소입니다. 다음 탭으로 전환하려면 아래, 이전 탭으로 전환하려면 위 화살표 키를 누르십시오.' : ', 수평 탭 요소입니다. 다음 탭으로 전환하려면 오른쪽, 이전 탭으로 전환하려면 왼쪽 화살표 키를 누르십시오.'
            if(e.type == 'focusin'){
                setTimeout(function(){
                    AnnounceOrientationArea.innerHTML=orientationMessage;
                },200)
                setTimeout(function(){
                AnnounceOrientationArea.innerHTML='';
                },300)
            }
        }

        function tabKeyboardHandler(e){
            const index = Array.prototype.indexOf.call(root.items,this);
            const keys={
                selectNext:this.parentElement.orientation == 'vertical' ? 'ArrowDown' : 'ArrowRight',
                selectPrev:this.parentElement.orientation == 'vertical' ? 'ArrowUp' : 'ArrowLeft',
                selectFirst:'Home',
                selectEnd:'End'
            }
    
            const keyHandleInfo={
                nxt:root.items[(this.index+1)],
                prv:root.items[(this.index-1)],
                fst:root.items[0],
                end:root.items[root.items.length-1]
            }
            if(e.type === 'keyup' ){
                if(e.key == keys.selectNext){
                    if(typeof keyHandleInfo.nxt == 'undefined'){
                        keyHandleInfo.fst.__selected__=true;
                        keyHandleInfo.fst.focus();
                    }else{
                        keyHandleInfo.nxt.__selected__=true;
                        keyHandleInfo.nxt.focus();
                    }
                }
                if(e.key == keys.selectPrev){
                    if(typeof keyHandleInfo.prv == 'undefined'){
                        keyHandleInfo.end.__selected__=true;
                        keyHandleInfo.end.focus();
                    }else{
                        keyHandleInfo.prv.__selected__=true;
                        keyHandleInfo.prv.focus();
                    }
                }


                if(e.key == keys.selectFirst){
                    keyHandleInfo.fst.__selected__=true;
                    keyHandleInfo.fst.focus();
                }
                if(e.key == keys.selectEnd){
                    keyHandleInfo.end.__selected__=true;
                    keyHandleInfo.end.focus();
                }
            }
        }
    }
}

class PanelList extends HTMLDivElement {
    constructor(){
        super();
        if(this.hasAttribute('panel-controller')){
            this.controller=this.getAttribute('panel-controller');
            this.controllerElement=document.querySelector(`#${this.controller}`);
        }else{
            return console.error(`Please make sure panel list connect to tablist container's html identify.`)
        }
        if(this.children.length < this.controllerElement.children.length ){
            return console.error(`The number of panel elements is less than the number of tab-items, This panel-list needs to create ${Math.abs(this.children.length-this.controllerElement.children.length)} of panel div elements more. Please create more panels div elements inside the panel-list container as much as the number of tab items`);
        }else if(this.children.length > this.controllerElement.children.length){
            return console.error(`The number of panel elements is more than tab item elements, Please delete panels div elements as many as exceeded from inside the panel-list container according to the number of tab items`)
        }

        this.panels=this.children;
        for(let i=0; i<this.panels.length; i++){
            this.panels[i].id=this.controller+'_panel'+(i+1)
            this.panels[i].setAttribute('aria-labelledby',`${this.controller}_items${i+1}`);
            this.panels[i].setAttribute('role','tabpanel');
            this.panels[i].setAttribute('tabindex','0');
            if(this.controllerElement.getAttribute('aria-orientation') == 'vertical' ){
                new SimpleBar(this.panels[i]);
            }
        }
    }
}

customElements.define('tab-list',TabList,{extends:'div'})
customElements.define('tab-item',TabItem,{extends:'button'})
customElements.define('panel-list',PanelList,{extends:'div'})