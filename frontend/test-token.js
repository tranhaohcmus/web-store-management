// Check token in localStorage
console.log("Token:", localStorage.getItem("token"));
console.log("User:", localStorage.getItem("user"));

// Test API call
const token = localStorage.getItem("token");
fetch("http://localhost:3000/api/v1/admin/product-types", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
  .then((res) => res.json())
  .then((data) => {
    console.log("API Test Result:", data);
    if (data.success) {
      console.log("✅ Product Types:", data.data.productTypes.length);
      console.log("First type:", data.data.productTypes[0]);
    }
  })
  .catch((err) => console.error("❌ Error:", err));
