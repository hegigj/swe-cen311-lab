const searchForm = document.querySelector('form[method="get"]');
const tableBody = document.querySelector('tbody');

function calculateTotalQuantityAndPriceData(productList) {
    const totalQuantityData = document.getElementById('totalQuantity');
    const totalPriceData = document.getElementById('totalPrice');

    const [ totalQuantity, totalPrice ] = productList.reduce(
        (totalQuantityAndPrice, product) => {
            const [ totalQuantity, totalPrice ] = totalQuantityAndPrice;
            const { quantity, totalPrice: price } = product;

            return [
                totalQuantity + quantity,
                totalPrice + price
            ]
        },
        [0, 0]
    );

    totalQuantityData.innerText = `Total Quantity: ${totalQuantity}`;
    totalPriceData.innerText = `Total Price: $ ${totalPrice}`;
}

createTable(
    tableBody,
    getProductList(),
    ['id', 'name', 'price', 'unit', 'quantity', 'totalPrice']
);

calculateTotalQuantityAndPriceData(getProductList());

searchForm.addEventListener('change', (event) => {
    const change = event.target;

    if (change.name === 'quantityOption') {
        const quantityInput = document.getElementById('quantity');
        quantityInput.removeAttribute('disabled');
    }

    if (change.name === 'priceOption') {
        const priceInput = document.getElementById('price');
        priceInput.removeAttribute('disabled');
    }
});

searchForm.addEventListener('reset', () => {
    const quantityInput = document.getElementById('quantity');
    const priceInput = document.getElementById('price');

    quantityInput.setAttribute('disabled', '');
    priceInput.setAttribute('disabled', '');

    createTable(
        tableBody,
        getProductList(),
        ['id', 'name', 'price', 'unit', 'quantity', 'totalPrice']
    );

    calculateTotalQuantityAndPriceData(getProductList());
});

searchForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const { target: form } = event;
    const formData = new FormData(form);

    const filteredProductList = getProductList().filter((product) => {
        let passConditions = true;

        const unit = formData.get('unit');
        if (unit) {
            passConditions = passConditions && (product.unit === unit);
        }

        const quantityOption = formData.get('quantityOption');
        if (quantityOption) {
            const quantity = +formData.get('quantity');

            if (quantity > 0) {
                switch (quantityOption) {
                    case 'QUANTITY_LESS':
                        passConditions = passConditions && (product.quantity < quantity);
                        break;
                    case 'QUANTITY_GREATER':
                        passConditions = passConditions && (product.quantity > quantity);
                        break;
                }
            }
        }

        const priceOption = formData.get('priceOption');
        if (priceOption) {
            const price = +formData.get('price');

            if (price > 0) {
                switch (priceOption) {
                    case 'PRICE_LESS':
                        passConditions = passConditions && (product.price < price);
                        break;
                    case 'PRICE_GREATER':
                        passConditions = passConditions && (product.price > price);
                        break;
                }
            }
        }

        return passConditions;
    });

    createTable(
        tableBody,
        filteredProductList,
        ['id', 'name', 'price', 'unit', 'quantity', 'totalPrice']
    );

    calculateTotalQuantityAndPriceData(filteredProductList);
});

// Assignment 1: "On every key-press the search input filter in the product.html will filter the data in the product table"
const searchInput = document.querySelector('input[name="search"]');

searchInput.addEventListener('keyup', (event) => {
    // object destructuring
    const { value } = event.target;

    if (value && typeof value === 'string') {
        const filteredProductList = getProductList().filter((product) => {
            // filtering array when the value of searchInput is present in product name
            return product.name.toLocaleLowerCase().includes(value.toLocaleLowerCase());
        });

        createTable(
            tableBody,
            filteredProductList,
            ['id', 'name', 'price', 'unit', 'quantity', 'totalPrice']
        );

        calculateTotalQuantityAndPriceData(filteredProductList);
    }
});

// Assignment 1: "Sort table in the product.html in ascending/descending order by name, price, and quantity by clicking each table head"
const nameHeader = document.querySelector('th[data-order-by="name"]');
const priceHeader = document.querySelector('th[data-order-by="price"]');
const quantityHeader = document.querySelector('th[data-order-by="quantity"]');

// strait forward technique
function orderBy(list, orderBy, isDescending) {
    if (list && list instanceof Array && list.length) {
        return list.sort((curr, next) => {
            if (isDescending) {
                return next[orderBy] - curr[orderBy];
            }

            return curr[orderBy] - next[orderBy];
        });
    }

    return list;
}

// using currying/factory function technique
function sortBy(property, isDescending = false) {
    return function (curr, next) {
        if (isDescending) {
            return next[property] - curr[property];
        }

        return curr[property] - next[property];
    }
}

let nameIsDescending = false;
let priceIsDescending = false;
let quantityIsDescending = false;

nameHeader.addEventListener('click', () => {
    createTable(
        tableBody,
        orderBy(getProductList(), 'name', nameIsDescending),
        ['id', 'name', 'price', 'unit', 'quantity', 'totalPrice']
    );

    nameIsDescending = !nameIsDescending;
});

priceHeader.addEventListener('click', () => {
    createTable(
        tableBody,
        orderBy(getProductList(), 'price', priceIsDescending),
        ['id', 'name', 'price', 'unit', 'quantity', 'totalPrice']
    );

    priceIsDescending = !priceIsDescending;
});

quantityHeader.addEventListener('click', () => {
    const sortedProductList = getProductList();
    sortedProductList.sort(sortBy('quantity', quantityIsDescending));

    createTable(
        tableBody,
        sortedProductList,
        ['id', 'name', 'price', 'unit', 'quantity', 'totalPrice']
    );

    quantityIsDescending = !quantityIsDescending;
});