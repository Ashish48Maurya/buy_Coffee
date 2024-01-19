import { useState, useEffect } from "react";
const Memos = ({ state, account }) => {
  const [memos, setMemos] = useState([]);
  const { contract } = state;
  useEffect(() => {
    const memosMessage = async () => {
      const memos = await contract.getMemos();
      setMemos(memos);
    };
    memosMessage();
  }, [contract,memos]);

  return (

    <>
      <div>
        <h3 className="text-center text-success mt-5">Donors</h3>
        {(memos.length === 0 )? <> <div className="text-center fw-bolder">
          <h2>
            Loading...
          </h2>
        </div></> : <div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Message</th>
                  <th>From</th>
                  <th>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {memos.map(transaction => (
                  <tr key={new Date(transaction.timestamp * 1000)}>
                    <td>{transaction.name}</td>
                    <td>{transaction.message}</td>
                    <td>{transaction.from}</td>
                    <td>{new Date(transaction.timestamp * 1000).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>}
      </div>
      <style>{`

.table-container {
overflow-x: auto;

}

table {
width: 100%;
border-collapse: collapse;
margin-top: 20px;
}



th, td {
padding: 10px;
text-align: center;
border-bottom: 1px solid #ddd;
}
td{
  background-color: aliceblue;
  color: red;
  font-weight: bolder
}

/* Add media queries for responsiveness */
@media (max-width: 600px) {
th, td {
  font-size: 14px;
}
}
`}</style>
    </>
  );
};
export default Memos;
