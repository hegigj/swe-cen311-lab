const SESSION_STORAGE_PRODUCT_LIST = 'inventory:product-list';

const UNIT = {
    PCS: 'pcs',
    LITTER: 'lt',
    KG: 'kg'
};

const PRODUCT_LIST = sessionStorage.getItem(SESSION_STORAGE_PRODUCT_LIST)
    ? JSON.parse(sessionStorage.getItem(SESSION_STORAGE_PRODUCT_LIST))
    : [
        {
            id: 1,
            name: 'Pen',
            unit: UNIT.PCS,
            quantity: 10,
            price: .85,
            get totalPrice() {
                return this.quantity * this.price;
            }
        },
        {
            id: 2,
            name: 'Pencil',
            unit: UNIT.PCS,
            quantity: 100,
            price: .25,
            get totalPrice() {
                return this.quantity * this.price;
            }
        },
    ];

const updateSessionStorage = () => {
    sessionStorage.setItem(
        SESSION_STORAGE_PRODUCT_LIST,
        JSON.stringify(PRODUCT_LIST)
    );
};

const getProductList = () => {
    return PRODUCT_LIST.slice();
};

const setProduct = (name, unit, quantity, price) => {
    // array and object destructuring
    const [ { id: lastProductId } ] = getProductList().reverse();

    if (
        name &&
        [UNIT.PCS, UNIT.LITTER, UNIT.KG].includes(unit) &&
        quantity > 0 &&
        price > 0
    ) {
        const newProduct = {
            id: lastProductId + 1,
            name,
            unit,
            price: parseFloat(price),
            quantity: +quantity, // is the same as using parseInt or parseFloat
            get totalPrice() {
                return this.quantity * this.price;
            }
        };

        PRODUCT_LIST.push(newProduct);

        updateSessionStorage();
    } else {
        throw new Error('Unable to set product!');
    }
};