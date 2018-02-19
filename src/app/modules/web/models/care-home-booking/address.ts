export interface Address {
    postal_code: string;
    city: string;
    address_line_1: string;
    location: Location;
    address_line_2?: any;
    company?: any;
}

export interface Location {
    coordinates: number[];
    type: string;
}