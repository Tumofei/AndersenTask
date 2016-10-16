/**
 * Created by timox on 16.10.2016.
 */
var Models =  (function () {
    var product = ['Яйца', 'Мука', 'Молоко', 'Масло', 'Сыр'];
    var recipe =  [{ ingredients: ['Яйца', 'Мука', 'Молоко'], dish:'Пирог'},
                   {ingredients: ['Масло', 'Сыр'], dish: 'Масло с сыром'},
                   { ingredients: ['Яйца',  'Молоко'], dish:'Яйца в молоке'}];
    function getProducts() {
        return product;
    }
    function setProduct(value) {
        product.push(value);
    }
    function getRecipe() {
        return recipe;
    }


    return {
        getProducts: getProducts,
        setProduct: setProduct,
        getRecipe: getRecipe
    };

})();