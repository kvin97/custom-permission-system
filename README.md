# custom-permission-system
This codebase implements custom permission handling through a hybrid approach that combines ABAC and RBAC

## ABAC Permission Handling Process in NodeJs

This script contains auth process that can be utilized for ABAC permission handling. ABAC can be separated into 4 main parts as follows.
- **`Subject/User`**
- **`Action`**
- **`Resource`**
- **`Other Info (Environment, Organization etc.)`**

### Why this is required?

If Role based permission isn't enough for you to tackle the action and resource attribute based authorization, then ABAC offers a more flexible solution. While ABAC is more complex than RBAC, it can be tailored to meet the application requirements.

**This repository standardizes the ABAC permission authorization process.**

### Main Components in this Repository
<pre>
📂 
├── 📂 services
│   └── 📄 AgreementService.js
└── 📂 auth
├── 📄 Resources.js
├── 📄 Actions.js
├── 📄 Policies.js
└── 📄 PolicyEvaluator.js
</pre>

#### Service Layer
- **`AgreementService.js`**: Implements business logic for managing agreements, including creation, updates, and retrieval.

#### Auth Layer
The **Auth Layer** manages authorization and access control. If user not authorized, then throw an error via policy evaluation.

- **`Resources.js`**: Defines the application's resources (e.g., agreement) that require access control.
- **`Action.js`**: Specifies permissible actions (e.g., read, list, write, delete) that can be performed on resources.
- **`Policies.js`**: Contains access control policies, outlining rules for resource-action permissions.
E.g.
```json
{
    "action": "agreement:list",
        "resource": "agreement",
            "condition": {
        "listOverlap": {
            "data.customerIds": "${user.attachedCustomers[].customerId}",
            }
    }
}
```
- **`PolicyEvaluator.js`**: Evaluates policies to determine whether a user or process is authorized to perform specific actions on resources.

### Policy Evaluation Steps

1. Service layer should utilize `evaluatePermission` function from `PolicyEvaluator.js` to evaluate the user permissions against the resources.
2. Check if there's any defined policy in `Policies.js` for the given resource and action (e.g. - resource can be `agreement` and action can be `agreement:list`),
otherwise throw error
3. Verify if user attached permissions allow relevant action, otherwise throw error
4. Verify if there's a `customEvaluator` function defined in the selected policy, if there's any then use it to evaluate the permissions against the resources. This kind of custom evaluator is used to avoid unnecessary complications defining `condition`. If resource validations become too complicated, then custom evaluation is the best way to go.
5. If no `customEvaluator`, then use given `condition` to evaluate the permissions. There can be conditions such as `listOverlap` to find overlaps between arrays, `stringEquals` to verify string equality etc. You can define custom conditions to meet your application's requirements.