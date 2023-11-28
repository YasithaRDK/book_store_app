import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useSnackbar } from "notistack";

const DeleteBooks = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const { id } = useParams();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5000/api/books/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book deleted successfully", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl my-4">Delete Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
        <h3 className="text-2xl"></h3>
        <button
          className="p-4 bg-red-600 text-white m-8 w-full"
          onClick={handleDeleteBook}
        >
          Yes, delete it
        </button>
      </div>
    </div>
  );
};

export default DeleteBooks;
