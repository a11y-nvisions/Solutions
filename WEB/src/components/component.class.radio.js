class CustomRadio extends HTMLElement{
    constructor(){
        super();
        this.name='';
        this.checked=false;
    }

    get __disabled__(){
        if(!this.hasAttribute('disabled')){
            return this.disabled;
        }else{
            return this.disabled;
        }
    }

    set __disabled__(val){
        if(!this.hasAttribute('inaccessible')){
            if(val == true){
                this.disabled=val; this.tabIndex=-1
                this.setAttribute('aria-disabled',val)
            }
            
            if(val == false){
                this.disabled=val; this.tabIndex=0;
                this.setAttribute('aria-disabled',val)
            }
        }else if( this.hasAttribute('inaccessible') ){
            if(val == true){
                this.disabled=val; this.tabIndex=-1
            }
            
            if(val == false){
                this.disabled=val; this.tabIndex=0;
            }
        }
    }
    
    set check(bool){
        if(this.__disabled__ == false){
            
            //check이 true 상태이면
            if(bool==true){
                this.setAttribute('checked','');
                this.setAttribute('tabindex','0');
                this.focus();
            }
            
            //check이 false상태이면
            if(bool==false){
                if(this.hasAttribute('checked')){
                    this.removeAttribute('checked');
                }
                //기본초점이 있다면 삭제
                if(this.hasAttribute('tabindex')){
                    if( this.getAttribute('tabindex') == '0' ){
                        this.setAttribute('tabindex','-1');
                        
                    }
                }
            }
            if( !this.hasAttribute('inaccessible') ){
            this.setAttribute('aria-checked',bool);
            }
        }
        this.checked=bool;
    }

    connectedCallback(){
        const root=this;
        this.__disabled__=this.hasAttribute('disabled');
        if(this.hasAttribute('name')){
            this.name=this.getAttribute('name')
            this.setAttribute('role','radio');
            const shadow=this.attachShadow({mode:'open'})
            shadow.innerHTML=`
                <style>
                ${RadioStyle}
                </style>
                <div class="radio wrap">
                    <div class="radio outerCircle">
                        <div class="radio innerCircle">
                        
                        <div>
                    <div>
                </div>
                `

            //디풀트로 checked가 지정되어있는 경우
            if( this.hasAttribute('checked') ){
                this.check=true;
            };
            
            const Group=document.querySelectorAll(`custom-radio[name="${this.name}"]:not([disabled])`)
            if(this.hasAttribute('id')){
                const labelElement=document.querySelectorAll(`label[for="${this.getAttribute('id')}"]`);
                let labelStrings='';
                for(let i=0; i<labelElement.length; i++){
                    labelElement[i].setAttribute('aria-hidden','true')
                    labelElement[i].addEventListener('click',function(){
                        const labelled = document.querySelector('#'+labelElement[i].getAttribute('for'))
                        labelled.click();
                        labelled.focus();
                    })
                    labelStrings+=labelElement[i].innerHTML;
                }
                this.setAttribute('aria-label',labelStrings);
            }
            
            
            for(let i=0; i<Group.length; i++){
                if(i<Group.length && !Group[i].hasAttribute('checked')){
                    Group[0].setAttribute('tabindex','0')
                }
            }
            
            
            if( !this.hasAttribute('disabled') ){
                this.addEventListener('click',defaultEventHandler);
                
                if(!this.hasAttribute('inaccessible')){
                    this.addEventListener('keydown',defaultEventHandler);
                }
            }
            

            function defaultEventHandler(e){
                const key={
                    next:[39,40],
                    prev:[37,38],
                    click:[32,13]
                }

                for(let i = 0; i<Group.length; i++){
                        if(e.type=='click'){
                            if(Group[i] != e.target){
                                Group[i].check=false;
                            }else{
                                Group[i].check=true;
                            }
                        }

                        const first=Group[0];
                        const last=Group[Group.length-1];
                        if(e.type=='keydown'){
                            if(e.keyCode == (key.click[0] || key.click[1])){
                                e.target.click();
								e.target.focus();
                            }
                            
                            if( (e.keyCode == key.prev[0]) || (e.keyCode == key.prev[1]) ){
                                if(e.target == first){
                                    last.click(); last.focus();
                                }else{
                                    if(Group[i] == e.target ){
                                        Group[i-1].click();
                                    }
                                }
                            }
                            if( (e.keyCode == key.next[0]) || (e.keyCode == key.next[1]) ){
                                if(e.target == last){
                                    first.click(); first.focus();
                                }else{
                                if(Group[i] == e.target ){
                                    Group[i+1].click();
                                }
                            }
                        }
                    }
                }
            }
        }else{
            const error=new Error('custom-radio must has name Attribute')
            console.error(error.stack)
        }
    }
 }

customElements.define('custom-radio',CustomRadio);