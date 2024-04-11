const apiUrl = 'https://fakestoreapi.com/products';

// Function to fetch products from API
async function fetchProducts() {
    const response = await fetch(apiUrl);
    const products = await response.json();
    return products;
}

// Function to display products
    function displayProducts(products) {
        const productList = document.getElementById('productList');
        productList.innerHTML = '';

        products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.className = 'product';
            productElement.innerHTML = `
                <div class="product-info">
                    <img src="${product.image}" alt="${product.title}">
                    <div>
                        <h3>${product.title}</h3>
                        <p>Category: ${product.category}</p>
                        <p>Price: $${product.price}</p>
                    </div>
                </div>
            `;
            productList.appendChild(productElement);
        });
    }

// Function to sort products
function sortProducts(products, sortType) {
    if (sortType === 'asc') {
        products.sort((a, b) => a.price - b.price);
    } else if (sortType === 'desc') {
        products.sort((a, b) => b.price - a.price);
    }
}

// Function to filter products by category
function filterProducts(products, category) {
    if (category === 'all') {
        return products;
    } else {
        return products.filter(product => product.category === category);
    }
}

// Event listeners for filter and sort controls
document.getElementById('categoryFilter').addEventListener('change', async (event) => {
    const category = event.target.value;
    let products = await fetchProducts();
    products = filterProducts(products, category);
    displayProducts(products);
});

document.getElementById('sortPrice').addEventListener('change', async (event) => {
    const sortType = event.target.value;
    let products = await fetchProducts();
    sortProducts(products, sortType);
    displayProducts(products);
});

// Initial load
fetchProducts().then(products => {
    displayProducts(products);
});
