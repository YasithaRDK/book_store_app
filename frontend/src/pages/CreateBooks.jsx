import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useSnackbar } from "notistack";

const CreateBooks = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    publishedYear: "",
  });

  const { title, author, publishedYear } = formData;

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const onChange = (e) => {
    setFormData((preState) => ({
      ...preState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSaveBook = (e) => {
    e.preventDefault();
    if (!title || !author || !publishedYear) {
      enqueueSnackbar("Error", { variant: "error" });
    } else {
      const data = { title, author, publishedYear };
      setLoading(true);
      axios.post("http://localhost:5000/api/books", data).then(() => {
        setLoading(false);
        enqueueSnackbar("Book created successfully", { variant: "success" });
        navigate("/");
      });
    }
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Create Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Title</label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={onChange}
              className="border-2 border-gray-500 px-4 py-2 w-full"
            />
          </div>
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Author</label>
            <input
              type="text"
              name="author"
              value={author}
              onChange={onChange}
              className="border-2 border-gray-500 px-4 py-2 w-full"
            />
          </div>
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Publish Year</label>
            <input
              type="number"
              name="publishedYear"
              value={publishedYear}
              onChange={onChange}
              className="border-2 border-gray-500 px-4 py-2 w-full"
            />
          </div>
          <button className="p-2 bg-sky-300 m-8" onClick={handleSaveBook}>
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateBooks;
