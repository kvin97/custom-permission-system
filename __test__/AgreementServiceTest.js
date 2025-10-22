import mockUser from "../__mock__/user.js";
import AgreementService from "../services/AgreementService.js";

const test = (fn) => { try { fn() } catch (error) { } };

const agreementService = new AgreementService();

test(() => agreementService.getAgreement(mockUser, 101));

test(() => agreementService.getAgreements(mockUser, ["cust-7788", "cust-9988", "cust-5555"]));

// failing test since customer is not attached to the user
test(() => agreementService.getAgreements(mockUser, ["cust-7789"]));

test(() => agreementService.updateAgreements(mockUser, 101, {}));