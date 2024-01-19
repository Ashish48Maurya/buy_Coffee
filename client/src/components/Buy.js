import { ethers } from "ethers";
import { useState } from "react";
import { toast } from 'react-toastify';

const Buy = ({ state }) => {
  const [loading, setLoading] = useState(false);
  const notifyA = (msg) => toast.success(msg);
  const [name, setName] = useState("");
  const [amt, setAmt] = useState("");
  const [msg, setMsg] = useState("");

  const buyChai = async (event) => {
    event.preventDefault();
    try {
      const { contract } = state;
      const amount = { value: ethers.utils.parseEther(amt) };

      const transaction = await contract.buyChai(name, msg, amount);

      setLoading(true);

      await transaction.wait();

      setName("");
      setAmt("");
      setMsg("");

      notifyA("Thank you For Donating Us");
    } catch (err) {
      notifyA("err");
    } finally {
      setLoading(false);
    }
  };

  return (

    <>
      {loading === true ? <> <div className="text-center">
        <div className="text-center">
          Transaction Running...
        </div>
      </div></> : ""}

      <div className="container" >

        <div className="col-12 col-lg-8 col-md-6 col-sm-10 mx-auto">
          <form onSubmit={buyChai}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => { setName(e.target.value) }}
                placeholder="Enter Your Name"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Amount</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={amt}
                onChange={(e) => { setAmt(e.target.value) }}
                placeholder="Enter ETH Amount"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Message</label>
              <input
                type="text"
                className="form-control"
                id="message"
                value={msg}
                onChange={(e) => { setMsg(e.target.value) }}
                placeholder="Enter Your Message"
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!state.contract || !name || !amt}
            >
              Pay
            </button>
          </form>

        </div>
      </div>
      <style>{`
      .container input{
        font-weight: bold;
        color: green;
        border: 2px solid orange
      }
      
      `}</style>
    </>
  );
};
export default Buy;
