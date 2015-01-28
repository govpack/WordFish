var D8=0
var GOT=0
var MAX=4
var RIGHT=0
var B=[]
var N=0
var XO={january:1, february:1, march:1, april:1, may:1, june:1, july:1, august:1, september:1, october:1,november:1,december:1,
biography:1,population:1,wikimedia:1,profit:1,related:1,commons:1,history:1,license:1,caruaru:1,deutsch:1,privacy:1,wikidata:1
,download:1,distinct:1,articles:1,londrina:1,contents:1,languages:1,trademark:1,community:1,permanent:1,following:1,printable:1
,wikipedia:1,navigation:1,foundation:1,information:1,interaction:1,organization:1,encyclopedia:1}
var WORD=''
var HOT=null
var DID={}

window.onload=init

function init(){d4.innerText=MAX
chrome.windows.getCurrent(gotCurrent)
document.body.onkeyup=UseAnyKeypressToHighlightNextTerm
chrome.extension.onRequest.addListener(next)
d10.onclick=start
}

function gotCurrent(currentWindow){chrome.tabs.query({active: true, windowId:currentWindow.id},function(activeTabs){chrome.tabs.executeScript(activeTabs[0].id,{file: 'text_up.js',allFrames:false})})}

function UseAnyKeypressToHighlightNextTerm(){if(d2.hasChildNodes && HOT){FB(HOT.nextSibling||d2.firstChild)}}

//A=[].slice.apply(A)
function next(txt){
var A=txt.replace(/_/g,' ').match(/\b\w+\b/g);if(!A){return}var X={}
A.sort(function(a, b){/*descending.length*/return b.length - a.length})
for(var i=0;i<A.length;i++){
var W=A[i];var w=W.toLowerCase()
if(XO[w]){continue}
if(X[w]){/*EnsureUnique*/continue}X[w]=1
if(/[a-z]+[A-Z][a-z]+/.test(W)){continue}
if(/^[\dA-Z]+$/.test(W)){continue}
if(/^[\d]+$/.test(W)){continue}
B.push(W);if(W.length<7 && B.length>10){/*Go for 7+Letter words,No small fish*/break}
}

var tgs=''
for(var i=0;i<B.length;i++){
var it=document.createElement('i')
it.onclick=DF
it.id='E'+i
it.innerText=B[i]
d6.appendChild(it)
d6.appendChild(document.createTextNode(' '))
}
d12.innerHTML='Found <span style="color:green">'+B.length+'</span> terms on the current web page. Now fishing for defintions...'
setTimeout(F)
}




function F(){if(!B.length){return done()}
var n=-1;var ax=0
do{n=LR(0,B.length);++ax}while(DID[n]&&ax<10000)
if(ax>10000){return done()}
var wrd=B[n];DID[n]=true
var e=$E('E'+n);if(e){e.style.backgroundColor='silver'}
var xhr=new XMLHttpRequest(); 
xhr.onload=function(){exey(xhr.responseText,wrd,n)}
xhr.open('GET','http://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exsentences=1&exlimit=1&exintro=&explaintext=&titles='+encodeURIComponent(wrd),true);
xhr.send(null)
}




function exey(txt,x,n){/*Check the defintions as  they come via XHR. 
Highlight IT'S term with  SC(e,some_color) to indicate some failure, 
Or 'lime' for sucess, AND get the next one with F(). If the defintion is 'lime'
we can tidy up the defintinon and add it as a DIV with a @data-term and event handlers*/
var e=$E('E'+n);if(!e){return F()}if(e){e.style.backgroundColor='orange'}
var o=top.JSON.parse(txt);if(typeof o!='object'){SC(e,'plum');return F()}
var ob=o.query
if(!ob){SC(e,'teal');return F()}ob=ob.pages
if(!ob){SC(e,'aqua');return F()}
for(var p in ob){ob=ob[p];break}
if(typeof ob!='object'){SC(e,'lightblue');return F()}var dd=ob.extract
if(!dd){SC(e,'tan');return F()}
if(dd.indexOf('name')>0){SC(e,'hotpink');return F()}
if(dd.indexOf('refer to')>0){SC(e,'turquoise');return F()}
if(dd.indexOf('refers to')>0){SC(e,'salmon');return F()}
if(dd.indexOf('is a redirect')>0){SC(e,'seagreen');return F()}
if(dd.indexOf('may be')>0){SC(e,'thistle');return F()}
if(dd.indexOf('may mean')>0){SC(e,'gold');return F()}
if(dd.indexOf('can either mean')>0){SC(e,'mediumspringgreen');return F()}
var re=new RegExp(x,'gi')
dd=(''+ob.extract).replace(/[(][^)]+[)]/g,'').replace(/[[][^]]+[]]/g,'').replace(/\.$/,'').replace(/^A\s+/i,'')
.replace(/^The\s+/i,'').replace(/^An\s+/i,'')
if(dd.replace(/\W/g,'').length<20){/*TooShort*/SC(e,'coral');return F()}
if(!re.test(dd)){dd=x+' •'+dd}
dd=dd.replace(re,'<b>\u2605</b>')
if(!/\S/.test(dd)){SC(e,'peachpuff');return F()}

var wi=self.document.createElement('button');
wi.setAttribute('data-text',x)
wi.innerText=x;
wi.onclick=CB
wi.onfocus=CB

var e2=null
if(d2.hasChildNodes && d2.childNodes.length){e2=d2.childNodes[parseInt( d2.childNodes.length*Math.random() )]||null}
d2.insertBefore(wi,e2); 
if(!GOT/*!e2*/){/*1st Term*/var P1=$E('P1');if(P1){d3.removeChild(P1)}}

var di=self.document.createElement('div');
var c0=hs(x);var c1=lite(c0,0.3);var c2=lite(c0,-0.2)
di.style.backgroundColor=c1
di.style.borderColor=c2
di.style.color=tc(c0)
di.innerHTML=dd;d3.appendChild(di)
di.onmouseover=OV
di.onmouseout=OT
di.onclick=OC
di.setAttribute('data-term',x)
di.oncontextmenu=OP
if(e){e.style.backgroundColor='lime'}
GOT+=1;if(GOT<MAX){F()}else{done()
}
}

function CB(){var e=this;WB();
WORD=e.innerText
e.style.borderColor='black'
e.style.backgroundColor='yellow'
HOT=e;
}

function FB(e){if(!e){return}
WB();HOT=e;WORD=e.innerText
e.style.borderColor='black'
e.style.backgroundColor='yellow'
WORD=e.innerText
}

function WB(){var e=null;
if(d2.hasChildNodes && d2.childNodes.length){
for(var i=0;i<d2.childNodes.length;i++){
e=d2.childNodes[i];
e.style.borderColor='white'
e.style.backgroundColor='silver'
}}}


function OC(){var e=this;
e.setAttribute('data-lock','locked')
if(!e.getAttribute('data-word')){
if(e.getAttribute('data-term')==WORD){RIGHT+=1;d1.innerText=RIGHT}
}
e.setAttribute('data-word',WORD)
var A=e.getElementsByTagName('B');
if(A){var e3=null;for(var i=0;i<A.length;i++){e3=A[i];e3.style.color='black';e3.style.textDecoration='underline'}}
if(!HOT){setTimeout(OVER);return}
var e2=HOT.nextSibling||HOT.previousSibling
d2.removeChild(HOT);if(d2.hasChildNodes){FB(e2)}
setTimeout(OVER)
}




function OV(){var e=this; if(e.getAttribute('data-lock')=='locked'){return}
var A=e.getElementsByTagName('B');
if(!A){return};var e2=null;
for(var i=0;i<A.length;i++){
e2=A[i];e2.innerText=WORD
}
}

function OT(){var e=this; if(e.getAttribute('data-lock')=='locked'){return}
var A=e.getElementsByTagName('B');
if(!A){return};var e2=null;
for(var i=0;i<A.length;i++){
e2=A[i];e2.innerText='\u2605'
}
}

function done(){
if(GOT<MAX){MAX=GOT;}
d4.innerText=MAX
//<span style="color:green">×'+MAX+'</span>
d12.innerHTML='Great catch!! Now let\'s match <span style="color:green">'+MAX+'</span> terms with their definitions. Click  PLAY to begin!'
d12.style.color='cornflowerblue'
d12.style.color='black'
d17.innerHTML=''
d10.style.display='block'
FB(d2.firstChild)
WORD=d2.firstChild.innerText /*for the 4th time*/
if(!WORD){wupp()}
}

function wupp(){
//try{WORD=d2.firstChild.innerText /*for the 5th time*/alert(d2.firstChild.innerText)}catch(er){alert(er.message)}
d2=document.getElementById('d2')
var A=d2.getElementsByTagName('BUTTON');
if(A){var e3=null;for(var i=0;i<A.length;i++){e3=A[i];
if(e3.getAttribute('data-text')){WORD=e3.getAttribute('data-text');break}}}
}

var tt=0
function start(){
d9.style.display='none'
d10.style.display='none'
d2.style.visibility='visible'
d0.style.display='block'
d14.style.display='block'
D8=Date.now();
tt=setInterval(TIME,100);
}

function TIME(){d15.innerText=((Date.now()-D8)/1000).toFixed(1)}
function $E(id){return self.document.getElementById(id)}
function SC(e,c){try{e.style.backgroundColor=c}catch(er){}}
function DF(){/*Click a term to !bing define:it*/window.open('http://www.'+(LR(0,2)?'google':'bing')+'.com/search?q=define:'+this.innerText)}
function LH(){/*Random hex color*/return '#'+Math.random().toString(16).slice(-6)}
function LR(a,b,n,p){/*Random number from a-b*/if(isNaN(a)){var a=0}if(isNaN(b)){var b=101}if(isNaN(n)){var n=1}return parseFloat((a+(parseInt(Math.random()*((b-a)/n))*n)).toFixed(p))}
function OP(){/*Right-click a defintion to open it in wikipedia*/window.open('http://en.wikipedia.org/wiki/'+encodeURIComponent(this.getAttribute('data-term')))}
function lite(hex,lum){/*Lighter=(hex,0.2) Darker=(hex-.4)*/lum=lum||0;hex=String(hex).replace(/[^0-9a-f]/gi,'');if(hex.length<6){hex=hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2]}var rgb='#';var c=0;for(var i=0;i<3;i++){c=parseInt(hex.substr(i*2,2),16);rgb+=('00'+Math.round(Math.min(Math.max(0,c+(c*lum)),255)).toString(16)).slice(-2)}return rgb}
function tc(c){/*BlackOrWhite*/c=parseInt(c.substr(1),16);return (0.2126*((c>>16)&0xff)+0.7152*((c>>8)&0xff)+0.0722*((c>>0)&0xff)<90)?'white':'black'}
function hs(s){/*String2ColorHash*/var i,l,h=0x811c9dc5;for(i=0,l=s.length;i<l; i++){h^=s.charCodeAt(i);h+=(h<<1)+(h<<4)+(h<<7)+(h<<8)+(h<<24)}return '#'+("0000000"+(h>>>0).toString(16)).slice(-6)}
function OVER(){if(d2.childNodes.length==0){d16.innerText='\u2714 Game Over — Well Done!';d16.style.color='green';clearInterval(tt)}}
