
var _currDateGap = 1;

function GetTimelineData(data, keys, values) {

    var tempKeys = [];
    //var tempValues = [];

    var datesWithoutFilter = [];
    var allDates = [];
    var posDates = [];
    var negDates = [];
    var neuDates = [];


    var minDate = data.Search.MinDateBound;
    var maxDate = data.Search.MaxDateBound;
    
    //var combinedFreq = data.TrendInfoCombined;

    var combinedFreq = data.TrendInfoCombinedCompact;


    var i, n = combinedFreq.length;

    var minDateValue = null;
    var maxDateValue = null;
    var daysApart = 0;
    if (n > 0) {
        minDateValue = ParseTimeString(combinedFreq[0].d);
        maxDateValue = ParseTimeString(combinedFreq[n - 1].d);
        var rawDays = (maxDateValue - minDateValue) / 86400000;

        daysApart = Math.abs(Math.ceil(rawDays)) + 1;//最小最大报道日之间的天数

        for (i = 0; i < daysApart; i++) {
            posDates.push(0);
            negDates.push(0);
            neuDates.push(0);
            allDates.push(0);
            var tempDate = addDays(minDateValue, i);
            tempKeys.push(
                GetDateString(tempDate)
                );
        }

        //the total number of days
        var windowSize = daysApart * (_zoomEnd - _zoomStart) / 100.0;

        for (i = 0; i < n; i++) {
            var f = combinedFreq[i];
            var dt = f.d;
            var dtValue = ParseTimeString(dt);
            var dayDiff = Math.abs(Math.round((dtValue - minDateValue) / 86400000));

            if (tempKeys[dayDiff] !== dt) {
                console.log("wrong date: " + dt + ", " + tempKeys[dayDiff]);
            }

            if (f.s != null) {
                allDates[dayDiff] = f.s[0]; //
            }

            //c, p, neg, neu, c1, pos1, neg1, neu
            if (f.s != null) {
                posDates[dayDiff] = (f.s[1]);
                negDates[dayDiff] = (f.s[2]);
                neuDates[dayDiff] = (f.s[3]);
            }
        }

        //if (minDate < data.Search.MinDate) {
        //    minDate = data.Search.MinDate;
        //}
        //if (maxDate > data.Search.MaxDate) {
        //    maxDate = data.Search.MaxDate;
        //}
        //tempValues.push(negDates);
        //tempValues.push(neuDates);
        //tempValues.push(posDates);
        //tempValues.push(allDates);

        var gap = 1;

        if (windowSize > 5 * 365) {
            //>5 year, then disply in month level
            gap = 30;
        }
        else if (windowSize > 365) {
            //in week level
            gap = 7;
        }
        else {
            //in day level
        }

        _currDateGap = gap;

        var sum = 0;
        var neg = [];
        var neu = [];
        var pos = [];
        var all = [];

        var iRange = 0;
        var nPoints = tempKeys.length;
        for (var i = 0; i < nPoints; i++) {
            if (i % gap === 0) {
                keys.push(tempKeys[i]);
                neg.push(0);
                neu.push(0);
                pos.push(0);
                all.push(0);
                iRange++;
            }
            neg[iRange - 1] += negDates[i];
            neu[iRange - 1] += neuDates[i];
            pos[iRange - 1] += posDates[i];
            all[iRange - 1] += allDates[i];
        }
    }
    values.push(neg);
    values.push(neu);
    values.push(pos);
    values.push(all);
}



function GetTimelineDataWithoutMerge(data, keys, values) {

    var tempKeys = [];
    //var tempValues = [];

    var datesWithoutFilter = [];
    var allDates = [];
    var posDates = [];
    var negDates = [];
    var neuDates = [];


    var minDate = data.Search.MinDateBound;
    var maxDate = data.Search.MaxDateBound;

    //var combinedFreq = data.TrendInfoCombined;

    var combinedFreq = data.TrendInfoCombinedCompact;


    var i, n = combinedFreq.length;

    var minDateValue = null;
    var maxDateValue = null;
    var daysApart = 0;
    if (n > 0) {
        console.log(JsonDate2String(data.Search.MinDate));

        minDateValue = GetJsonDate(data.Search.MinDate); // ParseTimeString(combinedFreq[0].d);
        maxDateValue = GetJsonDate(data.Search.MaxDate);// ParseTimeString(combinedFreq[n - 1].d);

        console.log(minDateValue);
        console.log(maxDateValue);

        var rawDays = (maxDateValue - minDateValue) / 86400000;

        console.log("days: " + rawDays);


        daysApart = Math.abs(Math.ceil(rawDays)) + 1;//最小最大报道日之间的天数

        for (i = 0; i < daysApart; i++) {
            posDates.push(0);
            negDates.push(0);
            neuDates.push(0);
            allDates.push(0);
            var tempDate = addDays(minDateValue, i);
            tempKeys.push(
                GetDateString(tempDate)
                );
        }

        //the total number of days
        var windowSize = daysApart * (_zoomEnd - _zoomStart) / 100.0;

        for (i = 0; i < n; i++) {
            var f = combinedFreq[i];
            var dt = f.d;
            var dtValue = ParseTimeString(dt);
            var dayDiff = Math.abs(Math.round((dtValue - minDateValue) / 86400000));

            if (tempKeys[dayDiff] !== dt) {
                console.log("wrong date: " + dt + ", " + tempKeys[dayDiff]);
            }

            if (f.s != null) {
                allDates[dayDiff] = f.s[0]; //
            }

            //c, p, neg, neu, c1, pos1, neg1, neu
            if (f.s != null) {
                posDates[dayDiff] = (f.s[1]);
                negDates[dayDiff] = (f.s[2]);
                neuDates[dayDiff] = (f.s[3]);
            }
        }

        //if (minDate < data.Search.MinDate) {
        //    minDate = data.Search.MinDate;
        //}
        //if (maxDate > data.Search.MaxDate) {
        //    maxDate = data.Search.MaxDate;
        //}
        //tempValues.push(negDates);
        //tempValues.push(neuDates);
        //tempValues.push(posDates);
        //tempValues.push(allDates);

        var gap = 1;

        if (windowSize > 5 * 365) {
            //>5 year, then disply in month level
            gap = 30;
        }
        else if (windowSize > 365) {
            //in week level
            gap = 7;
        }
        else {
            //in day level
        }
 

        var sum = 0;
        var neg = [];
        var neu = [];
        var pos = [];
        var all = [];

        var iRange = 0;
        var nPoints = tempKeys.length;
        for (var i = 0; i < nPoints; i++) {
            if (i % gap === 0) {
                keys.push(tempKeys[i]);
                neg.push(0);
                neu.push(0);
                pos.push(0);
                all.push(0);
                iRange++;
            }
            neg[iRange - 1] += negDates[i];
            neu[iRange - 1] += neuDates[i];
            pos[iRange - 1] += posDates[i];
            all[iRange - 1] += allDates[i];
        }
    }
    values.push(neg);
    values.push(neu);
    values.push(pos);
    values.push(all);
}
