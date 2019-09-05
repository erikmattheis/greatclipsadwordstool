var campaignService;

function init(user) {
    if (!campaignService) {
        campaignService = user.getService('CampaignService', 'v201806')
    }
}

module.exports.newCampaign = function(user, budget, callback) {
    init(user);
    let campaignObj = getNewCampaignObj(budget);
    console.log(budget);
    let campaignOperation = getNewCampaignOperation('ADD', campaignObj);
    let campaign = getNewCampaign([campaignOperation], function(error, campaign) {
        if (error) {
            return callback(error);
        }
        callback(null, campaign);
    });
}

function getNewCampaignObj(budget) {
    return {
        name: 'GCTestCampaign - ' + Date.now(),
        status: 'PAUSED',
        budget: {
            budgetId: budget.budgetId
        },
        advertisingChannelType: 'SEARCH',
        biddingStrategyConfiguration: {
            biddingStrategyType: 'MANUAL_CPC'
        }
    }
}

function getNewCampaignOperation(operator, operand) {
    return {
        operator: operator,
        operand: operand
    }
}

function getNewCampaign(operations, callback) {
    campaignService.mutate({ operations: operations }, (error, campaign) => {
        if (error) {
            return callback(error);
        }
        callback(null, campaign);
    });
}