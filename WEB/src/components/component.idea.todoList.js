class ToDoItem {
    constructor(ToDoText="None",desc="",addedDate=new Date(),updateCount=0){
        const self = this;
        this.ToDoText = ToDoText;
        this.desc = desc;
        this.addedDate = addedDate;
        this.updateCount = updateCount;
        this.modifyMode;
        this.userLanguage = navigator.language;
        this.languagePack =  languagePacks;
        this.language = this.languagePack[this.userLanguage.slice(0,2)];
        this.jsonData = {
            ToDoText:this.ToDoText,
            desc:this.desc,
            addedDate:this.addedDate,
            updateCount:this.updateCount
        }
        this.itemElement = document.createElement('li');
        this.itemElement.classList.add('ToDo-Item');
        this.itemResultContainer = document.createElement('div');
        this.itemResultContainer.classList.add('ToDo-Result');
            this.result_ToDoText = document.createElement('div');
            this.result_ToDoText.classList.add('result-text');
            this.result_ToDoText.innerHTML = this.ToDoText;
            this.result_ToDoDescription = document.createElement('div');
            this.result_ToDoDescription.innerHTML = this.desc;
            this.result_ToDoDescription.classList.add('result-description');

            this.readModeButtonContainer = document.createElement('div');
            this.readModeButtonContainer.classList.add('btnSets_readMode');
                this.btnModify = document.createElement('button');
                    this.btnModify.classList.add('material-icons');
                    this.btnModify.innerHTML="edit"
                    this.btnModify.setAttribute('tabindex','-1');
                this.btnDelete = document.createElement('button');
                    this.btnDelete.classList.add('material-icons');
                    this.btnDelete.innerHTML="delete"
                    this.btnDelete.setAttribute('tabindex','-1');
            this.readModeHintContainer = document.createElement('div');
            this.readModeHintContainer.classList.add('hintBox')
                this.readModeHintContainer.innerHTML=
                `
                <strong>Shortcut</strong>
                <span class="hints"><span class="material-icons" aria-hidden="true">delete</span>${self.language["hint_del"]} (Delete)</span>
                <span class="hints"><span class="material-icons" aria-hidden="true">edit</span>${self.language["hint_mod"]} (Alt + M)</span>
                `
        this.readModeButtonContainer.append(this.btnModify,this.btnDelete);
        this.itemResultContainer.append(this.result_ToDoText,this.result_ToDoDescription,this.readModeHintContainer,this.readModeButtonContainer);
        
        this.btnDelete.addEventListener('click',deleteItemHandler);
        this.btnModify.addEventListener('click',turnModifyModeHandler);

        this.modifierContainer = document.createElement('section');
        this.modifierContainer.setAttribute("aria-label",this.ToDoText+", "+this.language["mode_modify"]);
        this.modifierContainer.classList.add('modifiers');
            this.label_for_Mod_ToDoText = document.createElement('label');      
                this.labelText_Mod_ToDoText = document.createElement('span');
                    this.labelText_Mod_ToDoText.innerHTML=this.language["label_mod_ToDoTextInput"];
                this.mod_ToDoTextInput = document.createElement('input');
                    this.mod_ToDoTextInput.value = this.ToDoText;
            this.label_for_Mod_ToDoText.append(this.labelText_Mod_ToDoText,this.mod_ToDoTextInput);
            
            this.label_for_Mod_ToDoDescription = document.createElement('label');
                this.labelText_Mod_ToDoDescription = document.createElement('span');
                    this.labelText_Mod_ToDoDescription.innerHTML = this.language["label_mod_ToDoDescriptionInput"];
                this.mod_ToDoDescriptionInput = document.createElement('textarea');
                    this.mod_ToDoDescriptionInput.value = this.desc;
            this.label_for_Mod_ToDoDescription.append(this.labelText_Mod_ToDoDescription,this.mod_ToDoDescriptionInput);
            this.btnModifyingDone = document.createElement('button');
            this.btnModifyingDone.innerHTML = this.language["btn_mod_done"];
            this.btnModifyingCancel = document.createElement('button');
            this.btnModifyingCancel.innerHTML = this.language["btn_mod_cancel"];
        this.modifierContainer.append(this.label_for_Mod_ToDoText,this.label_for_Mod_ToDoDescription,this.btnModifyingDone,this.btnModifyingCancel);

        this.itemElement.append(this.itemResultContainer,this.modifierContainer);
        
        this.itemElement.addEventListener('keydown',keyboardCommandHandler);
        this.mod_ToDoTextInput.addEventListener('input',t_ModifiedListenHandler);
        this.mod_ToDoDescriptionInput.addEventListener('input',c_ModifiedListenHandler);
        this.btnModifyingCancel.addEventListener('click',cancelModifyingHandler);
        this.btnModifyingDone.addEventListener('click',DoneModifyingHandler);

        this.setModifyMode=false;

        function keyboardCommandHandler(e){
            if(e.key === "Delete"){
                if(!self.modifyMode){
                    deleteItemHandler(self);
                }
            }
            if(e.altKey && e.code === "KeyM"){
                if(!self.modifyMode){
                    turnModifyModeHandler();
                }
            }
        }

        function t_ModifiedListenHandler(){
            self.ToDoText = this.value;
        }

        function c_ModifiedListenHandler(){
            self.desc = this.value;
        }

        function deleteItemHandler(){
            self.ListClass.deleteToDo(self);
            self.ListClass.announceEvent((self.filteredIndex+1)+getNumberWithPrefix(self.filteredIndex+1,self.language["LangCode"])+self.language["msg_notify_deleted"]);
        }

        function turnModifyModeHandler(){
            self.setModifyMode = true;
            self.mod_ToDoTextInput.focus();
        }

        function DoneModifyingHandler(){
            if(self.ToDoText.length > 0){
                self.setModifyMode = false;
                self.result_ToDoText.innerHTML = self.ToDoText;
                self.result_ToDoDescription.innerHTML = self.desc;
                self.jsonData.ToDoText = self.ToDoText;
                self.jsonData.desc = self.desc;
                self.jsonData.updateCount = self.updateCount ++;
                self.ListClass.list[self.index] = self;
                self.ListClass.jsonDataList[self.index] = self.jsonData;
                console.log(self.ListClass.list[self.index],self.ListClass.jsonDataList[self.index]);
                self.itemElement.focus();
                self.ListClass.saveToLocalStorage();
            }else{
                alert(self.language["alert_add_mssingRequiredInput"]);
                self.mod_ToDoTextInput.focus();
            }
        }

        function cancelModifyingHandler(){
            self.setModifyMode = false;
            self.itemElement.focus();
        }
    }

    set setModifyMode(state){
        if(typeof state === 'boolean'){
            this.itemElement.classList.toggle('onModifying',state);
            this.itemElement.classList.toggle('onReadMode',!state);
            state ? this.itemElement.removeAttribute('tabindex') : 
            this.itemElement.setAttribute('tabindex','0');
            this.modifyMode = state;
        }
    }
}


class ToDoList {
    constructor(posContainer = document.body){
        const self = this;
        this.today_date = new Date();
        this.today_date_form = this.today_date.getFullYear()+"-"+(this.today_date.getMonth()+1)+"-"+this.today_date.getDate();
        this.list = [];
        this.jsonDataList = [];
        this.storage = localStorage["Storage_NV_TODO"] ? localStorage["Storage_NV_TODO"] : null;
        this.filteredDateList = []
        this.userLanguage = navigator.language;
        this.languagePack =  languagePacks;
        this.language = this.languagePack[this.userLanguage.slice(0,2)];
        document.querySelector('html').lang=this.language.LangCode;
        if(posContainer instanceof Element){
            //요소를 설치할 컨테이너 요소
            this.position = posContainer;

            //TOdo 레이아웃 레퍼
            this.ToDoContainer = document.createElement('div');
            this.ToDoContainer.classList.add('ToDo-Container');
            //조회 및 저장 레이아웃
            this.LoadAndSaveContainer = document.createElement('div');
            this.LoadAndSaveContainer.setAttribute('aria-label',this.language["formLabel_AddToDos"])
            this.LoadAndSaveContainer.setAttribute('role','form');
            this.LoadAndSaveContainer.classList.add('Todo-loadTodoData-form-container');
                //년 Input
                this.YearInput = document.createElement('input');
                const YI = this.YearInput;
                    YI.value = this.today_date.getFullYear();
                    YI.type = "number";
                    YI.id = 'ToDo_YearInput';
                    YI.maxLength=4;
                        this.YearInputLabel = document.createElement('label');
                        const YI_L = this.YearInputLabel;
                            YI_L.htmlFor=YI.id;
                            YI_L.innerHTML = this.language['label_year'];
                this.YearNumber = Number(YI.value);
                YI.addEventListener('input',checkYearHandler);
                // 월 Input
                this.MonthInput = document.createElement('input');
                const MI = this.MonthInput;
                    MI.value = this.today_date.getMonth()+1;
                    MI.type="number";
                    MI.maxLength=2;
                    MI.id="ToDo_MonthInput";
                        this.MonthInputLabel = document.createElement('label');
                        const MI_L = this.MonthInputLabel;
                            MI_L.htmlFor=MI.id;
                            MI_L.innerHTML = this.language['label_month'];
                this.MonthNumber = Number(MI.value);
                MI.addEventListener('input',checkMonthHandler);
                // 일 Input
                this.DateInput = document.createElement('input');
                const DI = this.DateInput;
                    DI.value = this.today_date.getDate();
                    DI.type ="number";
                    DI.maxLength=2;
                    DI.id="ToDo_DateInput";
                        this.DateInputLabel = document.createElement('label');
                        const DI_L = this.DateInputLabel;
                            DI_L.htmlFor=DI.id;
                            DI_L.innerHTML = this.language['label_date'];
                this.DateNumber = Number(DI.value);
                DI.addEventListener('input',checkDateHandler);
                this.BtnLoadDataOfDate = document.createElement('button');
                const BtnLoadDataOfDate = this.BtnLoadDataOfDate;
                    BtnLoadDataOfDate.classList.add('material-icons');
                    BtnLoadDataOfDate.innerHTML="keyboard_return";
                    BtnLoadDataOfDate.id="btnLoadToDoData";
                    BtnLoadDataOfDate.setAttribute('aria-label',this.language["label_btnLoadDate"]);
                    BtnLoadDataOfDate.addEventListener('click',function(){
                        self.DataFilter();
                    })
            this.LoadAndSaveContainer.append(YI,YI_L,MI,MI_L,DI,DI_L,BtnLoadDataOfDate);
            
            //Todo 항목 추가 레이아웃
            this.ItemCreatorContainer = document.createElement('div');
            this.ItemCreatorContainer.setAttribute('role','form');
            this.ItemCreatorContainer.setAttribute('aria-label',this.language["formLabel_AddToDos"]);
            this.ItemCreatorContainer.classList.add('ToDo-ItemCreator');
            //ToDo 리스트 컨테이너
            this.ListContainer = document.createElement('ul');
            this.ListContainer.classList.add('ToDo-List-Container');

            this.inputToDoText = document.createElement('input');
                this.inputToDoText.placeholder = this.language["placeHolder_ToDoTextInput"] // 리소스  placeHolder_ToDoText
                this.inputToDoText.setAttribute('aria-required','true');
                this.inputToDoText.type = 'text';
                this.inputToDoText.id = "ToDoInput";

            this.labelForInputToDoText = document.createElement('label');
                this.labelForInputToDoText.htmlFor="ToDoInput";
                this.labelForInputToDoText.innerHTML=this.language["label_ToDoTextInput"];
            
            this.inputToDoDescription = document.createElement('textarea');
                this.inputToDoDescription.placeholder = this.language["placeHolder_ToDoDescriptionInput"];
                this.inputToDoDescription.id = "ToDoDescriptionInput"
            
            this.labelForInputToDoDescription = document.createElement('label');
                this.labelForInputToDoDescription.htmlFor="ToDoDescriptionInput";
                this.labelForInputToDoDescription.innerHTML=this.language["label_ToDoDescriptionInput"];

            this.btnAddToDoItem = document.createElement('button');
                this.btnAddToDoItem.innerHTML = "add";
                this.btnAddToDoItem.classList.add('material-icons');
                this.btnAddToDoItem.setAttribute('aria-label',this.language["label_btnAdd"]);
                this.btnAddToDoItem.id = "btnAddItem";
            this.btnAddToDoItem.addEventListener('click',addToDoHandler);
            
            this.ToDoAnnouncer = document.createElement('div');
                this.ToDoAnnouncer.classList.add('announcer');
                this.ToDoAnnouncer.setAttribute('aria-live','polite');

            this.ToDoVisibleAnnouncer = document.createElement('div');
                this.ToDoVisibleAnnouncer.classList.add('announcer-visible');
                this.ToDoVisibleAnnouncer.setAttribute('aria-live','polite');

            this.EmptyMessageBox = document.createElement('p');
                this.EmptyMessageBox.setAttribute('tabindex','-1');
                this.EmptyMessageBox.classList.add('empty-message');
            
            this.initElement = [
                this.labelForInputToDoText,
                this.inputToDoText,
                this.labelForInputToDoDescription,
                this.inputToDoDescription,
                this.btnAddToDoItem,
                this.ToDoAnnouncer,
                this.EmptyMessageBox
            ]

            publish(this.position);
        }

        function checkYearHandler(){
            const v = Number(this.value);
            const v_length = this.value.length;
            const min = 2020;
            if(v < min && v_length < 4){
                self.visibleAnnounceEvent(self.language["msg_notify_typedDights"][0]+v_length+self.language["msg_notify_typedDights"][1]);
            }else if( v_length >= 4 && v >= min){
                self.ToDoVisibleAnnouncer.innerHTML='';
                self.MonthInput.value=1;
                self.DateInput.value=1;
            }

            if(v < min && v_length === 4 ){
                this.value = min;
                this.select();
                self.visibleAnnounceEvent(self.language["msg_error_typedLessThanMinYear"][0]+min+self.language["msg_error_typedLessThanMinYear"][1]);
            }
        }

        function checkMonthHandler(){
            const v = Number(this.value);
            const v_length = this.value.length;

            if( v < 1 || v > 12){
                self.visibleAnnounceEvent(self.language["msg_error_typedWrongMonth"]);
                if(v > 12){
                    this.value = 12;
                }else if(v < 1){
                    this.value = 1;
                }  
            }else{
                self.ToDoVisibleAnnouncer.innerHTML = "";
            }
        }

        function checkDateHandler(){
            const Y = self.YearNumber;
            const M = self.MonthInput.value;
            const lastDate = new Date(Y,M,0).getDate();
            const v = Number(this.value);
            if( v > lastDate){
                this.value = 1;
                this.select();
                self.visibleAnnounceEvent(self.language["msg_error_typedDateOverThanMaxDate"]);
            }else if( v === 0){
                this.value = lastDate;
                this.select();
                self.visibleAnnounceEvent(self.language["msg_error_typedDateLessThanMinDate"][0]+lastDate+self.language["msg_error_typedDateLessThanMinDate"][1]);
            }
        }

        function addToDoHandler(){
            const inputs = [
                self.inputToDoText,
                self.inputToDoDescription
            ];

            const currentInputDate = self.YearInput.value+"-"+self.MonthInput.value+"-"+self.DateInput.value;

            if(inputs[0].value === ""){
                alert(self.language["alert_add_mssingRequiredInput"])
                inputs[0].focus();
            }else{
                self.addToDo(new ToDoItem(inputs[0].value,inputs[1].value,currentInputDate,self.updateCount));
                self.ListContainer.appendChild(self.getLastToDoItem().itemElement);
                self.announceEvent(self.language["msg_notify_addedSuccessfull"][0]+self.filteredDateList.length+self.language["msg_notify_addedSuccessfull"][1]);
            }
        }

        function publish(pos){
            pos.appendChild(self.ToDoContainer);
            self.loadToDoList();
            self.DataFilter();
            self.ToDoContainer.append(self.LoadAndSaveContainer,self.ToDoVisibleAnnouncer,self.ItemCreatorContainer,self.ListContainer);
            self.ItemCreatorContainer.append(...self.initElement);
            self.setEmptyMessageDisplay = self.filteredDateList.length;
        }
    }

    deleteToDo(ToDo){
        if(ToDo instanceof ToDoItem){
            if(this.ListContainer.contains(ToDo.itemElement)){
                this.ListContainer.removeChild(ToDo.itemElement);
            }
            this.list.splice(ToDo.index,1);
            this.jsonDataList.splice(ToDo.index,1);
            for(const el of this.list){
                el.index = getThisIndexInArray(el,this.list);
            }

            this.DataFilter();
            
            if(ToDo.filteredIndex === 0 && this.filteredDateList.length >= 1){
                this.filteredDateList[ToDo.filteredIndex].itemElement.focus();
            }else if( ToDo.filteredIndex === 0 && this.filteredDateList.length === 0){
                this.setEmptyMessageDisplay = this.filteredDateList.length;
                this.EmptyMessageBox.focus();
            }

            if(ToDo.filteredIndex > 0 && this.filteredDateList.length >= 1){
                this.filteredDateList[ToDo.filteredIndex-1].itemElement.focus();
            }
            this.saveToLocalStorage();
        }
    }

    set setEmptyMessageDisplay(v){
        const YI = this.YearInput;
        const MI = this.MonthInput;
        const DI = this.DateInput;
        if(YI.value+"-"+MI.value+"-"+DI.value === this.today_date_form ){
            this.EmptyMessageBox.innerHTML = "<span>"+this.language["msg_notify_emptyToday"]+"</span>"
        }else{
            this.EmptyMessageBox.innerHTML = "<span>"+this.language["msg_notify_empty"]+"</span>"
        }
        this.EmptyMessageBox.classList.toggle('hide-message',v!==0);
    }

    addToDo(ToDo){
        if(ToDo instanceof ToDoItem){
            ToDo.ListClass = this;

            this.list.push(ToDo);
            this.jsonDataList.push(ToDo.jsonData);
            ToDo.index = getThisIndexInArray(ToDo,this.list);

            this.setEmptyMessageDisplay = this.filteredDateList.length;
            this.saveToLocalStorage();
            this.DataFilter();
        }
    }

    DataFilter(){
        const self = this;
        const Y = this.YearInput.value;
        const M = this.MonthInput.value;
        const D = this.DateInput.value;
        
        let format = (Y+"-"+M+"-"+D);
        
        self.filteredDateList = self.list.filter(function(el){
            if( el.addedDate.indexOf(format) < 0 ){
                if(self.ListContainer.contains(el.itemElement)){
                    self.ListContainer.removeChild(el.itemElement);
                }
            }
            
            if(el.addedDate.indexOf(format) > -1){
                self.ListContainer.appendChild(el.itemElement);
                return el;
            }
        });
        
        self.setEmptyMessageDisplay = self.filteredDateList.length;
        this.setfilteredIndex();
    }

    setfilteredIndex (){
        for(let i=0; i<this.filteredDateList.length; i++){
            this.filteredDateList[i].filteredIndex = i;
        }
    }

    
    loadDateSet(){
        return JSON.parse(localStorage.getItem("TODO_Storage"));
    }

    saveToLocalStorage(){
        localStorage.setItem("TODO_Storage",JSON.stringify(this.jsonDataList));
    }

    loadToDoList(Y=this.YearInput.value,M=this.MonthInput.value,D=this.DateInput.value){
        this.storage = this.loadDateSet();
        let storage = this.storage;
        if(storage){
            for(const element of storage){
                this.addToDo(new ToDoItem(
                    element.ToDoText,
                    element.desc,
                    element.addedDate,
                    element.updateCount
                ))
            }
            for(let i=0; i<this.list.length; i++){
                if( !this.ListContainer.contains(this.list[i].itemElement) ){
                    this.ListContainer.appendChild(this.list[i].itemElement);
                }
            }
        }
    }

    visibleAnnounceEvent(MSG){
        const self = this;
        self.ToDoVisibleAnnouncer.innerHTML = MSG;
    }

    announceEvent(MSG){
        const self = this;
        self.ToDoAnnouncer.innerHTML = MSG;
        setTimeout(function(){
            self.ToDoAnnouncer.innerHTML = '';
        },800);
    }

    getLastToDoItem(){
        return this.list[this.list.length-1];
    }
}

function getThisIndexInArray(element,array){
    return Array.prototype.indexOf.call(array,element);
}

function getNumberWithPrefix(num,lang){
    if(lang === "en"){
        if(typeof num === 'number'){
            if(num === 1){
                return 'st';
            }
            if(num === 2){
                return 'nd';
            }
            if(num === 3){
                return 'rd';
            }
    
            if(num >= 4){
                return 'th';
            }
        }
    }else{
        return "";
    }
}