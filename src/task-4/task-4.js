function renderCartItem(item) {
    return `
    <li data-item-id="${item.id}" data-item-qty="1" data-item-price="${item.price}" data-item-total="${item.price}">
        <h5 class="item-name">${item.name}</h5>
        <div class="item-info-wrapper">
            <div class="qty-wrapper">Qty: <span class="item-qty">1</span></div>
            <div class="price-wrapper"> Price: $<span class="item-price">${item.price}</span></div>
            <button class="btn btn-sm btn-outline-danger remove" data-item-id="${item.id}">Remove</button>
        </div>
    </li>
    `;
}

export default class ShoppingCart {
    constructor(rootEl) {
        this.cartEl = rootEl.querySelector(".shopping-cart-list");
        this.totalEl = rootEl.querySelector(".total");
        this.emptyCartEl = rootEl.querySelector(".empty-cart-message");
        this.removeAllEl = rootEl.querySelector(".remove-all");

        this.addEventListeners();
    }

    /**
     * Adds initial event listeners
     * @returns {undefined}
     */
    addEventListeners() {
      this.cartEl.addEventListener("click", e => {
        if (e.target.tagName === "BUTTON") {
          this.removeItem(e.target.dataset.itemId);
        }
      });

      this.removeAllEl.addEventListener("click", e => {
        if (e.target.tagName === "BUTTON") {
          this.removeAll();
        }
      });
    }

    /**
     * Adds new item to the cart
     * or increments its quantity if item is already present.
     * @param {Object} item - item description object
     * @returns {undefined}
     */
    addItem(item) {
      console.log("*");
        if (!this.isItemInCart(item.id)) {
            this.addNewItem(item);
        } else {
            this.incrementItem(item);
        }

        this.updateCartState();
    }

    /**
     * Renders new item in the cart
     * @param {Object} item - item description object
     * @returns {undefined}
     */
    addNewItem(item) {
        this.cartEl.innerHTML += renderCartItem(item);
    }

    /**
     * Increments quantity and total price for existing cart item
     * @param {Object} item - item description object
     * @returns {undefined}
     */
    incrementItem(item) {
      const curItem = this.cartEl.querySelector(`ul > li[data-item-id=${item.id}]:not(.d-none)`);
      const newQtyItem = +curItem.getAttribute("data-item-qty") + 1;

      curItem.setAttribute("data-item-qty", `${newQtyItem}`);
      curItem.querySelector("div > div > span.item-qty").innerHTML = newQtyItem;
    }

    /**
     * Checks existence of item in shopping cart by its id
     * @param {string} id - ID of an item
     * @returns {boolean} - true if item is present in shopping cart, false otherwise
     */
    isItemInCart(id) {
      const item = this.cartEl.querySelector(`li[data-item-id=${id}]:not(.d-none)`);

      if (item !== null) return true;
      return false;
    }

    /**
     * Checks if shopping cart is empty
     * @returns {boolean} true if there's no items in cart, false otherwise
     */
    isCartEmpty() {
      const item = this.cartEl.querySelectorAll(`ul > li:not(.d-none)`);

      if (item.length === 0) return true;
      return false;
    }

    /**
     * Removes all items from the cart
     * @returns {undefined}
     */
    removeAll() {
        this.cartEl.innerHTML = "";
        this.updateCartState();
    }

    /**
     * Removes item from a list
     * @param {string} id - ID of and item to remove
     * @returns {undefined}
     */
    removeItem(id) {
        const item = this.cartEl.querySelector(`ul > li[data-item-id=${id}]`);

        this.cartEl.removeChild(item);

        this.updateCartState();
    }

    /**
     * Updates total sum and visibility of "no items" message / "remove all" button
     * @returns {undefined}
     */
    updateCartState() {
        this.updateTotal();
        this.updateNoItemsMessage();
        this.updateRemoveAllButton();
    }

    /**
     * Update total sum in cart
     * @returns {undefined}
     */
    updateTotal() {
        const totalSum = this.getTotalSum();

        this.totalEl.setAttribute("total", `${totalSum}`);
        this.totalEl.innerHTML = totalSum;
    }

    /**
     * Get total sum of all items in list
     * @returns {number} Total sum
     */
    getTotalSum() {
        const itemList = [...this.cartEl.querySelectorAll(`ul > li:not(.d-none)`)];

        return itemList.reduce( (acc, curVal, curIndex) => {
          return acc + (+curVal.getAttribute("data-item-qty") * +curVal.getAttribute("data-item-price"));
        }, 0);
    }

    /**
     * Updates visibility of cart "no items" message depending on state of the cart
     * @returns {undefined}
     */
    updateNoItemsMessage() {
        if (this.isCartEmpty()) {
            this.emptyCartEl.classList.remove("d-none");
        } else {
            this.emptyCartEl.classList.add("d-none");
        }
    }

    /**
     * Updates visibility of cart /"remove all" button depending on state of the cart
     * @returns {undefined}
     */
    updateRemoveAllButton() {
        if (!this.isCartEmpty()) this.removeAllEl.classList.remove("d-none");
        else this.removeAllEl.classList.add("d-none");
    }
}
