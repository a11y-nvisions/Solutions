class CustomRadio extends HTMLElement{
    constructor(){
        super();
        this.name='';
        this.checked=false;
    }

    set check(bool){
        this.checked=bool;
        if(bool==true){this.setAttribute('checked',''),this.setAttribute('aria-checked',bool);
        this.setAttribute('tabindex','0');
        this.focus();
        }
        if(bool==false){
            if(this.hasAttribute('checked')){
                this.removeAttribute('checked');
            }
            if(this.hasAttribute('tabindex')){
                this.removeAttribute('tabindex');
            }
            this.setAttribute('aria-checked',bool);
        }
    }

    connectedCallback(){
        const root=this;
        
        if(this.hasAttribute('name')){this.name=this.getAttribute('name')
            this.setAttribute('role','radio')
            const shadow=this.attachShadow({mode:'open'})
            shadow.innerHTML=`
                <style>
                    div.radio.wrap{
                        vertical-align:top;
                        width:1em; height:1em;
                    }
                    div.radio{
                        display:inline-block;
                    } 
                    
                    div.radio.outerCircle{
                        position:relative;
                        width:100%; height:100%;
                        overflow:hidden;
                        border:solid 2px transparent; text-align:center;
                        border-radius:50%; box-shadow:0 0 0 1px #000;
                    }

                    div.radio.innerCircle{
                        position:relative;
                        width:10%; height:10%; top:50%; left:50%; box-sizing:border-box;
                        border:solid 1px; border-color:rgba(0,0,0,0.1);
                        opacity:0; border:solid 1px; border-color:rgba(0,0,0,0.1); background-color:transparent;
                    }

                    :host([aria-checked="true"]) div.radio.innerCircle{
                        opacity:1;
                        width:100%;height:100%; vertical-align:top; top:0; left:0;
                        transition:width 0.3s, height 0.3s, top 0.3s, background-color 0.5s;
                        margin:0; border-color:rgba(0,0,0,1); background-color:#6ec;
                        border-radius:50%;
                    }
                </style>
                <div class="radio wrap">
                    <div class="radio outerCircle">
                        <div class="radio innerCircle">
                        
                        <div>
                    <div>
                </div>
                `
            if(this.hasAttribute('checked')){this.check=true}
            
            const Group=document.querySelectorAll(`[name="${this.name}"]`)
            
            if(this.hasAttribute('id')){
                const labelElement=document.querySelectorAll(`label[for="${this.getAttribute('id')}"]`);
                let labelStrings='';
                for(let i=0; i<labelElement.length; i++){
                        labelElement[i].addEventListener('click',function(){
                            document.querySelector('#'+labelElement[i].getAttribute('for')).click();
                            document.querySelector('#'+labelElement[i].getAttribute('for')).focus();
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

            this.addEventListener('click',defaultEventHandler);
            this.addEventListener('keydown',defaultEventHandler);
            function defaultEventHandler(e){
                const key={
                    next:[39,40],
                    prev:[37,38],
                    click:[32,13]
                }
                const [first,last]=[Group[0],Group[Group.length-1]]

                for(let i = 0; i<Group.length; i++){
                        if(e.type=='click'){
                            if(Group[i] != e.target){
                                Group[i].check=false;
                            }else{
                                Group[i].check=true;
                            }
                        }

                        if(e.type=='keydown'){
                            if(e.keyCode == (key.click[0] || key.click[1])){
                                e.target.click();
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