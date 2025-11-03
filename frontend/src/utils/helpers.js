// Format price to VND
export const formatPrice = (price) => {
  if (price === null || price === undefined || isNaN(price)) {
    return "0 ₫";
  }

  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

// Format date
export const formatDate = (dateString) => {
  if (!dateString) return "N/A";

  try {
    const date = new Date(dateString);
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }

    return new Intl.DateTimeFormat("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid Date";
  }
};

// Get order status text and color
export const getOrderStatus = (status) => {
  const statusMap = {
    pending: { text: "Chờ xử lý", color: "text-yellow-600 bg-yellow-100" },
    processing: { text: "Đang xử lý", color: "text-blue-600 bg-blue-100" },
    shipping: { text: "Đang giao", color: "text-purple-600 bg-purple-100" },
    completed: { text: "Hoàn thành", color: "text-green-600 bg-green-100" },
    delivered: { text: "Đã giao", color: "text-green-600 bg-green-100" },
    cancelled: { text: "Đã hủy", color: "text-red-600 bg-red-100" },
  };
  return (
    statusMap[status] || {
      text: status || "N/A",
      color: "text-gray-600 bg-gray-100",
    }
  );
};

// Validate email
export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Validate phone
export const isValidPhone = (phone) => {
  const regex = /^[0-9]{10,11}$/;
  return regex.test(phone);
};
