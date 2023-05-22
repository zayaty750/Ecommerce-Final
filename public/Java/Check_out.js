


// function purchaseClicked() {
//     alert('Thank you for your purchase')
//     var cartItems = document.getElementsByClassName('cart-items')[0]
//     while (cartItems.hasChildNodes()) {
//         cartItems.removeChild(cartItems.firstChild)
//     }
//     updateCartTotal()
// }

// function removeCartItem(event) {
//     var buttonClicked = event.target
//     buttonClicked.parentElement.parentElement.remove()
//     updateCartTotal()
// }

// function quantityChanged(event) {
//     var input = event.target
//     if (isNaN(input.value) || input.value <= 0) {
//         input.value = 1
//     }
//     updateCartTotal()
// }

// function addToCartClicked(e) {
//     var shopItem = e.parentElement.parentElement.parentElement;
//     var title = shopItem.getElementsByClassName('product_name')[0].innerText
//     var price = shopItem.getElementsByClassName('product_price')[0].innerText
//     var imageSrc = shopItem.getElementsByClassName('product_img')[0].src
//     console.log(title, price , imageSrc);
//     addItemToCart(title, price, imageSrc);
// }

// function addItemToCart(title, price, imageSrc) {
//     var cartRow = document.createElement('div')
//     var cartRowContents = `
//     <tr>
//     <td data-th="Product">
//         <div class="row ">
//             <div class="col-md-3 text-left">
//                 <img src="${imageSrc}" alt="" class="img-fluid d-none d-md-block rounded mb-2 shadow ">
//             </div>
//             <div class="col-md-9 text-left mt-sm-2">
//                 <h4>${title}</h4>
//                 <p class="font-weight-light">Brand &amp; Name</p>
//             </div>
//         </div>
//     </td>
//     <td data-th="Price"${price}</td>
//     <td data-th="Quantity">
//         <input type="number" class="form-control form-control-lg text-center" value="1">
//     </td>
//     <td class="actions" data-th="">
//         <div class="text-right">
//           <div class="text-right">
//               <button class="btn btn-white border-secondary bg-white btn-md mb-2">
//                   <i class="bi-trash-fill"></i>
//               </button>
//         </div>
//     </td>
// </tr>`
//     // cartRow.innerHTML = cartRowContents
//     getElementsByClassName("bondo2").innerHTML += cartRowContents;
// }


// function updateCartTotal() {
//     var cartItemContainer = document.getElementsByClassName('cart-items')[0]
//     var cartRows = cartItemContainer.getElementsByClassName('cart-row')
//     var total = 0
//     for (var i = 0; i < cartRows.length; i++) {
//         var cartRow = cartRows[i]
//         var priceElement = cartRow.getElementsByClassName('cart-price')[0]
//         var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
//         var price = parseFloat(priceElement.innerText.replace('$', ''))
//         var quantity = quantityElement.value
//         total = total + (price * quantity)
//     }
//     total = Math.round(total * 100) / 100
//     document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
// }