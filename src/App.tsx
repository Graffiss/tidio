import { useState } from "react";
import useFetchAPI from "./hooks/use-fetch-api";
import PersonInfo, { PersonInfoType } from "./PersonInfo";

function App() {
  const [selected, setSelected] = useState<PersonInfoType[]>([]);
  const { data, setData, loading, error, loadMoreData } = useFetchAPI();

  const togglePersonCard = (personInfo: PersonInfoType) => {
    const alreadySelected = selected.find(
      (person) => person.id === personInfo.id
    );
    if (alreadySelected) {
      setSelected((selected) =>
        selected.filter((person) => person.id !== personInfo.id)
      );
      setData([...data, personInfo]);
    } else {
      setSelected([...selected, personInfo]);
      setData((data) => data.filter((item) => item !== personInfo));
    }
  };

  //  TODO fetch contacts using apiData function, handle loading and error states
  return (
    <div className="App">
      <div className="selected">Selected contacts: {selected.length}</div>
      <div className="list">
        {selected.length > 0 &&
          selected.map((personInfo) => (
            <PersonInfo
              key={personInfo.id}
              data={personInfo}
              onClick={() => togglePersonCard(personInfo)}
              className="highlight"
            />
          ))}
        {data.length > 0 &&
          data.map((personInfo) => (
            <PersonInfo
              key={personInfo.id}
              data={personInfo}
              onClick={() => togglePersonCard(personInfo)}
            />
          ))}
      </div>
      {error && (
        <>
          <div className="error">{error}</div>
          <button onClick={loadMoreData}>
            {loading ? "Retrying..." : "Try again"}
          </button>
        </>
      )}
      {loading && <p>Loading data...</p>}
      {!error && !loading && <button onClick={loadMoreData}>Load more</button>}
    </div>
  );
}

export default App;
