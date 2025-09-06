import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";

const NoteCard = ({ note, setNotes }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id));
      toast.success("Note deleted successfully");
    } catch (error) {
      console.log("Error in handleDelete", error);
      toast.error("Failed to delete note");
    }
  };

  return (
    <Link
      to={`/note/${note._id}`}
      className="block bg-white rounded-lg shadow-md hover:shadow-lg border-t-4 border-green-400 transition-all duration-200"
    >
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{note.title}</h3>
        <p className="text-gray-700 line-clamp-3">{note.content}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-gray-400">
            {formatDate(new Date(note.createdAt))}
          </span>
          <div className="flex items-center gap-1">
            <PenSquareIcon className="w-4 h-4 text-blue-500" />
            <button
              className="p-1 ml-1 rounded-full hover:bg-gray-100 text-red-600 transition"
              onClick={(e) => handleDelete(e, note._id)}
            >
              <Trash2Icon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
