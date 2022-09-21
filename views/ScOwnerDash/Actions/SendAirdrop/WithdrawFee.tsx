import GeneralAction from "../GeneralAction/GeneralAction";

const SendAirdrop = () => {
  const handleSubmit = (values) => {
    console.log("values", values);
  };
  return <GeneralAction onSubmit={handleSubmit} actionText="Send Airdrop" />;
};

export default SendAirdrop;
