let $cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let $closeCart = document.querySelector("#close-cart");

$cartIcon.onclick = () => {
    cart.classList.add("active");
};

$closeCart.onclick = () => {
    cart.classList.remove("active");
};

if(document.readyState == 'loading'){
    document.addEventListener("DOMContenetLoaded", ready);
} else {
    ready();
}

function ready(){
    let reomveCartButtons = document.getElementsByClassName('cart-remove')
    console.log(reomveCartButtons);
    for(let i = 0; i < reomveCartButtons.length; i++){
        let button = reomveCartButtons[i]
        button.addEventListener('click', removeCartItem)
    }
    let quantityInputs = document.getElementsByClassName('cart-quantity')
    for (let i = 0; i < quantityInputs.length; i++) {
        let input = quantityInputs[i];
        input.addEventListener("change", quantityChange);
    }
}

function removeCartItem(event) {
    let buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
}

function quantityChange(event){
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }
    updatetotal();
}

function updatetotal(){
    let cartContent = document.getElementsByClassName('cart-content')[0];
    let cartBoxes = cartContent.getElementsByClassName('cart-box');
    let total = 0;
    for (let i = 0; i < cartBoxes.length; i++){
        let cartBox = cartBoxes[i]
        let priceElement = cartBox.getElementsByClassName('cart-price')[0]
        let quantityElement = cartBox.getElementsByClassName('cart-quantity')[0]
        let price = parseFloat(priceElement.innerText.replace("$",""));
        let quantity = quantityElement.value
        total = total + price * quantity;

        total = Math.round(total * 100) / 100;

        document.getElementsByClassName("total-price")[0].innerText ="$" + total;
    }
}