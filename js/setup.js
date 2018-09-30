/**
 * Created by Вайланд on 29.09.2018.
 */

'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var NUMBER_OF_WIZARDS = 4;

function getValue(array) {
  return deleteUsedArrayValue(array, getRandomArrayValue(array));
}

function getRandomArrayValue(array) {
  var index = Math.floor(Math.random() * array.length);
  return array[index];
}

function deleteUsedArrayValue(array, value) {
  array.splice(array.indexOf(value), 1);
  return value;
}

function main() {
  var setup = document.querySelector('.setup');

  var similarListElement = setup.querySelector('.setup-similar-list');

  var similarWizardTemplate = document
    .querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

  var generateWizard = function () {
    var wizard = similarWizardTemplate.cloneNode(true);

    wizard
      .querySelector('.setup-similar-label')
      .textContent = getValue(WIZARD_NAMES) + ' ' + getValue(WIZARD_SURNAMES);

    wizard
      .querySelector('.wizard-coat')
      .style.fill = getValue(WIZARD_COAT_COLOR);

    wizard
      .querySelector('.wizard-eyes')
      .style.fill = getValue(WIZARD_EYES_COLOR);

    return wizard;
  };

  var fragment = document.createDocumentFragment();

  for (var i = 0; i < NUMBER_OF_WIZARDS; i++) {
    fragment.appendChild(generateWizard());
  }

  similarListElement.appendChild(fragment);

  setup.classList.remove('hidden');

  setup.querySelector('.setup-similar').classList.remove('hidden');
}

main();
