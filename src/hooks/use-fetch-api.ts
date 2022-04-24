import { useEffect, useState } from "react";
import apiData from "src/api";
import { PersonInfoType } from "src/PersonInfo";

const useFetchAPI = () => {
  const [data, setData] = useState<PersonInfoType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = () => {
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

    fetchData();
  }, []);

  const loadMoreData = () => {
    setLoading(true);
    setError("");
    apiData()
      .then((response) => {
        setData((newData) => newData.concat(response));
      })
      .catch((error: Error) => {
        setError(error.message);
      })
      .finally(() => setLoading(false));
  };

  return { data, setData, loading, error, loadMoreData };
};

export default useFetchAPI;
