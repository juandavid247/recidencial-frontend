import { useState, useEffect } from "react";
import axios from "axios";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import PropTypes from "prop-types";

const ApartmentTable = ({ searchQuery, darkMode = false }) => {
  const [apartments, setApartments] = useState([]);
  const [editApartment, setEditApartment] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedApartment, setSelectedApartment] = useState(null);
  const [actionType, setActionType] = useState(null);

  useEffect(() => {
    fetchApartments();
  }, []);

  const fetchApartments = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:3333/api/v1/apartments"
      );
      const cleanData = response.data.data.map((apartment) => ({
        ...apartment,
        apartment_number: apartment.apartment_number || "",
        section: apartment.section || "",
        first_name: apartment.first_name || "",
        last_name: apartment.last_name || "",
        phone: apartment.phone || "",
        email: apartment.email || "",
      }));
      setApartments(cleanData);
    } catch (error) {
      console.error("Error fetching apartments:", error);
    }
  };
  

  const handleEdit = (apartment) => {
    setEditApartment(apartment);
    setIsEditModalOpen(true);
  };

  const handleSave = async (id, updatedApartment) => {
    try {
      await axios.put(
        `http://127.0.0.1:3333/api/v1/apartments/${id}`,
        updatedApartment
      );
      setEditApartment(null);
      setIsEditModalOpen(false);
      fetchApartments();
    } catch (error) {
      console.error("Error updating apartment:", error);
    }
  };

  const handleAction = (apartment, action) => {
    setSelectedApartment(apartment);
    setActionType(action);
    setIsConfirmModalOpen(true);
  };

  const confirmAction = async () => {
    try {
      if (actionType === "enable") {
        await axios.patch(
          `http://127.0.0.1:3333/api/v1/apartments/${selectedApartment.apartment_id}`,
          { estado: true }
        );
      } else if (actionType === "disable") {
        await axios.patch(
          `http://127.0.0.1:3333/api/v1/apartments/${selectedApartment.apartment_id}`,
          { estado: false }
        );
      }
      fetchApartments();
      setIsConfirmModalOpen(false);
      setSelectedApartment(null);
      setActionType(null);
    } catch (error) {
      console.error("Error toggling apartment status:", error);
    }
  };


  const filteredApartments = apartments.filter((apartment) =>
    (apartment.apartment_number?.toLowerCase() || "").includes(
      searchQuery.toLowerCase()
    ) ||
    (apartment.section?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
    (apartment.first_name?.toLowerCase() || "").includes(
      searchQuery.toLowerCase()
    ) ||
    (apartment.last_name?.toLowerCase() || "").includes(
      searchQuery.toLowerCase()
    ) ||
    (apartment.phone?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
    (apartment.email?.toLowerCase() || "").includes(searchQuery.toLowerCase())
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
              Apartaments
            </h1>
            <p
              className={`mt-2 text-sm ${
                darkMode ? "text-gray-400" : "text-gray-700"
              }`}
            >
              A list of all the users in your account including their name,
              title, email and role.
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              type="button"
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-gray-100 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add user
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
                  className="relative isolate py-3.5 pr-3 text-left text-sm font-semibold"
                >
                  Apartment
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
                  Floor
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold sm:table-cell"
                >
                  Section
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold"
                >
                  Resident Name
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold"
                >
                  Phone
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold md:table-cell"
                >
                  Email
                </th>
                <th scope="col" className="relative py-3.5 pl-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody
              className={`${
                darkMode
                  ? "bg-gray-900 divide-gray-700 text-gray-100"
                  : "bg-white divide-gray-200 text-gray-800"
              }`}
            >
              {filteredApartments.map((apartment) => (
                <tr key={apartment.apartment_id}>
                  <td className="relative py-4 pr-3 text-sm font-medium">
                    {apartment.apartment_number}
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
                    {apartment.floor}
                  </td>
                  <td className="hidden px-3 py-4 text-sm sm:table-cell">
                    {apartment.section}
                  </td>
                  <td className="px-3 py-4 text-sm">
                    {`${apartment.first_name} ${apartment.last_name}`}
                  </td>
                  <td
                    className={`px-3 py-4 text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {apartment.phone}
                  </td>
                  <td
                    className={`hidden px-3 py-4 text-sm md:table-cell ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {" "}
                    {apartment.email}
                  </td>
                  <td className="relative py-4 pl-3 text-center text-sm font-medium">
                    <button
                      onClick={() => handleEdit(apartment)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() =>
                        handleAction(
                          apartment,
                          apartment.estado ? "disable" : "enable"
                        )
                      }
                      className="text-red-600 hover:text-red-900"
                    >
                      {apartment.estado ? "Disable" : "Enable"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {editApartment && (
        <EditApartmentModal
          isOpen={isEditModalOpen}
          apartment={editApartment}
          onSave={handleSave}
          onCancel={() => setIsEditModalOpen(false)}
          darkMode={darkMode}
        />
      )}
      {selectedApartment && (
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

const EditApartmentModal = ({
  isOpen,
  apartment,
  onSave,
  onCancel,
  darkMode,
}) => {
  const [formData, setFormData] = useState({ ...apartment });

  useEffect(() => {
    setFormData({ ...apartment });
  }, [apartment]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(apartment.apartment_id, formData);
  };

  return (
    <Dialog open={isOpen} onClose={onCancel} className="relative z-10">
      <DialogBackdrop
        transition
        className={`fixed inset-0 ${
          darkMode ? "bg-gray-900 bg-opacity-75" : "bg-gray-100 bg-opacity-75"
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
            <div className="px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                  <DialogTitle
                    as="h3"
                    className={`text-base font-semibold leading-6 ${
                      darkMode ? "text-gray-100" : "text-gray-800"
                    }`}
                  >
                    Edit Apartment
                  </DialogTitle>
                  <form className="space-y-6" onSubmit={handleSubmit}>
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
                        name="apartment_number"
                        id="apartment_number"
                        value={formData.apartment_number}
                        onChange={handleChange}
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm ${
                          darkMode ? "bg-gray-800 text-gray-100" : "bg-white"
                        }`}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="floor"
                        className={`block text-sm font-medium ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Floor
                      </label>
                      <input
                        type="text"
                        name="floor"
                        id="floor"
                        value={formData.floor}
                        onChange={handleChange}
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm ${
                          darkMode ? "bg-gray-800 text-gray-100" : "bg-white"
                        }`}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="section"
                        className={`block text-sm font-medium ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Section
                      </label>
                      <input
                        type="text"
                        name="section"
                        id="section"
                        value={formData.section}
                        onChange={handleChange}
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm ${
                          darkMode ? "bg-gray-800 text-gray-100" : "bg-white"
                        }`}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="first_name"
                        className={`block text-sm font-medium ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Resident First Name
                      </label>
                      <input
                        type="text"
                        name="first_name"
                        id="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm ${
                          darkMode ? "bg-gray-800 text-gray-100" : "bg-white"
                        }`}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="last_name"
                        className={`block text-sm font-medium ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Resident Last Name
                      </label>
                      <input
                        type="text"
                        name="last_name"
                        id="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm ${
                          darkMode ? "bg-gray-800 text-gray-100" : "bg-white"
                        }`}
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
                        name="phone"
                        id="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm ${
                          darkMode ? "bg-gray-800 text-gray-100" : "bg-white"
                        }`}
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
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm ${
                          darkMode ? "bg-gray-800 text-gray-100" : "bg-white"
                        }`}
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
                        className="mt-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-gray-100 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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

const ConfirmActionModal = ({
  isOpen,
  actionType,
  onConfirm,
  onCancel,
  darkMode,
}) => {
  return (
<Dialog open={isOpen} onClose={onCancel} className="relative z-10">
  <DialogBackdrop
    transition
    className={`fixed inset-0 ${
      darkMode ? "bg-gray-900 bg-opacity-75" : "bg-gray-100 bg-opacity-75"
    } transition-opacity`}
  />
  <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
      <DialogPanel
        transition
        className={`relative transform overflow-hidden rounded-lg ${
          darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-800"
        } shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg`}
      >
        <div className={`${darkMode ? "bg-gray-700" : "bg-white"} px-4 pb-4 pt-5 sm:p-6 sm:pb-4`}>
          <div className="sm:flex sm:items-start">
            <div className={`mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${darkMode ? "bg-red-900" : "bg-red-100"} sm:mx-0 sm:h-10 sm:w-10`}>
              <ExclamationTriangleIcon
                className="h-6 w-6 text-red-600"
                aria-hidden="true"
              />
            </div>
            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
              <DialogTitle
                as="h3"
                className={`text-base font-semibold leading-6 ${
                  darkMode ? "text-gray-100" : "text-gray-800"
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
        <div className={`${
          darkMode ? "bg-gray-800" : "bg-gray-50"
        } px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6`}>
          <button
            type="button"
            className="inline-flex w-full justify-center rounded-md bg-red-600 px-4 py-2 text-base font-medium text-gray-100 shadow-sm hover:bg-red-700 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={onConfirm}
          >
            {actionType === "enable" ? "Enable" : "Disable"}
          </button>
          <button
            type="button"
            className={`mt-3 inline-flex w-full justify-center rounded-md border ${
              darkMode ? "border-gray-600 bg-gray-900 text-gray-100 hover:bg-gray-700" : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
            } px-4 py-2 text-base font-medium shadow-sm sm:mt-0 sm:w-auto sm:text-sm`}
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
};

ApartmentTable.propTypes = {
  searchQuery: PropTypes.string,
  darkMode: PropTypes.bool,
};

ConfirmActionModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  actionType: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  darkMode: PropTypes.bool,
};

EditApartmentModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  apartment: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  darkMode: PropTypes.bool,
};

export default ApartmentTable;
