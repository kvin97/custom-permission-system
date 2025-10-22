import evaluatePermission from "../auth/PolicyEvaluator.js";
import ACTIONS from "../auth/Actions.js";
import RESOURCES from "../auth/Resources.js";
import HttpHandler from "./HttpHandler.js";

export default class AgreementService {
    httpHandler = new HttpHandler();

    // user info should be injected via middleware layer
    updateAgreements = (user, agreementId, agreementInfo) => {
        // fetch agreement info from API or DB using agreementId
        const agreement = this.httpHandler.get(RESOURCES.AGREEMENT);

        evaluatePermission(RESOURCES.AGREEMENT, ACTIONS.AGREEMENT_UPDATE, user, agreement);

        return this.httpHandler.update(agreementId, agreementInfo);
    }

    // user info should be injected via middleware layer
    getAgreement = (user, agreementId) => {
        // fetch agreement info from API or DB using agreementId
        const agreement = this.httpHandler.get(RESOURCES.AGREEMENT);

        evaluatePermission(RESOURCES.AGREEMENT, ACTIONS.AGREEMENT_GET, user, agreement);

        return agreement;
    }

    /* user info should be injected via middleware layer
       when fetching list of agreements, customerId or customerIds are sent as input to the API.
       therefore customerId/customerIds can be used to authorize the access 
     */
    getAgreements = (user, customerIds) => {
        evaluatePermission(RESOURCES.AGREEMENT, ACTIONS.AGREEMENT_LIST, user, { customerIds });

        // fetch agreements info from API or DB using customerIds
        const agreements = this.httpHandler.get(RESOURCES.AGREEMENT, customerIds);

        return agreements;
    }
}