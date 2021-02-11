#! /usr/bin/env node

/**
 * Wrapper for dependency inversion
 *
 * @constructor
 *
 * @param bindable an object that can have .bind() called on it,
 *
 * @return
 */

export default function iocWrapper() {
    const state = {
        factories: {},
        dependencies: {},
    };

    const addFactory = (name, inputFactory) => {
        state.factories[name] = inputFactory;
    };

    const addDependency = (name, inputDependency) => {
        state.dependencies[name] = inputDependency;
    }

    const instantiateDependency = (inputFactory, args) => {

        return inputFactory(...(args.map(argument => get(argument))));
    }

    const get = (name, args = []) => {
        if (state.dependencies[name] === undefined) {
            const foundFactory = state.factories[name];
            if (foundFactory) {
                state.dependencies[name] = instantiateDependency(foundFactory, args);
            } else {
                throw new Error(`${name} missing from iocWrapper`);
            }
        }
        return state.dependencies[name];
    }

    return {
        addFactory,
        addDependency,
        get
    };
}
