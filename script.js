/* script.js: perguntas, pontuação e mural. Carregado pelo index.html. */
/* ===== Banco de perguntas =====
   Cada pergunta: t = tema, p = enunciado, o = alternativas (a PRIMEIRA é a correta;
   a ordem é embaralhada a cada rodada), e = explicação mostrada após a resposta. */
const BANCO=[
{t:"Mulheres negras na tecnologia",p:"Qual matemática negra da NASA calculou trajetórias essenciais para o voo orbital de John Glenn, em 1962?",o:["Katherine Johnson","Ada Lovelace","Grace Hopper","Sally Ride"],e:"Katherine Johnson conferiu à mão os cálculos feitos pelos computadores da NASA. Sua história inspirou o filme Estrelas Além do Tempo."},
{t:"Mulheres negras na tecnologia",p:"Quem foi a primeira mulher negra a viajar ao espaço, em 1992?",o:["Mae Jemison","Sally Ride","Valentina Tereshkova","Katherine Johnson"],e:"Mae Jemison, engenheira e médica, voou a bordo do ônibus espacial Endeavour."},
{t:"Mulheres negras na tecnologia",p:"A cientista da computação brasileira Nina da Hora é conhecida por pesquisar principalmente…",o:["ética em IA e racismo algorítmico","jogos de videogame","computação quântica","cabos submarinos de internet"],e:"Nina da Hora estuda como algoritmos e sistemas de reconhecimento facial podem reproduzir o racismo e defende uma IA mais ética."},
{t:"Cientistas e inventores negros",p:"Qual invenção de Garrett Morgan, patenteada em 1923, ajudou a organizar o trânsito?",o:["Semáforo de três posições","Cinto de segurança","Faixa de pedestres","Rotatória"],e:"O sinal de Morgan tinha uma posição intermediária de alerta entre “pare” e “siga”, que deixava os cruzamentos mais seguros."},
{t:"Cientistas e inventores negros",p:"Lewis Latimer aperfeiçoou qual componente da lâmpada elétrica?",o:["O filamento de carbono","O bulbo de vidro","O interruptor","O soquete de rosca"],e:"O método de Latimer deixou o filamento mais durável. Ele também foi desenhista de patentes, inclusive do telefone de Alexander Graham Bell."},
{t:"Cientistas e inventores negros",p:"Quem foi a primeira engenheira negra do Brasil, formada em 1945 e pioneira no Paraná?",o:["Enedina Alves Marques","Carolina Maria de Jesus","Lélia Gonzalez","Tereza de Benguela"],e:"Enedina Alves Marques se formou em engenharia civil na Universidade do Paraná e abriu caminho para outras mulheres negras nas ciências exatas."},
{t:"Inteligência artificial",p:"O estudo Gender Shades, de Joy Buolamwini e Timnit Gebru, mostrou que sistemas de reconhecimento facial erravam mais ao identificar…",o:["mulheres de pele escura","homens de pele clara","crianças pequenas","pessoas de óculos"],e:"Os erros eram bem maiores para mulheres de pele escura, em parte porque as bases de dados usadas no treinamento eram pouco diversas."},
{t:"Inteligência artificial",p:"O que é viés algorítmico?",o:["Quando um sistema gera resultados injustos por causa de dados ou decisões de projeto enviesados","Quando o computador fica lento por excesso de arquivos","Quando um algoritmo é escrito em outra linguagem","Quando a internet cai durante uma atualização"],e:"Algoritmos aprendem com dados criados por pessoas. Se os dados carregam preconceitos, o sistema pode repeti-los em grande escala."},
{t:"Inteligência artificial",p:"Por que a diversidade nos dados de treinamento é importante para uma IA?",o:["Para o sistema funcionar bem para diferentes grupos de pessoas","Para o modelo ocupar menos memória","Para a IA conseguir funcionar offline","Para o código rodar mais rápido"],e:"Dados diversos evitam que a IA funcione bem para alguns grupos e mal para outros."},
{t:"Ética e inclusão digital",p:"Qual lei brasileira regula o tratamento de dados pessoais?",o:["LGPD (Lei Geral de Proteção de Dados)","Lei Áurea","Lei do Inquilinato","Código de Trânsito"],e:"A LGPD (Lei 13.709/2018) garante direitos às pessoas sobre seus dados e exige transparência de quem os coleta."},
{t:"Ética e inclusão digital",p:"O que significa inclusão digital?",o:["Garantir que todas as pessoas tenham acesso à tecnologia e saibam usá-la de forma significativa","Comprar o celular mais novo do mercado","Usar redes sociais todos os dias","Ter computadores nas escolas, mesmo sem internet"],e:"Inclusão digital vai além do aparelho: envolve internet de qualidade, formação e acessibilidade."},
{t:"Ética e inclusão digital",p:"Qual prática deixa um site mais acessível?",o:["Texto alternativo nas imagens e bom contraste de cores","Letras pequenas em cinza claro","Passar informações só por cores","Vídeos sem legenda"],e:"Texto alternativo ajuda quem usa leitor de tela, e contraste e legendas ajudam muita gente a ler e entender o conteúdo."},
{t:"Representatividade nas profissões tecnológicas",p:"Por que a representatividade importa nas profissões de tecnologia?",o:["Equipes diversas enxergam mais problemas e criam soluções para mais pessoas","Porque todo mundo precisa usar a mesma linguagem de programação","Porque equipes grandes são sempre melhores","Porque diminui o preço dos computadores"],e:"Quando pessoas com vivências diferentes participam, os produtos são pensados e testados para mais realidades."},
{t:"Representatividade nas profissões tecnológicas",p:"A organização Black Girls Code, criada em 2011 por Kimberly Bryant, tem como missão…",o:["Ensinar programação a meninas negras e de outras comunidades sub-representadas","Vender computadores usados","Organizar campeonatos de videogame","Criar redes sociais exclusivas"],e:"Ela oferece oficinas para que meninas e jovens aprendam a programar e criem seus próprios projetos."},
{t:"Representatividade nas profissões tecnológicas",p:"Qual ação ajuda a aumentar a diversidade em times de tecnologia?",o:["Mentoria, bolsas de estudo e processos seletivos sem viés","Contratar só quem estudou na mesma faculdade","Exigir cinco anos de experiência em vagas de estágio","Divulgar vagas só entre conhecidos"],e:"Apoio na formação e seleções justas ampliam quem consegue entrar e crescer na área."}
];

/* ===== Quiz ===== */
const $=s=>document.querySelector(s), N=10; // N = perguntas por rodada
const sortear=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
let perg=[], i=0, pts=0, resp=false;

function tela(id){["inicio","jogo","fim"].forEach(t=>$("#"+t).classList.toggle("hide",t!==id))}

function aba(n){
  document.querySelectorAll("nav button").forEach(b=>b.classList.toggle("on",b.dataset.a===n));
  $("#quiz").classList.toggle("hide",n!=="quiz");
  $("#mural").classList.toggle("hide",n!=="mural");
  if(n==="mural")desenhar();
}

function iniciar(){
  perg=sortear(BANCO).slice(0,N).map(q=>({...q,ops:sortear(q.o.map((t,k)=>({t,ok:k===0})))}));
  i=0;pts=0;tela("jogo");mostrar();
}

function mostrar(){
  const q=perg[i];resp=false;
  $("#barra").style.width=(i/N*100)+"%";
  $("#cont").textContent="Pergunta "+(i+1)+" de "+N;
  $("#pts").textContent=pts;
  $("#tema").textContent=q.t;
  $("#pergunta").textContent=q.p;
  $("#fb").classList.add("hide");
  const box=$("#ops");box.replaceChildren();
  q.ops.forEach(op=>{
    const b=document.createElement("button");
    b.className="op";b.textContent=op.t;b.onclick=()=>responder(b,op);
    box.append(b);
  });
}

function responder(b,op){
  if(resp)return;resp=true;
  const q=perg[i];
  if(op.ok)pts++;
  document.querySelectorAll(".op").forEach((el,k)=>{el.disabled=true;if(q.ops[k].ok)el.classList.add("certa")});
  if(!op.ok)b.classList.add("errada");
  const t=$("#fb-t");t.textContent=op.ok?"Resposta certa!":"Resposta errada.";t.className=op.ok?"ok":"no";
  $("#fb-e").textContent=q.e;
  $("#pts").textContent=pts;
  $("#prox").textContent=i===N-1?"Ver resultado":"Próxima pergunta";
  $("#fb").classList.remove("hide");
  $("#prox").focus();
}

function proxima(){i++;i<N?mostrar():fim()}

function fim(){
  const p=pts/N;
  $("#barra").style.width="100%";
  $("#nota").textContent="Você acertou "+pts+" de "+N+" ("+Math.round(p*100)+"%).";
  $("#msg").textContent=p>=.8?"Mandou muito bem! Você conhece histórias e desafios que tornam a tecnologia mais justa."
    :p>=.5?"Bom caminho! Releia as explicações e jogue de novo para descobrir mais histórias."
    :"Todo mundo começa em algum lugar. Você já conheceu novas referências, então tente de novo!";
  tela("fim");
}

/* ===== Mural "O futuro também é nosso" (salvo no navegador via localStorage) ===== */
const CH="bt-mural";
function ler(){try{return JSON.parse(localStorage.getItem(CH))||[]}catch(e){return[]}}
function gravar(l){try{localStorage.setItem(CH,JSON.stringify(l))}catch(e){}}

function desenhar(){
  const l=ler(),m=$("#cards");m.replaceChildren();
  $("#vazio").classList.toggle("hide",l.length>0);
  l.forEach((c,k)=>{
    const d=document.createElement("article"),p=document.createElement("p"),f=document.createElement("footer");
    d.className="post p"+(k%4);d.style.setProperty("--r",((k*7)%5-2)+"deg");
    p.textContent=c.t;f.textContent="— "+(c.n||"Anônimo(a)");
    d.append(p,f);m.append(d);
  });
}

function fixar(){
  const t=$("#ideia").value.trim();
  if(!t)return $("#ideia").focus();
  const l=ler();l.unshift({t,n:$("#nome").value.trim()});
  gravar(l);$("#ideia").value="";desenhar();
}

function limpar(){if(confirm("Apagar todas as ideias deste mural?")){gravar([]);desenhar()}}

/* ===== Eventos: liga os botões do HTML às funções ===== */
document.querySelectorAll("nav button").forEach(b=>b.addEventListener("click",()=>aba(b.dataset.a)));
$("#btn-iniciar").addEventListener("click",iniciar);
$("#prox").addEventListener("click",proxima);
$("#btn-de-novo").addEventListener("click",iniciar);
$("#btn-mural").addEventListener("click",()=>aba("mural"));
$("#btn-fixar").addEventListener("click",fixar);
$("#btn-limpar").addEventListener("click",limpar);

desenhar();
