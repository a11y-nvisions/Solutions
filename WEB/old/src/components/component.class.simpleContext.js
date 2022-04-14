'use strict'

class PageContextMenu {
    constructor(menuArray=new Array({
        string:String,
        callback:Function
    }),contextEventTarget=document){
        this.contextEventTarget = contextEventTarget;
        this.clientX=0;
        this.clientY=0;
        this.menuArray = menuArray;
        this.menuItemElements = [];
        this.active = false;
        this.selected = -1;
        this.exitFocus = null;
        this.load();
    }

    get isMenuOpen(){
        return this.active;
    }

    set setMenuState(v){
        this.active = v;
    }


    hideMenu(){
        this.setMenuState=false;
        this.menuBox.classList.replace('show','hide');
    }

    showMenu(){
        this.setSelect =-1;
        this.exitFocus=document.activeElement;
        this.setMenuState=true;
        this.menuBox.style.left=this.clientX+'px';
        this.menuBox.style.top=this.clientY+'px';
        this.menuBox.classList.replace('hide','show');
        const goToMenu=setTimeout(()=>this.menuBox.focus(),100);
    }

    set setSelect(v){
        this.selected=v;
        for(let i=0; i<this.menuItemElements.length; i++){
            if(i===v){
                this.menuItemElements[i].id='selectedMenu';
                this.menuItemElements[i].focus();
            }else{
                this.menuItemElements[i].id='';
            }
        }
    }

    load(root = this){
        root.menuBox = document.createElement('ul');
        root.menuBox.classList.add('nv-menu-sample');
        root.menuBox.classList.add('hide');
        root.menuBox.setAttribute('role','menu');
        root.menuBox.setAttribute('aria-label','웹페이지 바로가기');
        root.menuBox.setAttribute('tabindex','-1');
        if(root.menuArray.length > 0){
            for( let i=0; i<root.menuArray.length; i++){
                const element = root.menuArray[i];
                root.menuItemElements[i] = document.createElement('li');
                root.menuItemElements[i].setAttribute('role','menuitem');
                root.menuItemElements[i].setAttribute('tabindex','-1');
                root.menuItemElements[i].innerText=element.string;
                root.menuItemElements[i].addEventListener('click',element.callback);
                root.menuItemElements[i].addEventListener('keydown',keyboardClickHandler);
                root.menuItemElements[i].addEventListener('contextmenu',function(e){e.preventDefault()})
                root.menuBox.appendChild(root.menuItemElements[i]);
            };
        }
        document.body.appendChild(root.menuBox);

        //events
        function keyboardClickHandler(e){
            if(e.keyCode === 13){
                e.target.click();
            }
        }

        function keyboardNavigateHandler(e){
            const first = 0;
            const last = root.menuItemElements.length-1;
            console.log(root.selected)
            if(root.selected === -1){
                if(e.keyCode === 38){
                    root.setSelect=last;
                }
                if(e.keyCode === 40){
                    root.setSelect = first;
                }
            }else if(root.selected !== -1){
                if(e.keyCode === 38){
                    root.selected <= first ? root.setSelect=last : root.setSelect = (root.selected-1);
                }
                if(e.keyCode === 40){
                    root.selected >= last ? root.setSelect=first : root.setSelect = (root.selected+1);
                }
            }
        }

        function showContextMenuHandler(e){
            const MenuRoot=root.menuBox;
            if(e.type === 'contextmenu'){
                root.clientX = e.clientX;
                root.clientY = e.clientY;
                e.preventDefault();
                root.showMenu();
            }
            if( e.type === 'click' && root.isMenuOpen && !MenuRoot.contains(e.target) ){
                root.hideMenu();
            }
            if(e.type === 'keydown'){
                if(root.isMenuOpen && e.keyCode === 27){
                    root.hideMenu();
                    root.exitFocus.focus();
                }
                if(root.isMenuOpen && e.keyCode === 9){
                    e.preventDefault();
                }
            }
        }

        document.addEventListener('click',showContextMenuHandler);
        root.contextEventTarget.addEventListener('contextmenu',showContextMenuHandler);
        root.menuBox.addEventListener('keydown',showContextMenuHandler);
        root.menuBox.addEventListener('keydown',keyboardNavigateHandler)
    }
}

const PageNavigator=new PageContextMenu([
        {
            string:'네이버 바로가기',callback:function(){
            location.href="http://www.naver.com"}
        },
        {
            string:'다음 바로가기',callback:function(){
            location.href="http://www.daum.net"}
        },
        {
            string:'네이트 바로가기',callback:function(){
            location.href="http://www.nate.com"}
        },
        {
            string:'구글 바로가기',callback:function(){
            location.href="http://www.google.com"}
        }
    ],document.querySelector('#context_example')
)