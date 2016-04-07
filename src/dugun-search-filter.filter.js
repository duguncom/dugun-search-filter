function DgSearch($filter) {
    var filterFilter = $filter('filter');
    var orderByFilter = $filter('orderBy');
    var standardComparator = function standardComparator(obj, text) {
        text = ('' + text).toLowerCase();
        return ('' + obj).toLowerCase().indexOf(text) > -1;
    };

    return function customFilter(array, expression, orderByKey, orderByDirection) {
        function customComparator(actual, expected) {
            var isBeforeActivated = expected ? expected.endDate : null;
            var isAfterActivated = expected ? expected.startDate : null;
            var isLower = expected ? expected.lower : null;
            var isHigher = expected ? expected.higher : null;
            var higherLimit;
            var lowerLimit;
            var itemDate;
            var queryDate;


            if(angular.isObject(expected)) {
                //date range
                if (expected.startDate || expected.endDate) {
                    try {
                        if(isBeforeActivated) {
                            higherLimit = expected.endDate;

                            itemDate = new Date(actual);
                            queryDate = new Date(higherLimit.toString());

                            window.itemDate = itemDate;
                            window.higherLimit = queryDate;

                            if(itemDate > queryDate) {
                                return false;
                            }
                        }

                        if(isAfterActivated) {
                            lowerLimit = expected.startDate;

                            itemDate = new Date(actual);
                            queryDate = new Date(lowerLimit.toString());

                            window.itemDate = itemDate;
                            window.lowerLimit = queryDate;

                            if (itemDate < queryDate) {
                                return false;
                            }
                        }

                        return true;
                    } catch (e) {
                        return false;
                    }
                } else if(isLower || isHigher) {
                    //number range
                    if (isLower) {
                        higherLimit = expected.lower;

                        if (actual > higherLimit) {
                            return false;
                        }
                    }

                    if (isHigher) {
                        lowerLimit = expected.higher;
                        if (actual < lowerLimit) {
                            return false;
                        }
                    }

                    return true;
                } else if(angular.isArray(expected)) {
                    if(expected.length === 0) {
                        return true;
                    } else if(!angular.isArray(actual)) {
                        return expected.indexOf(actual) > -1;
                    } else {
                        return angular.equals(actual, expected);
                    }
                }
                //etc
                return true;
            }

            if(expected === 'exists') {
                return !!actual;
            } else if(typeof actual !== 'undefined') {
                return standardComparator(actual, expected);
            } else {
                return false;
            }
        }

        var output = filterFilter(array, expression, customComparator);
        if(orderByKey) {
            output = orderByFilter(output, orderByKey, !!orderByDirection);
        }
        return output;
    };
}

DgSearch.$inject = [
    '$filter'
];

angular.module('dugun.search').filter('dgSearch', DgSearch);
