const main = document.querySelector('main');
const title = document.head.querySelector('title');
const mainScroll = document.querySelector('main .simplebar-content-wrapper');
window.addEventListener('DOMContentLoaded',function(){
    title.innerHTML=document.querySelector('[aria-current=page]').textContent;
})