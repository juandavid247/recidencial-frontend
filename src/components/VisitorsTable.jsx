import { useState, useEffect } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import PropTypes from "prop-types";

export default function VisitorsTable() {
  const [people, setPeople] = useState([]);
  const [editPerson, setEditPerson] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);

  const handleEdit = (person) => {
    setEditPerson(person);
    setIsEditModalOpen(true);
  };

  const handleSave = (updatedPerson) => {
    setPeople((prev) =>
      prev.map((person) =>
        person.email === updatedPerson.email ? updatedPerson : person
      )
    );
    setEditPerson(null);
    setIsEditModalOpen(false);
  };

  const handleDelete = (person) => {
    setSelectedPerson(person);
    setIsConfirmModalOpen(true);
  };

  const confirmDelete = () => {
    setPeople((prev) => prev.filter((person) => person.email !== selectedPerson.email));
    setIsConfirmModalOpen(false);
    setSelectedPerson(null);
  };

  return (
    <div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">Users</h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the visitors in your account.
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              type="button"
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add visitors
            </button>
          </div>
        </div>
      </div>
      <div className="mt-8 flow-root overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <table className="w-full text-left">
            <thead className="bg-white">
              <tr>
                <th scope="col" className="relative isolate py-3.5 pr-3 text-left text-sm font-semibold text-gray-900">Name</th>
                <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell">Title</th>
                <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 md:table-cell">Email</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Role</th>
                <th scope="col" className="relative py-3.5 pl-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {people.map((person) => (
                <tr key={person.email}>
                  <td className="relative py-4 pr-3 text-sm font-medium text-gray-900">{person.name}</td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">{person.title}</td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 md:table-cell">{person.email}</td>
                  <td className="px-3 py-4 text-sm text-gray-500">{person.role}</td>
                  <td className="relative py-4 pl-3 text-right text-sm font-medium">
                    <button
                      onClick={() => handleEdit(person)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(person)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {editPerson && (
        <EditPersonModal
          isOpen={isEditModalOpen}
          person={editPerson}
          onSave={handleSave}
          onCancel={() => setIsEditModalOpen(false)}
        />
      )}
      {selectedPerson && (
        <ConfirmActionModal
          isOpen={isConfirmModalOpen}
          onConfirm={confirmDelete}
          onCancel={() => setIsConfirmModalOpen(false)}
        />
      )}
    </div>
  );
}

const EditPersonModal = ({ isOpen, person, onSave, onCancel }) => {
  const [formData, setFormData] = useState({ ...person });

  useEffect(() => {
    setFormData({ ...person });
  }, [person]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={isOpen} onClose={onCancel} className="relative z-10">
      <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      <div className="fixed inset-0 z-10 flex items-center justify-center">
        <DialogPanel className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
          <DialogTitle>Edit Visitor</DialogTitle>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
            <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" />
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
            <input type="text" name="role" value={formData.role} onChange={handleChange} placeholder="Role" />
            <div className="flex justify-end space-x-2">
              <button type="button" onClick={onCancel}>Cancel</button>
              <button type="submit" className="bg-indigo-600 text-white px-3 py-2 rounded">Save</button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

const ConfirmActionModal = ({ isOpen, onConfirm, onCancel }) => (
  <Dialog open={isOpen} onClose={onCancel} className="relative z-10">
    <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
    <div className="fixed inset-0 z-10 flex items-center justify-center">
      <DialogPanel className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <DialogTitle>Delete Visitor</DialogTitle>
        <p>Are you sure you want to delete this visitor?</p>
        <div className="mt-4 flex justify-end space-x-2">
          <button type="button" onClick={onCancel}>Cancel</button>
          <button type="button" onClick={onConfirm} className="bg-red-600 text-white px-3 py-2 rounded">Delete</button>
        </div>
      </DialogPanel>
    </div>
  </Dialog>
);

EditPersonModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  person: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

ConfirmActionModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
