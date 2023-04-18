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