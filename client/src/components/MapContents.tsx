import mapImage from '../assets/map8k.jpg';

const MapContents = () => {
  return (
    <>
      <img
        src={mapImage}
        width={7680}
        height={4320}
        style={{ width: '3840px', height: '2160px', maxWidth: 'none' }}
      />
    </>
  );
};

export default MapContents;
