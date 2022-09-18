import GeneralAction from "../GeneralAction/GeneralAction";

const SendAirdrop = () => {
  const handleSubmit = (amount, token) => {
    console.log("");
  };
  return <GeneralAction onSubmit={handleSubmit} actionText="Send Airdrop" />;
};

export default SendAirdrop;
