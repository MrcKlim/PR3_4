const $btnKick = document.getElementById('btn-kick');
const $btnSpecial = document.getElementById('btn-special');
const $logs = document.getElementById('logs');

const countClick = (limit = 6, btnName = 'Кнопка') => {
  let count = 0;

  return () => {
    count++;
    const remaining = limit - count;
    
    console.log(`[${btnName}] Натиснуто разів: ${count}, залишилось натискань: ${remaining}`);

    if (count >= limit) {
      console.log(`[${btnName}] Ліміт натискань (${limit}) вичерпано!`);
      return false; 
    }

    return true;
  };
};

const kickCounter = countClick(6, 'Thunder Jolt');
const specialCounter = countClick(6, 'Special Attack');

function renderHPLife() {
  const { elHP, damageHP, defaultHP } = this;
  elHP.innerText = `${damageHP} / ${defaultHP}`;
}

function renderProgressbarHP() {
  const { damageHP, defaultHP, elProgressbar } = this;
  const percent = (damageHP / defaultHP) * 100;
  elProgressbar.style.width = `${percent}%`;

  elProgressbar.classList.remove('low', 'critical');
  if (percent < 60 && percent >= 20) {
    elProgressbar.classList.add('low');
  } else if (percent < 20) {
    elProgressbar.classList.add('critical');
  }
}

function renderHP() {
  this.renderHPLife();
  this.renderProgressbarHP();
}

function changeHP(count) {
  this.damageHP -= count;

  if (this.damageHP <= 0) {
    this.damageHP = 0;
    alert(`Бідний ${this.name} програв бій!`);
    disableButtons();
  }

  this.renderHP();
}

const character = {
  name: 'Pikachu',
  defaultHP: 100,
  damageHP: 100,
  elHP: document.getElementById('health-character'),
  elProgressbar: document.getElementById('progressbar-character'),
  renderHPLife,
  renderProgressbarHP,
  renderHP,
  changeHP
};

const enemy = {
  name: 'Charmander',
  defaultHP: 100,
  damageHP: 100,
  elHP: document.getElementById('health-enemy'),
  elProgressbar: document.getElementById('progressbar-enemy'),
  renderHPLife,
  renderProgressbarHP,
  renderHP,
  changeHP
};

const random = (num) => Math.ceil(Math.random() * num);

function disableButtons() {
  $btnKick.disabled = true;
  $btnSpecial.disabled = true;
}

function generateLog(firstPerson, secondPerson, count) {
  const { damageHP, defaultHP } = secondPerson;

  const logs = [
    `${firstPerson.name} згадав щось важливе, але раптово ${secondPerson.name}, не тямлячи себе від переляку, завдав удару в передпліччя ворога.`,
    `${firstPerson.name} поперхнувся, і за це ${secondPerson.name} з переляку приклав прямий удар коліном у лоб ворога.`,
    `${firstPerson.name} замислився, але в цей час нахабний ${secondPerson.name}, прийнявши вольове рішення, нечутно підійшовши ззаду, завдав удару.`,
    `${firstPerson.name} прийшов до тями, але раптово ${secondPerson.name} випадково завдав потужного удару.`,
    `${firstPerson.name} поперхнувся, але в цей час ${secondPerson.name} знехотя роздробив кулаком противника.`,
    `${firstPerson.name} здивувався, а ${secondPerson.name}, похитнувшись, вліпив підлий удар.`,
    `${firstPerson.name} висякався, але раптово ${secondPerson.name} провів нищівний удар.`,
    `${firstPerson.name} похитнувся, і раптово нахабний ${secondPerson.name} безпричинно вдарив у ногу противника.`,
    `${firstPerson.name} засмутився, як раптом ${secondPerson.name} випадково вліпив стопою в живіт суперника.`,
    `${firstPerson.name} намагався щось сказати, але раптом ${secondPerson.name} зі нудьги розбив брову супернику.`
  ];

  const text = logs[random(logs.length) - 1];
  const logString = `${text} -${count}, [${secondPerson.name}: ${damageHP}/${defaultHP}]`;

  const $p = document.createElement('p');
  $p.innerText = logString;
  $logs.insertBefore($p, $logs.children[0]);
}

function init() {
  console.log('Start Game!');
  character.renderHP();
  enemy.renderHP();
}

$btnKick.addEventListener('click', () => {
  const canClick = kickCounter();
  
  if (!canClick) {
    $btnKick.disabled = true; 
  }

  const kickCharacter = random(20);
  const kickEnemy = random(20);

  character.changeHP(kickCharacter);
  generateLog(character, enemy, kickCharacter);

  enemy.changeHP(kickEnemy);
  generateLog(enemy, character, kickEnemy);
});

$btnSpecial.addEventListener('click', () => {
  const canClick = specialCounter();

  if (!canClick) {
    $btnSpecial.disabled = true;  
  }

  const specCharacter = random(40);
  const specEnemy = random(40);

  character.changeHP(specCharacter);
  generateLog(character, enemy, specCharacter);

  enemy.changeHP(specEnemy);
  generateLog(enemy, character, specEnemy);
});

init();