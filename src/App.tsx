import { useEffect, useState } from "react";
import useFetchAPI from "./hooks/use-fetch-api";
import PersonInfo, { PersonInfoType } from "./PersonInfo";

function App() {
  const [selected, setSelected] = useState<PersonInfoType[]>([]);

  const { data, setData, loading, error, fetchData, loadMoreData } =
    useFetchAPI();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    loadMoreData();
  }, []);

  const onClick = (personInfo: PersonInfoType) => {
    const alreadySelected = selected.find(
      (person) => person.id === personInfo.id
    );
    if (alreadySelected) {
      setSelected(selected.filter((person) => person.id !== personInfo.id));
      setData([...data, personInfo]);
    } else {
      setSelected([...selected, personInfo]);
      setData(data.filter((item) => item !== personInfo));
    }
  };

  //  TODO fetch contacts using apiData function, handle loading and error states
  return (
    <div className="App">
      <div className="selected">Selected contacts: {selected.length}</div>
      {data.length > 0 && (
        <div className="list">
          {selected.length > 0 &&
            selected.map((personInfo) => (
              <PersonInfo
                key={personInfo.id}
                data={personInfo}
                onClick={() => onClick(personInfo)}
                className="highlight"
              />
            ))}
          {data.map((personInfo) => (
            <PersonInfo
              key={personInfo.id}
              data={personInfo}
              onClick={() => onClick(personInfo)}
            />
          ))}
        </div>
      )}
      {error && (
        <>
          <div className="error">{error}</div>
          <button onClick={loadMoreData}>
            {loading ? "Retrying..." : "Try again"}
          </button>
        </>
      )}
      {loading && <p>Loading data...</p>}
      {!error && !loading && data.length && (
        <button onClick={loadMoreData}>Load more</button>
      )}
    </div>
  );
}

export default App;
