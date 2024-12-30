// add product to cart
export function AddToCart(product) {
  // get the current items in the cart
  const cart = getCart();
  // find if the product already exist in the cart or not
  const selectedProduct = cart.find((p) => p._id === product._id);
  if (selectedProduct) {
    // if product already exists, just increase the quantity
    selectedProduct.quantity++;
  } else {
    // if not exist, add it into the cart
    // long method
    // const newProduct = { ...product };
    // newProduct.quantity = 1;
    // cart.push(newProduct);
    // short method
    cart.push({
      ...product,
      quantity: 1,
    });
  }
  // update the cart with the latest data
  updateCart(cart);
}

// get items in the cart
export function getCart() {
  // first iteration
  // get cart items from local storage
  const cart = JSON.parse(localStorage.getItem("cart"));
  //   if (cart) {
  //     return cart;
  //   } else {
  //     return [];
  //   }
  // second iteration
  //   return cart ? cart : [];
  // third iteration
  return cart || [];
}

// update the cart in the local storage
export function updateCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// delete item from the cart
export function deleteItemFromCart(_id) {
  // get the current cart
  // long method
  //   const cart = getCart();
  //   const updatedCart = cart.filter((p) => p._id !== _id);
  //   updateCart(updatedCart);
  // short method
  updateCart(getCart().filter((p) => p._id !== _id));
}

// get total price in cart
export function getTotalCartPrice() {
  const cart = getCart();
  let total = 0;
  cart.forEach((item) => {
    total = total + item.price * item.quantity;
  });
  return total.toFixed(2);
}

// clear the cart
export function clearCart() {
  localStorage.removeItem("cart");
}
