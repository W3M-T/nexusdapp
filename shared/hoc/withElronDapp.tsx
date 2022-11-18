/* eslint-disable react/display-name */

import { chainType, selectedNetwork } from "../../config/network";

import { DappProvider, DappUI } from "@elrondnetwork/dapp-core";
const { TransactionsToastList, SignTransactionsModals, NotificationModal } =
  DappUI;

const withElronDapp = (Component) => (props) => {
  return (
    <DappProvider
      customNetworkConfig={{ ...selectedNetwork }}
      environment={chainType}
    >
      <>
        <TransactionsToastList />
        <NotificationModal />
        <SignTransactionsModals className="custom-class-for-modals" />
        <>
          <Component {...props} />
        </>
      </>
    </DappProvider>
  );
};

export default withElronDapp;
