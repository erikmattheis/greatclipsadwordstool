const campaignCriterionService;

function init(user) {
    if (!campaignCriterionService) {
        campaignCriterionService = user.getService('CampaignCriterionService', 'v201806')
    }
}

moduleExports.setCampaignCriterion = function(campaignId, type, args) {
    if (!campaignCriterionService) {
        init(user);
    }
    if (type === 'PROXIMITY') {
        let criterionObj = getNewDistanceCriterionObj(args.miles);
    }

    let criterionOperation = getNewOperation('ADD', criterionObj);
    let campaignCriteria = campaignCriterionService(campaignId, null, $locationGroup);
    campaignCriteria.mutate()
}

function getNewDistanceCriterionObj(longValue) {
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!! no');
    return {
        type: 'longValue',
        unit: 'Miles',
        longValue: longValue
    };
}

function getNewOperation(operator, operand) {
    return {
        operator: operator,
        operand: operand
    }
}

function getNewBudget(operations, callback) {
    budgetService.mutate({ operations: operations }, (error, budgetResult) => {
        if (error) {
            done(error);
        }
        let budget = budgetResult.value[0];
        //console.log(budgetResult.value[0]);
        if (callback) {
            callback(null, budget);
        }
    });
}


$operations = [];
foreach($campaignCriteria as $campaignCriterion) {
    $operation = new CampaignCriterionOperation();
    $operation - > setOperator(Operator::ADD);
    $operation - > setOperand($campaignCriterion);
    $operations[] = $operation;
}


$result = $campaignCriterionService - > mutate($operations);

// Print out some information about added campaign criteria.
foreach($result - > getValue() as $campaignCriterion) {
    printf(
        "Campaign targeting criterion with ID %d and type '%s' was added.\n",
        $campaignCriterion - > getCriterion() - > getId(),
        $campaignCriterion - > getCriterion() - > getType()
    );
}
}

var campaignCriterionService;



$radius = new ConstantOperand();
$radius - > setType(ConstantOperandConstantType::DOUBLE);
$radius - > setUnit(ConstantOperandUnit::MILES);
$radius - > setDoubleValue(10.0);
$distance = new LocationExtensionOperand();
$distance - > setRadius($radius);
$locationGroup = new LocationGroups();
$locationGroup - > setFeedId(intval($locationFeedId));
$locationGroup - > setMatchingFunction(
    new MatchingFunction(FunctionOperator::IDENTITY, [$distance])
);
$campaignCriteria[] = new CampaignCriterion(campaignId, null, $locationGroup);
}



class LocationGroups extends\ Google\ AdsApi\ AdWords\ v201806\ cm\ Criterion {
    /**
     * @var int $feedId
     */
    protected $feedId = null;
    /**
     * @var \Google\AdsApi\AdWords\v201806\cm\MatchingFunction $matchingFunction
     */
    protected $matchingFunction = null;
    /**
     * @param int $id
     * @param string $type
     * @param string $CriterionType
     * @param int $feedId
     * @param \Google\AdsApi\AdWords\v201806\cm\MatchingFunction $matchingFunction
     */
    public

    function __construct($id = null, $type = null, $CriterionType = null, $feedId = null, $matchingFunction = null) {
        parent::__construct($id, $type, $CriterionType);
        $this - > feedId = $feedId;
        $this - > matchingFunction = $matchingFunction;
    }
    /**
     * @return int
     */
    public

    function getFeedId() {
        return $this - > feedId;
    }
    /**
     * @param int $feedId
     * @return \Google\AdsApi\AdWords\v201806\cm\LocationGroups
     */
    public

    function setFeedId($feedId) {
        $this - > feedId = (!is_null($feedId) && PHP_INT_SIZE === 4) ?
            floatval($feedId) : $feedId;
        return $this;
    }
    /**
     * @return \Google\AdsApi\AdWords\v201806\cm\MatchingFunction
     */
    public

    function getMatchingFunction() {
        return $this - > matchingFunction;
    }
    /**
     * @param \Google\AdsApi\AdWords\v201806\cm\MatchingFunction $matchingFunction
     * @return \Google\AdsApi\AdWords\v201806\cm\LocationGroups
     */
    public

    function setMatchingFunction($matchingFunction) {
        $this - > matchingFunction = $matchingFunction;
        return $this;
    }
}