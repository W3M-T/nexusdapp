import GeneralAction from "../GeneralAction/GeneralAction";

const SendAirdrop = () => {
  const handleSubmit = (amount, token) => {
    console.log("amount", amount);
    console.log("token", token);
  };
  return <GeneralAction onSubmit={handleSubmit} actionText="Send Airdrop" />;
};

export default SendAirdrop;
