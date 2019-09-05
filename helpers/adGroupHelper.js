var adGroupService;

function init(user) {
    if (!adGroupService) {
        adGroupService = user.getService('AdGroupService', 'v201806');
    }
}

module.exports.newAdGroup = function(user, campaign, callback) {
    init(user);
    let adGroupObj = getNewAdGroupObj(campaign);
    let adGroupOperation = getNewAdGroupOperation('ADD', adGroupObj);
    let adGroup = getNewAdGroup([adGroupOperation], function(error, result) {
        callback(null, result);
    });
}

function getNewAdGroupOperation(operator, operand) {
    return {
        operator: operator,
        operand: operand
    }
}

function getNewAdGroupObj(campaign) {
    return {
        campaignId: campaign.id,
        name: 'NodeAdwordsTestAdgroup ' + Date.now(),
        status: 'PAUSED',
        biddingStrategyConfiguration: {
            bids: [{
                'xsi:type': 'CpaBid',
                bid: {
                    'xsi:type': 'Money',
                    microAmount: 10000
                }
            }]
        }
    };
}

function getNewAdGroup(adGroupOperations) {
    adGroupService.mutate({operations: adGroupOperations}, (error, adGroup) => {
        if (error) {
            console.log('error!', error);
            return error;
        }
        return adGroup;
    });
}

function deleteAdGroup(adgroup) {
    let adgroupDeleteOperation = {
        operator: 'SET',
        operand: {
            id: adgroup.value[0].id,
            status: 'REMOVED'
        }
    };
    adgroupService.mutate({operations: [adgroupDeleteOperation]}, done);
}

