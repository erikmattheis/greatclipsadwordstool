var budgetService;

function init(user) {
    if (!budgetService) {
        budgetService = user.getService('BudgetService', 'v201806');
    }
}

module.exports.newBudget = function(user, callback) {
    if (!budgetService) {
        init(user);
    }
    let budgetObj = getNewBudgetObj(1000000);
    let budgetOperation = getNewBudgetOperation('ADD', budgetObj);
    let budget = getNewBudget([budgetOperation], function(error, budget) {
        console.log('error', error);
        callback(null, budget);
    });
};

function getNewBudgetObj(amount) {
    return {
        name: 'budget for ' + Date.now(),
        amount: {
            microAmount: amount,
            'xsi:type': 'Money'
        },
        deliveryMethod: 'STANDARD'
    };
}

function getNewBudgetOperation(operator, operand) {
    return {
        operator: operator,
        operand: operand
    }
}

function getNewBudget(operations, callback) {
    budgetService.mutate({ operations: operations }, (error, budgetResult) => {
        if (error) {
            callback(error);
        }
        let budget = budgetResult.value[0];
        //console.log(budgetResult.value[0]);
        if (callback) {
            callback(null, budget);
        }
    });
}