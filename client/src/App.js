import abi from "./contract/chai.json";
import { useState, useEffect, useRef } from "react";
import { ethers } from "ethers";
import Buy from "./components/Buy";
import Memos from "./components/Memos";
import Avatar from '@mui/material/Avatar';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import "./App.css";
function App() {
  const notifyA = (msg) => toast.error(msg);
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [mobileLinkText, setMobileLinkText] = useState("Mobile?")
  const [account, setAccount] = useState();
  const isAndroid = /android/i.test(navigator.userAgent);
  const ref = useRef(null);
  const open = () => {
    ref.current.click();
  }

  const connectWallet = async (e) => {
    e.preventDefault();
    const contractAddress = "0xA2892102b1a91bF5FBE4426175AfDE831B06778E";
    const contractABI = abi.abi;
    try {
      const { ethereum } = window;
      if (ethereum) {
        const account = await ethereum.request({
          method: "eth_requestAccounts",
        });
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });

        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        setAccount(account[0]);
        setState({ provider, signer, contract });
      } else {
        notifyA('Please install and log in to Metamask wallet to initiate the transaction.');
      }
    } catch (error) {
      notifyA(error);
    }
  };

  useEffect(() => {
    if (window.location.href === "https://metamask.app.link/dapp/tech4stack.netlify.app/") {
      setMobileLinkText("Connected");
    }
  }, []);

  return (
    <>
      <button ref={ref} type="button" className="btn btn-primary" style={{ "display": "none" }} data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" style={{ "color": "orangered" }} id="exampleModalLabel">Developers</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="d-flex m-2">
                <div className="first d-flex">
                  <Avatar alt="Remy Sharp" src="/images/Ashish.jpeg" />
                  <span className="ms-2 my-auto">Ashish Maurya</span>
                </div>
                <div className="second ms-auto my-auto">
                  <div>
                    <i className="fab fa-github me-1"></i>
                    <a href="https://github.com/Ashish48Maurya" target="_blank" rel="noopener noreferrer">
                      Github Link
                    </a>
                  </div>
                </div>
              </div>
              <div className="d-flex m-2">
                <div className="first d-flex">
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                  <span className="ms-2 my-auto">Divy Mav</span>
                </div>
                <div className="second ms-auto my-auto">
                  <div>
                    <i className="fab fa-github me-1"></i>
                    <a href="https://github.com/divy-arun-mav" target="_blank" rel="noopener noreferrer">
                      Github Link
                    </a>
                  </div>
                </div>
              </div>
              <div className="d-flex m-2">
                <div className="first d-flex">
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                  <span className="ms-2 my-auto">Vipul Mhatre</span>
                </div>
                <div className="second ms-auto my-auto">
                  <div>
                    <i className="fab fa-github me-1"></i>
                    <a href="https://github.com/Star-Viper" target="_blank" rel="noopener noreferrer">
                      Github Link
                    </a>
                  </div>
                </div>
              </div>
              <div className="d-flex m-2">
                <div className="first d-flex">
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                  <span className="ms-2 my-auto">Kaushal Jha</span>
                </div>
                <div className="second ms-auto my-auto">
                  <div>
                    <i className="fab fa-github me-1"></i>
                    <a href="https://github.com/Kj1710" target="_blank" rel="noopener noreferrer">
                      Github Link
                    </a>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>


      <nav className="navbar navbar-expand-lg bg-body-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" onClick={open} ><span className="text-danger">Tech</span><span>4</span><span className="text-success">Stack</span></Link>

          <div type="button" className="buttons">
            <form className="d-flex ms-auto" role="search">
              {isAndroid ? <><a className="btn btn-outline-primary" href="https://metamask.app.link/dapp/tech4stack.netlify.app/" type="submit">{mobileLinkText}</a></> : ""}
              <button className="btn btn-outline-primary ms-2" onClick={connectWallet} type="submit">{account ? (account.slice(0, 4) + "..." + account.slice(38)) : "Connect"}</button>
            </form>
          </div>

        </div>
      </nav>

      <Buy state={state} />

      <Memos state={state} account={account} />
      <style>{`
       @media (max-width: 330px) {
        .buttons{
          margin-block: 10px;
          margin-inline: auto;
        }
        .navbar-brand {
          margin-inline: auto;
        }
      }

      `}</style>
    </>
  );
}

export default App;
