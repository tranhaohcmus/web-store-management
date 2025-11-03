import { useEffect, useState } from "react";
import adminAPI from "../../services/adminService";

function TestProductTypes() {
  const [productTypes, setProductTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching product types...");
        const response = await adminAPI.getProductTypes();
        console.log("Full response:", response);

        if (response.success) {
          setProductTypes(response.data.productTypes);
          console.log("Product types:", response.data.productTypes);
        } else {
          setError("API returned unsuccessful response");
        }
      } catch (err) {
        console.error("Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Product Types Test</h1>

      <div className="space-y-4">
        {productTypes.map((type) => (
          <div key={type.id} className="border p-4 rounded">
            <h2 className="text-xl font-semibold">
              {type.name} ({type.code})
            </h2>

            {type.productTypeAttributes &&
            type.productTypeAttributes.length > 0 ? (
              <div className="mt-2">
                <p className="font-medium">Attributes:</p>
                <ul className="list-disc ml-6">
                  {type.productTypeAttributes.map((pta) => (
                    <li key={pta.attribute_id}>
                      {pta.attribute.name}
                      {pta.is_required && (
                        <span className="text-red-500">*</span>
                      )}
                      <ul className="list-circle ml-4">
                        {pta.attribute.values?.map((val) => (
                          <li key={val.id}>{val.value}</li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-gray-500 mt-2">No attributes</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TestProductTypes;
