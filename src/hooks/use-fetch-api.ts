import { useState } from "react";
import apiData from "src/api";
import { PersonInfoType } from "src/PersonInfo";

const useFetchAPI = () => {
  const [data, setData] = useState<PersonInfoType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async () => {
    setLoading(true);
    apiData()
      .then((response) => {
        setData(response);
      })
      .catch((error: Error) => {
        setError(error.message);
      })
      .finally(() => setLoading(false));
  };

  const loadMoreData = () => {
    setLoading(true);
    apiData()
      .then((response) => {
        setError("");
        setData((newData) => newData.concat(response));
      })
      .catch((error: Error) => {
        setError(error.message);
      })
      .finally(() => setLoading(false));
  };

  return { data, setData, loading, error, fetchData, loadMoreData };
};

export default useFetchAPI;
