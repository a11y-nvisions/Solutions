Element.prototype.setAttributes = function(obj){
    if(obj instanceof Object){
        for(v in obj){
            this.setAttribute(v,obj[v])
        }
    }
}


const Banner = function (HTML_PATH = document.body,option={}){
    const root = this;
    let control_autoSlide;

    function Option(obj){
        this.a11ySupport = true
        this.show_remote = true
        this.show_playButton = true
        this.show_indicators = true
        this.auto_slide = true
        this.slide_cycle = 4000;
        for(let p in obj){
            if(this.hasOwnProperty(p)){
                this[p] = obj[p]
            }
        }
    };

    root.option = new Option(option);
    Object.defineProperty(root,'loadIterationElement',{
        set:function(v){
            for( let i = 0; i < v; i++){   
                //set and append link
                const links = root.carouselLinks;
                links[i] = document.createElement('a');
                links[i].innerText = root.BannerItemList[i].link_text;
                links[i].setAttributes({
                    'href':root.BannerItemList[i].link_url, 
                    'data-image-path':root.BannerItemList[i].image_path
                })
                links[i].style.background='url('+links[i].getAttribute('data-image-path')+')'
                links[i].style.backgroundRepeat='no-repeat';
                links[i].style.backgroundSize='100% 100%';
                links[i].style.left="0";

                links[i].style.zIndex="0";
                root.carouselThumbBox.append(links[i]);
        
                //set and append indicators
                const inds = root.indicatorList;
                inds[i] = document.createElement('button');
                inds[i].setAttributes({
                    'aria-label':'배너'+(i+1),
                });
                inds[i].classList.add('slide_indicators');
                inds[i].innerText=(i+1);
                inds[i].addEventListener('click',function(){
                    root.currentBanner = root.getButtonIndex(inds,this);
                    root.urgentAnnouncer(root.carouselLinks[root.currentBannerIndex].innerText + ' 배너');
                })
                root.indicatorBox.appendChild(inds[i]);

                if( !root.option.show_indicators ){
                    inds[i].classList.add('unused')
                }
            }
        }
    }) 

    Object.defineProperty(root,'autoSlide',{
        get:function getAutoSlide(){
            return root.slideState;
        },
        set:function setAutoSlide(v){
            
            function slideAction(){
                root.currentBanner = root.currentBannerIndex+1;
                if(!root.option.a11ySupport){
                    //최악의 접근성
                    root.urgentAnnouncer(root.carouselLinks[root.currentBannerIndex].innerText + ' 배너');
                }
            }

            root.slideState = v;
            const ControllerText = v ? '슬라이드 정지(Pause Carousel)' : '슬라이드 재생(Play Carousel)'
            root.btnAutoSlideController.setAttribute('aria-label',ControllerText);
            
            if(v){
                control_autoSlide = setInterval(slideAction,root.option.slide_cycle);
                root.carouselBox.addEventListener('focusin',AutoSlideSwitcher);
                root.carouselBox.addEventListener('focusout',AutoSlideSwitcher);
                root.btnAutoSlideController.addEventListener('click',AutoSlideSwitcher);

                root.btnAutoSlideController.innerHTML='<span aria-hidden="true">pause</span>'
            }

            if(!v){  
                root.btnAutoSlideController.innerHTML='<span aria-hidden="true">play_arrow</span>';
                clearInterval(control_autoSlide);
            }
        }
    })

    Object.defineProperty(root,'currentBanner',{
        set:function setCurrentBanner (v){
            if( typeof v === 'number' ){
                for(let i=0; i<root.BannerItemList.length; i++){
                    let current_num;
                    if( v === root.BannerItemList.length ){
                        current_num = 0;
                    } else if( v === -1 ){
                        current_num = root.BannerItemList.length-1;
                    }else{
                        current_num = v;
                    }

                    if(i === current_num){
                        root.carouselLinks[i].style.left="0";
                        root.carouselLinks[i].style.zIndex="1";
                        if(root.option.a11ySupport){
                            root.carouselLinks[i].setAttributes({
                                'aria-hidden':'false',
                                'tabindex':'0',
                            })

                            root.indicatorList[i].setAttributes({
                                'aria-current':'true'
                            })
                        }
                        root.indicatorList[i].setAttributes({
                            'data-current':'true'
                        })
                        root.currentBannerIndex = current_num;
                    }
                    
                    if(i !== current_num){
                        if(root.option.a11ySupport){
                            root.carouselLinks[i].setAttributes({
                                'aria-hidden':'true',
                                'tabindex':'-1',
                            })
                        }
                        root.carouselLinks[i].style.zIndex="0";
                        root.carouselLinks[i].style.left="100%";
                        root.indicatorList[i].removeAttribute('aria-current');
                        root.indicatorList[i].removeAttribute('data-current');
                    }
                }
            }
        }
    });

    root.BannerItemList = [];
    if(typeof HTML_PATH === 'string'){
        root.append_path = document.querySelector(HTML_PATH);
    }else if(HTML_PATH instanceof HTMLElement){
        root.append_path = HTML_PATH;
    }

    root.getButtonIndex = function (Arr,Element){
        const result = Array.prototype.indexOf.call(Arr,Element);
        return result
    }

    root.createItem = function(linkText,imgPath,linkHref){
        if(
            typeof linkText !== 'string' ||
            typeof imgPath !== 'string' ||
            typeof linkHref !== 'string'
        ){
            Error('The parameters 1~3 must be put by the \'string\' type.\
            param 1 is a link text for the screen reader users.\
            param 2 is an image\'s local Path or URL for show banner image. if you use the local path, the HTML file that running this banner script is the root location.\
            Param 3 is a link URL for put in anchor href attribute')
        }
        return {
            link_text:linkText,
            image_path:imgPath,
            link_url:linkHref
        }
    }

    root.addBannerItem = function (){
        for(let arg of arguments){
            if(arg instanceof Object){
                if(
                    arg.hasOwnProperty('link_text') &&
                    arg.hasOwnProperty('image_path') &&
                    arg.hasOwnProperty('link_url')
                ){
                    root.BannerItemList.push(arg);
                }
            }
        }
        if(root.BannerItemList.length  === arguments.length ){
            return root.createBanner();
        }
    };

    root.urgentAnnouncer = function(msg){
        root.assertiveText.style.display=''
        root.assertiveText.innerText =  msg;
        setTimeout(function(){
            root.assertiveText.style.display='none'
        },300);
    }

    root.politeAnnouncer = function(msg){
        root.politeText.style.display=''
        root.politeText.innerText =  msg;
        setTimeout(function(){
            root.politeText.style.display='none';
        },300);
    }

    root.createBanner = function(){
        root.loadIterationElement = root.BannerItemList.length;
        root.currentBanner = 0;
        root.autoSlide = root.option.auto_slide;
    };

    root.carouselAnnouncer = document.createElement('div');
    root.carouselPoliteAnnouncer = document.createElement('div');
    root.assertiveText = document.createElement('div');
    root.politeText = document.createElement('div');
    root.carouselAnnouncer.setAttributes({
        'class':'announcer visuallyhidden',
        'aria-live':'assertive'
    });
    root.carouselAnnouncer.append(root.assertiveText)
    root.carouselPoliteAnnouncer.setAttributes({
        'class':'announcer visuallyhidden',
        'aria-live':'polite'
    });
    root.carouselPoliteAnnouncer.append(root.politeText);

    root.carouselBox = document.createElement('section');
    root.carouselBox.setAttributes({
        'aria-label':'롤링 배너',
        'class':'rolling-carousel-root'
    })
    
    root.carouselThumbBox = document.createElement('section');
    root.carouselThumbBox.setAttributes({
        'aria-label':'배너 링크 목록',
        'class':'rolling-carousel-visibleThumb',
    })

    root.carouselPrevLink = document.createElement('button');
    root.carouselPrevLink.setAttributes({
        'aria-label':'이전 배너',
        'class':'btn prev material-icons'
    })

    root.carouselNextLink = document.createElement('button');
    root.carouselNextLink.setAttributes({
        'aria-label':'다음 배너',
        'class':'btn next material-icons'
    })

    root.carouselPrevLink.innerText='navigate_before';
    root.carouselNextLink.innerText='navigate_next';
    root.carouselPrevLink.addEventListener('click',function(){
        root.currentBanner = root.currentBannerIndex-1;
        root.politeAnnouncer(root.carouselLinks[root.currentBannerIndex].innerText + ' 배너');
    })

    root.carouselNextLink.addEventListener('click',function(){
        root.currentBanner = root.currentBannerIndex+1;
        root.politeAnnouncer(root.carouselLinks[root.currentBannerIndex].innerText + ' 배너');
    })

    
    root.floatingRemoteBox = document.createElement('div');
    root.floatingRemoteBox.classList.add('carousel-floating-remote-box');
    root.indicatorBox = document.createElement('div');
    root.indicatorBox.classList.add('carousel-indicators-list')

    root.indicatorList = [];
    root.carouselLinks = [];
    
    root.floatingRemoteBox.append(root.indicatorBox,root.carouselPrevLink,root.carouselNextLink);
    root.option.a11ySupport ? root.carouselBox.append(root.floatingRemoteBox,root.carouselThumbBox) :
    root.carouselBox.append(root.carouselThumbBox,root.floatingRemoteBox);
    
    if(!root.option.show_remote){
        root.carouselNextLink.classList.add('unused');
        root.carouselPrevLink.classList.add('unused');
    }
    
    root.btnAutoSlideController = document.createElement('button');
    root.btnAutoSlideController.setAttributes({
        'class':'carousel-auto-slide-controller material-icons',
    });

    if(!root.option.show_playButton){
        root.btnAutoSlideController.classList.add('unused');
    }

    root.indicatorBox.prepend(root.btnAutoSlideController);
    root.append_path.append(root.carouselBox,root.carouselAnnouncer,root.carouselPoliteAnnouncer);
    root.append_path.classList.add('carousel-loaded')
    function AutoSlideSwitcher(e){
        if(e.type === 'focusin' && root.autoSlide ){
            if(root.option.a11ySupport){
                root.autoSlide = false;
            }
        }
        if(e.type === 'focusout' && !root.autoSlide ){
            if(root.option.a11ySupport){
                root.autoSlide = true;
            }
        }
        if(e.type === 'click'){
            root.autoSlide = !root.autoSlide;
        }
    };
}
