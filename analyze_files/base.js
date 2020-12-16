var  _dimItemRename = {};


function GetURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            var cvalue = decodeURIComponent(sParameterName[1])
            return cvalue;
        }
    }
    return null;
}

function HtmlEncode(value) {
    //create a in-memory div, set it's inner text(which jQuery automatically encodes)
    //then grab the encoded contents back out.  The div never exists on the page.
    return $('<div/>').text(value).html();
}

function HtmlDecode(value) {
    return $('<div/>').html(value).text();
}

function replaceUrlParam(url, paramName, paramValue) {
    var pattern = new RegExp('(' + paramName + '=).*?(&|$)')
    var newUrl = url.replace(pattern, '$1' + paramValue + '$2');
    if (newUrl == url) {
        newUrl = newUrl + (newUrl.indexOf('?') > 0 ? '&' : '?') + paramName + '=' + paramValue
    }
    return newUrl
}

function GetDateString(date) {
    var month = date.getMonth() + 1;
    var monthStr = "";
    if (month > 9) {
        monthStr = "" + month;
    } else {
        monthStr = "0" + month;
    }

    var day = date.getDate();
    var dayStr="";
    if (day > 9) {
        dayStr = "" + day;
    } else {
        dayStr = "0" + day;
    }

    return date.getFullYear() + "-" + monthStr + "-" +dayStr;
}

function ParseTimeString(str) {    
    var arr = str.split("-");
    var date = new Date(arr[0], parseInt(arr[1]) - 1, arr[2]);
    return date;
}
function ParseTimeString2(str, sep) {
    var arr = str.split(sep);
    var date = new Date(arr[0], parseInt(arr[1]) - 1, arr[2]);
    return date;
}

function GetHost(url) {
    var dummy = document.createElement('a');
    dummy.href = url;
    return dummy.href.hostname;
}

function GetDomain(url) {
    //scheme : // [username [: password] @] hostame [: port] [/ [path] [? query] [# fragment]]*/
    var e = new RegExp('^(?:(?:https?|ftp):)/*(?:[^@]+@)?([^:/#]+)'),
	matches = e.exec(url);
    return matches ? matches[1] : url;
}

function GetSearch(url) {
    var dummy = document.createElement('a');
    dummy.href = url;
    return dummy.href.search;
}

function padString(num) {
    if (num >= 10) {
        return num;
    }
    return "0" + num;
}
function JsonDate2String(dateString) {
    var date = new Date(parseInt(dateString.substr(6)));


    return date.getFullYear() + "-" + padString((1 + date.getMonth()))
        + "-" + padString(date.getDate())
        + " " + padString(date.getHours())
        + ":" + padString(date.getMinutes());

}


Date.prototype.addHours = function (h) {
    this.setTime(this.getTime() + (h * 60 * 60 * 1000));
    return this;
}

function JsonDate2StringMinutes8(dateString) {
    var date = new Date(parseInt(dateString.substr(6)));

    date.addHours(-8);
    return date.getFullYear() + "-" + padString((1 + date.getMonth()))
        + "-" + padString(date.getDate())
        + " " + padString(date.getHours())
        + ":" + padString(date.getMinutes());

}


function GetJsonDate8(dateString) {
    var date = new Date(parseInt(dateString.substr(6)));

    date.addHours(-8);
    return date;

}

function GetJsonDate(dateString) {
    var date = new Date(parseInt(dateString.substr(6)));
    return date;
}

function addDays(dateObject, numDays) {
    var date = new Date(dateObject.getFullYear(), dateObject.getMonth(), dateObject.getDate());
    date.setDate(dateObject.getDate() + numDays);
    return date;
}

var _provinceFull2ShortMapping =
{
    "北京市": "北京",
    "天津市": "天津",
    "河北省": "河北",
    "山西省": "山西",
    "内蒙古自治区": "内蒙古",
    "辽宁省": "辽宁",
    "吉林省": "吉林",
    "黑龙江省": "黑龙江",
    "上海市": "上海",
    "江苏省": "江苏",
    "浙江省": "浙江",
    "安徽省": "安徽",
    "福建省": "福建",
    "江西省": "江西",
    "山东省": "山东",
    "河南省": "河南",
    "湖北省": "湖北",
    "湖南省": "湖南",
    "广东省": "广东",
    "广西壮族自治区": "广西",
    "海南省": "海南",
    "重庆市": "重庆",
    "四川省": "四川",
    "贵州省": "贵州",
    "云南省": "云南",
    "西藏自治区": "西藏",
    "陕西省": "陕西",
    "甘肃省": "甘肃",
    "青海省": "青海",
    "宁夏回族自治区": "宁夏",
    "新疆维吾尔自治区": "新疆",
    "台湾省": "台湾",
    "香港特别行政区": "香港",
    "澳门特别行政区": "澳门",
};


var _provinceMapping =
    {
        "110000": ["北京", "北京市"],
        "120000": ["天津", "天津市"],
        "130000": ["河北", "河北省"],
        "140000": ["山西", "山西省"],
        "150000": ["内蒙古", "内蒙古自治区"],
        "210000": ["辽宁", "辽宁省"],
        "220000": ["吉林", "吉林省"],
        "230000": ["黑龙江", "黑龙江省"],
        "310000": ["上海", "上海市"],
        "320000": ["江苏", "江苏省"],
        "330000": ["浙江", "浙江省"],
        "340000": ["安徽", "安徽省"],
        "350000": ["福建", "福建省"],
        "360000": ["江西", "江西省"],
        "370000": ["山东", "山东省"],
        "410000": ["河南", "河南省"],
        "420000": ["湖北", "湖北省"],
        "430000": ["湖南", "湖南省"],
        "440000": ["广东", "广东省"],
        "450000": ["广西", "广西壮族自治区"],
        "460000": ["海南", "海南省"],
        "500000": ["重庆", "重庆市"],
        "510000": ["四川", "四川省"],
        "520000": ["贵州", "贵州省"],
        "530000": ["云南", "云南省"],
        "540000": ["西藏", "西藏自治区"],
        "610000": ["陕西", "陕西省"],
        "620000": ["甘肃", "甘肃省"],
        "630000": ["青海", "青海省"],
        "640000": ["宁夏", "宁夏回族自治区"],
        "650000": ["新疆", "新疆维吾尔自治区"],
        "710000": ["台湾", "台湾省"],
        "810000": ["香港", "香港特别行政区"],
        "820000": ["澳门", "澳门特别行政区"],
    };

var _provinceMappingShort =
    {
        "11": ["北京", "北京市"],
        "12": ["天津", "天津市"],
        "13": ["河北", "河北省"],
        "14": ["山西", "山西省"],
        "15": ["内蒙古", "内蒙古自治区"],
        "21": ["辽宁", "辽宁省"],
        "22": ["吉林", "吉林省"],
        "23": ["黑龙江", "黑龙江省"],
        "31": ["上海", "上海市"],
        "32": ["江苏", "江苏省"],
        "33": ["浙江", "浙江省"],
        "34": ["安徽", "安徽省"],
        "35": ["福建", "福建省"],
        "36": ["江西", "江西省"],
        "37": ["山东", "山东省"],
        "41": ["河南", "河南省"],
        "42": ["湖北", "湖北省"],
        "43": ["湖南", "湖南省"],
        "44": ["广东", "广东省"],
        "45": ["广西", "广西壮族自治区"],
        "46": ["海南", "海南省"],
        "50": ["重庆", "重庆市"],
        "51": ["四川", "四川省"],
        "52": ["贵州", "贵州省"],
        "53": ["云南", "云南省"],
        "54": ["西藏", "西藏自治区"],
        "61": ["陕西", "陕西省"],
        "62": ["甘肃", "甘肃省"],
        "63": ["青海", "青海省"],
        "64": ["宁夏", "宁夏回族自治区"],
        "65": ["新疆", "新疆维吾尔自治区"],
        "71": ["台湾", "台湾省"],
        "81": ["香港", "香港特别行政区"],
        "82": ["澳门", "澳门特别行政区"],
    };

var _cnFacetNames = {
    "Person": "人物",
    "Location": "地点",
    "Organization": "机构",
    "Topic": "话题",
    "Province": "省/自治区/直辖市",
    "City": "城市",
    "District": "区县",
    "Opinion": "观点分布",
    "Positive": "正面观点",
    "Negative": "负面",
};


var _opininStrEn = {
    0: "All",
    1: "Negative",
    2: "Neutral",
    3: "Positive"
};


var _opininStrCn = {
    0:"全部",
    1: "负面",
    2: "中性",
    3: "正面"
};




function clone(obj) {
    var copy;

    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}


function updateQueryStringParameter(uri, key, value) {
    var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    var separator = uri.indexOf('?') !== -1 ? "&" : "?";
    if (uri.match(re)) {
        return uri.replace(re, '$1' + key + "=" + value + '$2');
    }
    else {
        return uri + separator + key + "=" + value;
    }
}



function uuid(sep) {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    if (sep) {
        s[8] = s[13] = s[18] = s[23] = "-";
    } else {
        s[8] = s[13] = s[18] = s[23] = "_";
    }
    var uuid = s.join("");
    return uuid;
}


var GlobalPosNegStat=
{
    neu:223996746,
    pos: 34991950,
    neg:10051831,
    total: 223996746 + 34991950 + 10051831,
    posRatio: 34991950/(223996746 + 34991950 + 10051831),
    negRatio: 10051831 / (223996746 + 34991950 + 10051831),
    posVsNeg: 34991950 / 10051831,
    diffRatio : (34991950-10051831)/(223996746 + 34991950 + 10051831),
    sd: 0.05    
};




function normalcdf(X) {   //HASTINGS.  MAX ERROR = .000001
    var T = 1 / (1 + .2316419 * Math.abs(X));
    var D = .3989423 * Math.exp(-X * X / 2);
    var Prob = D * T * (.3193815 + T * (-.3565638 + T * (1.781478 + T * (-1.821256 + T * 1.330274))));
    if (X > 0) {
        Prob = 1 - Prob
    }
    return Prob
}

function computeProb(mean, stdev, argument) {
    Z = argument;
    M = mean;
    SD = stdev;

    with (Math) {
        if (SD < 0) {
            alert("The standard deviation must be nonnegative.")
        } else if (SD == 0) {
            if (Z < M) {
                Prob = 0
            } else {
                Prob = 1
            }
        } else {
            Prob = normalcdf((Z - M) / SD);
            Prob = round(100000 * Prob) / 100000;
        }
    }
    return Prob;
}




function GetVoteRange(pos, neg, neu) {
    //2015/12/20
    //"Opinion": [
    //    "2",
    //    223996746,
    //    "3",
    //    34991950,
    //    "1",
    //    10051831
    //]
    

    var n = pos + neg + neu;
    var p = pos / n;
    
    var z = 1.96;

    var countNorm = 1;

    var wilsonPart1 = p + 0.5 / n * z * z / countNorm;
    var wilsonPart2 = Math.sqrt(p * (1 - p) / n / countNorm + z * z / 4 / n / n / countNorm / countNorm);
    var wilSonPart3 = 1 + z * z / n / countNorm;

    var low = (wilsonPart1 - wilsonPart2) / wilSonPart3;
    var high = (wilsonPart1 + wilsonPart2) / wilSonPart3;
    var avg = wilsonPart1 / wilSonPart3;
    
    var posProb = computeProb(GlobalPosNegStat.posRatio, 0.10, p);
    var negRatio = neg / n;    

    var negProb = computeProb(GlobalPosNegStat.negRatio, 0.10, negRatio);

    var diffRatio = (pos - neg) / n;
    
    var diffProb = computeProb(GlobalPosNegStat.diffRatio, 0.10, diffRatio);
    if (diffRatio < 0) {
        //diffProb = -diffProb;
    }

    var posVsNegRatio = pos / neg;


    var posVsNegRatioOri = posVsNegRatio;
    //if (pos <neg) {
    //    posVsNegRatio = -neg / pos;
    //}
        



    var vsProb = computeProb(Math.log(GlobalPosNegStat.posVsNeg) / Math.log(2), 1.0, Math.log(posVsNegRatio) / Math.log(2));
   
    vsProb = (vsProb - 0.5) * 2;

    //if (posVsNegRatioOri < GlobalPosNegStat.posVsNeg) {
    //    //vsProb = (vsProb-0.5)*2;
    //}    

    return {
        low: low,
        high: high,
        avg: avg,
        posProb: posProb,
        negProb: negProb,
        diffProb: diffProb,
        vsProb: vsProb
    };

}



function getHaosoIndex(keyword, start, end, func) {
    var inputStart;
    if (start) {
        inputStart = ParseTimeString(start);
    }
    var inputEnd;
    if (end) {
        inputEnd = ParseTimeString(end);
    }
    console.log("get haosou index for " + keyword);
    $.ajax({
        url: "service.svc/GetHaosouCount",
        type: "get",
        data: {
            "query": keyword,
            start: start,
            end: end
        },
        success: function (data) {
            if (data) {
                var cnt = data.Total;
                func(cnt);
                //$("#numHaosouIndex").html(data.Total);
            }
        }
    }
    );
}
