function getIndex(arr,el){
    return Array.prototype.indexOf.call(arr,el)
}

function getArray (A){
    const result = [];
    for(let i=0; i<A.length; i++){
        result[i]=A[i]
    }
    return result;
}

Element.prototype.getParents = function(){
    var parentsList = []
    var start = this;
    while(start.parentElement){
        parentsList.push(start.parentElement);   
        start=start.parentElement;
    }
    return parentsList;
};

class MainTreeViewElement extends HTMLUListElement {
    constructor(){
        super();
        this.list = getArray(this.querySelectorAll('li'));
        this.LastNavigatedElementIndex=0;
    }

    TreeItem = class TreeItem {
        constructor(Element,MainTree){
            this.Element = Element;
            this.MainTree = MainTree;
            this.ParentElement = this.Element.parentElement;
            this.Parents = this.Element.getParents().reverse().filter(function(el){
                if(el.getAttribute('role') === 'tree'){
                    return el;
                }
            });
            this.level = this.Parents.length;
            this.Text = this.Element.childNodes[0];
            this.Controller = document.createElement('span');
            this.Controller.manager = this;
            this.mouseExpander = document.createElement('span');
            this.Element.getController = this.Controller;
            this.IndexOfList = getIndex(this.MainTree.list,Element); // This property is made for getting element index to easier
            this.Controller.index = this.IndexOfList;
            this.setContent();
        }

        TreeItemContent = class TreeItemContent{
            constructor(Element,item){
                this.Element = Element;
                this.item = item;
                this.Element.manager = this;
                this.Element.setAttribute('tabindex',-1);
                this.Element.classList.add('treeItem-main-content');
                this.showContent = this.active;
            }

            get active(){
                return this.item.Element.classList.contains('active');
            }

            set showContent(v){
                this.Element.classList.toggle('hide',!v);
            }
        }

        get hasContent (){
            const token = this.Element.getAttribute('aria-controls')
            const contentElement = document.getElementById(token);
            return contentElement ? true : false;
        }

        get getContent (){
            const token = this.Element.getAttribute('aria-controls')
            const contentElement = document.getElementById(token);
            return this.hasContent ? contentElement : null;
        }

        get hasSubTree (){
            const element = this.Element.querySelector(':scope>ul[role=tree]');
            const bool = element ? true : false;
            const object = {element:element,boolean:bool};
            return object;
        }

        get getSubTree (){
            if(this.hasSubTree['boolean']){
                return this.hasSubTree['element'];
            }
        }

        set setExpandSubTree(v){
            if(typeof v === 'boolean' && this.hasSubTree['boolean'] ){
                const Controller = this.Controller;
                const MouseExpander = this.mouseExpander;
                const ChildSubTree = this.getSubTree;
                Controller.setAttribute('aria-expanded',v);
                ChildSubTree.classList.toggle('hide',!v);
                MouseExpander.classList.toggle('expanded',v)
                MouseExpander.classList.toggle('collapsed',!v);
            }
        }

        get isExpanded(){
            return this.Controller.getAttribute('aria-expanded') === 'true' ? true : false;
        }

        set defineAccessibleSubTreeInfo (v){
            if(v){
                const manager = this;
                const SubTree = this.getSubTree;
                const Controller = this.Controller;
                const mouseExpander = this.mouseExpander;
                SubTree.setAttribute('aria-label',Controller.innerText);
                manager.setExpandSubTree = false;
                Controller.addEventListener('dblclick',ExpandClickHandler,{capture:false});
                Controller.addEventListener('keydown',ExpandHandler,{capture:false});
                mouseExpander.addEventListener('click',ExpandClickHandler);
                const MainTree = this.MainTree;
                function ExpandClickHandler(e){
                    e.stopPropagation();
                    manager.setExpandSubTree = !manager.isExpanded;
                }
                function ExpandHandler(e){
                    MainTree.maxLength = MainTree.getMaxLength;
                    if(e.key==='ArrowLeft'){
                        if(manager.isExpanded){
                            e.stopPropagation();
                            manager.setExpandSubTree = false;
                        }
                    }
                    if(e.key === 'ArrowRight'){
                        if( !manager.isExpanded){
                            manager.setExpandSubTree = true;
                        }else if( manager.isExpanded ){
                            MainTree.navigateTreeView=MainTree.LastNavigatedElementIndex+1;
                            MainTree.navigatedElement.focus();
                        }
                    }
                }
            }
        }
        
        setContent(){
            const TreeItemContent = this.TreeItemContent;
            const manager = this;
            const MainTree = this.MainTree;
            this.Element.setAttribute('role','none');
            this.Controller.setAttribute('aria-level',this.level);
            this.Controller.setAttribute('role','treeitem')
            this.Controller.setAttribute('tabindex','-1')
            this.Controller.append(this.Text);
            this.Controller.setAttribute('aria-label',this.Controller.textContent)
            this.Controller.classList.add('tree-item')
            this.mouseExpander.setAttribute('aria-hidden',true);
            this.mouseExpander.classList.add('for-mouse');
            this.Element.prepend(this.mouseExpander,this.Controller);
            this.defineAccessibleSubTreeInfo = this.hasSubTree['boolean']
            this.Controller.addEventListener('keydown',NavigateHandler);
            window.addEventListener('keydown',function(e){
                if(
                    (e.target === MainTree || e.target || MainTree.contains(e.target) ) &&
                    e.key === ' ' 
                    || e.key === 'Enter' 
                    || e.key === 'Home' 
                    || e.key === 'End'
                    || e.key === 'ArrowUp'
                    || e.key === 'ArrowDown'
                    || e.key === 'ArrowLeft'
                    || e.key === 'ArrowRight'
                ){
                    e.preventDefault();
                }
            })
            this.Controller.addEventListener('click',function(e){
                MainTree.navigateTreeView = e.target.manager.IndexOfList;
                MainTree.navigatedElement.focus();
                const contents = document.querySelectorAll('.treeItem-main-content')
                for(const content of contents){
                    if(content.manager.item !== manager){
                        MainTree.navigatedElement.parentElement.classList.remove('active');
                        content.manager.showContent = false;
                    }else{
                        MainTree.navigatedElement.parentElement.classList.add('active');
                        content.manager.showContent = true;
                    }
                }
            },{capture:false});
            
            if(this.hasContent){
                this.Controller.setAttribute('aria-describedBy','MSG_GO_MAIN_CONTENT');
                

                this.Controller.addEventListener('keydown',function(e){
                    if(e.altKey && e.code === 'KeyM'){
                        manager.getContent.focus();
                    }
                    if(e.key === 'Enter' || e.key === ' '){
                        e.target.click();
                    }
                })
                new TreeItemContent(this.getContent,this);
            }
            this.Controller.addEventListener('click',function(e){
                MainTree.navigateTreeView = e.target.manager.IndexOfList;
                MainTree.navigatedElement.focus();
                const contents = document.querySelectorAll('.treeItem-main-content')
                for(const content of contents){
                    if(content.manager.item !== manager){
                        MainTree.navigatedElement.parentElement.classList.remove('active');
                        content.manager.showContent = false;
                    }else{
                        MainTree.navigatedElement.parentElement.classList.add('active');
                        content.manager.showContent = true;
                    }
                }
            },{capture:false});
            
            if(this.hasContent){
                this.Controller.setAttribute('aria-describedBy','MSG_GO_MAIN_CONTENT');
                

                this.Controller.addEventListener('keydown',function(e){
                    if(e.altKey && e.code === 'KeyM'){
                        manager.getContent.focus();
                    }
                    if(e.key === 'Enter' || e.key === ' '){
                        e.target.click();
                    }
                })
                new TreeItemContent(this.getContent,this);
            }

            function NavigateHandler(e){
                const list = MainTree.list;
                const el = list[manager.IndexOfList];

                if(e.key === 'ArrowUp'){
                    const PrevElement = MainTree.getNavigatableItem[getIndex(MainTree.getNavigatableItem,el)-1];
                    if(PrevElement && PrevElement.manager){
                        const PrevIndex = PrevElement.manager.IndexOfList;
                        MainTree.navigateTreeView=PrevIndex;
                        MainTree.navigatedElement.focus();
                    }
                }
                if(e.key === 'ArrowDown'){
                    const NextElement = MainTree.getNavigatableItem[getIndex(MainTree.getNavigatableItem,el)+1];
                    if(NextElement && NextElement.manager){
                        const NextIndex = NextElement.manager.IndexOfList;
                        MainTree.navigateTreeView=NextIndex;
                        MainTree.navigatedElement.focus();
                    }
                }
                if(e.key === "Home"){
                    MainTree.navigateTreeView=0;
                    MainTree.navigatedElement.focus();
                }
                if(e.key === "End"){
                    MainTree.navigateTreeView=MainTree.getMaxLength-1
                    MainTree.navigatedElement.focus();
                }
            }
        }
    }

    SubTreeView = class SubTreeView{
        constructor(Element,SuperClass){
            this.Element = Element;
            this.SuperClass = SuperClass;
            this.parentTreeItem = this.Element.parentElement;
            this.setContent();
        }
        setContent(){
            const SuperClass = this.SuperClass;
            this.Element.setAttribute('role',SuperClass.getAttribute('role'))
            this.Element.classList.add('tree-view','sub');
            const parent = this.parentTreeItem;
            this.Element.addEventListener('keydown',function(e){
                if(e.key === "ArrowLeft" ){
                    e.stopPropagation();
                    SuperClass.navigateTreeView = parent.manager.IndexOfList;
                    SuperClass.maxLength = SuperClass.getMaxLength;
                    setTimeout(function(){
                        parent.getController.focus();
                    })
                }
            },{capture:false})
        }
    };

    set navigateTreeView(idx){
        this.LastNavigatedElementIndex=idx;
        this.maxLength = this.getMaxLength;
        for(let i=0; i<this.list.length; i++){
            if( idx === i ){
                this.list[i].classList.add('pointer');
                this.navigatedElement = this.list[idx].getController;
                this.navigatedElement.setAttribute('tabindex','0');
            }else{
                this.list[i].getController.setAttribute('tabindex','-1');
                this.list[i].classList.remove('pointer');
            }
        }
    }

    get getMaxLength(){
        return this.getNavigatableItem.length;
    }

    get getNavigatableItem(){
        const list = this.list;
        return list.filter(function(el){
            if( window.getComputedStyle(el).display !== 'none' ){
                return el;
            }
        })
    }

    connectedCallback(){
        const [TreeItem,SubTreeView] = [this.TreeItem,this.SubTreeView];
        const list = this.list;
        const containers = this.querySelectorAll('ul');
        this.setAttribute('role','tree')
        this.classList.add('tree-view','main');
        this.announceArea = document.createElement('div');
        this.announceArea.classList.add('hints','hide');
        this.MSG_GO_MAIN_CONTENT = document.createElement('div');
        this.MSG_GO_MAIN_CONTENT.id = 'MSG_GO_MAIN_CONTENT';
        this.MSG_GO_MAIN_CONTENT.innerHTML = ', 이 트리 항목은 읽을 수 있는 콘텐츠가 있습니다. Enter를 눌러 콘텐츠를 활성화하고, Alt + M 키를 눌러 트리뷰 영역을 건너뛰고 콘텐츠 영역으로 이동할 수 있습니다.';
        this.announceArea.append(this.MSG_GO_MAIN_CONTENT);
        this.appendChild(this.announceArea);

        for(const ul of containers){
            ul.manager = new SubTreeView(ul,this);
        };

        for(const item of list){
            item.manager = new TreeItem(item,this);
        };

        //set unhidden item length of the loaded tree items
        this.maxLength = this.getMaxLength;
        this.navigateTreeView = 0;
    }
}

customElements.define('main-tree',MainTreeViewElement,{extends:'ul'})