'use strict';
class CustomSelect extends HTMLElement{
    constructor(){
        super();
        this.value;
        this.focusedValue = null;
        this.selectedIndex = 0;
        this.focusedIndex = 0;
        this.selectedElement = null;
        this.itemsCountToDisplay=3;
        this.GroupCount;
        this.currentAlphabet = null;
    }
    __setEmbeddedElement__ ( root = this ) {
        //A Setting Statement about the butotn for interection with combobox
        root.controller = document.createElement('button');
        root.controller.setAttribute('role','combobox');
        root.controller.setAttribute('aria-activedescendant','');
        root.prepend(root.controller);
        //A Setting Statement about the Listbox to show options to users.
        const Listbox = this.querySelectorAll('ul');
        if(Listbox.length===1){
            root.listbox=Listbox[0];
            root.listbox.setAttribute('role','listbox');
        }else if( Listbox.length < 1){
            return console.error(new Error('Need one unordered Listbox (ul) element. Please set it to a child of select-box.'));
        }else if( Listbox.length > 1 ){
            return console.error(new Error('Need only one unordered Listbox (ul) element. Please remove it all leave one.'));
        }
        root.GroupElements=root.listbox.querySelectorAll('[role=group][aria-label]');
        root.GroupCount=root.GroupElements.length;
        
        //A Setting Statement for the item elements that users will be able to browse a list and choose values.
        const optionItems = this.listbox.querySelectorAll('li');
        if(optionItems.length>0){
            root.optionItems = optionItems;
            for ( var i=0; i<root.optionItems.length; i++){
                root.optionItems[i].setAttribute('role','option');
            }
        }else if( Listbox.length < 1){
            return console.error(new Error('Need one or more list items (li) element. Please set them to a child of ul (Listbox).'));
        }

        if(root.hasAttribute('size') && Number(root.getAttribute('size')) <= root.optionItems.length ){
            root.itemsCountToDisplay = Number(root.getAttribute('size'));
        }
    };

    set disabled (val){
        if(typeof val === 'boolean'){  
            if(val){
                this.setAttribute('tabindex','-1')
            }else{
                this.setAttribute('tabindex','0')
            }
            this.setAttribute('aria-disabled',val)
        }
    }

    get disabled (){
        return this.getAttribute('aria-disabled') === 'true' ? (
            true
        ) : false;
    }

    get isExpanded (){
        const hasExpanded = this.controller.hasAttribute('aria-expanded')
        if(hasExpanded){
            return this.controller.getAttribute('aria-expanded') === 'true' ? true : false;
        }
    }

    set setDisplayList(val){
        if(val){
            this.controller.setAttribute('aria-expanded',true);
            this.listbox.classList.add('expanded')
            this.listbox.classList.remove('collapsed');
        }else{
            this.controller.setAttribute('aria-expanded',false);
            this.listbox.classList.add('collapsed');
            this.listbox.classList.remove('expanded');
        }
    }

    set setOptionExploreFocus (val) {
        const opt = this.optionItems;
        if(typeof val === 'number'){
            this.focusedIndex = val;
            if( val < opt.length){
                for(var i=0; i<opt.length; i++){
                    if(val===i){
                        opt[val].id=this.id+'_focused';
                        opt[val].classList.add('focused');
                        this.focusedValue=opt[val].innerText;
                        this.focusedElement = opt[val];
                        this.controller.innerHTML=this.focusedValue;
                        this.remainingOptions=Array.prototype.slice.call(opt,val,opt.length);
                        
                    }else{
                        opt[i].id='';
                        opt[i].classList.remove('focused');
                    }
                }
            }
        }else{
            console.error(new Error('Selected a first option temporary because Error occurred, Please Follow below and modify an error. the wrong type of data value requested to the setSelect property. The requested value type is '+val+'.'));
        }
    }
    set setSelect (val){
        const opt = this.optionItems;
        if(typeof val === 'number'){
            this.selectedIndex=val;
            if( val > -1 && val < opt.length ){
                for(var i=0; i<opt.length; i++){
                    if(opt[i] === opt[val]){
                        this.selectedElement=opt[val];
                        this.setOptionExploreFocus=val;
                        this.value=opt[val].innerText;
                    }
                }
            }
        }else{
            console.error(new Error('Selected a first option temporary because Error occurred, Please Follow below and modify an error. the wrong type of data value requested to the setSelect property. The requested value type is '+val+'.'));
        }
    }
    connectedCallback(root = this){
        //A Setting Statement about the identity of Combobox, My Combobox Component must have a unique identity. if not, temporary unique identify that distinguishable by consecutive numbers will be added to each select-box component automatically.
        this.__setEmbeddedElement__();
        let opt = this.optionItems;
        this.remainingOptions=opt;
        root.TempIdentifyName = 'NVisions_UJ_ComboBox_TEMP';
        root.TempIdentifyIndex = Array.prototype.indexOf.call(document.querySelectorAll('select-box:not(.NVisions_UJ_ComboBox)'),this)+1;
        if(this.id===''){
            root.id = root.TempIdentifyName+root.TempIdentifyIndex;
            root.classList.add('auto-temp-id')
        }else{
            root.classList.add('NVisions_UJ_ComboBox')
        }
        root.controller.id= root.id+'_controller';
        root.controller.setAttribute('aria-controls',root.id+'_listbox');
        root.listbox.id=root.id+'_listbox';
    
        

        //Events
        const label = document.querySelector('label[attachTo='+root.controller.id+']');
        if(label){
            label.id=this.id+'_label';
            root.controller.setAttribute('aria-labelledby',this.id+'_label '+this.id+'_focused')
        }
        if(!this.disabled){
            if(label){
                label.addEventListener('click',function(){
                    root.controller.focus();
                    toggleDisplayListHandler();
                })
            }
            this.controller.addEventListener('keydown',keyboardSelectHandler);
            this.controller.addEventListener('keydown',keySearchHandler);
            this.controller.addEventListener('keydown',function(e){
                if(e.key === 'Enter'){
                    toggleDisplayListHandler()
                }
                if(!root.isExpanded){
                    if( e.altKey==true && e.code === 'ArrowDown'){
                        toggleDisplayListHandler()
                    }
                    if(e.code === 'ArrowUp' && root.selectedIndex > 0){
                        root.setSelect = (root.selectedIndex-1);
                        root.controller.innerHTML=root.selectedElement.innerHTML;
                    }
                    if(e.code === 'ArrowDown' && !e.altKey && root.selectedIndex < root.optionItems.length-1 ){
                        root.setSelect = (root.selectedIndex+1);
                        root.controller.innerHTML=root.selectedElement.innerHTML;
                    }

                    if(e.code === 'Home'){
                        root.setSelect=0
                        root.controller.innerHTML=root.selectedElement.innerHTML;
                    }
    
                    if(e.code === 'End'){
                        root.setSelect= root.optionItems.length-1;
                        root.controller.innerHTML=root.selectedElement.innerHTML;
                    }
                    
                }
    
                if(root.isExpanded){
                    if( e.altKey && e.code === 'ArrowUp' ){
                        toggleDisplayListHandler()
                    }
                }
            });
    
            // for make collapse when focus out

            this.addEventListener('focusout',function(){
                if(root.isExpanded){
                    toggleDisplayListHandler();
                }
            })
    
            //This Event is for when users try to open a context menu by right-click button of the mouse or Popup Key, Prevent action that open context menu.
            this.listbox.addEventListener('contextmenu',function(e){
                e.preventDefault();
            })
    
            //This Event is for the prevent right-clicking to expanding or collapsing the combo-box.
            this.controller.addEventListener('mousedown',function(e){
                if(e.button !== 0 ){
                    return false;
                }else{
                    toggleDisplayListHandler()
                }
            });
    
            for(let i=0; i<opt.length; i++){
                (function(c){
                    opt[c].addEventListener('mousedown',function(e){
                        if( e.button !== 0 ){
                            return false;
                        }else{
                            root.setSelect=c;
                            toggleDisplayListHandler();
                        }
                    })
                })(i);
                
                (function(c){
                    //This event is for when users choose the expanded menu options.
                    opt[c].addEventListener('mouseover',function(e){
                        if(root.isExpanded){
                            root.setOptionExploreFocus=c;
                        }
                    })
                })(i);
    
                window.addEventListener('mousedown',function(e){//this Event for makes list-box collapse when users click a outside of the option list-box.
                    if(!root.contains(e.target)){
                        if( root.isExpanded ){
                            toggleDisplayListHandler();
                            root.setSelect=root.selectedIndex;
                            root.setOptionExploreFocus=root.selectedIndex;
                        }
                    }
                })
            }
        }
        

        function toggleDisplayListHandler(){
            if(root.isExpanded){
                root.listbox.style.maxHeight='';
                root.controller.setAttribute('aria-activedescendant','');
                root.setDisplayList=false;
            }else if(!root.isExpanded){
                setTimeout(function(){
                    root.setDisplayList=true;
                    root.selectedElement.scrollIntoView();
                },10)
                if(root.GroupCount > 0){
                    root.listbox.style.maxHeight=(root.optionItems[0].offsetHeight * root.itemsCountToDisplay+1)+'px';
                }else{
                    root.listbox.style.maxHeight=(root.optionItems[0].offsetHeight * root.itemsCountToDisplay)+'px';
                }
                setTimeout(function(){
                    root.controller.setAttribute('aria-activedescendant',root.id+'_focused')
                },50);
                
                if( root.focusedIndex === 0 && root.GroupCount>0){
                    root.GroupElements[0].scrollIntoView();
                }else{
                    root.optionItems[root.focusedIndex].scrollIntoView();
                }
            }
        }

        function keySearchHandler(e){
                if(e.type === 'keydown'){
                let AlphabetKey=checkAlphabet(e.keyCode);
                if(AlphabetKey){
                    if(fromCharCode(e.keyCode) !== root.currentAlphabet){
                        root.currentAlphabet=fromCharCode(e.keyCode)
                    }
                    if(FindToCharactorKey(opt,e.keyCode) instanceof Array ){
                        NavigateByCharactorKeys(
                            FindToCharactorKey(opt,e.keyCode)
                        )
                    }
                }
            }
        }
        
        function keyboardSelectHandler (e){
            const [PREV,NEXT,ENTER,ESC,Space,Home,End]=['ArrowUp','ArrowDown','Enter','Escape','Space','Home','End'];
            let getListToFirstLetter;
            let focusedElement;
            let focusedIndex;

            if( root.focusedIndex !== -1 ){
                focusedElement = root.optionItems[root.focusedIndex];
                focusedIndex=getIndexFromParent(focusedElement.parentNode.children,focusedElement);
            }

            if(root.isExpanded){

                if(e.code === PREV && !e.altKey){
                    select_previousOption();
                }
                if(e.code === NEXT && !e.altKey){
                    select_nextOption()
                }

                if(e.code === ENTER && !e.altKey){
                    root.setSelect=root.focusedIndex;
                }

                if(e.code === Space){
                    e.preventDefault();
                }

                if(e.code === Home){
                    root.setSelect=0
                    opt[root.focusedIndex].scrollIntoView();;
                }

                if(e.code === End){
                    root.setSelect=root.optionItems.length-1;
                    opt[root.focusedIndex].scrollIntoView();
                }

                if(e.code === ESC){
                    toggleDisplayListHandler();
                }
            }
        }

        function FindToCharactorKey(El_List,val){
                let foundResult = Array.prototype.filter.call(El_List,f => {
                let FirstLetter = f.textContent[0]
                return FirstLetter === String.fromCharCode(val).toUpperCase() || FirstLetter === String.fromCharCode(val).toLowerCase();
            })
            if(foundResult.length > 0){
                return foundResult;
            }else{
                return foundResult;
            }
        }

        function checkAlphabet(val){
            const translatedKeyValue = String.fromCharCode(val)
            return /^[a-zA-Z]$/.test(translatedKeyValue)
        }

        function NavigateByCharactorKeys(list){
            const opt = root.optionItems;
            const remainingOptions = root.remainingOptions;
            let First = getIndexFromParent(opt,list[0]);
            let to;
            if( First > root.focusedIndex ){
                select(First);
            }else{
                to = getIndexFromParent(opt,list[getIndexFromParent(list,remainingOptions[1])])
                select(to)
            }
            if( !to ){
                select(First);
            }

        
            root.focusedElement.scrollIntoView();
            function select(To){
                root.isExpanded ? root.setOptionExploreFocus = To :(
                    root.setSelect = To,
                    root.controller.innerHTML = root.selectedElement.innerHTML
                );
            }
        }

        function select_nextOption(){
            const opt=root.optionItems;
            if(root.focusedIndex<opt.length-1){
                root.setOptionExploreFocus = root.focusedIndex+1;
                if(opt[root.focusedIndex].getBoundingClientRect().bottom > root.listbox.getBoundingClientRect().bottom+3){
                    opt[root.focusedIndex].scrollIntoView();
                }
            }
        }
        
        function select_previousOption(){
            if(root.focusedIndex > 0){
                root.setOptionExploreFocus = root.focusedIndex-1;
                opt[root.focusedIndex].scrollIntoView();
                if(root.focusedIndex === 0 && root.GroupCount > 0 ){
                    root.GroupElements[0].scrollIntoView();
                }
            }
        }
        root.setSelect = 0;
        root.setDisplayList=false;
    }
}

function fromCharCode(val){
    return String.fromCharCode(val);
}

function getIndexFromParent(Arr,El){
    if( Array.prototype.indexOf.call(Arr,El) > -1 ){
        return Array.prototype.indexOf.call(Arr,El);
    }
}

customElements.define('select-box',CustomSelect);