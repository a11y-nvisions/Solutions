import {CodeDict} from "./cnt_codes";
import * as page_treeview from "./cnt_treeview";
import * as page_tab from './cnt_tab';
import * as page_commons from "./cnt_commons";

export default (()=> {
    const content = Object.assign({},page_treeview,page_tab,page_commons);

    window.addEventListener('DOMContentLoaded',()=>{

        document.querySelectorAll('[data-content]').forEach( (el,idx)=> {
            const keys = Object.keys(content);
            keys.forEach(k=>{
                if( el.dataset.content === k ) {
                    el.innerHTML = content[k];
                }
            })
        });
        
        //codes
        document.querySelectorAll('code.cl').forEach( (el,idx)=> {
            const keys = Object.keys(CodeDict);
            keys.forEach(k=>{
                if( el.classList.contains(k) ) {
                    el.textContent = CodeDict[k];
                }
            })
        });

    })

})();