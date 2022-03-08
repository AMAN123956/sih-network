import React, { useContext, useEffect, useState } from "react";
import { TransactionContext } from "../../context/TransactionContext";
import styles from "./styles.module.css";
import { TeamCard } from "../TeamCard";
// import { button } from "react-bootstrap";
import FundingModal from "./FundingModal";
import { FundRaiseCard } from "./FundRaiseCard";
import { GetStartup, PostFundRaise } from "../../services/FundServices";
import { useParams } from "react-router-dom";
const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
  />
);

export const StartupProfile = () => {
  const {
    currentAccount,
    connectWallet,
    handleChange,
    sendTransaction,
    formData,
    isLoading,
  } = useContext(TransactionContext);
  let companyId = "62250862f714a055d865f59b";
  const [show, setShow] = useState(false);
  const [startup, setStartup] = useState(null);
  const { id } = useParams();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    console.log(id);
    GetStartup(id).then((res) => setStartup(res.data.data));
  }, []);
  const handleSubmit = (e) => {
    const { addressTo, amount, keyword, message } = formData;

    e.preventDefault();

    if (!addressTo || !amount || !keyword || !message) return;

    sendTransaction();
  };

  const handleFundRaise = (e, data) => {
    e.preventDefault();
    data.companyWallet = currentAccount;
    PostFundRaise(data, id).then((res) => setStartup(res.data));
  };
  console.log(startup);
  return (
    <>
      {startup === null ? (
        <div className={styles.container1}>
          <div className={styles.header}></div>
          <h1>Loading...</h1>
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.header}></div>
          <div className={styles.container1}>
            {/* {!currentAccount && (
        <button type="button" onClick={connectWallet}>
          <p>Connect Wallet</p>
        </button>
      )}
      <div>
        <Input
          placeholder="Address To"
          name="addressTo"
          type="text"
          handleChange={handleChange}
        />
        <Input
          placeholder="Amount (ETH)"
          name="amount"
          type="number"
          handleChange={handleChange}
        />
        <Input
          placeholder="Keyword (Gif)"
          name="keyword"
          type="text"
          handleChange={handleChange}
        />
        <Input
          placeholder="Enter Message"
          name="message"
          type="text"
          handleChange={handleChange}
        />

        <div />

        {isLoading ? (
          <h2>Loading</h2>
        ) : (
          <button type="button" onClick={handleSubmit}>
            Send now
          </button>
        )}
      </div> */}
            <FundingModal
              show={show}
              setShow={setShow}
              handleClose={handleClose}
              handleFundRaise={handleFundRaise}
              isLoading={false}
            />
            <div className={styles.startupInfo}>
              <img
                className={styles.Companylogo}
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHcAAAB3CAMAAAAO5y+4AAAAdVBMVEXiN0T////jOkfiNULhLTzhJTXiMT/hKzrhKDjgGi3obXTgHjD75+j++/vunqLjQk3309X87e7nZm7gEij64uPfAB7skJXrhIrkUFr98vP0wcT1x8n2ztDvo6fytLf42tvmW2Tpdn3kSVTtl5vxrLDqfYTeABUSA8UYAAAEgklEQVRoge2beXPzJhCHQcslocO65cg6LFv5/h+xiEW27Mzb9o++SaeFyWQkjn2WH+xCnDGhaRZ8d8lSStIQyHcXCFOSfT/WgDMS/ACWGKrneq7neq7neq7neq7neq7neq7neq7neq7neu7/lfvrjwJ/IxdU3f0S/Nu4rFyGZOTfzRXtRClt5LdwAXZdoUsMlhbi73DhpWCVkIrBoYM1BJJjJQilXKtQoRZEhhJsh+uGpVIIZ0fqUKuDF0dul+2fvGfZEpgBoJeoua2zYlszk5B1BRDgSzusm2MMovTWbVpKPjd9FcfxqTGuQbaMlpvNc2ftdO3Yf9xmDl+5Yk7yPMaS50lknA8+znb4VJj9wYeqyhMaCDlsGk4KVFRZMRmBdaJ7iRfQH483OmrCyJjgS0/EFy5r6bFEQhXnx9tVEmcs4BdXFboBJyXm48i8LJ9e0Eax7mnnvC/LkyvTF27Bi+NrsE+i7F1NurfnAmT14vLnE0QLuSSHtg/+zj2KQ+mFBcfudOShnWfyUGXIdy4AH2icFgGsdkxaHwZ2/MUn6v6d8eSG07a6FdIm7twY6gaNExTPrLBb9DOtUPGKASxRLZmActgq7qq42ZamKAqF4096Rsupet/PknNet86U6Fx3UOjvImJ0+Po5OslC7NMb6QQvy2DJ0MlBaeQuJo6kHZZIEY5HoV/zhkbsORAKR0aMoL60W3CaqXYVOWO4wndOeHabElPOtk/LnFihcahwy0TcxPsv8zWhcrVaJIvYaSbs3dOCBsyG1CjAKtnqHnh72EiUzgLX5FyTnbYyIpuHOm9cVSC2M2kC1c1N9uEn2z9Y3eQgsBsq0Sai0SNtLSZTf5msAQml7TKVRkFUtxN77/EL18VZUqgtI1puLAEyayN2wyIBuEGM3yGGVGgD5bSUYalt3xoya+lDP6IkeOi2svd8RRB7rc3+UhiRRlUZoZufaMBk6Gj3O0Tfym26CTOZiNmmvBYonNm64jFf5wtlb3EEHOtPt2EY7kOJ6s4hx9zT1biqNZG49xojhd2qfb15VJm1dKF2CQWuSVPqGXBVh7K824f3vAE6Pm6NS437+XxHXK8lyl0SjgYKAbgud8tNspA7SUbOXMyPkzkZ0ODo0hx5y5P8JVvRlGfHdHXWAg/UXpMS10mCC5HVBes4nqntM6hnqq9AX452W0X+lFsIdTgmzplwq2piFfeqEdyF0SIeCbi3jEaKR2q/cHFMz2lI3rk9PZbFxE/zGByY6MNJpdLdJJJ6F7wmCtNycq+t8A0j2h1IibnosHlfwXx9Xrd2rri216iwJbqu7Xbqq+U+xfH0UWyntZijrSwmruyDucG4KnPsy+U23tuMB2trijnpgQynaerbYJOVQXOq8urSBIp84ZrbBGMCC2MSbzGck0BpPKrBtm6XB9tlqzS/8cFcWTU3Y4BJU+xFh2tpftwlR2lizlF1vNT+xb0O/qF/wsO7of/m3yme67me67me67me67me67me67me67me67me67me67n/Ru5Pfd/qp75f9kPfp/sD6UdEoetr3ikAAAAASUVORK5CYII="
                alt=""
              />
              <div className={styles.name}>
                <h2>{startup?.name}</h2>
                <h5>{startup?.industry}</h5>
              </div>
              {!currentAccount ? (
                <button className={styles.makePaymentBtn} variant="primary" onClick={connectWallet}>
                  Connect Wallet
                </button>
              ) : (
                ""
              )}
            </div>
            <div className={styles.wrapper}>
              <h2>About Us</h2>
              <div className={styles.wrapperContent}>
                <p>{startup?.about}</p>
              </div>
            </div>
            <div className={styles.wrapper}>
              <h2>Team</h2>
              <div className={styles.team}>
                <div className={styles.teamCard}>
                  {startup?.coFounders?.map((co) => (
                    <TeamCard name={co}/>
                  ))}
                  {startup?.coFounders?.length === 0 ? (
                    <h4>Team Not Added</h4>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            <div className={styles.wrapper}>
              <h2>Fund Raise</h2>
              <div className={styles.wrapperContent}>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Numquam distinctio corporis dolores, accusantium consequatur
                  in consequuntur corrupti iure quasi minus veritatis? Ratione
                  laborum totam, numquam dolore nobis, nulla nemo dolor ad harum
                  suscipit consequuntur in ex, aliquam at incidunt quisquam quam
                  vel velit placeat. Cupiditate numquam, quod corrupti nisi
                  molestiae iure saepe est dolore recusandae nihil, aut
                  repellendus! Dolorum deserunt consequuntur voluptatem rerum
                </p>
              </div>
              {JSON.parse(localStorage.getItem("startupUserInfo"))?.id ===
              startup?.id ? (
                <button
                  variant="primary"
                  onClick={handleShow}
                  style={{ marginTop: "20px" }}
                >
                  Raise Funds
                </button>
              ) : (
                ""
              )}
            </div>
            <div className={styles.wrapper}>
              <h2>Recent Fund raises</h2>
              <div className={styles.fundinglist}>
                {startup?.recentFunding?.map((fund) => (
                  <FundRaiseCard
                    round={fund.round}
                    amount={fund.amount}
                    equity={fund.equity}
                    isActive={true}
                    id={id}
                  />
                ))}
                {startup?.recentFunding?.length === 0 ? (
                  <h4>Company has not raised any funds yet</h4>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
