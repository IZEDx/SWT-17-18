/*
export function EmployeeRoute(route: IRoute) {
    route.post((req, res) => {
        const b = req.body;
        const address: DBAddressTable = {
            idAddress: -1, 
            street: b.street,
            number: b.number,
            postcode: b.postcode,
            city: b.city
        }
        Employee.add(b.firstname, b.name, address, b.username, b.email, b.password,
                    b.qualifications.split(","), b.driverLicense, b.isAdmin);
    });
}*/