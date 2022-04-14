import MobileDetect from "mobile-detect";
export default (()=>{

const mo = new MobileDetect(window.navigator.userAgent);
const CE = customElements;

class TreeviewLayoutElement extends HTMLElement {
    constructor(  ){
        super(  );
        const shadow = this.attachShadow({mode:"open"});
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                :host {
                    display:grid;
                    grid-template-rows:1fr;
                    grid-template-columns:minmax(30%,35%) auto;
                    width:100%; height:100%;
                    position:relative;
                    overflow:hidden;
                    flex-flow:row;
                    box-sizing:border-box;
                }
                
                :host * {
                    box-sizing:border-box;
                }

                :host [part="panel"] {
                    width:100%; height:100%;
                    position:relative;
                    scrollbar-width:thin;
                    display:grid;
                    overflow:hidden;
                    overflow-y:auto;
                    grid-template-row:auto 1fr;
                    scrollbar-color:currentColor transparent;
                    padding:0.25em;
                }

                :host [part="access-key"] {
                    width:100%;
                }

                :host [part="treeview"] {
                    width:100%; height:100%;
                    position:relative;
                    overflow:hidden;
                }
                
                :host([treeview-hidden]) [part="treeview"]{
                    display:none;
                }

                :host [part="panel"]::-webkit-scrollbar {
                    width:0.5em; height:0.5em;
                    border-radius:0.25em;
                }
                :host [part="panel"]::-webkit-scrollbar-track {
                    background-color:transparent;
                    border-radius:0.25em;
                }
                :host [part="panel"]::-webkit-scrollbar-thumb {
                    background-color:currentColor;
                    border-radius:0.25em;
                }

                :host ::slotted(div) {
                    height:100%;
                    position:relative; display:grid;
                    grid-template-rows:auto 1fr;
                }
                
                :host .openTreeview {
                    display:none;
                }

                @media screen and (max-width:768px) {
                    :host {
                        grid-template-rows:auto 1fr;
                        grid-template-columns:auto 1fr;
                    }
                    :host([treeview-hidden]) [part="panel"] {
                        grid-column:1 / 2;
                    }
                    :host([treeview-hidden]) [part="treeview"] {
                    }
                    :host button.openTreeview {
                        width:100%;
                    }

                    :host([treeview-hidden]) div.openTreeview {
                        backdrop-filter:blur(10px); display:flex;
                        min-height:1em; position:relative;
                        padding:0.4em;
                        background-color:rgba(0,0,0,0.7);
                    }

                    :host button.openTreeview {
                        display:inline-flex; width:fit-content;
                        flex-flow:column;
                        background-color:rgba(0,0,0,0.5); color:white;
                        border:solid 0.05em rgba(255,255,255,0.3);
                        align-items:center; justify-content:center;
                        padding:0.2em;
                        line-height:1em; text-align:center;
                        border-top-right-radius:0.35em;
                        border-bottom-right-radius:0.35em;
                        align-self:start;
                        justify-self:start; transition:opacity 0.2s;
                    }
                }
            </style>
            <div class="openTreeview">
                <button aria-label="트리뷰 열기" class="openTreeview">메뉴 열기</button>
            </div>
            <div part="treeview">
                <div part="access-key">
                <slot class="access-key" name="access-key-visible"></slot>
                </div>
                <slot name="treeview"></slot>
            </div>
            <div part="panel">
                <slot name="panel"></slot>
            </div>
        `;
        
        shadow.appendChild(template.content.cloneNode(true));
        this.treeviewPart = shadow.querySelector('[part="treeview"]');
        this.panelPart = shadow.querySelector('[part="panel"]');
        this.treeviewPart.setAttribute('role',this.isMobileScreenSize ? "dialog" : "region");
        this.treeviewPart.setAttribute('aria-label',this.isMobileScreenSize ? "Menu" : "Side Bar");
        this.treeviewOpener = shadow.querySelector('button.openTreeview');
        this.treeviewOpener.setAttribute('aria-label','트리뷰 메뉴');
        this.treeviewOpener = shadow.querySelector('button.openTreeview');
        if(this.slottedPanelContainer){
            this.slottedPanelContainer.setAttribute('tabindex','0');
        }
    };

    get slottedPanelContainer(){
        return this.querySelector('[slot="panel"]');
    }

    get ScreenSizeMedia (){
        return matchMedia('screen and (max-width:768px)');
    }
    get isMobileScreenSize (){
        return this.ScreenSizeMedia.matches;
    }

    get hideTreeview(){
        if ( this.isMobileScreenSize ) {
            return this.hasAttribute('treeview-hidden');
        } else {
            return false;
        }
    }

    set hideTreeview(v){
        if ( this.isMobileScreenSize ){
            if(v) {
                this.setAttribute('treeview-hidden',"");
                this.treeviewPart.removeAttribute('aria-modal');
            } else {
                this.removeAttribute('treeview-hidden');
                this.treeviewPart.setAttribute('aria-modal','true');
            }
        } else {
            this.removeAttribute('treeview-hidden');
        }
    }

    

    connectedCallback() {
        window.addEventListener('DOMContentLoaded',(evt)=>{
            if(this.isMobileScreenSize){
                this.hideTreeview = true;
            } else {
                this.hideTreeview = false;
            }
        })
        matchMedia('screen and (max-width:768px)').addEventListener('change',(evt)=>{
            if(evt.matches){
                this.hideTreeview = true;
            } else {
                this.hideTreeview = false;
                this.treeviewPart.removeAttribute('aria-modal')
            }
            this.treeviewPart.setAttribute('role',this.isMobileScreenSize ? "dialog" : "region");
        })


        this.treeviewOpener.addEventListener('click',()=>{
            if(this.isMobileScreenSize){
                this.hideTreeview = !this.hideTreeview;
                if(!this.hideTreeview){
                    const located = document.querySelector('[located]');
                    if(located){
                        located.focus();
                    }
                }
            }
        });


        this.treeviewOpener.addEventListener('keydown',(evt)=>{
            if(evt.key === "Enter" || evt.key === " " ) {
                evt.target.click();
            }
        })

        this.addEventListener('keydown',(evt)=>{
            if(evt.code == "Escape" && this.isMobileScreenSize){
                this.hideTreeview = true;
                this.treeviewOpener.focus();
            } else {
                return false;
            }

            if(evt.code == "Tab" && this.isMobileScreenSize){
                this.hideTreeview = true;
            } else {
                return false;
            }
        });

        window.addEventListener('keydown',(evt)=>{
            if ( evt.key == "F6" && evt.ctrlKey ) {
                if (this.slottedPanelContainer) {
                    this.slottedPanelContainer.focus();
                }
                if (evt.target === this.slottedPanelContainer || this.slottedPanelContainer.contains(evt.target)) {
                    const located = document.querySelector('[located]');
                    if(!this.isMobileScreenSize){
                        if(located){
                            located.focus();
                        }
                    } else {
                        this.treeviewOpener.focus();
                    }
                }
            }
        })
    }
}

class TreeviewListElement extends HTMLElement {
    constructor(  ){
        super(  );
        this.treeviewIndex = [...document.querySelectorAll('treeview-list')].indexOf(this);
        this.id = "treeview_docUID-no"+(this.treeviewIndex+1);
        this.setAttribute('role', 'tree');
        if( this.isMobileScreenSize && this.hasAttribute('nv-menu') ){
            this.hide = true;
        }
        
        const shadow = this.attachShadow({mode:"open"});
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                :host {
                    display:flex;
                    width:100%; max-height:100%;
                    flex-flow:column;
                    padding:0.2em;
                    position:relative;
                    box-sizing:border-box;
                    scrollbar-width:thin;
                    overflow:hidden;
                    overflow-y:auto;
                    scrollbar-color:currentColor transparent;
                }

                :host::-webkit-scrollbar {
                    width:5px;
                    height:5px;
                }
        
                :host::-webkit-scrollbar-thumb {
                    border-radius:0.2em;
                    background-color:currentColor;
                    transition:all 0.1s;
                }

                :host(:focus-within)::-webkit-scrollbar-thumb {
                    background-color:currentColor;
                }

                :host(:hover)::-webkit-scrollbar-thumb {
                    background-color:currentColor;
                }

                :host::-webkit-scrollbar-track {
                    background-color:transparent;
                    border-radius:0.5em;
                }

                :host::-webkit-scrollbar-button {
                    display:none;
                }


                :host .announcer,
                :host .description {
                    width: 1px;
                    border: 0;
                    clip: rect(0 0 0 0);
                    height: 1px;
                    margin: -1px;
                    overflow: hidden;
                    padding: 0;
                    position: absolute;
                }
            </style>
            <div role="status" class="announcer"></div>
            <slot></slot>`
        shadow.appendChild(template.content.cloneNode(true));

        this.announcer = this.shadowRoot.querySelector('.announcer');
    }

    get isSolutionsMenu () {
        return this.hasAttribute('solution-menu');
    };

    get getParentTreeviewLayout() {
        return this.closest('treeview-layout');
    }

    set isHashRoutingEnabled ( v ) {
        const isBool = typeof v === "boolean";
        if(isBool){
            this.setAttribute('hash-routing',String(v));
        }
    }

    get isHashRoutingEnabled (  ) {
        return this.getAttribute('hash-routing') === "true" ? true : false;
    }

    announcement(text){
        let announcement;
        if( Boolean(text) && typeof text === "string") {
            this.announcer.innerHTML = "";
            this.announcer.innerHTML = text;
            announcement = setTimeout(()=>{
                clearTimeout(announcement);
                this.announcer.innerHTML = "";
            },150)
        }
    }

    get item (  ) {
        return this.allItems.filter(_=>{
            if( getComputedStyle(_).display !== "none" ){
                return _;
            }
        })
    }

    get treeViewMode () {
        return this.getAttribute('treeview-mode');
    }

    set treeViewMode (v) {
        const reg = /^(panel-mode|menu-mode)$/
        if(reg.test(String(v))){
            this.setAttribute('treeview-mode',String(v));
        }
    }

    get allItems() {
        return [...this.querySelectorAll('treeview-item')];
    }

    get item_count (  ) {
        return this.item.length;
    }

    get locatedElement(  ) {
        return this.querySelector( 'treeview-item[located]' );
    }

    get locatedElementIndex () {
        if (this.locatedElement){
            return this.item.indexOf(this.locatedElement);
        }
        return -1;
    }

    get activatedElement (  ) {
        return this.querySelector( 'treeview-item[activated]' );
    }

    treeitem_init(){
        if(this.item_count > 0){
            const IsNotLocatedElementExists = !Boolean(this.locatedElement);

            if (IsNotLocatedElementExists){
                this.item[0].located = true;
            }

            this.allItems.forEach(_=>{
                if(this.isHashRoutingEnabled && _.id === location.hash.replace(/#/,'') ){
                    _.located = true;
                    document.head.querySelector('title').innerHTML = "엔비전스 웹접근성 도서관 - "+_.innerText.trim();
                    _.parentContext.forEach(_=>{
                        _.expanded = true;
                    });
                };
            })

            const located = this.locatedElement;

            this.item.forEach(_=>{
                if(_ !== located){
                    _.removeAttribute('tabindex');
                } else {
                    _.setAttribute('tabindex','0')
                }
            });

            if (this.treeViewMode === "panel-mode"){
                if( located && located.connectedPanel ){
                    located.connectedPanel.show = true;
                    located.activated = true;
                }
            }

            CE.upgrade(this);
        }
    }

    routerEvent (evt) {
        const expandParents = (element) => {
            let parent = element.parentElement;
            while( parent && /treeview-item/i.test( parent.tagName ) ){
                parent.expanded = true;
                parent = parent.parentElement;
            }
        };

        if (evt.type === "DOMContentLoaded"){
            if (this.isHashRoutingEnabled && this.treeviewMode === "panel-mode"){
                const getIdentifiedElementByHashAddress = document.querySelector(location.hash);
                expandParents(getIdentifiedElementByHashAddress ? getIdentifiedElementByHashAddress : this.locatedElement);

                if (getIdentifiedElementByHashAddress) {
                    getIdentifiedElementByHashAddress.located = true;
                    getIdentifiedElementByHashAddress.label.click();
                    document.head.querySelector('title').innerHTML = "엔비전스 웹접근성 도서관 - "+getIdentifiedElementByHashAddress.innerText.trim();
                }
            }
        }

        if (evt.type === 'hashchange' && this.isHashRoutingEnabled){
            evt.preventDefault();
            const getIdentifiedElementByHashAddress = document.querySelector(location.hash);
            expandParents(getIdentifiedElementByHashAddress ? getIdentifiedElementByHashAddress : this.locatedElement);
            if (getIdentifiedElementByHashAddress){
                getIdentifiedElementByHashAddress.located = true;
                getIdentifiedElementByHashAddress.label.click();
                getIdentifiedElementByHashAddress.focus();
                document.head.querySelector('title').innerHTML = "엔비전스 웹접근성 도서관 - "+getIdentifiedElementByHashAddress.innerText.trim();
            } else {
                const fallback = this.querySelectorAll('treeview-item')[0]
                fallback.label.click();
                document.head.querySelector('title').innerHTML = "엔비전스 웹접근성 도서관 - "+fallback.innerText.trim();
            }
        }
    }

    connectedCallback(){
        CE.whenDefined("treeview-item").then(_=>{
            [...this.children].forEach(_=>{
                if(_.tagName.toLowerCase() !== "treeview-item"){
                    _.remove();
                }
            })            
            this.treeitem_init();
            window.addEventListener('DOMContentLoaded',this.routerEvent.bind(this));
            window.addEventListener('load',this.routerEvent.bind(this));
            window.addEventListener('hashchange',this.routerEvent.bind(this));
            window.addEventListener('keydown',(evt)=>{
                const AccessKey = this.getAttribute('access-key')
                if (Boolean(AccessKey)){
                    const reg_isAlphabetOrDigit = /^(Key[A-Z]|Digit[0-9])$/i;
                    if (reg_isAlphabetOrDigit.test(AccessKey)){
                        let Key = AccessKey;
                        if(evt.code === Key && evt.altKey){
                            evt.preventDefault();
                            this.locatedElement.focus();
                        }
                    }
                }
            });
            this.addEventListener('keydown',(evt)=>{
                if(this.getParentTreeviewLayout){
                    if(
                        this.getParentTreeviewLayout.isMobileScreenSize && evt.key === "Tab"
                    ) {
                        evt.preventDefault();
                        this.getParentTreeviewLayout.hideTreeview = true;
                        this.getParentTreeviewLayout.treeviewOpener.focus();
                    }
                }
            })
        })
    }
}
class TreeviewItemElement extends HTMLElement {        
    constructor(){
        super();
        this.itemIndex = [...this.parentTreeView.querySelectorAll('treeview-item')].indexOf(this);
        this.uid = this.id ? this.id : this.parentTreeView.id+"_item-no"+(this.itemIndex+1);
        this.id = this.id ? this.id : this.uid;
        const shadow = this.attachShadow({mode:"open"});
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                :host {
                    width:100%;
                    display:flex;
                    flex-flow:column;
                    user-select:none;
                    box-sizing:border-box;
                }
                :host(:focus) {
                    outline:none; 
                }

                :host(:focus) [part="label"] {
                    background-color:rgba(0,50,255,0.6);
                    color:white;
                }

                :host(:not([expanded])) ::slotted(treeview-item) {
                    display:none;
                }

                :host(:not([expanded])) div{
                    display:none;
                }

                :host([expanded]) div {
                    display:flex;
                    width:100%;
                    flex-flow:column;
                    box-sizing:border-box;
                    padding-left:1em;
                }

                :host span[id] {
                    display:flex;
                    width:100%;
                    font-size:1.2em;
                }

                [part="label"] {
                    display:block;
                    width:100%;
                }

                :host [part="symbol"]{
                    display:flex;
                    justify-content:center;
                    align-items:center;
                }

                :host [part="symbol"]:before {
                    content:"▶";
                    font-size:0.7em;
                }
                
                :host([aria-expanded="true"]) [part="symbol"]:before{
                    content:"▼";
                }
            </style>
            <span id="${this.id}_label">
                <span part="symbol" aria-hidden="true"></span>
                <span part="label" aria-hidden="true"><slot></slot></span>
            </span>
            <div role="group" aria-labelledby="${this.id}_label">
                <slot name="sub-tree"></slot>
            </div>
        `;
        shadow.appendChild(template.content.cloneNode(true));
        this.treeviewSymbol = this.shadowRoot.querySelector('span[part="symbol"]');
        this.label = this.shadowRoot.querySelector('span[part="label"]');
        
        this.setAttribute('role','treeitem');
        this.located ? this.setAttribute('tabindex', "0") : this.removeAttribute('tabindex');
        this.setAttribute('aria-label',this.label.querySelector('slot').assignedNodes()[0].textContent.trim());
    }


    get activated () {
        return this.hasAttribute('activated');
    }

    set activated (v) {
        const bool = Boolean(v);
        if(this.parentTreeView.activatedElement){
            this.parentTreeView.activatedElement.removeAttribute('activated');
        }
        this.toggleAttribute('activated',bool);
    }

    set uid (str)  {
        if(Boolean(str) && typeof str === "string"){
            this.setAttribute('uid',str);
        }
    }
    get uid ()  {
        return this.getAttribute('uid');
    }

    get parentTreeView (   ) {
        return this.closest('treeview-list');
    }

    get hasSubTreeViewItems(){
        return this.querySelectorAll(':scope>treeview-item').length > 0;
    }

    get isSubTreeViewItem() {
        return this.parentElement.tagName.toLowerCase() !== "treeview-list";
    }

    get panelRef() { 
        const pRef = this.getAttribute('panel-ref');
        if (Boolean(pRef)) {
            return pRef
        }
        return null;
    };

    get connectedPanel () {
        if (Boolean(this.panelRef)) {
            const panel = document.querySelector(`treeview-panel#${this.panelRef}`);
            if(Boolean(panel)){
                return panel;
            }
        }
        return null;
    }

    get subTreeItems (   ) {
        const subTree = [...this.querySelectorAll(':scope>treeview-item')];
        if (subTree){
            return subTree;
        }
        return null;
    }

    get previous () {
        const index = this.parentTreeView.item.indexOf(this)-1;
        const prev = this.parentTreeView.item[index];
        if(prev){
            return prev;
        }
        return this.parentTreeView.locatedElement;
    }
    get next () {
        const index = this.parentTreeView.item.indexOf(this)+1;
        const next = this.parentTreeView.item[index]
        if(next) {
            return next;
        }
        return this.parentTreeView.locatedElement;
    }
    get first () {
        const first = this.parentTreeView.item[0];
        return first;
    }
    get last () {
        const last = this.parentTreeView.item[this.parentTreeView.item_count-1];
        return last;
    }

    set located ( v ) {
        if(this.parentTreeView.locatedElement){
            this.parentTreeView.locatedElement.removeAttribute('located');
        }
        this.setAttribute('located',"");
    }

    get located (   ) {
        return this.hasAttribute('located');
    }

    get expanded (   ) {
        if (this.hasSubTreeViewItems){
            return this.hasAttribute('expanded');
        }
        return false;
    }

    set expanded (  v  ) {
        const bool = Boolean(v);
        if(this.hasSubTreeViewItems){
            this.toggleAttribute('expanded',bool);
        }
    }

    static get observedAttributes () { 
        return ['panel-ref','located','expanded','onclick','activated'];
    }

    navigateHandler(evt){
        const [
            KEY_PREVENT_SCROLL,
            KEY_ACTIVATE,
            KEY_PREVIOUS,
            KEY_NEXT,
            KEY_FIRST,
            KEY_LAST,
            KEY_COLLAPSE,
            KEY_EXPAND
        ] = [
            " ",
            "Enter",
            "ArrowUp",
            "ArrowDown",
            "Home",
            "End",
            "ArrowLeft",
            "ArrowRight"
        ];
        const key = evt.key;
        switch(key) {
            case KEY_PREVIOUS:
                evt.preventDefault();
                evt.stopImmediatePropagation();
                this.previous.located = true;
                this.previous.focus();
            break;
            case KEY_NEXT:
                evt.preventDefault();
                evt.stopImmediatePropagation();
                this.next.located = true;
                this.next.focus();
            break;
            case KEY_LAST:
                evt.preventDefault();
                evt.stopImmediatePropagation();
                this.last.located = true;
                this.last.focus();
            break;
            case KEY_FIRST:
                evt.preventDefault();
                evt.stopImmediatePropagation();
                this.first.located = true;
                this.first.focus();
            case KEY_EXPAND:
                evt.preventDefault();
                evt.stopImmediatePropagation();
                if (!this.expanded){
                    this.expanded = true;
                } else {
                    this.next.located = true;
                    this.next.focus();
                }
            break;
            case KEY_COLLAPSE:
                if (this.isSubTreeViewItem){
                    evt.preventDefault();
                    evt.stopImmediatePropagation();
                    if( this.hasSubTreeViewItems && this.expanded ){
                        this.expanded = false;
                    } else {
                        this.parentElement.located = true;
                        this.parentElement.focus();
                    }
                } else {
                    evt.preventDefault();
                    evt.stopImmediatePropagation();
                    this.expanded = false;
                }
            break;
            case KEY_ACTIVATE:
                evt.preventDefault();
                evt.stopImmediatePropagation();
                this.label.click();
            break;
        }
    }

    activateCallback = null;

    onclick ( evt ) {
        evt.stopPropagation();
        const originalOnClick = this.getAttribute('onclick');
        if(this.parentTreeView.treeViewMode === "menu-mode"){
            this.activateCallback = originalOnClick;
        } else {
            this.removeAttribute('onclick');
            console.error(`Do not use the onclick attribute and onclick method on treeview that's not menu-mode. onclick can be used it when you had set a 'treeview-mode' attribute as "menu-mode"!`)
        }
    };

    activateHandler(evt){
        evt.stopPropagation();
        evt.stopImmediatePropagation();
        if (this.parentTreeView.isHashRoutingEnabled){
            location.hash = this.id;
            document.head.querySelector('title').innerHTML = "엔비전스 웹접근성 도서관 - "+this.innerText.trim();
        }
        this.located = true;
        this.parentTreeView.locatedElement.focus();
        if( this.parentTreeView.isSolutionsMenu){
            if ( this.getParentTreeviewLayout.isMobileScreenSize ){
                this.getParentTreeviewLayout.hideTreeview = true;
                this.getParentTreeviewLayout.treeviewOpener.focus();
            }
        }

        if(!this.hasSubTreeViewItems && this.activateCallback && typeof this.activateCallback === "function"){
            eval(this.activateCallback);
        }

        if( this.hasSubTreeViewItems ){
            const mode = this.parentTreeView.treeViewMode;
            //evt.isTrusted
            if (mode === "menu-mode" ) {
                this.treeviewSymbol.click();
            }
        }

        if (this.parentTreeView.treeViewMode === "panel-mode" && this.connectedPanel) {
            this.connectedPanel.show = true;
            this.activated = true;
            /* this.parentTreeView.announcement(`${this.label.querySelector('slot').assignedNodes()[0].textContent} activated`); */
        }
        this.parentTreeView.allItems.forEach(_=>{
            if (_ !== this && Boolean(this.connectedPanel)){    
                if (Boolean(_.connectedPanel)){
                    _.connectedPanel.show = false;
                }
            }
        });
    }

    get parentContext ( ) {
        const arr = [];
        function getParentContext (el) {
            if(el.parentElement.tagName.toLowerCase() === 'treeview-item' ){
                arr.push(el.parentElement);
                getParentContext(el.parentElement);
            } 
        }

        getParentContext(this);

        return arr;
    }
    
    get getParentTreeviewLayout() {
        return this.closest('treeview-layout');
    }

    connectedCallback() {
        if (this.panelRef){
            this.setAttribute('aria-controls',this.panelRef);
        }
        if(this.hasSubTreeViewItems){
            this.setAttribute('aria-expanded',String(this.expanded))
        }
        CE.whenDefined("treeview-item").then(_=>{
            this.subTreeItems.forEach(_=>{
                _.slot = "sub-tree";
            });
            
            this.addEventListener('dblclick',(evt)=>{
                evt.stopImmediatePropagation();
                this.treeviewSymbol.click();
            });


            this.addEventListener('click',(evt)=>{
                    if(
                        Boolean(mo.mobile())
                    ){
                        evt.stopImmediatePropagation();
                        this.treeviewSymbol.click();
                        this.label.click();
                    }
            });
            this.treeviewSymbol.addEventListener('click',(evt)=>{
                evt.stopImmediatePropagation();
                if (evt.isTrusted) {
                    this.located = true;
                    this.focus();
                }
                if(this.hasSubTreeViewItems){
                    this.expanded = !this.expanded;
                }
            });
            
            this.label.addEventListener('click',this.activateHandler.bind(this))
            this.addEventListener('keydown',this.navigateHandler.bind(this))
            this.expanded = this.expanded;
        });
    }

    attributeChangedCallback(name,oV,nV){
        switch(name) {
            case "located":
                if (nV === ""){
                    this.setAttribute('tabindex','0');
                } else {
                    this.removeAttribute('tabindex');
                }
                break;

            case "activated":
                if (nV === ""){
                    this.setAttribute('aria-current','true');
                } else {
                    this.removeAttribute('aria-current');
                }
                break;

            case "expanded":
                if (nV === ""){
                    this.setAttribute('aria-expanded','true');
                } else {
                    this.setAttribute('aria-expanded','false');
                }
                break;
            case "onclick":
                if(this.parentTreeView.treeViewMode !== "menu-mode"){
                    if( Boolean(nV) ){
                        this.removeAttribute('onclick');
                        console.error(`Do not use the onclick attribute and onclick method on treeview that's not menu-mode. onclick can be used when you had set a 'treeview-mode' attribute as "menu-mode"!`)
                    }
                } else {
                    if( Boolean(nV) ){
                        if (this.hasSubTreeViewItems) {
                            this.removeAttribute('onclick');
                            console.error(`Do not use the onclick attribute and onclick method on treeview that has some sub treeitem. onclick can be used it on treeitem that has no children`)
                        } else {
                            this.activateCallback = this.getAttribute('onclick');
                        }
                    }
                }
                break;
            case "panel-ref":
                if(Boolean(nV)){
                    this.setAttribute('aria-controls',nV);
                }
        }
    }
}

class TreeViewContentPanel extends HTMLElement {
    constructor() {
        super();
        this.indexOfDocument = [...document.querySelectorAll("treeview-panel")].indexOf(this);
        this.id = this.id ? this.id : "panel-auto-id"+(this.indexOfDocument+1);
        this.attachShadow({mode:"open"});
        this.setAttribute('role','region');
        const shadow = this.shadowRoot;
        const template = document.createElement("template");
        template.innerHTML = `
            <style>
                :host {
                    display:flex;
                    position:relative;
                    width:100%;
                    max-height:100%;
                    flex-flow:column;
                }
                :host, :host *{
                    box-sizing:border-box;
                    position:relative;
                }

                :host [part="content"]{
                    flex:1;
                    height:100%;
                    width:100%;
                    overflow-y:auto;
                    overflow-x:hidden;
                }

                :host(:not([show])) { /*show 속성이 없으면 나타나지 않도록 */
                    display:none;
                }
            </style>
            <slot name="nav"></slot>
            <slot part="content"></slot>  <!-- 이 슬롯으로 콘텐츠가 들어옵니다.-->
        `;
        this.setAttribute('role','region');
        shadow.appendChild(template.content.cloneNode(true));
    }

    get controller () {
        return document.querySelector(`treeview-item[panel-ref="${this.id}"]`);
    }

    get show () { // 현재 패널이 show 상태인지 가져옵니다. 이 getter는 굳이 필요하지 않지만 형식상 넣습니다.
        return this.hasAttribute('show');
    }

    set show (b){ // show 속성을 조정하는 setter 프로퍼티,
        const value = Boolean(b);
        this.toggleAttribute('show',value);
    }
}

CE.define('treeview-layout',TreeviewLayoutElement);
CE.define('treeview-list',TreeviewListElement);
CE.define('treeview-item',TreeviewItemElement);
CE.define('treeview-panel',TreeViewContentPanel);
})();