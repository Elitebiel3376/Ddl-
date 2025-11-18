const dialogueText = document.getElementById("dialogueText");
const choicesDiv = document.getElementById("choices");
const gameDiv = document.getElementById("game");
let scene = 0;

// Status dos personagens
let alive = {yurika:true, nami:true, sayuri:true, mika:true};
let tension = 0;

// Sons
const scream = new Audio('scream.mp3');
const glitchSound = new Audio('glitch.mp3');

// Função flash vermelho
function flashRed(duration=300){
  gameDiv.classList.add('red-flash');
  setTimeout(()=>gameDiv.classList.remove('red-flash'), duration);
}

// Glitch de texto
function glitchText(text){
  dialogueText.classList.add('glitch-text');
  dialogueText.innerText = text;
  setTimeout(()=>dialogueText.classList.remove('glitch-text'), 800);
}

// Array com 80 cenas
const scenes = [
  // 1-10 Introdução
  {text:"Você chega no Clube de Literatura. Mika te cumprimenta com um sorriso enigmático.", choices:[]},
  {text:"Mika apresenta Yurika, Nami e Sayuri.", choices:[]},
  {text:"Yurika se aproxima timidamente e murmura: 'Oi… espero que goste de livros…'", choices:[]},
  {text:"Nami cruza os braços: 'Humph… espero que aguente o ritmo.'", choices:[]},
  {text:"Sayuri sorri: 'Vamos escrever poemas juntos!'", choices:[]},
  {text:"Todos começam a escrever seus poemas em silêncio.", choices:[]},
  {text:"Você escolhe com quem interagir.", choices:[
      {text:"Yurika", next:7},
      {text:"Nami", next:8},
      {text:"Sayuri", next:9}
  ]},
  {text:"Você conversa com Yurika, que observa fixamente…", choices:[]},
  {text:"Você conversa com Nami, que parece ciumenta.", choices:[]},
  {text:"Você conversa com Sayuri, que sorri calorosamente.", choices:[]},

  // 11-20 Suspense
  {text:"Glitch rápido na tela. Um arrepio percorre sua espinha.", choices:[]},
  {text:"Yurika murmura algo incompreensível: 'Você é meu…'", choices:[]},
  {text:"Nami treme, olhos parcialmente negros.", choices:[]},
  {text:"Sayuri parece mais triste do que antes.", choices:[]},
  {text:"Mika sorri calmamente: 'Tudo está sob controle.'", choices:[]},
  {text:"Primeira escolha de poema afeta amizade.", choices:[
      {text:"Dar atenção a Yurika", next:16},
      {text:"Dar atenção a Nami", next:17},
      {text:"Dar atenção a Sayuri", next:18}
  ]},
  {text:"Yurika se aproxima com olhar perturbador.", choices:[]},
  {text:"Nami reclama de ciúmes.", choices:[]},
  {text:"Sayuri tenta acalmar a situação.", choices:[]},
  {text:"Glitch aumenta, a tela treme.", choices:[]},

  // 21-30 Começo do terror
  {text:"Yurika te chama sozinha para mostrar seu diário.", choices:[]},
  {text:"Ela escreve palavras assustadoras: 'Você é meu agora…'", choices:[]},
  {text:"Nami tenta te avisar para ficar longe dela.", choices:[]},
  {text:"Sayuri observa silenciosa, sombra no rosto.", choices:[]},
  {text:"Segundo poema, algo estranho acontece…", choices:[]},
  {text:"Yurika ri sozinha, tremendo.", choices:[]},
  {text:"Nami chora escondida, olhos ficando negros.", choices:[]},
  {text:"Sayuri tenta te avisar de algo, mas desaparece por um instante.", choices:[]},
  {text:"Mika aparece e corta a cena, sorrindo.", choices:[]},
  {text:"Tela dá glitch, som distorcido.", choices:[]},

  // 31-40 Morte da Yurika
  {text:"Yurika entrega um livro ensanguentado…", choices:[], effect:()=>{
      flashRed();
      scream.play();
      glitchText("YURIKA MORTA");
      alive.yurika = false;
      glitchSound.play();
  }},
  {text:"Tela volta ao normal, mas a tensão aumenta.", choices:[]},
  {text:"Nami treme, culpando Mika.", choices:[]},
  {text:"Mika sorri estranhamente, calma demais.", choices:[]},
  {text:"Nami tenta fugir pelo clube.", choices:[]},
  {text:"Luzes piscam violentamente.", choices:[]},
  {text:"Olhos da Nami ficam completamente negros.", choices:[]},
  {text:"Ela repete falas corrompidas.", choices:[]},
  {text:"Tela congela, som distorcido.", choices:[]},
  {text:"Nami desaparece com glitch violento.", choices:[], effect:()=>{
      flashRed();
      scream.play();
      glitchText("NAMI MORTA");
      alive.nami = false;
      glitchSound.play();
  }},

  // 41-50 Morte da Sayuri
  {text:"Sayuri está sem expressão, sombras crescentes.", choices:[]},
  {text:"Ela murmura: 'Não deveria existir…'", choices:[]},
  {text:"Sala escurece atrás dela.", choices:[]},
  {text:"Mika impede que você chegue perto dela.", choices:[]},
  {text:"Sayuri chora sangue.", choices:[]},
  {text:"Mika força sorriso: 'Deixe ela ir.'", choices:[]},
  {text:"Tela vibra e glitch aparece.", choices:[]},
  {text:"Sayuri se dissolve como estática.", choices:[], effect:()=>{
      flashRed();
      scream.play();
      glitchText("SAYURI MORTA");
      alive.sayuri = false;
      glitchSound.play();
  }},
  {text:"Som agudo toca, tensão máxima.", choices:[]},
  {text:"Você percebe que está sozinho com Mika.", choices:[]},

  // 51-60 Mika vilã
  {text:"Você está sozinho com Mika.", choices:[]},
  {text:"Mika fecha páginas do diário, olhando para você.", choices:[]},
  {text:"'Você ainda está aqui…'", choices:[]},
  {text:"Ela apaga o fundo do cenário, sala vazia neon glitch.", choices:[]},
  {text:"Você tenta falar, ela responde calmamente.", choices:[]},
  {text:"Mika: 'Eu sempre fui a autora desta história.'", choices:[]},
  {text:"Ela admite manipular mortes, roteiros e glitches.", choices:[]},
  {text:"Você percebe que tudo era controle dela.", choices:[]},
  {text:"Sala vira um vazio verde neon glitchado.", choices:[]},
  {text:"Mika senta em frente a você, sorrindo.", choices:[]},

  // 61-70 Final crescente
  {text:"'Você gostou do que fiz por nós dois?'", choices:[]},
  {text:"Ela tenta travar o jogo, você não consegue clicar.", choices:[]},
  {text:"'Não adianta… eu controlo tudo.'", choices:[]},
  {text:"Tela quebra em fractais, som distorcido.", choices:[]},
  {text:"Código do jogo aparece rapidamente (fake).", choices:[]},
  {text:"Mika tenta apagar você do jogo.", choices:[]},
  {text:"Tela preta por 6 segundos.", choices:[]},
  {text:"Ela sussurra: 'Agora só restamos nós dois.'", choices:[]},
  {text:"Som final de glitch e distorção.", choices:[]},
  {text:"FIM – Mika domina o jogo", choices:[]}
];

// Mostrar cena
function showScene() {
  const s = scenes[scene];
  dialogueText.innerText = s.text;
  choicesDiv.innerHTML = "";

  if(s.effect) s.effect();

  if(s.choices.length > 0){
    s.choices.forEach(c=>{
      const btn = document.createElement("button");
      btn.classList.add("choiceBtn");
      btn.innerText = c.text;
      btn.onclick = ()=>{
        scene = c.next;
        if(c.effect) c.effect();
        showScene();
      }
      choicesDiv.appendChild(btn);
    });
  }
}

// Avança clicando
gameDiv.onclick = ()=>{
  if(scenes[scene].choices.length === 0){
    scene++;
    if(scene >= scenes.length) scene = scenes.length-1;
    showScene();
  }
}

// Inicializa
showScene();