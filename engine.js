var pontos = [0, 0];
var jogoRolando, pontosAtuais, jogadorAtual,loseSound,diceSound,winnerSound,submitSound,initSound,maxScore;
var aux= 0;


loseSound = document.querySelector('#loseRound');
diceSound = document.querySelector('#clickSound');
winnerSound = document.querySelector('#winnerSound');
submitSound = document.querySelector('#submitSound');
initSound = document.querySelector('#initSound');
loseAllSound = document.querySelector('#loseAllSound');

function novoJogo() {
	pontos = [0, 0];
	pontosAtuais = 0;
	jogadorAtual = 0;
	jogoRolando = true;
	document.querySelector('#dice1').style.display = 'none';
	document.querySelector('#dice2').style.display = 'none';
	document.querySelector('#current-0').textContent = '0';
	document.querySelector('#current-1').textContent = '0';
	document.querySelector('#score-0').textContent = '0';
	document.querySelector('#score-1').textContent = '0';
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('#name-0').textContent = 'Player 1';
	document.querySelector('#name-1').textContent = 'Player 2';
	initSound.play();
}

function perdeTudo() {
	pontos[jogadorAtual] = 0;
	document.querySelector('#score-'+jogadorAtual).textContent = '0';
	passarVez();
}

function vencedor() {
	if(pontos[jogadorAtual] >= maxScore) {
		//alert('Parabens, '+jogadorAtual+' ganhou !');
		document.getElementById('name-'+jogadorAtual).textContent = 'Ganhou !';
		document.querySelector('.player-'+jogadorAtual+'-panel').classList.add('winner');
		document.querySelector('.player-'+jogadorAtual+'-panel').classList.remove('active');
		document.querySelector('#dice1').style.display = 'none';
		document.querySelector('#dice2').style.display = 'none';
		jogoRolando = false;
		winnerSound.play();
		return 1;
	}
}

function jogaDado( dado1, dado2 ) {
	document.querySelector('#dice1').src = 'images/dice-'+ dado1 + '.png';
	document.querySelector('#dice2').src = 'images/dice-'+ dado2 + '.png';
}

function passarVez() {
	document.querySelector('#current-'+jogadorAtual).textContent = '0';
	document.querySelector('.player-'+jogadorAtual+'-panel').classList.remove('active');
	if (jogadorAtual === 0) {
		jogadorAtual = 1;
	} else {
		jogadorAtual = 0;
	}
	document.querySelector('.player-'+jogadorAtual+'-panel').classList.add('active');
	pontosAtuais = 0;
	document.querySelector('#dice1').style.display = 'none';
	document.querySelector('#dice2').style.display = 'none';	
}
//############# Inicio de logica procedural ###################

novoJogo();

document.querySelector('.btn-roll').addEventListener('click', function(){
	if(!jogoRolando) {
		return;
	}
	maxScore = document.querySelector('.final-score').value;

	maxScore = maxScore ? maxScore : 15;

	console.log(maxScore);
	const dado1 = Math.floor(Math.random() * 6) + 1;
	const dado2 = Math.floor(Math.random() * 6) + 1;

	//incrementa no contador caso tire 6 nos dados
	if(dado1 === 6 && dado2 === 6) {
		aux = 2;
	} else {
		aux = 0;
	}
	console.log('O jogador ', jogadorAtual, ' tirou ', dado1, ' e ', dado2);
	jogaDado(dado1, dado2);

	if (dado1 === 1 || dado2 === 1) {
		//passar a vez para proximo jogador
		passarVez();
		pontosAtuais = 0;
		loseSound.currentTime = 0;
		loseSound.play();
	} else if(aux === 2) {
		//se tirar 2x seguidas o numero 6, perde tudo
		perdeTudo();
		loseSound.play();
	} else {
		diceSound.play();
		//acumular pontos no atual e continuar jogando
		pontosAtuais += dado1 + dado2;
		document.querySelector('#dice1').style.display = 'block';
		document.querySelector('#dice2').style.display = 'block';
		document.querySelector('#current-'+jogadorAtual).textContent = pontosAtuais;
	}
});

document.querySelector('.btn-hold').addEventListener('click', function(){
	if(!jogoRolando) {
		return;
	}
	submitSound.play();
	pontos[jogadorAtual] += pontosAtuais;
	console.log(pontos[jogadorAtual]);

	document.querySelector('#score-'+jogadorAtual).textContent = pontos[jogadorAtual];

	venceu = vencedor();

	if(venceu !== 1) {passarVez();}else{return;}
});

document.querySelector('.btn-new').addEventListener('click', function(){
	novoJogo();

});