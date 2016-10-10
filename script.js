/**
 * Created by timox on 09.10.2016.
 */
var product = ['Яйца', 'Мука', 'Молоко', 'Масло', 'Сыр'];
var recipe =  [{ ingredients: ['Яйца', 'Мука', 'Молоко'], dish:'Пирог'}, {ingredients: ['Масло', 'Сыр'], dish: 'Масло с сыром'},
    { ingredients: ['Яйца',  'Молоко'], dish:'Яйца в молоке'}];


function getProducts() {
    return product;
}
function setProduct(value) {
    product.push(value);
}

function showProducts () {
    var product= getProducts();
    document.getElementById('availableProduct').innerHTML = '';

    for (var i = 0; i < product.length; i++) {
        putProduct(product[i]);
    }
}
 var idProduct = 0;
function putProduct (productName) {
    var button = document.createElement('button');
    button.id = productName;
    button.className = 'products';
    button.style.margin = '3px';
    button.innerHTML = productName;

    document.getElementById('availableProduct').appendChild(button);

    idProduct++;
}
document.getElementById('addButton').addEventListener('click', addItem);
document.getElementById('availableProduct').addEventListener('click', showRecipe);
document.getElementById('availableRecipe').addEventListener('click', lightProduct);

function addItem() {
    var value = document.getElementById('addProduct').value;
    if (value.length > 0) {
        setProduct(value);
        showProducts();
    }
}


function showRecipe (event)  {
    document.getElementById('availableRecipe').innerHTML = '';
    showProducts();
    if (event.target.tagName === 'BUTTON') {
        var value = event.target.innerHTML;
        var temp = 0;
        for (var i = 0; i < recipe.length; i++) {
            var temp = recipe[i].ingredients.indexOf(value);
            if (temp >= 0) {
                putRecipe(recipe[i].ingredients.join(' + ') + ' = ' + recipe[i].dish, i);
                temp++;
            }
        }
        if (temp===0) {
            alert('Нет рецепта')
        }
    }
    }

function putRecipe (recipeName, idRecipe) {

    var button = document.createElement('button');
    button.id = idRecipe;
    button.className = 'recipes';
    button.style.margin = '3px';
    button.innerHTML = recipeName;
    document.getElementById('availableRecipe').appendChild(button);

}

function lightProduct(event) {
    if (event.target.tagName === 'BUTTON') {

        var idRecipe = event.target.id;
        var arr=[];
        for (var i = 0; i < recipe[idRecipe].ingredients.length; i++) {
            arr.push(recipe[idRecipe].ingredients[i]);
        }
        for (var i =0; i <= arr.length; i++) {
           var elem = document.getElementById(arr[i]);
           elem.style.backgroundColor = 'yellow';
        }
    }
}

showProducts();
