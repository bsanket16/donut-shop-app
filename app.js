if(document.readyState == 'loading'){
    document.addEventListener('DomContentLoaded', ready)
}  else{
    ready()
}

function ready(){

        let abc = document.getElementById('pur_button').style.display = "none"
        let abcd = document.getElementById('line2').style.display = "none"
        let removeCartItems = document.getElementsByClassName('closey')

        for(let i=0; i<removeCartItems.length; i++){
                let removeButton = removeCartItems[i]
                removeButton.addEventListener('click', removalCartItems)
        }

        let qtyInput = document.getElementsByClassName('con')
        for(let i=0; i<qtyInput.length; i++){
            let inputChange = qtyInput[i]
            inputChange.addEventListener('change', quantityInputChanges)
        }

        let addToCart = document.getElementsByClassName('addtocart')
        for(let i=0; i<addToCart.length; i++){
            let addCart = addToCart[i]
            addCart.addEventListener('click', addToCartButton)
            
        }
    
}

function removeEmpty(){
    let removeEmptyItems = document.getElementById('hap').style.display = "none"
}
function removalCartItems(event){
    var butClicked = event.target
    butClicked.parentElement.parentElement.parentElement.parentElement.remove()
    updatePrice()
    let tp = document.getElementsByClassName('total_price')[0].innerText
    if(tp === '£ 0'){
        document.getElementById('pur_button').style.display = "none"
        document.getElementById('line2').style.display = "none"
        document.getElementById('hap').style.display = "block"
    }
}

function quantityInputChanges(event){
    let inputChange = event.target
    updatePrice()
}

function updatePrice(){
    let cartItemSpace = document.getElementsByClassName('buying_area')[0]
    let itemSpace = cartItemSpace.getElementsByClassName('item_space')
    let total = 0;
    for(let i=0; i<itemSpace.length; i++){
        let itemSpaces = itemSpace[i]
        let priceElement = itemSpaces.getElementsByClassName('buy_cost')[0]
        let quantityElement = itemSpaces.getElementsByClassName('con')[0]
        let price = parseFloat(priceElement.innerText.replace('£', ''))
        let quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total *100) / 100
    document.getElementsByClassName('total_price')[0].innerText = '£ ' + total
}

function addToCartButton(event){
    var addCart = event.target    
    let cart = addCart.parentElement.parentElement
    let itemTitle = cart.getElementsByClassName('item_name')[0].innerText
    let itemPrice = cart.getElementsByClassName('price_tag')[0].innerText
    cartapp(itemTitle,itemPrice)
    updatePrice()
    removeEmpty()
    let abc = document.getElementById('pur_button').style.display = "flex"
    let abcd = document.getElementById('line2').style.display = "flex"
}

function cartapp(itemTitle,itemPrice){
    let cartRow = document.createElement('div')
    let cartItems = document.getElementsByClassName('buying_area')[0]
    let cartSpec = `

    <div id="remo">

    <div class="item_space" id="item">

    <div class="item">
                    
                <div class="ac_item">${itemTitle}</div>
                        
                <div class="quantity">
                
                    <div class="available">
                            <div class="tick"><img src="/img/tick.png" width="16px"></div>
                            <div class="ava_text">available</div>
                    </div>

                                <div class="ac_quan">

                                    <div class="quan_txt">qty</div>

                                    <div class="cont">
                                        <input class="con" type="number" min="1" max="9" value="1">
                                    </div>

                                </div>
                </div>

    </div>


    <div class="item1">
                
                <div class="buy_cost">
                    <div class="cost">${itemPrice}</div>
                </div>

                <div class="close">
                    <div class="closey"><i class="fa fa-times-circle" style="font-size:20px;color:#FF6584"></i></div>
                </div>

    </div>

</div>
</div>`
            
    cartRow.innerHTML = cartSpec
    cartItems.append(cartRow)

    cartRow.getElementsByClassName('closey')[0].addEventListener('click', removalCartItems)
    cartRow.getElementsByClassName('con')[0].addEventListener('change', quantityInputChanges)
}

function purchase(){
    alert("Purchase Successful! Keep Visiting!")
    let removeEmptyItems = document.getElementById('hap').style.display = "inline"
    document.getElementById('pur_button').style.display = "none"
    document.getElementById('line2').style.display = "none"
    
    document.getElementById('item').remove()
}