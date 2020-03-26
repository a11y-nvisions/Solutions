Element.prototype.setStyle=function(object){
	var styleTemp='';
	if( object instanceof (Object || !Function || !Array) == true
		&& (typeof object == ('string' || 'number')) == false ){
		for(var n in object){
			styleTemp+=(n+':'+object[n]+';');
		}
		this.setAttribute('style',styleTemp);
	}else{
		if(object instanceof Function ){console.error('함수 자료형 인스턴스 객체가 인수로 사용되었습니다. 인스턴스가 아닌 객체를 사용해주시기 바랍니다.');
			return false
		}
		
		if(object instanceof Array ){console.error('배열 자료형 인스턴스 객체가 인수로 사용되었습니다. 인스턴스가 아닌 객체를 사용해주시기 바랍니다.');
			return false
		}
		
		if( (typeof object == 'string') == true ){
			console.error('문자열 자료형이 인수로 사용되었습니다. 객체 자료형을 사용해주시기 바랍니다.');
			return false
		}
		if( (typeof object == 'boolean') == true ){
			console.error('불 자료형이 인수로 사용되었습니다. 객체 자료형을 사용해주시기 바랍니다.');
			return false
		}
		if( (typeof object == 'number') == true ){
			console.error('숫자 자료형이 인수로 사용되었습니다. 인스턴스가 아닌 객체를 사용해주시기 바랍니다.');
			return false
		}
		
		if( object === undefined ){
			console.error('값이 정의되지 않은 변수를 인수로 사용하였거나 인수를 입력하지 않았습니다. 정의된 변수 또는 객체를 사용해주시기 바랍니다.');
			return false
		}
		
		if( object === null ){
			console.error('null 값이 인수에 사용되었습니다. 객체를 사용해주시기 바랍니다.');
			return false
		}
	}
}

Element.prototype.setAttributes=function(object){
	if( object instanceof (Object || !Function || !Array) == true
		&& (typeof object == ('string' || 'number')) == false ){
		for(var n in object){
			this.setAttribute(n,object[n]);
		}
	}else{
		if(object instanceof Function ){console.error('함수 자료형 인스턴스 객체가 인수로 사용되었습니다. 인스턴스가 아닌 객체를 사용해주시기 바랍니다.');
			return false
		}
		
		if(object instanceof Array ){console.error('배열 자료형 인스턴스 객체가 인수로 사용되었습니다. 인스턴스가 아닌 객체를 사용해주시기 바랍니다.');
			return false
		}
		
		if( (typeof object == 'string') == true ){
			console.error('문자열 자료형이 인수로 사용되었습니다. 객체 자료형을 사용해주시기 바랍니다.');
			return false
		}
		if( (typeof object == 'boolean') == true ){
			console.error('불 자료형이 인수로 사용되었습니다. 객체 자료형을 사용해주시기 바랍니다.');
			return false
		}
		if( (typeof object == 'number') == true ){
			console.error('숫자 자료형이 인수로 사용되었습니다. 인스턴스가 아닌 객체를 사용해주시기 바랍니다.');
			return false
		}
		
		if( object === undefined ){
			console.error('값이 정의되지 않은 변수를 인수로 사용하였거나 인수를 입력하지 않았습니다. 정의된 변수 또는 객체를 사용해주시기 바랍니다.');
			return false
		}
		
		if( object === null ){
			console.error('null 값이 인수에 사용되었습니다. 객체를 사용해주시기 바랍니다.');
			return false
		}
	}
}