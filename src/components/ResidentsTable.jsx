import { useState, useEffect } from "react";
import axios from "axios";
import {
  Dialog,
  DialogTitle,
  DialogPanel,
  DialogBackdrop,
} from "@headlessui/react";
import PropTypes from "prop-types";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const ResidentsTable = ({ searchQuery, darkMode = false }) => {
  const [residents, setResidents] = useState([]);
  const [editResident, setEditResident] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedResident, setSelectedResident] = useState(null);
  const [actionType, setActionType] = useState(null);

  useEffect(() => {
    fetchResidents();
  }, []);

  const fetchResidents = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:3333/api/v1/residents"
      );
      setResidents(response.data.data);
    } catch (error) {
      console.error("Error fetching residents:", error);
    }
  };

  const handleEdit = (resident) => {
    setEditResident(resident);
    setIsEditModalOpen(true);
  };

  const handleSave = async (id, updatedResident) => {
    try {
      await axios.put(
        `http://127.0.0.1:3333/api/v1/residents/${id}`,
        updatedResident
      );
      setEditResident(null);
      setIsEditModalOpen(false);
      fetchResidents();
    } catch (error) {
      console.error("Error updating resident:", error);
    }
  };

  const handleAction = (resident, action) => {
    setSelectedResident(resident);
    setActionType(action);
    setIsConfirmModalOpen(true);
  };

  const confirmAction = async () => {
    try {
      if (actionType === "enable") {
        await axios.patch(
          `http://127.0.0.1:3333/api/v1/residents/${selectedResident.resident_id}`,
          { estado: true }
        );
      } else if (actionType === "disable") {
        await axios.patch(
          `http://127.0.0.1:3333/api/v1/residents/${selectedResident.resident_id}`,
          { estado: false }
        );
      }
      fetchResidents();
      setIsConfirmModalOpen(false);
      setSelectedResident(null);
      setActionType(null);
    } catch (error) {
      console.error("Error toggling resident status:", error);
    }
  };

  const filteredResidents = residents.filter(
    (resident) =>
      resident.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resident.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resident.phone.includes(searchQuery) ||
      resident.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resident.apartment_number.toString().includes(searchQuery)
  );

  return (
    <div
      className={`rounded-md ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1
              className={`text-base font-semibold leading-6 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Residentes
            </h1>
            <p
              className={`mt-2 text-sm ${
                darkMode ? "text-gray-400" : "text-gray-700"
              }`}
            >
              Una lista de todos los residentes de su cuenta, incluido su
              nombre, apellidos, telefono, correo electrónico y apartamento.
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              type="button"
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Agregar residente
            </button>
          </div>
        </div>
      </div>
      <div className="mt-8 flow-root overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <table
            className={`w-full text-left ${
              darkMode ? "divide-gray-700" : "divide-gray-200"
            }`}
          >
            <thead
              className={
                darkMode
                  ? "bg-gray-900 text-gray-100 text-center"
                  : "bg-gray-50 text-gray-800 text-center"
              }
            >
              <tr>
                <th
                  scope="col"
                  className={`relative isolate py-3.5 pr-3 text-left text-sm font-semibold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  First Name
                  <div
                    className={`absolute bottom-0 right-full h-px w-screen ${
                      darkMode ? "bg-gray-500" : "bg-gray-300"
                    }`}
                  />
                  <div
                    className={`absolute bottom-0 left-0 h-px w-screen ${
                      darkMode ? "bg-gray-500" : "bg-gray-300"
                    }`}
                  />
                </th>
                <th
                  scope="col"
                  className={`px-3 py-3.5 text-left text-sm font-semibold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Last Name
                </th>
                <th
                  scope="col"
                  className={`px-3 py-3.5 text-left text-sm font-semibold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Phone
                </th>
                <th
                  scope="col"
                  className={`hidden px-3 py-3.5 text-left text-sm font-semibold md:table-cell ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Email
                </th>
                <th
                  scope="col"
                  className={`px-3 py-3.5 text-left text-sm font-semibold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Apartment
                </th>
                <th scope="col" className="relative py-3.5 pl-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody
              className={`${
                darkMode
                  ? "bg-gray-900 divide-gray-700 text-white"
                  : "bg-white divide-gray-200 text-gray-900"
              }`}
            >
              {filteredResidents.map((resident) => (
                <tr key={resident.resident_id}>
                  <td
                    className={`relative py-4 pr-3 text-sm font-medium ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {resident.first_name}
                    <div
                      className={`absolute bottom-0 right-full h-px w-screen ${
                        darkMode ? "bg-gray-800" : "bg-gray-100"
                      }`}
                    />
                    <div
                      className={`absolute bottom-0 left-0 h-px w-screen ${
                        darkMode ? "bg-gray-800" : "bg-gray-100"
                      }`}
                    />
                  </td>
                  <td
                    className={`px-6 py-4  text-sm ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {resident.last_name}
                  </td>
                  <td
                    className={`px-3 py-4 text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {resident.phone}
                  </td>
                  <td
                    className={`hidden px-3 py-4 text-sm md:table-cell ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {resident.email}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {resident.apartment_number}
                  </td>
                  <td className="relative py-4 pl-3 text-center text-sm font-medium">
                    <button
                      onClick={() => handleEdit(resident)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() =>
                        handleAction(
                          resident,
                          resident.estado ? "disable" : "enable"
                        )
                      }
                      className="text-red-600 hover:text-red-900"
                    >
                      {resident.estado ? "Disable" : "Enable"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {editResident && (
        <EditResidentModal
          isOpen={isEditModalOpen}
          resident={editResident}
          onSave={handleSave}
          onCancel={() => setIsEditModalOpen(false)}
          darkMode={darkMode}
        />
      )}
      {selectedResident && (
        <ConfirmActionModal
          isOpen={isConfirmModalOpen}
          actionType={actionType}
          onConfirm={confirmAction}
          onCancel={() => setIsConfirmModalOpen(false)}
          darkMode={darkMode}
        />
      )}
    </div>
  );
};

ResidentsTable.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  darkMode: PropTypes.bool,
};

const EditResidentModal = ({
  isOpen,
  resident,
  onSave,
  onCancel,
  darkMode,
}) => {
  const [formData, setFormData] = useState({ ...resident });

  useEffect(() => {
    setFormData({ ...resident });
  }, [resident]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(resident.resident_id, formData);
  };

  return (
    <Dialog open={isOpen} onClose={onCancel} className="relative z-10">
      <DialogBackdrop
        transition
        className={`fixed inset-0 ${
          darkMode ? "bg-gray-900 bg-opacity-75" : "bg-gray-200 bg-opacity-75"
        } transition-opacity`}
      />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto ">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className={`relative transform overflow-hidden rounded-lg ${
              darkMode ? "bg-slate-800" : "bg-slate-50"
            } text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg`}
          >
            <div className="px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                  <DialogTitle
                    as="h3"
                    className={`text-base font-semibold leading-6 ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Edit Resident
                  </DialogTitle>
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                      <label
                        htmlFor="first_name"
                        className={`block text-sm font-medium ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        className={`mt-1 block w-full rounded-md ${
                          darkMode
                            ? "bg-slate-800 text-gray-300"
                            : "bg-white text-gray-900"
                        } border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="last_name"
                        className={`block text-sm font-medium ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        className={`mt-1 block w-full rounded-md ${
                          darkMode
                            ? "bg-slate-800 text-gray-300"
                            : "bg-white text-gray-900"
                        } border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className={`block text-sm font-medium ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Phone
                      </label>
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`mt-1 block w-full rounded-md ${
                          darkMode
                            ? "bg-slate-800 text-gray-300"
                            : "bg-white text-gray-900"
                        } border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className={`block text-sm font-medium ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`mt-1 block w-full rounded-md ${
                          darkMode
                            ? "bg-slate-800 text-gray-300"
                            : "bg-white text-gray-900"
                        } border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="apartment_number"
                        className={`block text-sm font-medium ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Apartment Number
                      </label>
                      <input
                        type="text"
                        id="apartment_number"
                        name="apartment_number"
                        value={formData.apartment_number}
                        onChange={handleChange}
                        className={`mt-1 block w-full rounded-md ${
                          darkMode
                            ? "bg-slate-800 text-gray-300"
                            : "bg-white text-gray-900"
                        } border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
                        required
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <button
                        type="button"
                        onClick={onCancel}
                        className="mt-3 inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="mt-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

EditResidentModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  resident: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  darkMode: PropTypes.bool,
};

const ConfirmActionModal = ({
  isOpen,
  actionType,
  onConfirm,
  onCancel,
  darkMode,
}) => (
  <Dialog open={isOpen} onClose={onCancel} className="relative z-10">
    <DialogBackdrop
      transition
      className={`fixed inset-0 ${
        darkMode ? "bg-gray-900 bg-opacity-75" : "bg-gray-200 bg-opacity-75"
      } transition-opacity`}
    />
    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <DialogPanel
          transition
          className={`relative transform overflow-hidden rounded-lg ${
            darkMode ? "bg-gray-800" : "bg-white"
          } text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg`}
        >
          <div
            className={`px-4 pb-4 pt-5 sm:p-6 sm:pb-4 ${
              darkMode ? "bg-slate-700" : "bg-white"
            }`}
          >
            <div className="sm:flex sm:items-start">
              <div
                className={`mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${
                  darkMode ? "bg-red-800" : "bg-red-100"
                } sm:mx-0 sm:h-10 sm:w-10`}
              >
                <ExclamationTriangleIcon
                  className={`h-6 w-6 ${
                    darkMode ? "text-red-300" : "text-red-600"
                  }`}
                  aria-hidden="true"
                />
              </div>
              <div
                className={`mt-3 sm:ml-4 sm:mt-0 sm:text-left ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                <DialogTitle
                  as="h3"
                  className={`text-base font-semibold leading-6 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {actionType === "enable"
                    ? "Enable Apartment"
                    : "Disable Apartment"}
                </DialogTitle>
                <div className="mt-2">
                  <p
                    className={`text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {actionType === "enable"
                      ? "Are you sure you want to enable this apartment?"
                      : "Are you sure you want to disable this apartment?"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 ${
              darkMode ? "bg-gray-800" : "bg-gray-50"
            }`}
          >
            <button
              type="button"
              className={`inline-flex w-full justify-center rounded-md px-4 py-2 text-base font-medium shadow-sm sm:ml-3 sm:w-auto sm:text-sm ${
                darkMode
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-red-600 text-white hover:bg-red-700"
              }`}
              onClick={onConfirm}
            >
              {actionType === "enable" ? "Enable" : "Disable"}
            </button>
            <button
              type="button"
              className={`mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 px-4 py-2 text-base font-medium shadow-sm sm:mt-0 sm:w-auto sm:text-sm ${
                darkMode
                  ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </DialogPanel>
      </div>
    </div>
  </Dialog>
);

ConfirmActionModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  actionType: PropTypes.oneOf(["enable", "disable"]).isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  darkMode: PropTypes.bool,
};

export default ResidentsTable;
