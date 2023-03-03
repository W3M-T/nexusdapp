/* eslint-disable react/display-name */

const withElronDapp = (Component) => (props) => {
  return (
    <>
      <Component {...props} />
    </>
  );
};

export default withElronDapp;
