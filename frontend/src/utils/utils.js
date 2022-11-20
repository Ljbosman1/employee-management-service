export const mapSnakeToCamel = (obj) => {
    Object.keys( obj ).forEach( function( key ) {
        const newKey = key.toLowerCase().replace(/([-_][a-z])/g, group =>
            group
            .toUpperCase()
            .replace('-', '')
            .replace('_', '')
        );
        obj[ newKey ] = obj[ key ];
        if (newKey !== key) {
            delete obj[key];
        }
    } );
}

export const mapCamelToSnake = (obj) => {
    Object.keys( obj ).forEach( function( key ) {
        const newKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
        obj[ newKey ] = obj[ key ];
        if (newKey !== key) {
            delete obj[key];
        }
            
    } );
}