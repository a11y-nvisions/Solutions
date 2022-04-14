'use strict';
class AccordionButton extends CustomButton{
    constructor(){
        super();

        this.stats={
            target:document.querySelector(this.getAttribute('control-target')),
            state:false
        }

        if(this.hasAttribute('aria-expanded')==false){
            
				this.__state__=false;
				
        }

        this.addEventListener('click',this.accordionHandler)
    
    }

    get __state__(){
        return this.stats.state;
    }

    set __state__(val){
        
			this.stats.state=val;
			if(!this.hasAttribute('inaccessible')){
				this.setAttribute('aria-expanded',this.stats.state);
		}
		this.stats.target.setAttribute('show',this.stats.state);
    }

    set toggleState(val){
        if(val == true){
            this.__state__=false;
        }else if(val == false ){
            this.__state__=true;
        }
    }

    accordionHandler(e,root=this){
        root.toggleState=root.stats.state;
    }
}

customElements.define('expand-button',AccordionButton)