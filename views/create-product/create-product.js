const createProductForm = document.querySelector('form[method="post"]');

createProductForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const { target: form } = event;
    const formData = new FormData(form);

    setProduct(
        formData.get('name'),
        formData.get('unit'),
        formData.get('quantity'),
        formData.get('price'),
    );
});