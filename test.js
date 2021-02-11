import { expect } from 'chai';
import 'mocha';

import iocWrapper from './index.js';

const iocWrapped = iocWrapper();

const wheel = (radius, brand) => {
    const data = {
        radius: radius || 5,
        brand: brand || 'Pirelli'
    };

    const getBrand = () => {
        return data.brand;
    }

    const changeWheel = (radius, brand) => {
        data.radius = radius;
        data.brand = brand;
    };

    const getAllData = () => {
        return {
            brand: data.brand,
            radius: data.radius
        };
    }

    return {
        getBrand,
        changeWheel,
        getAllData
    };
};

const updatedWheel = (diameter, brand) => {
    const data = {
        diameter: diameter || 10,
        brand: brand || 'Michelin'
    };

    const changeWheel = (diameter, brand) => {
        data.diameter = diameter;
        data.brand = brand;
    };

    const getAllData = () => {
        return {
            brand: data.brand,
            diameter: data.diameter
        };
    }

    return {
        changeWheel,
        getAllData
    };
};

const engine = (manufacturer, gasType) => {
    const data = {
        manufacturer: manufacturer || 'Honda',
        gasType: gasType || 'unleaded'
    };

    const getForRedBullF1Team = () => {
        return {
            gasType: data.gasType,
            manufacturer: null
        }
    };

    const getAllData = () => {
        return {
            manufacturer: data.brand,
            diameter: data.diameter
        };
    }

    return {
        getForRedBullF1Team,
        getAllData
    };
};

const car = (engine, wheel) => {
    const data = {
        engine: engine,
        wheel: wheel
    };

    const getAllData = () => {
        if (data.engine === undefined || data.wheel === undefined) {
            throw new Error(`Not a car`);
        }

        else {
            return {
                engine: engine.getAllData(),
                wheel: wheel.getAllData(),
            };
        }
    }

    return {
        getAllData
    };
};

describe('iocWrapper basic validation', () => {
    it('should return an objct with property addFactory', () => {
        expect(iocWrapped).property('addFactory');
    });
    it('should return an objct with property addDependency', () => {
        expect(iocWrapped).property('addDependency');
    });
    it('should return an objct with property get', () => {
        expect(iocWrapped).property('get');
    });
});

describe('iocWrapper car dependency inversion example', () => {
    describe('Adding dependencies', () => {
        it('should throw if a dependency hasn\'t been registered yet', () => {
            expect(() => { iocWrapped.get('wheel'); }).to.throw('wheel missing from iocWrapper');
        });
        it('Doesn\'t throw during adding a dependency', () => {
            expect(() => { iocWrapped.addDependency('wheel', wheel); }).to.not.throw();
        });
        it('Doesn\'t throw when getting a dependency', () => {
            expect(() => { iocWrapped.get('wheel'); }).to.not.throw();
        });
    });

    describe('Adding invalid factories', () => {
        it('shouldn\'t throw when adding a factory', () => {
            expect(() => { iocWrapped.addFactory('car', car); }).to.not.throw();
        });

        it('should throw if a factory is missing an injected dependency', () => {
            expect(() => { iocWrapped.get('car', ['wheel', 'engine']) }).to.throw('engine missing from iocWrapper');
        });
    });

    describe('Valid factories', () => {
        it('shouldn\'t throw when adding a dependency', () => {
            expect(() => { iocWrapped.addDependency('engine', engine); }).to.not.throw();
        });

        it('shouldn\'t throw if a factory has all injected dependencies', () => {
            expect(() => { iocWrapped.get('car', ['wheel', 'engine']) }).to.not.throw('engine missing from iocWrapper');
        });
    });

    describe('Updated factory dependency', () => {
        it('shouldn\'t throw when adding a dependency', () => {
            expect(() => { iocWrapped.addDependency('wheel', updatedWheel); }).to.not.throw();
        });

        it('shouldn\'t throw if a factory has an updated injected dependency', () => {
            expect(() => { iocWrapped.get('car', ['wheel', 'engine']) }).to.not.throw('engine missing from iocWrapper');
        });
    });
});
