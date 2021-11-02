const ShipProto =  {
    // marks where the ship has been hit
    hit(number) {
        const shipRepArr = this.shipRep;
        for(let i = 0; i < shipRepArr.length; i++) {
            if (shipRepArr[i] === number) {
                shipRepArr[i] = 'hit';
            }
        }
    },
    isSunk() {
        const shipRepArr = this.shipRep;
        for (let i = 0; i < shipRepArr.length; i++) {
            if (shipRepArr[i] !== 'hit') return false;
        }
        return true;
    }
}

const Ship = (originInt, length) => {
    const shipLength = length;
    const shipRep = [];
    for (let i = 0; i < shipLength; i++) {
        shipRep.push(originInt);
        originInt++;
    }
    return Object.create(ShipProto, {
        shipLength: {value: shipLength},
        shipRep: {value: shipRep}
    });
}

export {Ship};
