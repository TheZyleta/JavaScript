const allHex = [];
var site=[],g,f=1,check,butCheck,newRow=[],comRow,prevHexSt,
 	mmemm=[],taEA=[],taQD=[],taWS=[]
var rs=parseInt(prompt('radius?','3'));

function generateAndSaveObject(array, x, y, z, n, rlx, rly) {
	const obj = {
		id: n,
		data_x: x,
		data_y: y,
		data_z: z,
		rlx: rlx,
		rly: rly,
		innerHTML: 0
	};
	array.push(obj);
	return obj;
}5

function searchforY(objects, id) {
	let results = []
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
	let results = []
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

function generateSite(rad) {
	let tRA = rad, mn = 1
	let sRad = ((rad - 1) * 2) + 1;
	for (let i = 0; i < sRad; i++) {
		site.push(tRA);
		if (i == rad - 1) {
			mn = -1;
		}
		tRA += mn;
	}
}

function scale() {
	if (rs > 4) {
		return (window.screen.height/1.5) / site[(site.length - 1) / 2 + 1];
	} else { return 100 }
}
function generateBase(rad) {
	let TeY = -1, TeZ = 1, n = 0,
		GeY = 0, GeZ = 0,
		s = -1, t = 0,
	   	tRad = rad - 1;
	for (let j = 0; j < site.length; j++) {
		TeZ = GeZ + 1 + s;
		TeY = GeY + t;
		for (let k = 0; k < site[j]; k++) {
			generateAndSaveObject(allHex, (-1 * tRad) + j, tRad + TeY, 0 + TeZ, n, (-tRad + j) * (scale()-15*(scale()/100)), (scale()/2) + ((Math.abs((-tRad + j) * scale()/2))) + (k * scale()));
			TeY--;
			TeZ++;
			n++;
		}
		if (j == tRad) { s = 0; GeZ = -rad; t = -1 }
		else if (j > tRad) { t-- }
		else { s--; }
	}
}       

function crMovY() {
	let li = 0;
	for (let i = (site.length - 1) / 2; i >= -1 * ((site.length - 1) / 2); i--) {
		taEA[li] = sortObjectsForY(searchforY(allHex, i));
		li++;
	}
}

function mY() {
	let kf = [],mem = [];
	mmemm = [];
	for (let j = 0; j < taEA.length; j++) {
		let ff = [], dmemY = [];
		for (let k = 0; k < taEA[j].length; k++) {
			ff.push(allHex[taEA[j][k].id].innerHTML);
			dmemY.push(taEA[j][k].id);
		}
		mem.push(dmemY);
		kf.push(ff);
	}
	taEA = kf;
	butCheck = [].concat(...taEA)
	mmemm = [].concat(...mem);
}


function crMovZ() {
	let li = 0;
	for (let i = (site.length - 1) / 2; i >= -1 * ((site.length - 1) / 2); i--) {
		taQD[li] = sortObjectsForZ(searchforZ(allHex, i));
		li++;
	}
}

function mZ() {
	let kf = [],mem = [];
	mmemm = [];
	for (let j = 0; j < taQD.length; j++) {
		let ff = [], dmemZ = [];
		for (let k = 0; k < taQD[j].length; k++) {
			ff.push(allHex[taQD[j][k].id].innerHTML);
			dmemZ.push(taQD[j][k].id);
		}
		mem.push(dmemZ)
		kf.push(ff);
	}
	taQD = kf;
	butCheck = [].concat(...taQD)
	mmemm = [].concat(...mem);
} 

function crMovX() {
	let li = 0, kf = [];
	for (let i = 0; i < site.length; i++) {
		let ff = [];
		for (let j = 0; j < site[i]; j++) {
			ff.push(allHex[li].innerHTML)
			mmemm[li] = allHex[li].id;
			li++;
		}
		kf.push(ff);
	}
	taWS = kf;
	butCheck = [].concat(...taWS)
} 

function drawHexagon(x, y, i) {
	let html = '';
	let css = '';
	let className = `hexagon-${i}`;
	let innerHTML = allHex[i].innerHTML
	css += `
		.${className} {
		  width: ${scale()}px;
		  height: ${scale()}px;
		  background: rgba(255, 255, 255, 0.25);;
		  border-radius: 16px;
		  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
		  position: absolute;
		  backdrop-filter: blur(2.9px);
		  -webkit-backdrop-filter: blur(2.9px);
		  top: ${y+(window.screen.height*0.01)}px;
		  left: calc(50% + ${x}px);
		  transform: translate(-50%, -50%);
		  -webkit-clip-path: polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%);

		}
	  .${className} span {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		color: rgba(33,1,50,255);
		font-size: ${(40*(scale()/100))}px; 
		font-weight: bold;		
		pointer-events: none;
	}
`;
	html += `
	<div class="${className}">
		<span contenteditable="true">${innerHTML}</span>
	</div>
`;
	let style = document.createElement('style');
	style.innerHTML = css;
	document.head.appendChild(style);
	document.body.innerHTML += html;
	updateSpanInnerHTMLs();
}

function updateSpanInnerHTMLs(GenId) {
	allHex.forEach((hexagon, index) => {
		let spanElement = document.querySelector(`.hexagon-${index} span`);
		if (spanElement) {
			let previousInnerHTML = spanElement.innerHTML; 
			spanElement.innerHTML = hexagon.innerHTML || '';
			if (spanElement.innerHTML !== previousInnerHTML && spanElement.innerHTML !== '') { 
				let hexagonElement = document.querySelector(`.hexagon-${index}`);
				if (hexagonElement) {
					hexagonElement.style.background = hexagon.color || 'rgba(255, 255, 255, 0.55)';
					hexagonElement.classList.add('animate');
					setTimeout(() => {
						hexagonElement.classList.remove('animate');
					}, 100);
				}
			} else if (spanElement.innerHTML === '') {
				let hexagonElement = document.querySelector(`.hexagon-${index}`);
				if (hexagonElement) {
					hexagonElement.style.background = hexagon.color || 'rgba(255, 255, 255, 0.25)';
				}
			}
		}
	});
	if (GenId) {
		let hexagonElement = document.querySelector(`.hexagon-${GenId}`);
		if (hexagonElement) {
			hexagonElement.style.background = 'rgba(255, 255, 255, 0.55)';
			hexagonElement.classList.add('animate');
			setTimeout(() => {
				hexagonElement.classList.remove('animate');
			}, 100);
		}
	}
}

function generate() {
	let num = Math.floor(Math.random() * (allHex.length));
	if (allHex[num].innerHTML == 0) {
		allHex[num].innerHTML = 2
		updateSpanInnerHTMLs(num);
	} else { generate() }
}
function animation() {
	let css = `.animate {
		width: ${110 * (scale() / 100)}px !important;
		height: ${110 * (scale() / 100)}px !important;
		transition: width 0.1s, height 0.1s;
	}`;
	let style = document.createElement('style');
	style.innerHTML = css;
	document.head.appendChild(style);
}
function crBoard() {
	let total= site.reduce((a, b) => a + b, 0);
	for (let i = 0; i <= total - 1; i++) {
		drawHexagon(allHex[i].rlx, allHex[i].rly, i)
	}
	generate();
	generate();

}
function control(e) {
	if (e.keyCode == 69) {
		keyE()
	} else if (e.keyCode == 65) {
		keyA()
	} else if (e.keyCode == 81) {
		keyQ()
	} else if (e.keyCode == 68) {
		keyD()
	} else if (e.keyCode == 87) {
		keyW()
	} else if (e.keyCode == 83) {
		keyS()
	}
}

function moveE() {
	crMovY();
	mY();
	for (let j = 0; j < site.length; j++) {
		let filteredRow = taEA[j].filter(num => num)
		let missing = site[j] - filteredRow.length
		let zeros = Array(missing).fill(0)
		newRow[j] = zeros.concat(filteredRow);
		check = [].concat(...newRow);
	}
}

function moveA() {
	crMovY();
	mY();
	for (let j = 0; j < site.length; j++) {
		let filteredRow = taEA[j].filter(num => num)
		let missing = site[j] - filteredRow.length
		let zeros = Array(missing).fill(0)
		newRow[j] = filteredRow.concat(zeros)
		check = [].concat(...newRow);
	}
}

function moveQ() {
	crMovZ();
	mZ();
	for (let j = 0; j < site.length; j++) {
		let filteredRow = taQD[j].filter(num => num)
		let missing = site[j] - filteredRow.length
		let zeros = Array(missing).fill(0)
		newRow[j] = filteredRow.concat(zeros)
		check = [].concat(...newRow);
	}
}

function moveD() {
	crMovZ();
	mZ();
	for (let j = 0; j < site.length; j++) {
		let filteredRow = taQD[j].filter(num => num)
		let missing = site[j] - filteredRow.length
		let zeros = Array(missing).fill(0)
		newRow[j] = zeros.concat(filteredRow)
		check = [].concat(...newRow);
	}
}

function moveW() {
	crMovX();
	for (let j = 0; j < site.length; j++) {
		let filteredRow = taWS[j].filter(num => num)
		let missing = site[j] - filteredRow.length
		let zeros = Array(missing).fill(0)
		newRow[j] = filteredRow.concat(zeros)
		check = [].concat(...newRow);
	}
}

function moveS() {
	crMovX();
	for (let j = 0; j < site.length; j++) {
		let filteredRow = taWS[j].filter(num => num)
		let missing = site[j] - filteredRow.length
		let zeros = Array(missing).fill(0)
		newRow[j] = [...zeros, ...filteredRow];
		check = [].concat(...newRow);
	}
}

function combineB() {
	comRow = [].concat(...newRow)
	for (let i = 0; i < site.length; i++) {
		for (let j = site[i]; j > 0; j--) {
			if (newRow[i][j] == newRow[i][j - 1]) {
				newRow[i][j] = newRow[i][j] * 2
				newRow[i][j - 1] = 0;
			}
		}
		let befFilt = [].concat(...newRow);
		let filteredRow = newRow[i].filter(num => num)
		let missing = site[i] - filteredRow.length
		let zeros = Array(missing).fill(0)
		newRow[i] = [...zeros, ...filteredRow];
		let aftFilt = [].concat(...newRow);
		for (let m = 0; m < aftFilt.length; m++) {
			if (befFilt[m] !== aftFilt[m] && aftFilt[m] !== 0) {
				updateSpanInnerHTMLs(mmemm[m]);
				
			}
		}
	}
	g = [].concat(...newRow);
	
	
	updateHighScore(Math.max(...g))
}

function combineF() {
	comRow = [].concat(...newRow)
	for (let k = 0; k < site.length; k++) {
		for (let l = 0; l < site[k]; l++) {
			if (newRow[k][l] == newRow[k][l + 1]) {
				newRow[k][l] = newRow[k][l] * 2
				newRow[k][l + 1] = 0;
			}
		}
		let befFilt = [].concat(...newRow);
		let filteredRow = newRow[k].filter(num => num)
		let missing = site[k] - filteredRow.length
		let zeros = Array(missing).fill(0)
		newRow[k] = [...filteredRow, ...zeros];
		let aftFilt = [].concat(...newRow);
		for (let m = 0; m < aftFilt.length; m++) {
			if (befFilt[m] !== aftFilt[m] && aftFilt[m] !== 0) {
				updateSpanInnerHTMLs(mmemm[m]);
				
			}
		}
	}
	g = [].concat(...newRow);	
	updateHighScore(Math.max(...g))
}		
document.addEventListener('keydown', control)

function keyE() {
	prevHexSt=butCheck
	moveE();
	combineB();
	updateInnerHtml();
	if((butCheck.toString()!=check.toString())||(g.toString()!=comRow.toString())){generate();}
	updateSpanInnerHTMLs();
}
function keyA(){
	prevHexSt=butCheck	
	moveA();
	combineF();	
	updateInnerHtml();
	if((butCheck.toString()!=check.toString())||(g.toString()!=comRow.toString())){generate();}
	updateSpanInnerHTMLs();
}
	
function keyQ(){
	prevHexSt=butCheck
	moveQ();
	combineF();
	updateInnerHtml();
	if((butCheck.toString()!=check.toString())||(g.toString()!=comRow.toString())){generate();}
	updateSpanInnerHTMLs();
}
function keyD(){	
	prevHexSt=butCheck
   	moveD();
	combineB()
	updateInnerHtml();
	if((butCheck.toString()!=check.toString())||(g.toString()!=comRow.toString())){generate();}
	updateSpanInnerHTMLs();
}


function keyW(){	
	prevHexSt=butCheck	
	moveW();
	combineF();
	updateInnerHtml();
	if((butCheck.toString()!=check.toString())||(g.toString()!=comRow.toString())){generate();}
	updateSpanInnerHTMLs();
}
	
function keyS(){
	prevHexSt=butCheck
	moveS();
	combineB();
	updateInnerHtml();
	if((butCheck.toString()!=check.toString())||(g.toString()!=comRow.toString())){generate();}
	updateSpanInnerHTMLs();
}

function updateInnerHtml(){
	for(let k=0;k<g.length;k++){
		allHex[mmemm[k]].innerHTML=g[k]
	}
}
function checkForHighS() {
	let highS = document.getElementById('highSValue')
	let savedValue = localStorage.getItem(`highscore${rs}`);
	if (!savedValue) { localStorage.setItem(`highscore${rs}`, 0); }
	highS.textContent = localStorage.getItem(`highscore${rs}`);
}
function updateHighScore(s) {
	let highS = document.getElementById('highSValue')
	let savedValue = localStorage.getItem(`highscore${rs}`);
	if (s > savedValue) {
		localStorage.setItem(`highscore${rs}`, s);
		highS.textContent = localStorage.getItem(`highscore${rs}`);
	}
}


generateSite(rs);
generateBase(rs); 
animation();
crBoard()
checkForHighS();

