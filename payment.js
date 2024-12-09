document.addEventListener("DOMContentLoaded", () => { 
    const productList = document.querySelector(".product-list");

    // Lấy dữ liệu từ localStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Làm rỗng danh sách sản phẩm trước khi thêm
    productList.innerHTML = "<h2>Product List</h2>";

    if (cart.length === 0) {
        productList.innerHTML += "<p>Your cart is empty.</p>";
        return;
    }

    let total = 0;

    // Tạo các phần tử sản phẩm từ dữ liệu trong cart
    cart.forEach((product, index) => {
        const productItem = document.createElement("div");
        productItem.className = "product-item";
        productItem.dataset.index = index; // Thêm chỉ số cho sản phẩm để dễ dàng xác định

        // Thêm giá gốc (unitPrice) để tính toán lại
        product.unitPrice = parseFloat(product.price.replace("$", ""));

        productItem.innerHTML = `
            <div class="product-img">
                <img src="${product.imgSrc}" alt="${product.title}">
            </div>
            <div class="product-content">
                <a href="#" class="book-title">${product.title}</a>
                <div>
                    <span id="price-${product.id}" class="price">$${(product.unitPrice * (product.quantity || 1)).toFixed(2)}</span>
                </div>
                <div>
                    <!-- Nút giảm số lượng -->
                    <button class="quantity-btn decrease-btn"><i class="fas fa-minus"></i></button>
                    <span id="quantity-${product.id}" class="quantity-display">${product.quantity || 1}</span>
                    <!-- Nút tăng số lượng -->
                    <button class="quantity-btn increase-btn"><i class="fas fa-plus"></i></button>
                </div>
                <button class="remove-btn"><i class="fas fa-trash-alt"></i> Remove</button>
            </div>
        `;

        productList.appendChild(productItem);

        // Cộng giá trị sản phẩm vào tổng, với số lượng đã chọn
        total += product.unitPrice * (product.quantity || 1);

        // Nút cộng và trừ số lượng
        const decreaseBtn = productItem.querySelector(".decrease-btn");
        const increaseBtn = productItem.querySelector(".increase-btn");
        const quantityDisplay = productItem.querySelector(`#quantity-${product.id}`);
        const priceDisplay = productItem.querySelector(`#price-${product.id}`);

        decreaseBtn.addEventListener("click", () => {
            if (product.quantity > 1) {
                product.quantity--;
                quantityDisplay.textContent = product.quantity;
                priceDisplay.textContent = `$${(product.unitPrice * product.quantity).toFixed(2)}`;
                localStorage.setItem("cart", JSON.stringify(cart));
                updateTotal();
            }
        });

        increaseBtn.addEventListener("click", () => {
            product.quantity++;
            quantityDisplay.textContent = product.quantity;
            priceDisplay.textContent = `$${(product.unitPrice * product.quantity).toFixed(2)}`;
            localStorage.setItem("cart", JSON.stringify(cart));
            updateTotal();
        });

        // Xử lý sự kiện xóa sản phẩm
        const removeBtn = productItem.querySelector(".remove-btn");
        removeBtn.addEventListener("click", () => {
            cart.splice(index, 1); // Xóa sản phẩm khỏi mảng
            productItem.remove(); // Xóa sản phẩm khỏi giao diện
            localStorage.setItem("cart", JSON.stringify(cart));
            updateTotal();
        });
    });

    // Hàm cập nhật tổng giá trị
    function updateTotal() {
        total = 0;
        cart.forEach((product) => {
            total += product.unitPrice * (product.quantity || 1);
        });

        // Hiển thị tổng giá trị và thuế
        const summarySection = document.querySelector(".summary-section");
        if (summarySection) {
            const tax = total * 0.05;
            const grandTotal = total + tax;

            summarySection.innerHTML = `
                <h2>Order Summary</h2>
                <div class="summary-item">
                    <span>Total:</span>
                    <span>$${total.toFixed(2)}</span>
                </div>
                <div class="summary-item">
                    <span>Tax (5%):</span>
                    <span>$${tax.toFixed(2)}</span>
                </div>
                <div class="summary-item total">
                    <span>Grand Total:</span>
                    <span>$${grandTotal.toFixed(2)}</span>
                </div>
                <button class="checkout-btn">Checkout</button>
            `;
        }
    }

    updateTotal();  // Cập nhật tổng ban đầu
});
