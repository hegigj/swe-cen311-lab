const UNIT = {
    PCS: 'pcs',
    LITTER: 'lt',
    KG: 'kg'
};

const PRODUCT_LIST = [
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

const getProductList = () => {
    return PRODUCT_LIST.slice();
};