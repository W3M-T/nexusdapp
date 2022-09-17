import GeneralAction from "../GeneralAction/GeneralAction";

const SetOneTimeFee = () => {
  const handleSetFee = (amount, token) => {
    console.log("amount", amount);
    console.log("token", token);
  };
  return (
    <GeneralAction onSubmit={handleSetFee} actionText="Set One Time Fee" />
  );
};

export default SetOneTimeFee;
