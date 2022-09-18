import GeneralAction from "../GeneralAction/GeneralAction";

const WithdrawFee = () => {
  const handleSubmit = (amount, token) => {
    console.log("");
  };
  return <GeneralAction onSubmit={handleSubmit} actionText="Withdraw fee" />;
};

export default WithdrawFee;
