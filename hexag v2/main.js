
const ctx = canvas.getContext('2d');
var t=[[],[]]
var s,d,g,newRow=[];

function init() {

}

init();

//generator
function generateAndSaveObject(array,x,y,z,n,rlx,rly) {
  // Generate an object
  const obj = {
    id: n,
    data_x: x,
	data_y: y,
	data_z: z,
	rlx: rlx,
	rly: rly,
	innerHTML: 0
  };

  // Save the object in the array
  array.push(obj);

  // Return the object
  return obj;
}
const allHex = [];
//dom creator
function crDOM(){
// Loop through the objectArray
for (const object of allHex) {
  // Create a new div element
  const div = document.createElement('div');
  // Set the innerHTML of the div to the name and age of the object
  div.innerHTML = `${object.innerHTML}`;
  // Set the id attribute of the div to the id of the object
  div.setAttribute('id', object.id);

  // Append the div to the body of the document
  document.body.appendChild(div);
}
}



function searchforY(objects, id) {
  const results = []
  for (const object of objects) {
    if (object.data_y === id) {
      results.push(object);
    }
  }
  return results;
}
function sortObjectsForY(array) {
  array.sort((a, b) => a.data_x - b.data_x);
  return array;
}

function searchforZ(objects, id) {
  const results = []
  for (const object of objects) {
    if (object.data_z === id) {
      results.push(object);
    }
  }
  return results;
}
function sortObjectsForZ(array) {
  array.sort((a, b) => a.data_x - b.data_x);
  return array;
}

function sortObjectsForId(array) {
  array.sort((a, b) => a.id - b.id);
  return array;
}



var site=[];
function generateSite(rad) {
	var tRA=rad,mn=1
	var sRad=((rad-1)*2)+1;
	for (var i =0  ;i<sRad;i++){
		site.push(tRA);
	   
		if(i==rad-1){
		mn=-1;}
		 tRA+=mn;
}
}

function generateBase(rad){  //generuje baze na podstawie inputu użytkownika co do radiusu mapy
	var TeY=-1,TeZ=1,n=0,
	    GeY=0,GeZ=0,
		s=-1,t=0;
	var tRad = rad-1,n=0;
	for(var j=0;j<site.length;j++){	
		TeZ=GeZ+1+s;
		TeY=GeY+t;
		for(var k=0;k<site[j];k++){
			generateAndSaveObject(allHex,(-1*tRad)+j,tRad+TeY,0+TeZ,n,(-tRad+j)*85,50+(Math.abs((-tRad+j)*50))+(k*100))
			TeY--;
			TeZ++;
			n++;
		}
		if(j==tRad){s=0;GeZ=-rad;t=-1}
		else if(j>tRad){t--}
		else{s--;}
	}
}        
var rs=parseInt(prompt('radius?','3'));

generateSite(rs);

generateBase(rs);                   



//eqweqwewqe21e12e2ee2
var total= site.reduce((a, b) => a + b, 0);
if (rs>4){
var scl=600/site[(site.length-1)/2+1];
}
else{var scl=100;}
//ssdsdsdsddsdsdsdsdsd
var taEA=[],taQD=[],taWS=[]
function crMovY() {
	var li=0;
   	for(var i =(site.length-1)/2;i>=-1*((site.length-1)/2);i--){
		taEA[li]=sortObjectsForY(searchforY(allHex, i));
		li++;
	}
}
var mmemm=[]
var mem=[];
function mY(){
	var kf=[];
	mmemm=[];
	mem=[];
	for(var j =0;j<taEA.length;j++){
		var ff=[],dmemY=[];
		for(var k=0;k<taEA[j].length;k++){
			ff.push(allHex[taEA[j][k].id].innerHTML);
			dmemY.push(taEA[j][k].id);
		}
		mem.push(dmemY);
		kf.push(ff);
	}
	taEA=kf;
	mmemm=[].concat(...mem);
}

//dwfwfwfwf
function crMovZ() {
	var li=0;
   	for(var i =(site.length-1)/2;i>=-1*((site.length-1)/2);i--){
		taQD[li]=sortObjectsForZ(searchforZ(allHex, i));
		li++;
		
	}
	console.log('zeze',taQD);
}

function mZ(){
	var kf=[];
	mmemm=[];
	mem=[];
	for(var j =0;j<taQD.length;j++){
		var ff=[],dmemZ=[];
		for(var k=0;k<taQD[j].length;k++){
			ff.push(allHex[taQD[j][k].id].innerHTML);
			dmemZ.push(taQD[j][k].id);
		}
		mem.push(dmemZ)
		kf.push(ff);
	}
	taQD=kf;
	mmemm=[].concat(...mem);
} 
//32wdwqfqf 

//dwfwfwfwf
function crMovX() {
	var li=0,kf=[];
   	for(var i =0;i<site.length;i++){
		var ff=[];
		for(var j=0;j<site[i];j++){
		ff.push(allHex[li].innerHTML)
		mmemm[li]=allHex[li].id;
		li++;
		}
		kf.push(ff);
		   
}
taWS=kf;
console.log(taWS,'tawstaws');
}
//gergerr--------------------------------------

const a = 2 * Math.PI / 6;
const r = 50;
function drawHexagon(x,y) {
 ctx.beginPath();
  for (var i = 0; i < 6; i++) {
	  ctx.fillStyle = 'grey';
	ctx.strokeStyle = 'grey';
	ctx.lineWidth = 1;
    ctx.lineTo(400+((x + r * Math.cos(a * i))*scl/100), (y + r * Math.sin(a * i))*scl/100);
	ctx.fill()
  }

 ctx.closePath();
  ctx.stroke();
  ctx.fillStyle = 'grey';

 }

function generate() {
	var num = Math.floor(Math.random() * (allHex.length - 0) + 0);

		if (allHex[num].innerHTML == 0) {
			allHex[num].innerHTML = 2
			drawActiveHex(num)
		} else {generate()}
}


x = 400;
y = r;

function drawShape(ind2){
	  ctx.beginPath();
	
  for (var i = 0; i < 6; i++){ 
	  
	ctx.strokeStyle = 'white';
	ctx.lineWidth = 2;
    ctx.lineTo(400+((allHex[ind2].rlx + r * Math.cos(a * i))*scl/100), (allHex[ind2].rly + r * Math.sin(a * i))*scl/100);
	ctx.fill();
  }
 ctx.closePath();
  ctx.stroke();
}
function drawActiveHex(ind){

    drawShape(ind);
	
  ctx.beginPath();
  ctx.font = (30*scl/100) + 'px ' + 'Arial';
  ctx.textAlign = 'center';
  ctx.fillStyle = 'black';
  ctx.fillText(allHex[ind].innerHTML,400+(allHex[ind].rlx*scl/100), ((allHex[ind].rly+10)*scl/100));
   ctx.fillStyle = 'grey';
  ctx.closePath();
  ctx.stroke();
}


function crBoard(){
	for (var i =0;i<=total-1;i++){
		drawHexagon(allHex[i].rlx,allHex[i].rly)
	}
}
function control(e) {
		if(e.keyCode == 69) {
			keyE()
		} else if (e.keyCode == 65) {
				keyA()
		}else if(e.keyCode == 81){
			keyQ()
		}else if(e.keyCode == 68){
			keyD()
		}else if(e.keyCode == 87){
			keyW()
		}else if(e.keyCode == 83){
			keyS()
		}
	}

		 
  
	
	function moveE() {
				crMovY();
				mY();
				for(var j=0;j<site.length;j++){
					let filteredRow = taEA[j].filter(num => num)
					let missing = site[j] - filteredRow.length
					let zeros = Array(missing).fill(0)
					    newRow[j] = zeros.concat(filteredRow);
		}
	}
	
	function moveA() {
				crMovY();
				mY();
				for(var j=0;j<site.length;j++){
					let filteredRow = taEA[j].filter(num => num)
					let missing = site[j] - filteredRow.length
					let zeros = Array(missing).fill(0)
					    newRow[j] = filteredRow.concat(zeros)	
		}
	}
	function moveQ() {
		crMovZ();
		mZ();
			for(var j=0;j<site.length;j++){
					let filteredRow = taQD[j].filter(num => num)
					let missing = site[j] - filteredRow.length
					let zeros = Array(missing).fill(0)
					    newRow[j] = filteredRow.concat(zeros)	
			}
	}
	function moveD() {
		crMovZ();
		mZ();
			for(var j=0;j<site.length;j++){
					let filteredRow = taQD[j].filter(num => num)
					let missing = site[j] - filteredRow.length
					let zeros = Array(missing).fill(0)
					    newRow[j] = zeros.concat(filteredRow)	
		}
	}
	
	function moveW() {
		crMovX();
				for(var j=0;j<site.length;j++){
					let filteredRow = taWS[j].filter(num => num)
					let missing = site[j] - filteredRow.length
					let zeros = Array(missing).fill(0)
					    newRow[j] = filteredRow.concat(zeros)		
		}
	}

	function moveS() {
		crMovX();
				for(var j=0;j<site.length;j++){
					let filteredRow = taWS[j].filter(num => num)
					let missing = site[j] - filteredRow.length
					let zeros = Array(missing).fill(0)
					    newRow[j] = zeros.concat(filteredRow)			
		}
	}
	
function combineB(){
		for (let i=0; i <site.length; i++){
			for(var j=site[i];j>0;j--){
				if(newRow[i][j]==newRow[i][j-1]){
					newRow[i][j]=newRow[i][j]*2
					newRow[i][j-1]=0;
				
				}
			}
		}
		g=[].concat(...newRow);
}
function combineF(){
		for (var k=0; k <site.length; k++){
			for(var l=0;l<site[k];l++){
				if(newRow[k][l]==newRow[k][l+1]){
					newRow[k][l]=newRow[k][l]*2
					newRow[k][l+1]=0;
					
		        }
			}
		}
		g=[].concat(...newRow);
		
}		





	document.addEventListener('keyup', control)

	function keyE() {

moveE();
combineB();

updateInnerHtml();

moveE();
updateInnerHtml();

drawNew();
generate();
	updateDOM();

	}
	function keyA(){
		
moveA();
combineF();

updateInnerHtml();

moveA();
updateInnerHtml();

drawNew();
generate();
	updateDOM();
	}
	
function keyQ(){
		
moveQ();
combineF();

updateInnerHtml();

moveQ();
updateInnerHtml();

drawNew();
generate();
	updateDOM();
	}
function keyD(){
		
    moveD();
	combineB();

	updateInnerHtml();

	moveD();
	updateInnerHtml();

	drawNew();
	generate
		updateDOM();
}


function keyW(){
		
moveW();
combineF();

updateInnerHtml();

moveW();
updateInnerHtml();

drawNew();
generate();
	updateDOM();
	}
	
	function keyS(){
		
    moveS();
	combineB();

	updateInnerHtml();

	moveS();
	updateInnerHtml();

	drawNew();
	generate();
	updateDOM();
}


/*function drawHexagonMap()}
  
}*/
function drawNew(){

	for(var i =0;i<allHex.length;i++){
		if(allHex[i].innerHTML>0){
			drawActiveHex(i);
		}
		else{drawHexagon(allHex[i].rlx,allHex[i].rly)}
	}
}
function updateInnerHtml(){
	for(var k=0;k<g.length;k++){
		allHex[mmemm[k]].innerHTML=g[k]
	}
}


function updateDOM(){
	// Find all div elements
const divElements = document.querySelectorAll('div');

// Loop through the div elements
divElements.forEach((div) => {
  // Find the corresponding object in the objectArray
  const object = allHex.find((obj) => obj.id === parseInt(div.id));
  if (object) {
    // Set the innerHTML of the div to the innerHTML of the object
    div.innerHTML = object.innerHTML;
  }
});
}



crBoard()


generate();
generate();
crDOM();
