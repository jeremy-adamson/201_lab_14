/* global Product, Cart */

'use strict';

// Set up an empty cart for use on this page.
state.cart = new Cart([]);

// On screen load, we call this method to put all of the product options
// (the things in the state.allProducts array) into the drop down list.
function populateForm() {

  //TODO: Add an <option> tag inside the form's select for each product
  const selectElement = document.getElementById('items');
  for (let i in state.allProducts) {
    let newListItem = document.createElement('option');
    newListItem.setAttribute('value', `${state.allProducts[i].name}`);
    newListItem.setAttribute('name', 'product');
    newListItem.innerHTML = state.allProducts[i].name;
    selectElement.appendChild(newListItem);
  }

  document.getElementById('quantity').setAttribute('name', 'quantity');

}


// 1. When someone submits the form, we need (A)to add the selected item to the cart
// 2. object, (B)save the whole thing back to local storage and (C) update the screen
// 3. so that it shows the # of items in the cart and a (D)quick preview of the cart itself.
function handleSubmit(event) {

  // TODO: Prevent the page from reloading
  event.preventDefault();

  let product = event.target.items.value;
  let quantity = event.target.quantity.value;

  // Do all the things ...

  // A 
  addSelectedItemToCart(product, quantity);

  // B
  state.cart.saveToLocalStorage();

  // C
  updateCounter();

  // D
  updateCartPreview();

}

// TODO: Add the selected item and quantity to the cart
function addSelectedItemToCart(product, quantity) {
  // TODO: suss out the item picked from the select list
  // TODO: get the quantity
  // TODO: using those, add one item to the Cart
  state.cart.addItem(product, quantity);
}

// TODO: Update the cart count in the header nav with the number of items in the Cart
function updateCounter() { 
  let itemCount = document.getElementById('itemCount');
  if(state.cart) {
    itemCount.innerHTML = state.cart.items.length;
  } else {
    itemCount.innerHTML = 0;
  }

}

// TODO: As you add items into the cart, show them (item & quantity) in the cart preview div
function updateCartPreview() {
  // TODO: Get the item and quantity from the form
  // TODO: Add a new element to the cartContents div with that information

  let cartPreview = document.getElementById('cartContents');
  let cartTable = document.createElement('table');
  cartPreview.innerHTML = '';
  let cartRow = document.createElement('tr');
  let cartHeader = document.createElement('th')
  let cartTH = document.createElement('th');
  cartHeader.innerText = 'Product';
  cartTH.innerText = 'Quantity';
  cartPreview.appendChild(cartTable);
  cartTable.appendChild(cartRow);
  cartRow.appendChild(cartHeader);
  cartRow.appendChild(cartTH);

  for (let i = 0; i < state.cart.items.length; i++) {
    let listItem = document.createElement('tr');
    let itemName = document.createElement('td');
    let itemQuantity = document.createElement('td');
    itemName.innerText = state.cart.items[i].product;
    itemQuantity.innerText = state.cart.items[i].quantity;
    
    listItem.appendChild(itemName);
    listItem.appendChild(itemQuantity);
    cartTable.appendChild(listItem);
  }

}

// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
const catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);

// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.
populateForm();
