const Dialog_Light=`
*{margin:0; padding:0; box-sizing:border-box;}
	button{user-select:none;}
input, button{
	display:inline-block; appearance:none; -webkit-appearance:none;
	-moz-appearance:none; -o-appearance:non;
	color:inherit; background:transparent; border:none;
	font-size:inherit;
}

::selection{
	background-color:rgba(220,165,95,0.99);
}

#Dialog_BackDrop{
	position:absolute; left:0; top:0; width:100%; height:100%;
	background-color:rgba(0,0,0,0.5);
}

#Dialog_Window{
	 position:relative; margin:15% auto;
	background-color:#efdfa3;
	width:50%; border:solid 0.08rem;
}

#Dialog_TitleBar{
	user-select:none;
	font-size:2rem; line-height:3rem;
	background-color:rgba(230,205,130,1);
	color:rgba(175,135,95,0.9); font-weight:bold;
	text-shadow:-0.08rem -0.08rem 0.05rem rgba(20,15,6,0.8);
	text-indent:1rem; border:solid 1px;
}

#Dialog_TitleBar:after{
	display:block; content:'';clear:both;
}

#Dialog_TitleText{
	font-size:inherit; float:left;
}

#Dialog_btnEscape{
	width:3rem; height:3rem; float:right;
	text-shadow:-0.08rem -0.08rem 0.05rem rgba(20,15,6,0.8);
}

#Dialog_Content{
	width:100%;
	font-size:1.5rem; position:relative;
	color:#inherit; padding:1.2rem;
}

#Dialog_MainButtonSet{
	position:relative;
	padding:1rem; text-align:center;
}

#Dialog_MainButtonSet button{
	background-color:rgba(255,255,255,0.6); background-image:linear-gradient(to bottom, rgba(0,0,0,0.05), rgba(175,150,50,0.1), rgba(175,150,50,0.5));
	border:solid 0.15rem; border-color:rgba(185,145,70,0.4) rgba(185,145,50,0.1) rgba(185,145,70,0.12);
}

.type-Alert #Dialog_btnNo{
	display:none;
}
`
const Dialog_Dark=`
::selection{
	background-color:rgba(160,105,45,0.99); color:#fff;
}

#Dialog_BackDrop{
	color:#fff;
	position:absolute; left:0; top:0; width:100%; height:100%;
	background-color:rgba(255,255,255,0.7);
}

#Dialog_Window{
	background-color:#4a250f; color:inherit;
	width:50%; border:solid 0.08rem;
}
#Dialog_TitleBar{
	background-color:rgba(110,65,20,1);
	color:rgba(217,188,155,0.9); font-weight:bold;
}

#Dialog_btnEscape{text-shadow:-0.08rem -0.08rem 0.05rem rgba(20,15,6,0.8);}

#Dialog_MainButtonSet button{
	background-color:rgba(87,38,15,0.6); background-image:linear-gradient(to top, rgba(0,0,0,0.05), rgba(175,150,0,0.1), rgba(175,150,0,0.2));
	border:solid 0.15rem; border-color:rgba(185,145,70,0.4) rgba(185,145,50,0.1) rgba(185,145,70,0.12);
}
`
		
const Table_LightTheme=`
*{margin:inherit; padding:inherit;}
table{
		width:80%; margin:0 auto;
}			
table td,table th{ padding:0.3rem; }
table th{background-color:rgba(235,185,100,0.6);}
table td{background-color:rgba(255,255,255,0.4);}
table input[type="text"]{width:100%; text-align:center;}
`

const Table_DarkTheme=`
*{margin:inherit; padding:inherit;}
table{
	width:80%; margin:0 auto;
}			
table td,#Email_Table th{ padding:0.3rem; }
table th{ background-color:rgba(110,65,20,0.6); }
table td{background-color:rgba(165,115,80,0.4);}
table input[type="text"]{width:100%; text-align:center;}
`

const commonNAVStyle=`
	*{margin:inherit; padding:inherit;}
`

const RadioStyle=`
:host,.radio.wrap{
	display:inline-block;
	vertical-align:top;
	width:1em; height:1em;
	border-color:inherit;
}

div.radio.outerCircle{
	position:relative;
	width:100%; height:100%;
	overflow:hidden;
	border:solid 2px transparent; text-align:center;
	border-radius:50%; box-shadow:0 0 0 1px;
}

div.radio.innerCircle{
	position:relative;
	width:10%; height:10%; top:50%; left:50%; box-sizing:border-box;
	border:solid 1px; border-color:rgba(0,0,0,0.1);
	opacity:0; border:solid 1px; border-color:rgba(0,0,0,0.1);
}

:host([checked]) div.radio.innerCircle{
	opacity:1;
	width:100%;height:100%; vertical-align:top; top:0; left:0;
	transition:width 0.3s, height 0.3s, top 0.3s, background-color 0.5s;
	margin:0; border-radius:50%;
	background-color:var(--radio-selected-color);
}`