var campaignCriterionService;

function init(user) {
    if (!campaignCriterionService) {
        campaignCriterionService = user.getService('CampaignCriterionService', 'v201806')
    }
}

module.exports.setCampaignCriterion = function(user, campaignId, callback) {
    if (!campaignCriterionService) {
        init(user);
    }

    let address = {
        streetAddress: '1817 FORD PARKWAY #101',
        streetAddress2: null,
        cityName: 'Saint Paul',
        provinceCode: null,
        provinceName: null,
        postalCode: '55116',
        countryCode: 'US'
    };

    let campaignCriterionObj = getNewCampaignCriterion(campaignId, address);
    //let criterionOperation = getNewOperation(campaignId, 'ADD', campaignCriterionObj);
    setCriterion([campaignCriterionObj], callback);

}

function setCriterion(operations, callback) {
    console.log('operations', operations);
    campaignCriterionService.mutate({ operations: operations }, (error, result) => {
        if (error) {
            console.log('error setCriterion:', error);
        }

        console.log('mutated proximity!');
        callback(null, result);
    });
}
/*
function getNewProximityObj(address, miles) {
    return {
        radiusDistanceUnits: 'MILES',
        radiusInUnits: miles,
        address: address
    };
}*/
function getNewCampaignCriterion(campaignId, address) {
    console.log('getNewCampaignCriterion:', campaignId);
    console.log('criterion:', address);
    return {
        campaignId: campaignId,
        criterion: {
            type: 'PROXIMITY',
            radiusDistanceUnits: 'MILES',
            radiusInUnits: 7,
            address: address
        }
    }
}

function getNewOperation(campaignId, operator, operand) {
    console.log('getNewOperation:');
    console.log('operator:', operator);
    console.log('operand:', operand);
    return {
        operator: operator,
        operand: {
            campaignId: campaignId,
            criterion: operand
        }
    }
}