const PhysicalActivityRatio = {
  MIN: 1.2,
  LOW: 1.375,
  MEDIUM: 1.55,
  HIGH: 1.725,
  MAX: 1.9,
};

const CaloriesFormulaFactor = {
  AGE: 5,
  WEIGHT: 10,
  HEIGHT: 6.25,
};

const CaloriesFormulaConstant = {
  MALE: 5,
  FEMALE: 160
};

const CaloriesMinMaxRatio = {
  MIN: 0.85,
  MAX: 1.15
};

// switcher пола
const maleGender = document.getElementById('gender-male');
const femaleGender = document.getElementById('gender-female')

// форма
const mainForm = document.forms.counter;

const age = document.getElementById('age');
const weight = document.getElementById('weight');
const height = document.getElementById('height');

//радиокнопки значений
const minRadio = document.getElementById('activity-minimal');
const lowRadio = document.getElementById('activity-low');
const mediumRadio = document.getElementById('activity-medium');
const highRadio = document.getElementById('activity-high');
const maxRadio = document.getElementById('activity-maximal');

// кнопки
const submitButton = document.querySelector('.form__submit-button');
const resetButton = document.querySelector('.form__reset-button');

// окно с расчетами и его поля
const resultWindow = document.querySelector('.counter__result');
const valueNorm = document.getElementById('calories-norm');
const valueMinimal = document.getElementById('calories-minimal');
const valueMaximal = document.getElementById('calories-maximal');


// Функция открытия итогового окна с расчетами
openResult = (event) => {
  event.preventDefault();
  resultWindow.classList.remove('counter__result--hidden');
}
submitButton.addEventListener('click', openResult);

// Функция закрытия итогового окна с расчетами
closeResult = () => {
  resultWindow.classList.add('counter__result--hidden');
}
resetButton.addEventListener('click', closeResult);

// Разрешим вводить только цифры в наши инпуты
validInput = (input) => {
  input.addEventListener('keyup', function(){
    this.value = this.value.replace(/[^\d]/g, '');
  });
}

validInput(age);
validInput(weight);
validInput(height);

// Проверка заполненности полей
inputHandler = () => {
  const age = event.currentTarget.elements.age;
  const height = event.currentTarget.elements.height;
  const weight = event.currentTarget.elements.weight;

  if (age.value.length === 0 || height.value.length === 0 || weight.value.length === 0) {
    submitButton.setAttribute('disabled', true);
  } else {
    submitButton.removeAttribute('disabled');
  }

  if (age.value.length !== 0 || height.value.length !== 0 || weight.value.length !== 0) {
    resetButton.removeAttribute('disabled');
  } else {
    resetButton.setAttribute('disabled', true);
  }
};

// Обработчик клика по кнопке очистить поля и расчет
reset = () => {
  const form = document.forms.counter;
  const age = form.elements.age;
  const height = form.elements.height;
  const weight = form.elements.weight;

  age.value = '';
  height.value = '';
  weight.value = '';
  submitButton.setAttribute('disabled', true);
  resetButton.setAttribute('disabled', true);
  minRadio.checked = true;
  maleGender.checked = true;
}

// Обработчик клика по кнопке рассчитать по формуле
count = (event) => {
  event.preventDefault();

  const form = document.forms.counter;
  const age = form.elements.age;
  const height = form.elements.height;
  const weight = form.elements.weight;

  let result;

  if (maleGender.checked) {
    result = (CaloriesFormulaFactor.WEIGHT * weight.value) + (CaloriesFormulaFactor.HEIGHT * height.value) - (CaloriesFormulaFactor.AGE * age.value) + CaloriesFormulaConstant.MALE;
  } else if (femaleGender.checked) {
    result = (CaloriesFormulaFactor.WEIGHT * weight.value) + (CaloriesFormulaFactor.HEIGHT * height.value) - (CaloriesFormulaFactor.AGE * age.value) - CaloriesFormulaConstant.FEMALE;
  }

  if (minRadio.checked) {
    result = Math.round(result * PhysicalActivityRatio.MIN)
  } else if (lowRadio.checked) {
    result = Math.round(result * PhysicalActivityRatio.LOW)
  } else if (mediumRadio.checked) {
    result = Math.round(result * PhysicalActivityRatio.MEDIUM)
  } else if (highRadio.checked) {
    result = Math.round(result * PhysicalActivityRatio.HIGH)
  } else if (maxRadio.checked) {
    result = Math.round(result * PhysicalActivityRatio.MAX)
  }

  valueNorm.textContent = result;
  valueMinimal.textContent = Math.round(result * CaloriesMinMaxRatio.MIN);
  valueMaximal.textContent = Math.round(result * CaloriesMinMaxRatio.MAX);
}

// Слушатели событий
mainForm.addEventListener('input', inputHandler);
resetButton.addEventListener('click', reset);
submitButton.addEventListener('click', count);
