/**
 * Created by timox on 09.10.2016.
 */


var addProduct = document.getElementById('addProduct');            //Блок получения элементов
var availableRecipe = document.getElementById('availableRecipe');
var availableProduct = document.getElementById('availableProduct');
var craftItems = document.getElementById('craftItems');
var addButton = document.getElementById('addButton');
var craftButton = document.getElementById('craft');
var recipeLog = document.getElementById('recipeLog');
var log = document.getElementById('craftLog');

function addListener() {   //Вешаем обработчики
    addButton.addEventListener('click', addItem);
    availableProduct.addEventListener('drop', drop);
    availableProduct.addEventListener('click', showRecipe);
    availableProduct.addEventListener('dragover', dragOver);
    availableRecipe.addEventListener('click', lightProduct);
    craftItems.addEventListener('drop', drop);
    craftItems.addEventListener('dragover', dragOver);
    craftButton.addEventListener('click', craft);
}


showProducts();
addListener();

function showProducts () {
    var product = Models.getProducts();
    availableProduct.innerHTML = '';
    for (var i = 0; i < product.length; i++) {
        putProduct(product[i]);
    }
}

function addItem() {
    var value = addProduct.value;
    if (value.length > 0) {
        Models.setProduct(value);
        addProduct.value = '';
        showProducts();
    }
}

function showRecipe (event)  {
    availableRecipe.innerHTML = '';
    showProducts();
    if (event.target.tagName === 'BUTTON') {
        var value = event.target.innerHTML;
        var recipe = Models.getRecipe();
        for (var i = 0; i < recipe.length; i++) {
            var temp = recipe[i].ingredients.indexOf(value);
            if (temp >= 0) {
                putRecipe(recipe[i].ingredients.join(' + ') + ' = ' + recipe[i].dish, i);
            }

        }
        if (availableRecipe.innerHTML == '') {
            recipeLog.innerHTML = 'Нет доступных рецептов'

        }
    }
    }

function putRecipe (recipeName, idRecipe) {
    var button = document.createElement('button');
    button.id = idRecipe;
    button.className = 'recipes btn btn-primary';
    button.style.margin = '3px';
    button.innerHTML = recipeName;
    availableRecipe.appendChild(button);
}

var idProduct = 0;
function putProduct (productName) {
    var button = document.createElement('button');
    button.id = productName;
    button.className = 'products btn btn-info';
    button.style.margin = '3px';
    button.innerHTML = productName;
    button.setAttribute('draggable', true);
    button.ondragstart = drag;
    availableProduct.appendChild(button);
    idProduct++;
}

function lightProduct(event) {
    if (event.target.tagName === 'BUTTON') {
        var idRecipe = event.target.id;
        var arr=[];
        var recipe = Models.getRecipe();
        for (var i = 0; i < recipe[idRecipe].ingredients.length; i++) {
            arr.push(recipe[idRecipe].ingredients[i]);
        }
        for (var i =0; i <= arr.length; i++) {
           var elem = document.getElementById(arr[i]);
           elem.className = 'btn btn-danger';
        }
    }
}

function craft() {
    log.innerHTML = '';
    var dish = '';
    var selected = craftItems.querySelectorAll('button');
    if (selected.length != 0) {
        var arrItems = [];

        for (var i = 0; i < selected.length; i++) {            // Создаем массив из элементов в поле крафта
            arrItems.push(selected[i].innerHTML);
        }
        var recipe = Models.getRecipe();                        // Получаем рецепты

        for (var i = 0; i < recipe.length; i++) {                 // Пробегаем по рецептам и копируем ингридиенты
            var selectedRecipe = recipe[i].ingredients.slice();
            var count = 0;
            for (var j = 0; j < arrItems.length; j++) {              // Если в массиве крафта такой же элемент как и в ингридиентах
                var ind = selectedRecipe.indexOf(arrItems[j]);
                if (ind >= 0) {
                    selectedRecipe.splice(ind, 1);                     // то удаляем из ингридиентов
                    count++;
                }
                if (count == arrItems.length && selectedRecipe.length == 0) {    //  Если нужных ингридиентов не осталось и нужно кол-во в поле крафта то крафтим
                    dish = recipe[i].dish;
                }
            }
        }
        if (dish != 0) {
            log.innerHTML = 'Вы приготовили: ' + dish;
            Models.setProduct(dish);
            showProducts();
            craftItems.innerHTML='';
        } else {
            log.innerHTML = 'Нет доступных рецептов';
        }
    } else {
        log.innerHTML = 'Добавьте элементы, перетащив со списка продуктов';
    }
}


function drag (event) {
    event.dataTransfer = undefined;
    event.dataTransfer.setData('text', event.target.id);
   
}

function dragOver (event) {
    event.preventDefault();
}

function drop (event) {
    event.preventDefault();
    var id = event.dataTransfer.getData("text");

    if (event.target.id === 'craftItems' ||
        event.target.id === 'availableProduct')  {
        event.target.appendChild(document.getElementById(id));
    }
}

