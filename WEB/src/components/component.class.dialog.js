Element.prototype.setAttributes = function(obj){
    if(obj instanceof Object){
        for(v in obj){
            this.setAttribute(v,obj[v])
        }
    }
}

class Dialog{
    constructor(settings){
        const root = this;
        this.LanguagePack = {
            en:{
                Title:'Sample Title',
                Content:"<p>It's a Sample Content. Please put content by your own color.</p>",
                CloseButtonText:'Close',
                ButtonText:{
                    OK:'Okay',
                    Cancel:'Cancel',
                    Ignore:'Ignore'
                }
            },
            ko:{
                Title:'셈플 제목',
                Content:"<p>이것은 셈플 텍스트입니다. 당신만의 색깔로 대화상자의 내용을 체워주세요</p>",
                CloseButtonText:'닫기',
                ButtonText:{
                    OK:'확인',
                    Cancel:'취소',
                    Ignore:'무시'
                }
            },
            ja:{
                Title:'セムプルタイトル',
                Content:"<p>これはダイアログボックスためのサムプル文章です。あなただけの 色でこのダイアログボックスにコンテンツ内容を書いてください。</p>",
                CloseButtonText:'閉じる',
                ButtonText:{
                    OK:'確認',
                    Cancel:'キャンセル',
                    Ignore:'無視'
                }
            }
        }
        if(settings instanceof Object){
            this.valueOfPressedButton = null;
            this.PageWrapper = null;
            this.DialogRoot = null;
            this.Type = 0;
            this.trueCallback = null;
            this.falseCallback = null;
            this.cancelCallback = null;
            this.LangCode='en';
            this.CustomReturnFocusPoint = null;
            for(const value in this){
                if( settings.hasOwnProperty(value) ){
                    this[value] = settings[value];
                }
            }
            this.textCollection = this.LanguagePack[this.LangCode];
            this.ButtonText = !settings.ButtonText ? this.textCollection.ButtonText : settings.ButtonText;
            this.Title = !settings.Title ? this.textCollection.Title : settings.Title
            this.Content = !settings.Content ? this.textCollection.Content : settings.Content;
        }

        this.CloseDialog = function (){
            root.DialogRoot.style.display = 'none';
            firstEl.removeEventListener('keydown',goToLastElement);
            lastEl.removeEventListener('keydown',goToFirstElement);
            root.PageWrapper.removeAttribute('aria-hidden');
            setTimeout(function(){root.ReturnFocusPoint.focus()},300);
        }

        this.DialogRoot.classList.add('dialog-root-element');
		this.DialogRoot.style.display='';
		this.DialogRoot.innerHTML = '';
		this.dimmedLayer = document.createElement('div');
        this.dimmedLayer.classList.add('dialog-dimmed-effect-layer')
          this.DialogBody = document.createElement('div');
          this.DialogBody.setAttributes({
              'aria-label':this.Title,
              'role':'dialog',
              'class':'dialog-body-layer',
              'aria-modal':'true',
              'lang':this.LangCode
          })
            this.dialogHeaderElement = document.createElement('header');
              this.titleElement = document.createElement('h2');
              this.titleElement.innerHTML=this.Title;
              this.btnClose = document.createElement('button');
              this.btnClose.innerHTML = 'close';
              this.btnClose.setAttributes({
                  'aria-label':this.textCollection.CloseButtonText,
                  'class':'btn close-dialog material-icons'
              })
              this.btnClose.addEventListener('click',function(){
                  root.CloseDialog()
                  if(root.falseCallback instanceof Function){
                    root.falseCallback();
                  }
            });
            this.dialogHeaderElement.append(this.titleElement,this.btnClose);
            this.dialogContentMain = document.createElement('main');
            this.Content instanceof HTMLElement ? this.dialogContentMain.append(this.Content) : this.dialogContentMain.innerHTML = this.Content;
            this.dialogButtons = document.createElement('div');
            this.dialogButtons.classList.add('dialog-button-collection')
            this.btnTrue = document.createElement('button');
            this.btnTrue.innerHTML = this.ButtonText['OK'];
            this.btnFalse = document.createElement('button');
            this.btnFalse.innerHTML = this.ButtonText['Cancel'];
            this.btnCancel = document.createElement('button');
            this.btnCancel.innerHTML = this.ButtonText['Ignore'];
            this.btnTrue.setAttribute('aria-label',this.ButtonText['OK']);
            this.btnFalse.setAttribute('aria-label',this.ButtonText['Cancel']);
            this.btnCancel.setAttribute('aria-label',this.ButtonText['Ignore']);
            if(this.Type >= 0){
                this.dialogButtons.append(this.btnTrue);
                this.btnTrue.addEventListener('click',function(){
                    root.valueOfPressedButton=0;
                    root.CloseDialog()
                    if(root.trueCallback instanceof Function){
                        root.trueCallback();
                    }
                })
            }
            if(this.Type >= 1 ){
                this.dialogButtons.append(this.btnFalse);
                this.btnFalse.addEventListener('click',function(){
                    root.CloseDialog();
                    root.valueOfPressedButton=0;
                    if(root.falseCallback instanceof Function){
                        root.falseCallback();
                    }
                })
            }
            if(this.Type >= 2){
                this.dialogButtons.append(this.btnCancel);
                this.btnCancel.addEventListener('click',function(){
                    root.CloseDialog();
                    root.valueOfPressedButton=0;
                    if(root.cancelCallback instanceof Function){
                        root.cancelCallback();
                    }else if(root.falseCallback instanceof Function){
                        root.falseCallback();
                    }
                })
            }

          this.DialogBody.append(this.dialogHeaderElement,this.dialogContentMain,this.dialogButtons);
        this.dimmedLayer.append(this.DialogBody);
	  this.DialogRoot.append(this.dimmedLayer);
      this.ReturnFocusPoint = this.CustomReturnFocusPoint === null ? document.activeElement : this.CustomReturnFocusPoint;
      
      //focus trap
      function goToFirstElement(e){
        if(e.key === "Tab" && !e.shiftKey ){
            firstEl.focus();
            e.preventDefault();
        }
      }
      function goToLastElement(e){
        if(e.key === 'Tab' && e.shiftKey ){
            lastEl.focus()
            e.preventDefault();
        }
      }

      const buttons = this.dialogButtons.querySelectorAll('button');
      const firstEl = this.btnClose;
      const lastEl = buttons[buttons.length-1];

      firstEl.addEventListener('keydown',goToLastElement);
      lastEl.addEventListener('keydown',goToFirstElement);
      this.DialogBody.addEventListener('keydown',function(e){
          if(e.key === 'Escape'){
              root.btnClose.click();
          }
      })
      setTimeout(function(){root.PageWrapper.setAttribute('aria-hidden','true')},100);
      this.btnClose.focus();
    }
}