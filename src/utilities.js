const getShipLength = (shipName) => {
  let shipLength;
  switch (shipName) {
    case 'patrol boat':
      shipLength = 2;
      break;
    case 'destroyer':
    case 'submarine':
      shipLength = 3;
      break;
    case 'battleship':
      shipLength = 4;
      break;
    case 'carrier':
      shipLength = 5;
      break;
  }
  return shipLength;
};

export default getShipLength;