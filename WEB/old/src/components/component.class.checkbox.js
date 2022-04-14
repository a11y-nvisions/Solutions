class Custom_Checkbox extends HTMLElement {
    constructor(){
        super();
        this.states={
            checked:false,
            disabled:false
        }

        this.__init__();
        this.addEventListener('click',function(){
            if(!this.disabled){
                this.checked = !this.checked;
                }
            })
            this.addEventListener('keyup',function(e){
                if(!this.disabled){
                    e.keyCode===32 ? this.click() : false;
                }
            })
    }

    __init__(root=this){
        this.setAttribute('role','checkbox');
        this.disabled = ToBoolean(this.getAttribute('aria-disabled'));
        this.checked = this.getAttribute('aria-checked') === 'mixed' ? 'mixed' : ToBoolean(this.getAttribute('aria-checked'));
        this.label = document.querySelectorAll('[data-for="'+this.id+'"]');
        this.label.length > 0 ? (
            this.setAttribute('aria-label',this.label[this.label.length-1].textContent),
                !this.disabled ? (
                    this.label[this.label.length-1].addEventListener('click',function(){
                    root.focus(); setTimeout(function(){root.click();},150)}),
                    this.label[this.label.length-1].classList.remove('disabled')
                )
                : this.label[this.label.length-1].classList.add('disabled')
        )
        : false;
    }

    get disabled(){
        return this.states.disabled;
    }

    get checked(){
        return this.states.checked;
    }

    set disabled(val){
        this.setAttribute('aria-disabled',val);
        this.states.disabled=val;
        if(val===false){
            this.setAttribute('tabindex','-1');
        }
        if(val===false){
            this.setAttribute('tabindex','0');
        }
    }
    
    set checked(val){
        if(typeof val == 'boolean' ){
            this.setAttribute('aria-checked',val);
            this.states.checked=val;
            if(val){
                this.innerHTML='<svg aria-hidden="true" class="check-sign" viewBox="0 -46 417.81333 417" xmlns="http://www.w3.org/2000/svg"><path d="m159.988281 318.582031c-3.988281 4.011719-9.429687 6.25-15.082031 6.25s-11.09375-2.238281-15.082031-6.25l-120.449219-120.46875c-12.5-12.5-12.5-32.769531 0-45.246093l15.082031-15.085938c12.503907-12.5 32.75-12.5 45.25 0l75.199219 75.203125 203.199219-203.203125c12.503906-12.5 32.769531-12.5 45.25 0l15.082031 15.085938c12.5 12.5 12.5 32.765624 0 45.246093zm0 0"/></svg>'
            }else{
                this.innerHTML=''
            }
        }else if(typeof val === 'string' && val === 'mixed'){
            this.innerHTML='<div class="mixed"></div>'
        }
    }

}customElements.define('custom-checkbox',Custom_Checkbox);


function ToBoolean(val){
    return val === 'true' ? true : false
}