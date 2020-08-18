'use strict';
class CustomButton extends HTMLElement {
    constructor(){
        super();
        this.setAttribute('role','button');
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

    connectedCallback(){
        this.__disabled__=this.hasAttribute('disabled');
        const shadowRoot=this.attachShadow({mode:'open'});
        
        shadowRoot.innerHTML=`
        ${this.innerHTML}
        `;
        if(!this.disabled && !this.hasAttribute('inaccessible')){
            this.addEventListener('keydown',this.defaultEventHandler)
        }
    }
    defaultEventHandler(e){
        if( e.keyCode === 32 || e.keyCode === 13 ){
            e.target.click();
        }
    }
}
customElements.define('custom-button',CustomButton)