const productNameInput = document.querySelector('#productName');
const productPriceInput = document.querySelector('#productPrice');
const addButton = document.querySelector('#add');
const productList = document.querySelector('#product-list');
const totalCountSpan = document.querySelector('#totalCount');
const totalPriceSpan = document.querySelector('#totalPrice');

let products = JSON.parse(localStorage.getItem('products')) || [];

function updateProductList() {
    productList.innerHTML = '';
    let totalCount = 0;
    let totalPrice = 0;
    products.forEach((product, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
                <span>${product.name}</span>
                <span>${product.price} AZN</span>
                <button data-index="${index}" class="remove"> Sil </button>
            `;
        productList.appendChild(listItem);

        totalCount++;
        totalPrice += parseFloat(product.price);
    });

    totalCountSpan.textContent = totalCount;
    totalPriceSpan.textContent = totalPrice.toFixed(2);
}

addButton.addEventListener('click', () => {
    const productName = productNameInput.value;
    const productPrice = productPriceInput.value;

    if (productName && productPrice) {
        products.push({
            name: productName,
            price: productPrice
        });

        localStorage.setItem('products', JSON.stringify(products));

        productNameInput.value = '';
        productPriceInput.value = '';

        updateProductList();
    } else {
        alert('Zəhmət olmasa, məhsulun adını və qiymətini daxil edin.');
    }
});

productList.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove')) {
        const index = event.target.dataset.index;
        products.splice(index, 1);
        localStorage.setItem('products', JSON.stringify(products));
        updateProductList();
    }
});

updateProductList();