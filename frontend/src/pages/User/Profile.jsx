import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile, getProfile } from "../../store/slices/authSlice";
import {
  fetchAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} from "../../store/slices/addressSlice";
import Loading from "../../components/Common/Loading";
import Input from "../../components/Common/Input";
import Button from "../../components/Common/Button";
import { User, MapPin, Plus, Edit, Trash2, Check } from "lucide-react";

function Profile() {
  const dispatch = useDispatch();
  const { user, isLoading: authLoading } = useSelector((state) => state.auth);
  const { addresses, isLoading: addressLoading } = useSelector(
    (state) => state.addresses
  );

  const [activeTab, setActiveTab] = useState("profile");
  const [profileForm, setProfileForm] = useState({
    first_name: "",
    last_name: "",
    phone: "",
  });

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [addressForm, setAddressForm] = useState({
    recipient_name: "",
    recipient_phone: "",
    street: "",
    ward: "",
    district: "",
    city: "",
    address_type: "shipping",
    is_default: false,
  });

  useEffect(() => {
    dispatch(getProfile());
    dispatch(fetchAddresses());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setProfileForm({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  const handleProfileChange = (e) => {
    setProfileForm({
      ...profileForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updateProfile(profileForm));
  };

  const handleAddressFormChange = (e) => {
    setAddressForm({
      ...addressForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    if (editingAddressId) {
      await dispatch(
        updateAddress({ id: editingAddressId, data: addressForm })
      );
      setEditingAddressId(null);
    } else {
      await dispatch(createAddress(addressForm));
    }
    setShowAddressForm(false);
    setAddressForm({
      recipient_name: "",
      recipient_phone: "",
      street: "",
      ward: "",
      district: "",
      city: "",
      address_type: "shipping",
      is_default: false,
    });
    dispatch(fetchAddresses());
  };

  const handleEditAddress = (address) => {
    setEditingAddressId(address.id);
    setAddressForm({
      recipient_name: address.recipient_name,
      recipient_phone: address.recipient_phone,
      street: address.street,
      ward: address.ward,
      district: address.district,
      city: address.city,
      address_type: address.address_type,
      is_default: address.is_default,
    });
    setShowAddressForm(true);
  };

  const handleDeleteAddress = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa địa chỉ này?")) {
      await dispatch(deleteAddress(id));
      dispatch(fetchAddresses());
    }
  };

  const handleSetDefaultAddress = async (id) => {
    await dispatch(setDefaultAddress(id));
    dispatch(fetchAddresses());
  };

  if (authLoading) return <Loading />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Tài khoản của tôi</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="card">
            <button
              onClick={() => setActiveTab("profile")}
              className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 ${
                activeTab === "profile"
                  ? "bg-primary-50 text-primary-600"
                  : "hover:bg-gray-50"
              }`}
            >
              <User size={20} />
              <span>Thông tin cá nhân</span>
            </button>
            <button
              onClick={() => setActiveTab("addresses")}
              className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 ${
                activeTab === "addresses"
                  ? "bg-primary-50 text-primary-600"
                  : "hover:bg-gray-50"
              }`}
            >
              <MapPin size={20} />
              <span>Địa chỉ</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="md:col-span-3">
          {activeTab === "profile" && (
            <div className="card">
              <h2 className="text-2xl font-bold mb-6">Thông tin cá nhân</h2>
              <form onSubmit={handleProfileSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Họ"
                    name="last_name"
                    value={profileForm.last_name}
                    onChange={handleProfileChange}
                  />
                  <Input
                    label="Tên"
                    name="first_name"
                    value={profileForm.first_name}
                    onChange={handleProfileChange}
                  />
                </div>
                <Input
                  label="Email"
                  type="email"
                  value={user?.email}
                  disabled
                  className="bg-gray-100"
                />
                <Input
                  label="Số điện thoại"
                  name="phone"
                  value={profileForm.phone}
                  onChange={handleProfileChange}
                />
                <Button type="submit" isLoading={authLoading}>
                  Cập nhật
                </Button>
              </form>
            </div>
          )}

          {activeTab === "addresses" && (
            <div className="space-y-6">
              <div className="card">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Địa chỉ của tôi</h2>
                  <button
                    onClick={() => {
                      setShowAddressForm(!showAddressForm);
                      setEditingAddressId(null);
                      setAddressForm({
                        recipient_name: "",
                        recipient_phone: "",
                        street: "",
                        ward: "",
                        district: "",
                        city: "",
                        address_type: "shipping",
                        is_default: false,
                      });
                    }}
                    className="btn-primary flex items-center space-x-2"
                  >
                    <Plus size={20} />
                    <span>Thêm địa chỉ</span>
                  </button>
                </div>

                {showAddressForm && (
                  <form
                    onSubmit={handleAddressSubmit}
                    className="mb-6 p-4 bg-gray-50 rounded-lg"
                  >
                    <h3 className="font-semibold mb-4">
                      {editingAddressId ? "Sửa địa chỉ" : "Thêm địa chỉ mới"}
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="Tên người nhận"
                        name="recipient_name"
                        value={addressForm.recipient_name}
                        onChange={handleAddressFormChange}
                        required
                      />
                      <Input
                        label="Số điện thoại"
                        name="recipient_phone"
                        value={addressForm.recipient_phone}
                        onChange={handleAddressFormChange}
                        required
                      />
                    </div>
                    <Input
                      label="Địa chỉ"
                      name="street"
                      value={addressForm.street}
                      onChange={handleAddressFormChange}
                      required
                    />
                    <div className="grid grid-cols-3 gap-4">
                      <Input
                        label="Phường/Xã"
                        name="ward"
                        value={addressForm.ward}
                        onChange={handleAddressFormChange}
                        required
                      />
                      <Input
                        label="Quận/Huyện"
                        name="district"
                        value={addressForm.district}
                        onChange={handleAddressFormChange}
                        required
                      />
                      <Input
                        label="Tỉnh/TP"
                        name="city"
                        value={addressForm.city}
                        onChange={handleAddressFormChange}
                        required
                      />
                    </div>
                    <div className="flex space-x-3">
                      <Button type="submit" isLoading={addressLoading}>
                        {editingAddressId ? "Cập nhật" : "Thêm mới"}
                      </Button>
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => {
                          setShowAddressForm(false);
                          setEditingAddressId(null);
                        }}
                      >
                        Hủy
                      </Button>
                    </div>
                  </form>
                )}

                {addressLoading ? (
                  <Loading />
                ) : addresses.length === 0 ? (
                  <p className="text-gray-600 text-center py-8">
                    Chưa có địa chỉ nào
                  </p>
                ) : (
                  <div className="space-y-4">
                    {addresses.map((address) => (
                      <div key={address.id} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between">
                          <div className="flex-grow">
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="font-semibold">
                                {address.recipient_name}
                              </span>
                              {address.is_default && (
                                <span className="bg-primary-600 text-white px-2 py-1 rounded text-xs">
                                  Mặc định
                                </span>
                              )}
                            </div>
                            <p className="text-gray-600">
                              {address.recipient_phone}
                            </p>
                            <p className="text-gray-600">
                              {address.street}, {address.ward},{" "}
                              {address.district}, {address.city}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEditAddress(address)}
                              className="p-2 hover:bg-gray-100 rounded-lg"
                              title="Sửa"
                            >
                              <Edit size={18} />
                            </button>
                            <button
                              onClick={() => handleDeleteAddress(address.id)}
                              className="p-2 hover:bg-red-50 text-red-600 rounded-lg"
                              title="Xóa"
                            >
                              <Trash2 size={18} />
                            </button>
                            {!address.is_default && (
                              <button
                                onClick={() =>
                                  handleSetDefaultAddress(address.id)
                                }
                                className="p-2 hover:bg-green-50 text-green-600 rounded-lg"
                                title="Đặt làm mặc định"
                              >
                                <Check size={18} />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
