'use strict';
class Navigation extends HTMLDivElement{
	constructor(){
		super();
		this.setAttributes({'role':'navigation'})
	}
}

customElements.define('nav-list',Navigation,{extends:'div'})