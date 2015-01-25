/*****
var A=[].slice.apply(document.getElementsByTagName('a'));
var B=[]
for(var i=0;i<A.length;i++){var a=A[i]
//alert(A[i].innerText)
if(!a.innerText){continue}
B.push( a.innerText.split(/\s+/) )


}
for(var i=0;i<B.length;i++){XO[i]=B[i]}
//console.log(JSON.stringify(XO))
***/


//var txt=document.body.innerText


//document.body.style.backgroundColor=LH()
//



chrome.extension.sendRequest(document.body.innerText);
//chrome.extension.sendRequest(B.join('|'));
