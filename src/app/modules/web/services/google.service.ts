export class GoogleService {
    searchForAddresProperties(addressComponentsArr: any[]): any {
        let city = '';
        let street = '';
        let street_number = '';
        let postal_code = '';
        addressComponentsArr.forEach((addr) => {
            if (addr.types[0] === 'locality') {
                console.log(addr.long_name);
                city = addr.long_name;
            }
            if (addr.types[0] === 'postal_code') {
                console.log(addr.long_name);
                postal_code = addr.long_name;
            }
            if (addr.types[0] === 'route') {
                console.log(addr.long_name);
                street = addr.long_name;
            }
            if (addr.types[0] === 'street_number') {
                console.log(addr.long_name);
                street_number = addr.long_name;
            }
        });
        return {city, street, street_number, postal_code};
    }
}
