import React, { useEffect, useState } from "react";
import api from "../api/c/client";
import CountryDropdown from "./CountryDropdown";
import Swal from 'sweetalert2';
import "./Modal.css";

const EditModal = ({ isOpen, onClose, record, onSave }) => {
  const [form, setForm] = useState(record || {});
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setForm(record || {});
  }, [record]);

  useEffect(() => {
    api.get("/countries").then(res => setCountries(res.data));
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    // Basic validation
    if (!form.name || form.name.trim() === '') {
      Swal.fire({
        title: 'Validation Error',
        text: 'Please enter a customer name.',
        icon: 'warning',
        confirmButtonText: 'OK',
        confirmButtonColor: '#f59e0b'
      });
      return;
    }

    try {
      setLoading(true);
      await api.put(`/taxes/${record.id}`, form);
      onSave(form);
      onClose();
      
      // Show success alert
      Swal.fire({
        title: 'Success!',
        text: 'Customer details have been updated successfully.',
        icon: 'success',
        confirmButtonText: 'Great!',
        confirmButtonColor: '#667eea',
        timer: 3000,
        timerProgressBar: true,
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      });
    } catch (error) {
      console.error('Error updating customer:', error);
      
      // Show error alert
      Swal.fire({
        title: 'Error!',
        text: 'Failed to update customer details. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#ef4444'
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h2>✏️ Edit Customer</h2>
        
        <div className="modal-body">
          <div className="form-group">
            <label data-required="true">Name</label>
            <input
              type="text"
              name="name"
              value={form?.name || ""}
              onChange={handleChange}
              placeholder="Enter customer name"
            />
          </div>

          <div className="form-group">
            <label>Country</label>
            <CountryDropdown
              value={form?.country}
              onChange={val => setForm({ ...form, country: val })}
              countries={countries}
            />
          </div>
        </div>

        <div className="modal-actions">
          <button className="btn cancel" onClick={onClose} disabled={loading}>
            Cancel
          </button>
          <button className="btn save" onClick={handleSave} disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
