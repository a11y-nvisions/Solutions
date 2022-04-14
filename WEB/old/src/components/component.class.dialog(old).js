'use strict';
var ElementsToBeBlocking=document.querySelectorAll('body *:not([aria-hidden]):not([tabindex="-1"]):not(script)');
var wasFocusedPreviousElement;
class CustomDialog extends HTMLElement{
	constructor(){
		super();
		this.RESULT_VALUE;
		this.Dialog_Type={
			Alert:['unused','확인'],
			Confirm:['취소 ','확인'],
			Question:['아니요','예'],
			Agreement:['동의 안 함','동의'],
			permission:['허용 안 함','허용']
		}
	}
	connectedCallback(){
		var root=this;
		var Dialog_Type=root.Dialog_Type;
		var type=root.getAttribute('type');
		
		/**</ShadowRoot>**/var shadow = this.attachShadow({mode:'open'});
		shadow.innerHTML=`
		<style>
			`+Dialog_Light+`
			@media (prefers-color-scheme:dark){
				`+Dialog_Dark+`
			}
		</style>
		`;
		/*<Backdrop>*/var Backdrop = this.TitleBar=document.createElement('div');
		Backdrop.id="Dialog_BackDrop";
		shadow.appendChild(Backdrop);
			/*<Window>*/var DialogWindow = this.TitleBar=document.createElement('div');
			DialogWindow.id='Dialog_Window';
			Backdrop.appendChild(DialogWindow);
				DialogWindow.setAttribute('role','dialog');
				DialogWindow.setAttribute('aria-labelledby','Dialog_TitleText');
				/*<TitleBar>*/var TitleBar = this.TitleBar=document.createElement('div');
				TitleBar.id='Dialog_TitleBar';
				DialogWindow.appendChild(TitleBar);
					var TitleText = this.TitleText=document.createElement('p');
						TitleText.id="Dialog_TitleText";
						TitleText.innerHTML=this.getAttribute('window-title');
						TitleText.setAttribute('aria-hidden','true');
						TitleBar.appendChild(TitleText);
					var btnClose = this.btnClose=document.createElement('button');
						btnClose.innerHTML='X';
						btnClose.setAttribute('aria-label','닫기');
						btnClose.id="Dialog_btnEscape";
						TitleBar.appendChild(btnClose);
				/*</TitleBar>*/
				/*<Dialog Content>*/var Content=this.Content=document.createElement('div');
					Content.id="Dialog_Content";
					DialogWindow.appendChild(Content);
					/*<MainButtonSet>*/var MainButtonSet = this.btnTrue=document.createElement('div');
						Content.innerHTML=this.getAttribute('content');
						Content.appendChild(MainButtonSet);
						MainButtonSet.id="Dialog_MainButtonSet";
						var btnTrue = this.btnTrue=document.createElement('button');
							btnTrue.id="Dialog_btnYes";
							MainButtonSet.appendChild(btnTrue);
						var btnFalse = this.btnFalse=document.createElement('button');
							btnFalse.id="Dialog_btnNo";
						if(Dialog_Type.hasOwnProperty(type) == true && type != 'Alert'  ){
							DialogWindow.classList.add('type-'+type);
							btnFalse.innerHTML=Dialog_Type[type][0]
							btnTrue.innerHTML=Dialog_Type[type][1]
							MainButtonSet.appendChild(btnFalse);
						}else{
							type='Alert';
							this.setAttribute('type',type);
							DialogWindow.classList.add('type-'+type);
							btnFalse.innerHTML=Dialog_Type[type][0]
							btnTrue.innerHTML=Dialog_Type[type][1]
						}
					/*</MainButtonSet>*/
				/*</Dialog Content>*/
			/*</Window>*/
		/*</Backdrop>*/	
	/**</ShadowRoot>**/
		root.focusableEls = root.Content.querySelectorAll('a[href]:not([disabled]):not([aria-hidden="true"]):not([tabindex="-1"]), button:not([disabled]):not([aria-hidden="true"]):not([tabindex="-1"]), textarea:not([disabled]):not([aria-hidden="true"]):not([tabindex="-1"]), input[type="text"]:not([disabled]):not([aria-hidden="true"]):not([tabindex="-1"]), input[type="radio"]:not([disabled]):not([aria-hidden="true"]):not([tabindex="-1"]), input[type="checkbox"]:not([disabled]):not([aria-hidden="true"]):not([tabindex="-1"]), select:not([disabled]):not([aria-hidden="true"]):not([tabindex="-1"])');
		root.first = root.focusableEls[0];
		root.last = root.focusableEls[root.focusableEls.length - 1];
		
		
		if( Content.querySelectorAll('[readonly]').length > 0 ){
			DialogWindow.querySelector('input[readonly],textarea[readonly]').addEventListener('focusin',function(){
				this.select();
			})
		}
		
		DialogWindow.addEventListener('keyup',function(e){
			e.keyCode == 27 && (function(){
				root.RESULT_VALUE=false;
				root.parentElement.removeChild(root);
			})();
		})
		
		btnClose.addEventListener('click',function(){
			root.RESULT_VALUE=false;
			root.parentElement.removeChild(root);
		})
		btnTrue.addEventListener('click',function(){
			root.RESULT_VALUE=true;
			root.parentElement.removeChild(root);
		})
		btnFalse.addEventListener('click',function(){
			root.RESULT_VALUE=false;
			root.parentElement.removeChild(root);
		})
		root.Blocking(true);
		root.first.focus();
	}
	
	BlockingVirtualCursor(val){
		var num = ElementsToBeBlocking.length;
		for(var i=0; i < num; i++){
			if(val==true){
			ElementsToBeBlocking[i].setAttribute('aria-hidden','true');
			ElementsToBeBlocking[i].setAttribute('tabindex','-1');
			}else{
				if(ElementsToBeBlocking[i].hasAttribute('aria-hidden') ){
				ElementsToBeBlocking[i].removeAttribute('aria-hidden');
				}
				ElementsToBeBlocking[i].removeAttribute('tabindex');
				if(ElementsToBeBlocking[i].hasAttribute('tabindex') ){
					ElementsToBeBlocking[i].removeAttribute('tabindex');
				}
			}
		}
	}
	
	Blocking(val){
		var root=this;
		if(val == true){
			root.Content.addEventListener('keydown', BlockingEvent);
			root.BlockingVirtualCursor(true);
			
		}else if( val == false ){
			root.Content.removeEventListener('keydown', BlockingEvent);	
			root.BlockingVirtualCursor(false);
		}
			
		function BlockingEvent(e) {
			if (  e.keyCode === 9 ) {
				if ( e.shiftKey ) /* shift + tab */ {
					if ( e.target === root.first ) {
						root.last.focus();
						e.preventDefault();
					}
				} else if( !e.shiftKey ) /* tab */ {
					if ( e.target === root.last ) {
						root.first.focus();
						e.preventDefault();
					}
				}
			}
		};
	}
	
	disconnectedCallback(){
		var root = this;
		root.Blocking(false);
		wasFocusedPreviousElement.focus();
	}
}

customElements.define('custom-dialog', CustomDialog);

function Dialog(title,content,type){
	var dialog = document.createElement('custom-dialog');
	dialog.setAttributes({'window-title':title,'content':content,'type':type})
	document.body.appendChild(dialog);
	return dialog;
}