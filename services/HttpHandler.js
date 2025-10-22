import mockAgreement from "../__mock__/agreement.js"

export default class HttpHandler {
    get = (resource, customerIds) => {
        if (resource === "agreement" && customerIds) {
            console.log(`Resources have been retrieved for the customers: ${customerIds}.`);
            return [mockAgreement];
        }
        else if (resource === "agreement") {
            console.log(`Resource has been retrieved.`);
            return mockAgreement;
        }
        return {};
    }

    create = (data) => {
        console.log("Resource has been created.");

        return { status: 'OK' };
    }

    update = (id, data) => {
        console.log(`Resource: ${id} has been updated.`);

        return { status: 'OK' };
    }

    delete = (id) => {
        console.log(`Resource: ${id} has been deleted.`);

        return { status: 'OK' };
    }
}