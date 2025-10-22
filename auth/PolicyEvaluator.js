import Policies from "./policies.js";

export default function evaluatePermission(resource, action, user, data) {
    const policy = Policies.find(policy => policy.resource === resource && policy.action === action);
    const isUserPermitted = user.permissions.includes(action);
    let evaluationResult = true;

    if (!isUserPermitted) {
        const message = `User: ${user.userId} is not permitted for action: ${action} on resource: ${resource}`;

        console.error(message);
        throw Error(message);
    }
    if (!policy) {
        const message = `No policy is defined for ${action} on resource: ${resource}`;

        console.error(message);
        throw Error(message);
    }

    if (typeof policy.customEvaluator === "function") {
        evaluationResult = policy.customEvaluator(user, data);
    }
    else if (policy.condition) { evaluationResult = evaluateCondition(policy.condition, user, data) };

    if (!evaluationResult) {
        const message = `User: ${user.userId} is not permitted for action: ${action} on resource: ${resource} due to unmet conditions`;

        console.error(message);
        throw Error(message);
    }
}

function evaluateCondition(condition, user, data) {
    const context = { user, data };
    let result = false;

    if (condition.stringEquals) {
        result = Object.entries(condition.stringEquals)
            .every(([path, expected]) => getValue(context, path) === resolveVar(context, expected));
    }

    if (condition.listContains) {
        result = Object.entries(condition.listContains)
            .every(([path, value]) => {
                const list = getValue(context, path) || [];
                return list.includes(resolveVar(context, value));
            });
    }

    if (condition.listOverlap) {
        result = Object.entries(condition.listOverlap)
            .every(([pathA, pathB]) => {
                const listA = getValue(context, pathA) || [];
                const listB = resolveVar(context, pathB);

                return Array.isArray(listA) && Array.isArray(listB)
                    ? listA.every(elementA => listB.includes(elementA))
                    : false;
            });
    }

    if (condition.or) {
        result = condition.or.some(sub => evaluateCondition(sub, context));
    }

    return result;
}

function getValue(obj, path) {
    const pathSplitByArray = path.split('[].');

    if (pathSplitByArray.length > 2) throw Error('path should only contain 1 array for conditional evaluation');

    const [splitPath, key] = pathSplitByArray;
    const output = splitPath.split('.').reduce((o, k) => o?.[k], obj);

    return key && Array.isArray(output) ? output.map(each => each[key]) : output;
}

function resolveVar(context, expr) {
    const match = expr.match(/\${(.*?)}/);
    if (match) return getValue(context, match[1]);
    return expr;
}
