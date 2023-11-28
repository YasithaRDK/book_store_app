import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useSnackbar } from "notistack";

const EditBooks = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    publishedYear: "",
  });

  const { title, author, publishedYear } = formData;

  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/api/books/${id}`)
      .then((response) => {
        setFormData({
          title: response.data.title,
          author: response.data.author,
          publishedYear: response.data.publishedYear,
        });
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert("An error happend. Please check console");
        console.log(error);
      });
  }, [id]);

  const onChange = (e) => {
    setFormData((preState) => ({
      ...preState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleEditBook = (e) => {
    e.preventDefault();
    if (!title || !author || !publishedYear) {
      enqueueSnackbar("Error", { variant: "error" });
    } else {
      const data = { title, author, publishedYear };
      setLoading(true);
      axios.put(`http://localhost:5000/api/books/${id}`, data).then(() => {
        setLoading(false);
        enqueueSnackbar("Book Updated successfully", { variant: "success" });
        navigate("/");
      });
    }
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Update Book</h1>
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
          <button className="p-2 bg-sky-300 m-8" onClick={handleEditBook}>
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default EditBooks;
