import { useState } from "react";

function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
        <p className="mb-4 text-lg">{message}</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Yes
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [showDialog, setShowDialog] = useState(false);
  const [answer, setAnswer] = useState(null);

  const handleDelete = () => {
    setShowDialog(true);
  };

  const handleConfirm = () => {
    setAnswer("User chose YES");
    setShowDialog(true);
  };

  const handleCancel = () => {
    setAnswer("User chose NO");
    setShowDialog(false);
  };

  return (
    <div className="p-6">
      <button
        onClick={handleDelete}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Delete Todo
      </button>

      {showDialog && (
        <ConfirmDialog
          message="Are you sure you want to delete this todo?"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}

      {answer && <p className="mt-4">{answer}</p>}
    </div>
  );
}
