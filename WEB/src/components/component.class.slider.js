class CustomSlider extends HTMLElement {
    constructor(){
        super();
        this.range = null;
        this.isDragging = false;
        this.valueNow;
        this.userAgent = navigator.userAgent;
        this.valuePercent = 0;
        this.sliderHandle=document.createElement('div');
        this.ProgressedTrack=document.createElement('div');
        this.mobileAdjustableSlider = document.createElement('input');
    }


    get getValueNow(){
        const now = this.getAttribute('aria-valuenow');
        
        if( now !== null && !isNaN(Number(now)) ){
            return Number(now)
        }else if(now === ""){
            return Number(0)
        }
        else if( now === null ){
            return Number(0)
        }

        else if( isNaN((Number(now))) ){
            console.error('aria-valuenow allows only number string, But, a non-numeric value was used on aria-valuenow.');
        }
    }

    get isMobile(){
        return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || (navigator.maxTouchPoints > 0)
    }

    set setValueNow(v){
        if(v > this.range['aria-valuemax'] ){ 
            return this.range['aria-valuemax']
        }
        if(v < this.range['aria-valuemin'] ){
            return this.range['aria-valuemin'];
        }
        this.valuenow = v;
        this.setPercent = v;
        this.mobileAdjustableSlider.value = v;
        this.setAttribute('aria-valuenow',v);
    }

    get getPercent(){
        return this.valuePercent;
    }
    set setPercent(v){
        this.valuePercent = Math.floor( v / this.range['aria-valuemax'] * 100 );
        this.sliderHandle.style.left=this.getPercent+'%';
        this.ProgressedTrack.style.width=this.getPercent+'%';
    }

    get getRange(){
        const min = this.getAttribute('aria-valuemin');
        const max = this.getAttribute('aria-valuemax');
        const info = {
        "aria-valuemin" : ( min !== null && !isNaN(Number(min)) ) && Number(min) || 0,
        "aria-valuemax" : ( max !== null && !isNaN(Number(max)) ) && Number(max) || 100,
        }
        return info;
    }
    set setRange(obj){
        this.range=obj;
        if( obj instanceof Object ){
            for ( const i in obj ) {
                this.setAttribute(i, obj[i])
            }
        }
        
        this.mobileAdjustableSlider.setAttribute('min',this.getAttribute('aria-valuemin'));
        this.mobileAdjustableSlider.setAttribute('max',this.getAttribute('aria-valuemax'));
        this.mobileAdjustableSlider.setAttribute('step',Number(this.mobileAdjustableSlider.getAttribute('max')) * this.step / 100);
    }

    set MobileSupport(v){
        const subClass = v === true ? 'enabled' : 'disabled';
        if( !this.mobileAdjustableSlider.classList.contains('enabled'||'disabled') ){
            this.mobileAdjustableSlider.classList.add(subClass);
        }
    }


    connectedCallback(root=this){
        root.setRange = root.getRange;
        root.setValueNow = root.getValueNow;
        root.mobileAdjustableSlider.className='mobile-adjustable-slider';
        root.MobileSupport = root.isMobile;
        if(!root.isMobile){
            root.setAttribute('role','slider');
            root.tabIndex = 0;
        }
        root.labelString = root.getAttribute('aria-label');
        root.getAttribute('aria-label') !== null && root.mobileAdjustableSlider.setAttribute('aria-label',root.labelString);
        root.mobileAdjustableSlider.setAttribute('type','range');

        root.ProgressedTrack.classList.add('custom-slider-progressed-track');
        root.classList.add('custom-slider-track');
        
        root.getAttribute('data-adjust-step') !== null ?  //{
            root.step=Number( root.getAttribute('data-adjust-step')) : (
                root.setAttribute('data-adjust-step','5'),
                root.step = 5
            );
        //}


        root.sliderHandle.classList.add('custom-slider-handle');
        root.appendChild(root.ProgressedTrack);
        root.appendChild(root.sliderHandle);
        root.appendChild(root.mobileAdjustableSlider);
        
        root.addEventListener('keydown',AdjustValueKeyHandler);
        root.addEventListener('mousedown',AdjustValueClickHandler)
        root.sliderHandle.addEventListener('mousedown',HandleDragActionHandler);
        root.addEventListener('mousemove',HandleDragActionHandler)
        window.addEventListener('mouseup',HandleDragActionHandler)
        window.addEventListener('mouseleave',HandleDragActionHandler)
        root.addEventListener('keydown',preventKeyDownToScroll);
        root.mobileAdjustableSlider.addEventListener('input',AdjustMobileSliderHandler);

        function preventKeyDownToScroll (e){
            if(
                e.key === 'PageDown' ||
                e.key === 'PageUp' ||
                e.key === 'Home' ||
                e.key === 'End' ||
                e.key === 'ArrowUp' ||
                e.key === 'ArrowDown'
             ){
                e.preventDefault()
                e.target.scrollIntoView();
            }
        }

        function AdjustValueClickHandler (e){
            e.stopPropagation();
            const limit_max = root.getRange['aria-valuemax'];
            const percent = (e.offsetX / root.offsetWidth)*100;
            if(e.buttons === 1 && !root.isDragging ){
                root.setValueNow = Math.floor(limit_max * percent / 100);
            }
        }

        function AdjustMobileSliderHandler (){
            console.log(this.value);
            root.setValueNow = this.value;
        }

        function AdjustValueKeyHandler (e){            
            const limit_max = root.getRange['aria-valuemax'];
            const limit_min = root.getRange['aria-valuemin'];
            const adjustPercent = limit_max * root.step / 100;

            if(e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'PageUp'){
                if( root.getValueNow - adjustPercent < limit_min){
                    root.setValueNow = limit_min;
                    return false;
                }
                root.setValueNow = root.getValueNow-adjustPercent;
            }
            if(e.key === 'ArrowUp' || e.key === 'ArrowRight' || e.key === 'PageDown'){
                if(root.getValueNow+adjustPercent > limit_max){
                    root.setValueNow = limit_max;
                    return false;
                }
                root.setValueNow = root.getValueNow+adjustPercent;
            }

            if(e.key === 'Home') {
                root.setValueNow = limit_min;
            }
            if(e.key === 'End') {
                root.setValueNow = limit_max;
            }
        }
        function HandleDragActionHandler(e){
            const limit_max = root.getRange['aria-valuemax'];
            const limit_min = root.getRange['aria-valuemin'];
            let percent = 0;
            
            if(e.type=== 'mousedown' && e.buttons === 1 ){
                root.isDragging = true;
                root.sliderHandle.classList.toggle('onDragging');
                e.stopPropagation()
            }
            if( e.type === 'mouseup' || e.type === 'mouseleave'){
                root.isDragging = false   
                root.sliderHandle.classList.toggle('onDragging');
            }
            
            if(root.isDragging && e.type === 'mousemove'){
                percent=(e.offsetX / root.offsetWidth)*100;
                if(percent > 100 || percent < 0 && !root.isDragging){
                    root.sliderHandle.classList.toggle('onDragging')
                    percent > 100 ? root.setValueNow = limit_max :
                    percent < 0 ? root.setValueNow = limit_min : false;
                }
                
                root.setValueNow = (root.range['aria-valuemax'] * percent) / 100
            }
        }
    }
};customElements.define("custom-slider",CustomSlider)

class AudioPlayer extends HTMLElement{
    constructor(){
        super();
        this.path = '../audio/'
        this.isPlaying=false;
        this.playSlider = document.createElement('custom-slider')
        this.playButton = document.createElement('button');
        this.visiblePlayTime = document.createElement('div');
        this.AudioFileList = [
            'bensound-creativeminds.mp3'
        ];
        this.Audio = new Audio(this.path+this.AudioFileList[0]);
    }

    get GET_SLIDER_A11Y_SUPPORT(){
        return (this.getAttribute('a11y-support') === 'true' || this.getAttribute('a11y-support') === null) ? true : false;
    }

    set SET_SLIDER_A11Y_SUPPORT(v){
        if( typeof v === 'boolean' ){
            this.SLIDER_A11Y_SUPPORT = v;
        }
    }


    get getCurrentTime(){
        return this.playSlider.getValueNow
    }

    set setCurrentTimeText(v){
        const seconds = v;
        const current_hour = Math.floor( parseInt(seconds/3600) )
        const current_min = Math.floor(parseInt((seconds%3600)/60))
        const current_sec = Math.floor(seconds%60);

        const hour_text = current_hour > 0 ? current_hour+'시' : '';
        const min_text = current_min > 0 ? current_min+'분' : '';
        const sec_text = current_sec+'초'
        this.setVisiblePlayTimeText = seconds;
        this.playSlider.setAttribute('aria-valuetext',hour_text+' '+min_text+' '+sec_text)
        this.playSlider.mobileAdjustableSlider.setAttribute('aria-valuetext',hour_text+' '+min_text+' '+sec_text);
    }

    set setVisiblePlayTimeText(v){
        const seconds = v;
        const total_seconds = this.Audio.duration;
        const current_hour = seconds !== 0 ? String( Math.floor( parseInt( seconds/3600 ) ) ) : '0';
        const current_min =  seconds !== 0 ? String( Math.floor( parseInt( ( seconds%3600 ) / 60 ) ) ) : '0';
        const current_sec =  seconds !== 0 ? String( Math.floor( seconds%60 ) )  : '0';
        
        const total_hour = total_seconds !== 0 ? String( Math.floor( parseInt( total_seconds/3600 ) ) ) : '0';
        const total_min =  total_seconds !== 0 ? String( Math.floor( parseInt( ( total_seconds%3600 ) / 60 ) ) ) : '0';
        const total_sec =  total_seconds !== 0 ? String( Math.floor( total_seconds%60 ) )  : '0';

        const visiblePlayTimeText = current_hour+':'+current_min.padStart(2,'0')+':'+current_sec.padStart(2,'0');
        const visibleTotalPlayTimeText = total_hour+':'+total_min.padStart(2,'0')+':'+total_sec.padStart(2,'0');
        this.visiblePlayTime.innerHTML=visiblePlayTimeText+'<span id="playTime_total"> / <span class="visuallyhidden">총 재생시간</span>'+visibleTotalPlayTimeText+'</span>';
    }

    set setPlayState(v){
        if(v){
            this.Audio.play();
            this.isPlaying = true;
            this.playButton.innerText = 'pause';
            this.playButton.setAttribute('aria-label','일시정지')
        }else{
            this.Audio.pause();
            this.isPlaying = false;
            this.playButton.innerText = 'play_arrow';
            this.playButton.setAttribute('aria-label','재생')
        }
    }

    set setPlayTime(v){
        if(typeof v === 'number') {
            if( !v < 0 || !v > this.Audio.duration ){
                this.Audio.currentTime = v;
                this.playSlider.setValueNow=v;
            }
        }
    }
    
    connectedCallback(root=this){
        root.setPlayState=false;
        root.SET_SLIDER_A11Y_SUPPORT = root.GET_SLIDER_A11Y_SUPPORT;
        root.playButton.classList.add('material-icons','btn_PlayAndPuase');
        root.visiblePlayTime.classList.add('player-visible-play-time');
        root.visiblePlayTime.setAttribute('aria-hidden','true');
        root.playSlider.setAttribute('aria-label','재생시간 조절');
        root.playSlider.setAttribute('aria-describedby','playTime_total')
        root.playSlider.mobileAdjustableSlider.setAttribute('aria-describedby','playTime_total')
        root.Audio.addEventListener('loadedmetadata',function(){
            root.playSlider.setAttribute('aria-valuetext','준비됨');
            root.playSlider.setRange={
                "aria-valuemin":0,
                "aria-valuemax": this.duration,
            };
            root.setVisiblePlayTimeText=0;

            root.Audio.addEventListener('puase',function(){
                if ( this.currentTime === this.duration ){
                    this.currentTime = 0;
                    root.playSlider.setValueNow = 0;
                    root.playSlider.setAttribute('aria-valuetext','정지됨');
                }
            })

            root.Audio.addEventListener("timeupdate",function(){
                root.playSlider.setPercent = this.currentTime;
                root.setVisiblePlayTimeText = this.currentTime;

                if(!root.GET_SLIDER_A11Y_SUPPORT){
                    root.setCurrentTimeText = this.currentTime;
                }

                if(this.currentTime === this.duration){
                    root.setPlayState = false;
                }

            })

            root.playSlider.addEventListener('focusin',function(){
                this.setValueNow = root.Audio.currentTime;
                root.setCurrentTimeText = root.getCurrentTime;
            })
            
            window.addEventListener('mousemove',function(){
                if(root.playSlider.isDragging){
                    root.Audio.currentTime = root.playSlider.getValueNow;
                    root.setCurrentTimeText = root.getCurrentTime;
                }
            })

            root.playSlider.mobileAdjustableSlider.addEventListener('input',function(e){
                if(e.isTrusted){
                    root.setCurrentTimeText = root.getCurrentTime;
                }
                root.Audio.currentTime = this.value;
            })

            root.playSlider.addEventListener('mousedown',function(){
                root.Audio.currentTime = this.getValueNow;
                root.setCurrentTimeText = root.getCurrentTime;
            })

            root.playSlider.addEventListener('keydown',function(e){
                if(
                    e.key === 'ArrowUp' ||
                    e.key === 'ArrowDown' ||
                    e.key === 'ArrowLeft' ||
                    e.key === 'ArrowRight' ||
                    e.key === 'PageDown' ||
                    e.key === 'PageUp' ||
                    e.key === 'Home' ||
                    e.key === 'End'
                ){
                    root.Audio.currentTime = Number(this.getAttribute('aria-valuenow'));
                    root.setCurrentTimeText = root.getCurrentTime;
                }

                if(e.key === " " ){
                    root.playButton.click();
                }
            })
        })

        root.appendChild(root.playButton);
        root.appendChild(root.playSlider);
        root.appendChild(root.visiblePlayTime);
        
        root.playButton.addEventListener('click',togglePlay);
        
        function togglePlay(){
            if(root.isPlaying){
                root.setPlayState = false;
            }else{
                root.setPlayState = true;
            }
        }
    }
};customElements.define('audio-player',AudioPlayer);