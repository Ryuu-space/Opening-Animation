const Curtains = ({ isOpening }) => {
  return (
    <div
      className={`curtains ${
        isOpening ? 'curtains--opening' : ''
      }`}
      aria-hidden="true"
    >
      <div className="curtain curtain--left">
        <div className="curtain__folds" />
        <div className="curtain__edge" />
        <div className="curtain__tie" />
      </div>

      <div className="curtain curtain--right">
        <div className="curtain__folds" />
        <div className="curtain__edge" />
        <div className="curtain__tie" />
      </div>
    </div>
  );
};

export default Curtains;