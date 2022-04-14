export default (()=> {
    // 탭목록 컨테이너
    class TablistElement extends HTMLElement {
        constructor(  ){
            super(  );
            this.index = [...document.querySelectorAll('tab-list')].indexOf(this);
            this.id = "tab-list_"+(this.index+1)
            this.attachShadow({mode:"open"});
            const shadow = this.shadowRoot;
            const template = document.createElement('template');
            template.innerHTML = `
            <style>
            /*유연한 탭버튼이 나오도록 flex 디스플레이 사용*/
            :host {
                display:flex;
                overflow:hidden;
                border:solid 1px;
            }
    
            :host, *{
                box-sizing:border-box;
                margin:0; padding: 0;
            }
    
            :host([orientation="horizontal"]) {
                border-bottom:solid 0.01em;
            }
            
            :host([orientation="vertical"]) {
                flex-flow:column;
                margin-right:1em;
                height:100%;
                border-right:solid 0.01em;
            }
            </style>
            <!--추후에 만들 tab-item 컴포넌트가 담길 slot-->
            <slot name="tab-buttons"></slot>
            `;
    
            //초기화 및 세팅
            this.setAttribute( 'role' , "tablist" );
            shadow.append(template.content.cloneNode(true));
            this.activationMode = this.activationMode;
            this.orientation = this.orientation;
        }
    
    
        // 탭의 동작 설정 
        get activationMode (  ) {
            return this.getAttribute('activation-mode');
        }
        set activationMode ( str ) {
            const value = String(str);
            this.setAttribute('activation-mode', ( value === "manual" || value === "auto" ) ? value : "auto");
        }
        
        //탭의 방향 가져오기/설정
        get orientation() {
            return this.getAttribute('orientation')
        }
        set orientation(str) {
            const value = String(str);
            this.setAttribute('orientation', ( value === "horizontal" || value === "vertical" ) ? value : "horizontal");
        }
    
        //선택 여부와 관계없이 모든 자식 tab-item 가져오기
        get allTabs (  ) {
            return [...this.querySelectorAll("tab-item")];
        }
        // 선택할 수 있는 탭만 가져오기
        get tabs (  ) {
            return [...this.querySelectorAll("tab-item:not([disabled])")];
        }
    
        // 선택할 수 있는 자식 tab-item의 개수 가져오기
        get tab_count (  ){
            return this.tabs.length;
        }
    
        // 선택된 탭 가져오기
        get selectedTab (  ) {
            return this.querySelector("tab-item[selected]");
        }
    
        // 선택된 탭의 순서 가져오기
        get selectedIndex (  ) {
            return this.tabs.findIndex((el)=>el.selected);
        }


        static get observedAttributes() {
            return ["orientation"];
        }
    
        connectedCallback(){ //tab-list가 문서에 연결되면
    
            customElements.whenDefined("tab-item").then(_=>{ // tab-item이 정의되었을 때 tab-item들을 초기화/기본설정으로 만듬
                this.allTabs.forEach(_=>_.slot = "tab-buttons");
                this.allTabs.forEach((el,idx)=>{                    
                    // 모든 탭의 기본 속성값 추가
                    el.setAttribute('aria-disabled',el.disabled);
                    el.setAttribute('aria-selected',el.selected);
                    el.setAttribute('tabindex',el.selected ? "0" : "-1");
                })
                if(!this.selectedTab ){ // 선택된 탭이 없으면
                    this.tabs[0].click();
                }

                if(this.selectedTab && this.selectedTab.disabled ){ // 선택된 탭이 있으나 disabled인 경우(마크업 안전장치)
                
                    this.tabs[0].click();
                }
                
                if (this.selectedTab ) { // 있는 경우, 해당 탭이 disabled가 아니면 해당 탭이 활성화된 상태로 로드
                    this.selectedTab.click();
                }
            })
        }
        attributeChangedCallback (name,oldVal,newVal) {
            if(name === "orientation" && newVal ){ // orientation 속성 변경 감지 및 aria-orientation 변경
                this.setAttribute('aria-orientation',newVal);
            }
        }
    }
    
    class TabElement extends HTMLElement { // tab-item 컴포넌트
        constructor(){
            super();
            this.attachShadow({mode:"open"});
            const shadow = this.shadowRoot;
            const template = document.createElement('template');
            template.innerHTML = `
                <style>
    
                * {
                    margin:0; padding:0; box-sizing:border-box;
                }
    
                #text {
                    padding:0.25em;
                }
    
                :host-context(tab-list) {
                    display:flex;
                    position:relative;
                    width:auto; height:fit-content;
                    border-style:solid;
                }
    
    
                :host-context(tab-list[orientation="horizontal"]):host {
                    flex-flow:column;
                    border-color:transparent currentColor;
                    border-width:0 0.01em 0 0;
                }
                :host-context(tab-list[orientation="vertical"]):host {
                    flex-flow:row;
                    border-width:0 0 0.01em 0;
                    border-color:currentColor transparent;
                }
    
                
                /*선택된 탭의 스타일*/
                :host-context(tab-list[orientation="vertical"]):before {
                    content:"";
                    background-color:transparent;
                    width:0.8em; min-height:100%;
                    margin-right:0.25em;
                }
                :host-context(tab-list[orientation="vertical"]):host([selected]):before {
                    background-color:currentColor;
                }
                :host-context(tab-list[orientation="horizontal"]):after {
                    content:"";
                    width:100%; height:0.25em;
                    background-color:transparent;
                }
                
                :host-context(tab-list[orientation="horizontal"]):host([selected]):after {
                    background-color:currentColor;
                }

                /*disabled 상태*/
                :host([disabled]) {
                    opacity:0.6;
                    pointer-events:none;
                }
    
    
                /*마지막 아이템에 그림자 추가*/
                
                :host-context(tab-list[orientation="vertical"]):host(:last-child) {
                    box-shadow: 0 0.3em 0.4em 0.01em rgba(0,0,0, 0.5);
                }
                :host-context(tab-list[orientation="horizontal"]):host(:last-child) {
                    box-shadow: 0.3em 0 0.4em 0.01em rgba(0,0,0, 0.5);
                }
                </style>
    
                <span id="text" role="none">
                    <slot></slot>
                </span>
                `;
            
            this.setAttribute('role','tab');
            
            this.index = this.parentTablist.tabs.indexOf(this);
            this.id = this.parentTablist.id+"_tab-button_"+(this.index+1); // 레이블링을 위한 아이디가 자동으로 붙습니다.
            this.setAttribute('aria-labelledby',this.id);
            shadow.appendChild(template.content.cloneNode(true));
        }
    
        get linkedPanel() {
            const PANEL_ID = this.getAttribute('aria-controls');
            if(PANEL_ID) {
                const PANEL = document.querySelector('tab-panel#'+PANEL_ID);
                if (PANEL){
                    return PANEL;
                }
                return null;
            }
            return null;
        }
    
    
        /* [ 상태 getter/setter ] */
        
        get disabled (  ) {
            return this.hasAttribute( 'disabled' );
        }
    
        set disabled ( b ) {
            this.toggleAttribute('disabled',Boolean(b));
        }
        get selected (  ) {
            return this.hasAttribute( 'selected' );
        } 
        set selected ( b ) {
            this.toggleAttribute('selected',Boolean(b));
        }
    
        get parentTablist () {
            return this.closest('tab-list');
        }
    
        static get observedAttributes() {
            return ['disabled','selected','orientation'];
        }
    
        // 현재 탭을 기준으로 선택가능한 다음 탭 형제를 가져옵니다.
        get nextTabSibling (  ) {
            const nxtTab = this.parentTablist.tabs[this.index+1]
            if(!nxtTab) {
                return this.firstTabSibling;
            } 
            return nxtTab;
        }
        // 현재 탭을 기준으로 선택가능한 이전 탭 형제를 가져옵니다.
        get previousTabSibling (  ) {
            const prvTab = this.parentTablist.tabs[this.index-1];
            if(!prvTab){
                return this.lastTabSibling;
            }
            return prvTab;
        }
    
        // 선택가능한 첫 탭 형제를 가져옵니다.
        get firstTabSibling (  ) {
            return this.parentTablist.tabs[0];
        }

        // 선택가능한 마지막 탭 형제을 가져옵니다.
        get lastTabSibling (  ) {
            return this.parentTablist.tabs[this.parentTablist.tab_count-1];
        }

        showPanel() {
            // 패널이 있을 경우 표시
            if (this.linkedPanel){
                this.linkedPanel.show = true;
            }
        }

        hidePanel(){
            // 패널이 있으면 패널을 숨깁니다.
            if(this.linkedPanel){
                this.linkedPanel.show = false;
            }
        }

        clickHandler (evt) { 
            // 클릭 이벤트 핸들러입니다
            if (!this.disabled){ // disabled가 아닌 경우에만 활성화를 가능하게 해야 합니다.
                this.parentTablist.allTabs.forEach((element,index)=>{
                    if ( element !== this ){ // 이 탭이 아닌 탭요소를 선택해제, 패널을 숨김처리합니다.
                        element.selected = false;
                        element.hidePanel();
                    } else { // 현재 탭을 선택합니다. 패널을 표시합니다.
                        this.selected = true;
                        this.showPanel();
                    }
                })
            }
        }

        keyboardNavigationHandler(evt){
            // 키보드 이벤트 핸들러입니다.
            // isVerticalTab은 탭이 세로 탭인지 확인하는 불린 변수입니다.
            //NXT(Next)와 PRV(Previous) 키는 위 isVerticalTab의 값에 따라 정해집니다.
            const isVerticalTab = this.parentTablist.orientation === "vertical";
            const NXT = isVerticalTab ? "ArrowDown" : "ArrowRight";
            const PRV = isVerticalTab ? "ArrowUp" : "ArrowLeft";
            const FST = "Home";
            const LST = "End";
            const CLICK1 = " ";
            const CLICK2 = "Enter";
            const TAB = "Tab";
            switch(evt.key) { // evt.key를 통해 누른 키를 감지합니다.
                case NXT: 
                    evt.preventDefault(); // 방향키와 홈 앤드키 동작 시 문서가 스크롤되지 않도록 합니다.
                    if(this.parentTablist.activationMode === "auto") { //activation-mode가 auto 일 경우에만 selected가 붙도록 click을 dispatch합니다.
                        this.nextTabSibling.click();
                    }
                    this.nextTabSibling.focus();
                    break;
                    //아래는 모두 비슷하게 반복.
                case PRV:
                    evt.preventDefault();
                    if(this.parentTablist.activationMode === "auto") {
                        this.previousTabSibling.click();
                    }
                    this.previousTabSibling.focus();
                    break
                case FST:
                    evt.preventDefault();
                    if(this.parentTablist.activationMode === "auto") {
                        this.firstTabSibling.click();
                    }
                    this.firstTabSibling.focus();
                    break
                case LST:
                    evt.preventDefault();
                    if( this.parentTablist.activationMode === "auto" ) {
                        this.lastTabSibling.click();
                    }
                    this.lastTabSibling.focus();
                    break
                case CLICK1:
                case CLICK2: // Enter나 Space를 눌렀을 때 탭이 선택되도록 합니다. activation-mode 속성을 'manual'로 설정했을 경우 활성화할 수 있어야 하기 때문입니다.
                    this.click();
                    break;
                case TAB:
                    if (!evt.shiftKey){
                        evt.preventDefault();
                        if(this.parentTablist.selectedTab.linkedPanel){
                            this.parentTablist.selectedTab.linkedPanel.focus();
                        }
                    }
                    break;
            }
        }
        
        connectedCallback(){ //tab-item이 HTML 문서에 연결되면
            //이벤트 핸들러 등록
            this.addEventListener('click',this.clickHandler.bind(this));
            this.addEventListener('keydown',this.keyboardNavigationHandler.bind(this));

            // 패널이 있으면 panel의 id와 연결합니다.
            if(this.linkedPanel){
                this.linkedPanel.setAttribute('aria-labelledby',this.id);
            }
        }
        disconnectedCallback(){ // 문서에서 연결이 해제됐을 때
            //이벤트 핸들러 삭제
            this.removeEventListener('click',this.clickHandler);
            this.removeEventListener('keydown',this.keyboardNavigationHandler);
        }
    
        attributeChangedCallback(name,oldVal,newVal) { // 등록된 속성 변경이 감지되었을 때 실행되는 콜백
            const isTrue = newVal ===  "";
            switch(name) {
                case "selected":

                // selected 속성이 감지되면 aria-selected와 tabindex 값을 조정
                    this.setAttribute('aria-selected',isTrue);
                    this.setAttribute('tabindex',isTrue ? "0" : "-1");
                    break;
                    // disabled 속성이 감지되면 aria-disabled와 tabindex 값을 조정
                case "disabled":
                    this.setAttribute('aria-disabled',isTrue);
                    if (isTrue){
                        this.removeAttribute('tabindex');
                    }
                    this.setAttribute('tabindex','0');
                    break;
            }
        }
    }
    
    
    class tabPanelElement extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({mode:"open"});
            this.setAttribute('tabindex','0');
            this.setAttribute('role','tabpanel');
            const shadow = this.shadowRoot;
            const template = document.createElement("template");
            template.innerHTML = `
                <style>
                    :host(:not([show])) { /*show 속성이 없으면 나타나지 않도록 */
                        display:none; 
                    }
                </style>
                <slot></slot>  <!-- 이 슬롯으로 콘텐츠가 들어옵니다.-->
            `;
            this.setAttribute('role','tabpanel');
            shadow.appendChild(template.content.cloneNode(true));
        }

        get show () { // 현재 패널이 show 상태인지 가져옵니다. 이 getter는 굳이 필요하지 않지만 형식상 넣습니다.
            return this.hasAttribute('show');
        }
    
        set show (b){ // show 속성을 조정하는 setter 프로퍼티,
            const value = Boolean(b);
            this.toggleAttribute('show',value);
        }
    
    }
    
    class TabLayoutElement extends HTMLElement { // 레이아웃 컨테이너
        // orientation 속성에 따라 tablist의 orientation이 정해지고, 레이아웃이 그에 맞게 변경되는 레이아웃 컴포넌트입니다.
        constructor(  ) {
            super(  );
            this.attachShadow({mode:"open"});
            const shadow = this.shadowRoot;
            const template = document.createElement("template");
            template.innerHTML = `
                <style>
                *{margin:0; padding:0; box-sizing:border-box;}
                :host {
                    display:grid;
                    min-width:280px;
                    max-width:100%;
                    min-height:300px;
                    max-height:100%;
                    position:relative;
                    border:solid 0.01em currentColor;
                    overflow:hidden;
                    border-radius:0.5em;
                    margin:0.5em 0;
                }
    
                :host( [ orientation = "horizontal" ] ) {
                    grid-template-columns: 1fr;
                    grid-template-rows:auto 9fr;
                }
                :host( [ orientation = "vertical" ] ) {
                    grid-template-columns:minmax(auto,10em) 9fr;
                    grid-template-rows: 1fr;
                }
    
                .panel-region{
                    padding:1em;
                }
                </style>
    
                <div>
                <slot name="tablist"></slot>
                </div>
                
                <div class="panel-region">
                    <slot name="panel"> </slot>
                </div>
            `;
            shadow.append(template.content.cloneNode(true));
            this.orientation = this.orientation // orientation 초기화
            if(this.tabName){ // tabName이 설정된 경우, tablist의 aria-label을 설정합니다.
                this.tabName = this.tabName;
            }
        }
    
        get orientation() {
            return this.getAttribute('orientation')
        }
        set orientation(str) {
            const value = String(str);
            this.setAttribute('orientation', ( value === "horizontal" || value === "vertical" ) ? value : "horizontal");
        }

        set tabName(str){
            this.setAttribute('tab-name',String(str));
        }

        get tabName () {
            return this.getAttribute('tab-name');
        }

        get tabList() {
            return this.querySelector('tab-list')
        }

        get tabPanel(){
            return this.querySelectorAll('tab-panel');
        }
        
        static get observedAttributes () {
            return ["orientation","tab-name"];
        }

        connectedCallback() {
            Promise.all([
                customElements.whenDefined('tab-list'),
                customElements.whenDefined('tab-item'),
                customElements.whenDefined('tab-panel')
            ]).then(_=>{
                // tab-list와 tab-panel이 이곳에 정의되면
                this.tabList.orientation = this.orientation; // 탭의 방향을 이 레이아웃의 방향에 따르도록 설정
                this.tabList.slot = "tablist"; // tablist 슬롯에 등록
                this.tabPanel.forEach(_=>_.slot = "panel"); // 
            })
        }

        attributeChangedCallback(name,oldVal,newVal) {
            if (name === "orientation" && newVal ){
                if(this.tabList){
                    this.tabList.orientation = this.orientation;
                }
            }
            if (name === "tab-name" && newVal && newVal !== "" ){ 
                if(this.tabList){ // 탭컨트롤 명칭이 바뀌면 캡트롤 리스트이 aria-label을 갱신합니다.
                    this.tabList.setAttribute('aria-label',this.tabName);
                }
            }
        }
    }

    // 만든 요소들을 등록합니다.
    customElements.define('tab-list',TablistElement);
    customElements.define('tab-item',TabElement);
    customElements.define('tab-panel',tabPanelElement);
    customElements.define('tab-layout',TabLayoutElement);
})();