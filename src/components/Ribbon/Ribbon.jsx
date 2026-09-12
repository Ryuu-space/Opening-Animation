import ribbon from '../../assets/ribbon-with-bow.webp';

const Ribbon = ({ isOpening }) => {
  return (
    <div
      className={`svasti-ribbon ${
        isOpening
          ? 'svasti-ribbon--opening'
          : ''
      }`}
      aria-hidden="true"
    >
      <img
        className="svasti-ribbon__image"
        src={ribbon}
        alt=""
        draggable="false"
      />
    </div>
  );
};

export default Ribbon;