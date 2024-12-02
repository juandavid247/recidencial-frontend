import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import {
  Dialog,
  DialogTitle,
  DialogPanel,
  DialogBackdrop,
} from "@headlessui/react"; // Asegúrate de importar estos componentes si los usas
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline"; // Asegúrate de importar este icono si lo usas
import PropTypes from "prop-types";
const VehiclesTable = ({ searchQuery, darkMode = false }) => {
  const [vehicles, setVehicles] = useState([]);
  const [editVehicle, setEditVehicle] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [actionType, setActionType] = useState(null);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:3333/api/v1/vehicles");
      setVehicles(response.data.data);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    }
  };

  const handleEdit = (vehicle) => {
    setEditVehicle(vehicle);
    setIsEditModalOpen(true);
  };

  const handleSave = async (id, updatedVehicle) => {
    try {
      await axios.put(
        `http://127.0.0.1:3333/api/v1/vehicles/${id}`,
        updatedVehicle
      );
      setEditVehicle(null);
      setIsEditModalOpen(false);
      fetchVehicles();
    } catch (error) {
      console.error("Error updating vehicle:", error);
    }
  };

  const handleAction = (vehicle, action) => {
    setSelectedVehicle(vehicle);
    setActionType(action);
    setIsConfirmModalOpen(true);
  };

  const confirmAction = async () => {
    try {
      if (actionType === "enable") {
        await axios.patch(
          `http://127.0.0.1:3333/api/v1/vehicles/${selectedVehicle.vehicle_id}`,
          { estado: true }
        );
      } else if (actionType === "disable") {
        await axios.patch(
          `http://127.0.0.1:3333/api/v1/vehicles/${selectedVehicle.vehicle_id}`,
          { estado: false }
        );
      }
      fetchVehicles();
      setIsConfirmModalOpen(false);
      setSelectedVehicle(null);
      setActionType(null);
    } catch (error) {
      console.error("Error toggling vehicle status:", error);
    }
  };

  const filteredVehicles = vehicles.filter(
    (vehicle) =>
      vehicle.license_plate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.color.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.apartment_number.toString().includes(searchQuery) ||
      vehicle.space_number.toString().includes(searchQuery)
  );

  return (
    <div
      className={`rounded-md ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-800"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1
              className={`text-base font-semibold leading-6 ${
                darkMode ? "text-gray-100" : "text-gray-800"
              }`}
            >
              Vehicles
            </h1>
            <p
              className={`mt-2 text-sm ${
                darkMode ? "text-gray-400" : "text-gray-700"
              }`}
            >
              A list of all the vehicles in your account including their license
              plate, model, color, owner, and apartment number.
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              type="button"
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add Vehicle
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
                  Placa
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
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold sm:table-cell"
                >
                  Modelo
                </th>
                <th
                  scope="col"
                  className={`px-3 py-3.5 text-left text-sm font-semibold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Color
                </th>
                <th
                  scope="col"
                  className={`hidden px-3 py-3.5 text-left text-sm font-semibold md:table-cell ${
                    darkMode ? "text-gay-700" : "text-gray-900"
                  }`}
                >
                  Propietario
                </th>
                <th
                  scope="col"
                  className={`px-3 py-3.5 text-left text-sm font-semibold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Apto
                </th>
                <th scope="col" className="relative py-3.5 pl-3">
                  Sección
                </th>
                <th scope="col" className="relative py-3.5 pl-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody
              className={`${
                darkMode
                  ? "bg-gray-900 divide-gray-700"
                  : "bg-white divide-gray-200"
              }`}
            >
              {filteredVehicles.map((vehicle) => (
                <tr key={vehicle.vehicle_id}>
                  <td className="relative py-4 pr-3 text-sm font-medium">
                    {vehicle.license_plate}
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
                  <td className="hidden px-3 py-4 text-sm sm:table-cell">

                    {vehicle.model}
                  </td>
                  <td
                    className={`px-3 py-4 text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {vehicle.color}
                  </td>
                  <td
                    className={`hidden px-3 py-4 text-sm md:table-cell ${
                      darkMode ? "text-white" : "text-gray-500"
                    }`}
                  >
                    {`${vehicle.first_name} ${vehicle.last_name}`}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {vehicle.apartment_number}
                  </td>
                  <td
                    className="relative py-4 pl-3 text-center text-sm font-medium sm:table-cell"
                  >
                    {vehicle.space_number}
                  </td>
                  <td className="relative py-4 pl-3 text-center text-sm font-medium">
                    <button
                      onClick={() => handleEdit(vehicle)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() =>
                        handleAction(
                          vehicle,
                          vehicle.estado ? "disable" : "enable"
                        )
                      }
                      className="text-red-600 hover:text-red-900"
                    >
                      {vehicle.estado ? "Disable" : "Enable"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {editVehicle && (
        <EditVehicleModal
          isOpen={isEditModalOpen}
          vehicle={editVehicle}
          onSave={handleSave}
          onCancel={() => setIsEditModalOpen(false)}
          darkMode={darkMode}
        />
      )}
      {selectedVehicle && (
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

const EditVehicleModal = ({ isOpen, vehicle, onSave, onCancel }) => {
  const [formData, setFormData] = useState({ ...vehicle });

  useEffect(() => {
    setFormData({ ...vehicle });
  }, [vehicle]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(vehicle.vehicle_id, formData);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onCancel}
      contentLabel="Edit Vehicle"
      ariaHideApp={false}
      className="fixed inset-0 flex items-center justify-center p-4"
      overlayClassName="fixed inset-0 bg-gray-200 bg-opacity-75"
    >
      <div className="bg-white rounded-lg shadow-xl overflow-hidden transform transition-all max-w-lg w-full p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Edit Vehicle
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              License Plate
            </label>
            <input
              type="text"
              name="license_plate"
              value={formData.license_plate}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Model
            </label>
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Color
            </label>
            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Resident ID
            </label>
            <input
              type="text"
              name="resident_id"
              value={formData.resident_id}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Apartment Number
            </label>
            <input
              type="number"
              name="apartment_number"
              value={formData.apartment_number}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Space Number
            </label>
            <input
              type="number"
              name="space_number"
              value={formData.space_number}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onCancel}
              className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

const ConfirmActionModal = ({ isOpen, actionType, onConfirm, onCancel }) => {
  const actionText = actionType === "enable" ? "activate" : "deactivate";

  return (
    <Dialog open={isOpen} onClose={onCancel} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-200 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-sm data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="flex items-start">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <ExclamationTriangleIcon
                    aria-hidden="true"
                    className="h-6 w-6 text-red-600"
                  />
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="text-base font-semibold leading-6 text-gray-900"
                  >
                    Confirm {actionType === "enable" ? "Enable" : "Disable"}
                  </DialogTitle>
                  <p className="text-sm text-gray-500">
                    Are you sure you want to {actionText} this vehicle?
                  </p>
                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={onCancel}
                      className="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={onConfirm}
                      className="inline-flex justify-center rounded-md border border-transparent px-3 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      {actionText.charAt(0).toUpperCase() + actionText.slice(1)}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

VehiclesTable.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  darkMode: PropTypes.bool,
};

EditVehicleModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  vehicle: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

ConfirmActionModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  actionType: PropTypes.oneOf(["enable", "disable"]),
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default VehiclesTable;
