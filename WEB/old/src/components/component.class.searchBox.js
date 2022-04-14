'use strict';
const NavItems=document.querySelectorAll('.GNB li>a')
const NavItemsList = [];
for (let i of NavItems){
    NavItemsList.push(i.textContent);
}

class SearchInput extends HTMLInputElement {
    constructor(){
        super();
        this.setAttributes({"type":"text","role":"combobox",'aria-autocomplete':"list"})
    }
}

class SearchBox extends HTMLElement{
    constructor(){
        super();
        this.__select__ = -1;
        this.setAttribute('role','search')
        this.wrap = document.createElement('div');
        this.wrap.classList.add('search-bar-wrap');
        this.searchInput = document.createElement('input',{is:'custom-search-input'})
        this.ListBox=document.createElement('ul');
        this.ListBox.setAttributes({'role':'listbox'});
        this.ListBox.classList.add('collapsed');
        this.comboBoxButton=document.createElement('span');
        this.comboBoxButton.classList.add('btn_comboBox');
        this.comboBoxButton.classList.add('closed');
        this.hintBox = document.createElement('div');
        this.hintBox.classList.add('box-voice-hint');
        this.hint = document.createElement('span');
        this.hint.id='hint_article_search';
        this.hint.innerHTML=', 아티클 페이지로 이동하려면 Enter를 누르세요.';
        this.appendChild(this.wrap)
        this.wrap.appendChild(this.searchInput);
        this.wrap.appendChild(this.comboBoxButton);
        this.appendChild(this.ListBox);
        this.appendChild(this.hintBox);
        this.hintBox.appendChild(this.hint);
    }

    get expanded(){
        if( !this.hasAttribute('inaccessible') ){
            return this.searchInput.getAttribute('aria-expanded') == 'true';
        }else if( this.hasAttribute('inaccessible') ){
            return this.searchInput.getAttribute('data-expanded') == 'true';
        }
    }

    set expanded(val){

        if( !this.hasAttribute('inaccessible') ){
            this.searchInput.setAttribute('aria-expanded',val);
        }else{
            this.searchInput.setAttribute('data-expanded',val);
        }

        if(val==true){
            this.comboBoxButton.classList.replace('closed','opened')
            this.ListBox.classList.replace('collapsed','expanded');
        }else{
            this.comboBoxButton.classList.replace('opened','closed')
            this.ListBox.classList.replace('expanded','collapsed');
        }
    }

    get select(){
        return this.__select__;
    }
    set select(val){
        this.__select__=val;
        console.log(this.__select__);
    }
    connectedCallback(root=this){
        root.expanded=false;
        if( !root.hasAttribute('inaccessible') ){
            this.searchInput.setAttributes({'aria-activedescendant':'ac_selected','aria-controls':'article-list'});
            root.activeID='ac_selected';
            root.ListBox.id='article-list';
        }else{
            root.activeID='ac_selected_inacessible';
            root.ListBox.id='article-list-inacessible';
        }

        if(root.hasAttribute('data-id')){
            this.searchInput.id=root.dataset.id;
        }

        if(root.hasAttribute('data-label')){
            this.searchInput.setAttribute('aria-label',root.dataset.label);
        }

        if(root.hasAttribute('data-innerlabel')){
            if(!document.querySelector('[for='+root.searchInput.id+']')){
                const label=document.createElement('label');
                if(root.hasAttribute('data-id')){
                    label.setAttribute('for',root.searchInput.id);
                }
                label.innerHTML=root.dataset.innerlabel;
                this.wrap.prepend(label);
            }
        }

        if(root.hasAttribute('data-labelledby')){
            this.searchInput.setAttribute('aria-label',root.dataset.labelledby);
        }
        
        root.searchInput.addEventListener('keyup',acHandler);
        root.searchInput.addEventListener('input',acHandler);
        root.searchInput.addEventListener('click',acHandler);
        root.searchInput.addEventListener('keydown',function(e){const list = root.ListBox.querySelectorAll('li[role="option"]');if( list.length <=0 ){root.expanded=false;};});
        root.comboBoxButton.addEventListener('click',function(){
            const list = root.ListBox.querySelectorAll('li[role="option"]');
            if(list.length > 0){
                if(root.expanded == false){
                    root.expanded=true;
                }else{
                    root.expanded=false;
                }
            }
        })

        window.addEventListener('focusin',expandHandler);
        window.addEventListener('click',expandHandler);

        function expandHandler(e){
            const list = root.ListBox.querySelectorAll('li[role="option"]');
            if(e.type=='focusin'){
                if(e.target === root.searchInput){
                    
                    if(list.length > 0){
                        root.expanded=true;
                    }

                }

                else if(e.target !== root.searchInput ){
                    root.select = -1
                    root.expanded = false;
                }
            }

            if(e.type=='click'){
                if(!root.contains(e.target) ){
                    root.select = -1
                    root.expanded=false;
                }
            }
        }

        function acHandler(e){
            const list = root.ListBox.querySelectorAll('li[role="option"]');
            let container='';
            let target=e.target
            e.stopImmediatePropagation();

            function showList(){
                for(let i=0; i<NavItems.length; i++){
                    root.select = -1;
                    if(NavItemsList[i].match(target.value) !== null && NavItemsList[i].match(target.value)[0] !== ''){
                        container+=`<li role="option" onclick="location.href=this.dataset.href;" aria-describedby="hint_article_search" data-href="${NavItems[i].getAttribute('href')}">${NavItemsList[i]}</li>`
                    }
                }
                root.ListBox.innerHTML=container;
            }

            if(e.type == 'input'){
                showList();
                if(list.length > 0){
                    root.expanded=false;
                }
            }

            if(e.type == 'keyup'){
                
                if(list.length > 0){
                    root.expanded=true;
                }

                if(list.length > 0){
                    
                    if(!root.expanded){
                        if(e.keyCode == 40 ){
                            root.expanded=true;
                        }
                    }

                    if(root.expanded){
                        if(e.keyCode == 38 ){
                            if(root.select <= 0){
                                root.select = ( list.length - 1 );
                                list[list.length-1].classList.add('selected');
                                list[list.length-1].id=root.activeID;
                            }else{
                                root.select = ( root.select - 1 );
                                list[root.select].classList.add('selected');
                                list[root.select].id=root.activeID;
                            }
                        }

                        if(e.keyCode == 40 ){
                            if(root.select == list.length-1){
                                root.select=0;
                                list[0].classList.add('selected');
                                list[0].id = root.activeID;
                            }else{
                                root.select = (root.select+1);
                                list[root.select].classList.add('selected');
                                list[root.select].id=root.activeID;
                            }
                        }

                        if(e.keyCode == 13){
                            if( root.select != -1){
                            list[root.select].click();
                            }else{
                                
                                root.expanded=true;
                            }
                        }

                        if(e.keyCode == 27){
                            root.select= -1;
                            if(root.select == -1){
                                root.expanded=false;
                            }
                        }

                        for(var i = 0; i < list.length; i++){
                            if(root.select >= -1 && i!=root.select){
                                if(list[i].classList.contains('selected')){
                                    list[i].removeAttribute('class');
                                }
                                if(list[i].hasAttribute('id')){
                                    list[i].removeAttribute('id');
                                }
                            }
                        }
                        /* if(root.select != -1){
                        target.value=list[root.select].textContent;
                        } */
                    }
                }
            }
        }
        
    }
}

customElements.define('custom-search-input',SearchInput,{extends:'input'})
customElements.define('custom-search',SearchBox);