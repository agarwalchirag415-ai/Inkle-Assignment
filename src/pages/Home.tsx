import React, { useEffect, useState } from "react";
// @ts-ignore - JavaScript files without type declarations
import api from "../api/c/client";
// @ts-ignore - JSX components without type declarations
import Table from "../components/Table";
// @ts-ignore - JSX components without type declarations  
import EditModal from "../components/EditModal";

// Define types
interface Customer {
  id: string;
  name: string;
  gender: string;
  country: string;
  createdAt: string;
}

const Home: React.FC = () => {
  const [data, setData] = useState<Customer[]>([]);
  const [editing, setEditing] = useState<Customer | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.get("/taxes");
        console.log("API Response:", response.data);
        console.log("First record:", response.data[0]);
        setData(response.data);
        setError(null);
      } catch (err) {
        console.error("API Error:", err);
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSave = (updated: Customer) => {
    setData(prev =>
      prev.map(item => (item.id === updated.id ? updated : item))
    );
  };

  if (loading) {
    return (
      <div style={{ padding: "40px" }}>
        <div>Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "40px" }}>
        <div style={{ color: "red" }}>Error: {error}</div>
        <div>Data length: {data.length}</div>
      </div>
    );
  }

  return (
    <div style={{ 
      padding: "40px", 
      background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      minHeight: "100vh"
    }}>
      <div style={{ 
        marginBottom: "30px",
        background: "white",
        padding: "24px",
        borderRadius: "12px",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        border: "1px solid #e5e7eb"
      }}>
        <h1 style={{
          margin: "0 0 12px 0",
          fontSize: "28px",
          fontWeight: "700",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text"
        }}>
          Tax Records Dashboard
        </h1>
        <div style={{
          color: "#6b7280",
          fontSize: "16px",
          fontWeight: "500"
        }}>
          Total records: <span style={{ 
            color: "#059669", 
            fontWeight: "700",
            background: "#d1fae5",
            padding: "4px 8px",
            borderRadius: "6px"
          }}>{data.length}</span>
        </div>
      </div>
      <Table data={data} onEdit={setEditing} />
      {editing && (
        <EditModal
          isOpen={!!editing}
          onClose={() => setEditing(null)}
          record={editing}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default Home;
