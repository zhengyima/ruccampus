﻿var _rucmode = true;


var chartLists = {};
var _currUrl = window.location.href;
var _timelineChart = null;
var _relationChart = null;
var _zoomStart = 0;
var _zoomEnd = 100;
var _q = GetURLParameter("q");


// if (_q == "" || _q == null) {
//    if (_uiType == "big") {
//        window.location = "rucstudentbig.aspx?q=*%3A*&icount=20";
//    } else {
//        window.location = "rucstudent.aspx?q=*%3A*&icount=20";
//    } 
// }

var _topic = GetURLParameter("t");
var _axisLabelLength = 6;
var updateDatePeriodButtonText = "Update";

var _alias = GetURLParameter("a");


if (_alias && _alias.length > 0) {

} else {
    _alias = _q;
}

var timelineTitle = "Trends";
if (_market == "zh-CN") {
    timelineTitle = "媒体报道趋势";
    updateDatePeriodButtonText = "更新";
}


var _readOnly = false;
if (GetURLParameter("r")) {
    _readOnly = true;
}

if (_market == "en-US") {
    _axisLabelLength = 20;
}
var _siteLabelLength = 20;

var _dimensionSize = 10;

if (_uiType == "big" && _rucmode) {
    _dimensionSize = 20;
}

var _regionMapping =
    {
    };

var _facetNameListsForRChart =
    [
        "Person",
        "Location",
        "Organization",
        "Topic"
    ];

var _opininStr = _opininStrCn;
if (_market == "en-US") {
    _opininStr = _opininStrEn;
}

var nodesForRelationChart = [];
var linksForRelationChart = [];

var _mapChart;
var _worldMapChart;


var _heapMapChart;


var _mapOption =
    {
        tooltip: {
            trigger: 'item'
        },
        toolbox: {
            show: true,
            orient: 'vertical',
            x: 'right',
            y: 'center',
            feature: {
                mark: { show: true },
                dataView: { show: true, readOnly: false }
            }
        },
        series: [
            {
                tooltip: {
                    trigger: 'item',
                    formatter: function (data) {
                        //console.log(data)                      

                        if (data[2] == "-") {
                            return data[1] + "没有学生";
                        } else {
                            return data[1] + "共有" + data[2] + "位学生";
                        }
                    }
                },
                name: 'Province',
                type: 'map',
                mapType: 'china',
                roam: false,
                mapLocation: {
                    x: 'left',
                    y: 'top',
                    width: '49%'
                },

                selectedMode: 'single',
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            textStyle:
                            {
                                fontFamily: "'Microsoft YaHei',Arial"
                            },
                            formatter: function (data,value) {

                                if (value == "-") {
                                    return "";
                                }
                               
                                return data + "\n" + value+"人";
                            }
                        },

                    },
                    emphasis: {                        
                        label: {
                            show: true,
                            formatter: function (data, value) {
                                if (value == "-") {
                                    return data + "\n0人";
                                }
                                return data + "\n" + value + "人";
                            }
                        },
                        borderColor: 'red',
                        
                    }
                },
                data: []
            },

            //city level
            {
                name: "city",
                tooltip: {
                    trigger: 'item',
                    formatter: function (data) {
                        console.log(data)
                        if (data[2] == "-") {
                            return data[1] + "没有学生";
                        } else {
                            return data[1] + "共有" + data[2] + "位学生";
                        }
                    }
                },
                type: 'map',
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            textStyle:
                            {
                                fontFamily: "'Microsoft YaHei',Arial"
                            },
                            formatter: function (data, value) {
                                
                                if (value == "-") {
                                    return "";
                                }
                                return data + "\n" + value + "人";
                            }
                        }
                    },
                    emphasis: {
                        label: {
                            show: true,
                            formatter: function (data, value) {
                          
                                if (value == "-") {
                                    return data + "\n0人";
                                    
                                } else {
                                    return data + "\n" + value + "人";
                                }
                            }
                        }
                    }
                },
                roam: false,
                mapLocation: {
                    x: '51%'
                },

                data: []
            }
        ],
        animation: false,
        dataRange: {
            x: "right",
            //orient:"horizontal",
            //
            y: "35%",
            min: 0,
            max: 100,
            value: 100,
            calculable: true,
            precision:0,
            color: ['#ff3333', 'orange', 'yellow', 'lime', 'aqua'],
            textStyle: {
                color: '#000'
            }
            
        }
    }



var _worldMapOption = {
    tooltip: {
        trigger: 'item',
        //formatter: '{b}'

        formatter: function (data, value) {

            if (data[2] == "-") {
                return "";
            }
            return data[1] + "目前有人大学生" + data[2] + "人";
        }
    },
    series: [
        {
            name: '世界地图',
            type: 'map',
            mapType: 'world',
            roam: false,
            selectedMode: 'single',
            itemStyle: {
                normal: {
                    label: {
                        show: true,
                        
                        formatter: function (data, value) {

                            if (value == "-") {
                                return "";
                            }
                            return data + "\n" + value + "人";
                        }
                    }
                },
                emphasis: {
                    label: {
                        show: true,
                        formatter: function (data, value) {

                            if (value == "-") {
                                value = 0
                            }
                            return data + "\n" + value + "人";
                        }
                    }
                }
            },
            data: [],
            // 自定义名称
            nameMap: {
                'Afghanistan': '阿富汗',
                'Angola': '安哥拉',
                'Albania': '阿尔巴尼亚',
                'United Arab Emirates': '阿联酋',
                'Argentina': '阿根廷',
                'Armenia': '亚美尼亚',
                'French Southern and Antarctic Lands': '法属南半球和南极领地',
                'Australia': '澳大利亚',
                'Austria': '奥地利',
                'Azerbaijan': '阿塞拜疆',
                'Burundi': '布隆迪',
                'Belgium': '比利时',
                'Benin': '贝宁',
                'Burkina Faso': '布基纳法索',
                'Bangladesh': '孟加拉国',
                'Bulgaria': '保加利亚',
                'The Bahamas': '巴哈马',
                'Bosnia and Herzegovina': '波斯尼亚和黑塞哥维那',
                'Belarus': '白俄罗斯',
                'Belize': '伯利兹',
                'Bermuda': '百慕大',
                'Bolivia': '玻利维亚',
                'Brazil': '巴西',
                'Brunei': '文莱',
                'Bhutan': '不丹',
                'Botswana': '博茨瓦纳',
                'Central African Republic': '中非共和国',
                'Canada': '加拿大',
                'Switzerland': '瑞士',
                'Chile': '智利',
                'China': '中国',
                'Ivory Coast': '象牙海岸',
                'Cameroon': '喀麦隆',
                'Democratic Republic of the Congo': '刚果民主共和国',
                'Republic of the Congo': '刚果共和国',
                'Colombia': '哥伦比亚',
                'Costa Rica': '哥斯达黎加',
                'Cuba': '古巴',
                'Northern Cyprus': '北塞浦路斯',
                'Cyprus': '塞浦路斯',
                'Czech Republic': '捷克共和国',
                'Germany': '德国',
                'Djibouti': '吉布提',
                'Denmark': '丹麦',
                'Dominican Republic': '多明尼加共和国',
                'Algeria': '阿尔及利亚',
                'Ecuador': '厄瓜多尔',
                'Egypt': '埃及',
                'Eritrea': '厄立特里亚',
                'Spain': '西班牙',
                'Estonia': '爱沙尼亚',
                'Ethiopia': '埃塞俄比亚',
                'Finland': '芬兰',
                'Fiji': '斐',
                'Falkland Islands': '福克兰群岛',
                'France': '法国',
                'Gabon': '加蓬',
                'United Kingdom': '英国',
                'Georgia': '格鲁吉亚',
                'Ghana': '加纳',
                'Guinea': '几内亚',
                'Gambia': '冈比亚',
                'Guinea Bissau': '几内亚比绍',
                'Equatorial Guinea': '赤道几内亚',
                'Greece': '希腊',
                'Greenland': '格陵兰',
                'Guatemala': '危地马拉',
                'French Guiana': '法属圭亚那',
                'Guyana': '圭亚那',
                'Honduras': '洪都拉斯',
                'Croatia': '克罗地亚',
                'Haiti': '海地',
                'Hungary': '匈牙利',
                'Indonesia': '印尼',
                'India': '印度',
                'Ireland': '爱尔兰',
                'Iran': '伊朗',
                'Iraq': '伊拉克',
                'Iceland': '冰岛',
                'Israel': '以色列',
                'Italy': '意大利',
                'Jamaica': '牙买加',
                'Jordan': '约旦',
                'Japan': '日本',
                'Kazakhstan': '哈萨克斯坦',
                'Kenya': '肯尼亚',
                'Kyrgyzstan': '吉尔吉斯斯坦',
                'Cambodia': '柬埔寨',
                'South Korea': '韩国',
                'Kosovo': '科索沃',
                'Kuwait': '科威特',
                'Laos': '老挝',
                'Lebanon': '黎巴嫩',
                'Liberia': '利比里亚',
                'Libya': '利比亚',
                'Sri Lanka': '斯里兰卡',
                'Lesotho': '莱索托',
                'Lithuania': '立陶宛',
                'Luxembourg': '卢森堡',
                'Latvia': '拉脱维亚',
                'Morocco': '摩洛哥',
                'Moldova': '摩尔多瓦',
                'Madagascar': '马达加斯加',
                'Mexico': '墨西哥',
                'Macedonia': '马其顿',
                'Mali': '马里',
                'Myanmar': '缅甸',
                'Montenegro': '黑山',
                'Mongolia': '蒙古',
                'Mozambique': '莫桑比克',
                'Mauritania': '毛里塔尼亚',
                'Malawi': '马拉维',
                'Malaysia': '马来西亚',
                'Namibia': '纳米比亚',
                'New Caledonia': '新喀里多尼亚',
                'Niger': '尼日尔',
                'Nigeria': '尼日利亚',
                'Nicaragua': '尼加拉瓜',
                'Netherlands': '荷兰',
                'Norway': '挪威',
                'Nepal': '尼泊尔',
                'New Zealand': '新西兰',
                'Oman': '阿曼',
                'Pakistan': '巴基斯坦',
                'Panama': '巴拿马',
                'Peru': '秘鲁',
                'Philippines': '菲律宾',
                'Papua New Guinea': '巴布亚新几内亚',
                'Poland': '波兰',
                'Puerto Rico': '波多黎各',
                'North Korea': '北朝鲜',
                'Portugal': '葡萄牙',
                'Paraguay': '巴拉圭',
                'Qatar': '卡塔尔',
                'Romania': '罗马尼亚',
                'Russia': '俄罗斯',
                'Rwanda': '卢旺达',
                'Western Sahara': '西撒哈拉',
                'Saudi Arabia': '沙特阿拉伯',
                'Sudan': '苏丹',
                'South Sudan': '南苏丹',
                'Senegal': '塞内加尔',
                'Solomon Islands': '所罗门群岛',
                'Sierra Leone': '塞拉利昂',
                'El Salvador': '萨尔瓦多',
                'Somaliland': '索马里兰',
                'Somalia': '索马里',
                'Republic of Serbia': '塞尔维亚共和国',
                'Suriname': '苏里南',
                'Slovakia': '斯洛伐克',
                'Slovenia': '斯洛文尼亚',
                'Sweden': '瑞典',
                'Swaziland': '斯威士兰',
                'Syria': '叙利亚',
                'Chad': '乍得',
                'Togo': '多哥',
                'Thailand': '泰国',
                'Tajikistan': '塔吉克斯坦',
                'Turkmenistan': '土库曼斯坦',
                'East Timor': '东帝汶',
                'Trinidad and Tobago': '特里尼达和多巴哥',
                'Tunisia': '突尼斯',
                'Turkey': '土耳其',
                'United Republic of Tanzania': '坦桑尼亚联合共和国',
                'Uganda': '乌干达',
                'Ukraine': '乌克兰',
                'Uruguay': '乌拉圭',
                'United States of America': '美国',
                'Uzbekistan': '乌兹别克斯坦',
                'Venezuela': '委内瑞拉',
                'Vietnam': '越南',
                'Vanuatu': '瓦努阿图',
                'West Bank': '西岸',
                'Yemen': '也门',
                'South Africa': '南非',
                'Zambia': '赞比亚',
                'Zimbabwe': '津巴布韦'
            }
        }
    ],
    dataRange: {
        x: "left",
        //orient:"horizontal",
        //
        //y: "70%",
        min: 0,
        max: 100,
        value: 100,
        calculable: true,
        color: ['#ff3333', 'orange', 'yellow', 'lime', 'aqua'],
        textStyle: {
            color: '#000'
        }
    },
};



var _optionRelation = {
    title: {
        text: 'Relationship',
        //x: 'right',
        //y: 'bottom'
    },
    tooltip: {
        trigger: 'item',
        formatter: '{a} : {b} : {c}'
    },
    toolbox: {
        show: true,
        feature: {
            restore: { show: true },
            magicType: { show: true, type: ['force', 'chord'] },
            saveAsImage: { show: true }
        }
    },
    legend: {
        x: 'left',
        data: [_facetNameListsForRChart[0],
        _facetNameListsForRChart[1],
        _facetNameListsForRChart[2],
        _facetNameListsForRChart[3]]
    },
    series: [
        {
            type: 'force',
            name: "Relationship",
            ribbonType: false,
            categories: [
                {
                    name: _facetNameListsForRChart[0]
                },
                {
                    name: _facetNameListsForRChart[1]
                },
                {
                    name: _facetNameListsForRChart[2]
                }
                ,
                {
                    name: _facetNameListsForRChart[3]
                }
            ],
            itemStyle: {
                normal: {
                    label: {
                        show: true,
                        textStyle: {
                            color: '#333'
                        }
                    },
                    nodeStyle: {
                        brushType: 'both',
                        borderColor: 'rgba(255,215,0,0.4)',
                        borderWidth: 1
                    },
                    linkStyle: {
                        type: 'curve'
                    }
                },
                emphasis: {
                    label: {
                        show: false
                        // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
                    },
                    nodeStyle: {
                        //r: 30
                    },
                    linkStyle: {}
                }
            },
            useWorker: false,
            minRadius: 15,
            maxRadius: 25,
            gravity: 1.1,
            scaling: 1.1,
            roam: 'move',
            nodes: null,
            
            links: null,            
        }
    ]
};




var optionTimeline = {
    //renderAsImage:  true,
    title:
    {
        text: _alias + " " + timelineTitle,
        //subtext: '数据来源于时事探针',
        textStyle:
        {
            fontSize: 18,
            fontFamily: "'Microsoft YaHei',Arial"
        }
    },
    tooltip: {
        trigger: 'axis',
        textStyle:
        {
            fontSize: 12,
            fontFamily: "'Microsoft YaHei',Arial"
        }
    },
    legend: {
        data: ['All', 'Negative', 'Positive', 'Neutral'],
        orient: "horizontal",
        x: "right",
        y: "top",
        textStyle:
        {
            fontSize: 12,
            fontFamily: "'Microsoft YaHei',Arial"
        },
        selected: {
            'All': false,
            "全部": false
        },
    },
    toolbox: {
        show: true,
        orient: 'vertical',
        x: 'left',
        y: 'center',
        itemSize: 16,
        itemGap: 10,
        padding: 5,
        feature: {
            //mark: { show: true },
            dataView: { show: true, readOnly: false },
            dataZoom: { show: true },
            //magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
        }
    },
    calculable: true,
    xAxis: [
        {
            type: 'category',
            boundaryGap: false,
            data: null,
            //label: "#reports"
            axisLabel:
            {
                textStyle:
                {
                    fontSize: 12,
                    fontFamily: "'Microsoft YaHei',Arial"
                },

            }
        }
    ],
    dataZoom: {
        show: !_readOnly,
        realtime: true,
        start: 0,
        end: 100,
        //backgroundColor: 'rgba(221,160,221,0.5)',
        dataBackgroundColor: 'rgba(138,43,226,0.5)',
        //fillerColor: 'rgba(38,143,26,0.6)',
        //handleColor: 'rgba(128,43,16,0.8)',
    },
    yAxis: [
        {
            type: 'value',
            axisLabel:
            {
                textStyle:
                {
                    fontSize: 12,
                    fontFamily: "'Microsoft YaHei',Arial"
                },

            }
        }
    ],
    grid:
    {
        x1: 20,
        x2: 20
    },
    series: [
        {
            name: 'All',
            type: 'line',
            stack: 'Total',
            symbol: 'none',
            itemStyle: {
                normal: {
                    //areaStyle: { type: 'default', color: '#3399ff' },
                    color: '#ff7f50',
                    lineStyle: {
                        width: 2,
                        type: 'solid'
                    }
                }
            },
            data: null
        },
        {
            name: 'Negative',
            type: 'line',
            stack: 'Opinion',
            symbol: 'none',
            itemStyle: {
                normal: {
                    areaStyle: { type: 'default', color: '#FF0033' },
                    color: '#FF0033',
                    lineStyle: {
                        width: 1,
                        type: 'solid'
                    }
                }
            },
            data: null
        },
        {
            name: 'Positive',
            type: 'line',
            stack: 'Opinion',
            symbol: 'none',
            itemStyle: {
                normal: {
                    areaStyle: {
                        type: 'default',
                        color: '#33a02c'// '#3399ff'
                    },
                    color: '#33a02c',// '#3399ff',
                    lineStyle: {
                        width: 1,
                        type: 'solid'
                    }
                }
            },
            data: null
        },
        {
            name: 'Neutral',
            type: 'line',
            stack: 'Opinion',
            symbol: 'none',
            itemStyle: {
                normal: {
                    areaStyle: { type: 'default', color: '#CCCC00' },
                    color: '#CCCC00',
                    lineStyle: {
                        width: 1,
                        type: 'solid'
                    }
                }
            },
            data: null
        }

    ]
};







function createWordCloudStyle(word) {
    return {
        normal: {
            color: 'rgb(' + [
                Math.round(Math.random() * 160),
                Math.round(Math.random() * 160),
                Math.round(Math.random() * 160)
            ].join(',') + ')'

        }
    };
}

var _cloudChart;

var _optionCloud = {
    title: {
        text: '热门话题及实体',
        link: 'http://www.playbigdata.com'
    },
    tooltip: {
        show: true
    },
    series: [{
        name: '',
        type: 'wordCloud',
        size: ['99%', '99%'],
        textRotation: [0, 45, 90, -45],
        //itemStyle:
        //    {
        //        normal:{
        //            label: {
        //                show:true,
        //                textStyle:
        //                            {
        //                                fontFamily: "'Microsoft YaHei',Arial"
        //                            }
        //            }
        //        }


        //    },
        textPadding: 0,
        autoSize: {
            enable: true,
            minSize: 14
        },
        data: [
        ]
    }]
};



function GenerateTimeline(ec, keys, values, nFilter) {

    if (!_timelineChart) {

        optionTimeline.legend.data = [_opininStr[0], _opininStr[1], _opininStr[3], _opininStr[2]]
        optionTimeline.series[0].name = _opininStr[0];
        optionTimeline.series[1].name = _opininStr[1];
        optionTimeline.series[2].name = _opininStr[3];
        optionTimeline.series[3].name = _opininStr[2];

        if (_uiType == "big") {

            $("#timelineChart").show();
            _timelineChart = ec.init(document.getElementById('timeline'));
            _timelineChart.on("dataZoom", dataZoomed);
            optionTimeline.animation = false;

            optionTimeline.yAxis[0].axisLabel.textStyle.fontSize = 30;
            optionTimeline.xAxis[0].axisLabel.textStyle.fontSize = 30;
            optionTimeline.title.textStyle.fontSize = 45;

            optionTimeline.title.show = false;

            optionTimeline.toolbox.itemSize = 40;

            optionTimeline.toolbox.x = "center";
            optionTimeline.toolbox.y = "50";
            optionTimeline.toolbox.orient = "horizontal";

            optionTimeline.dataZoom.height = 120;


            optionTimeline.tooltip.textStyle.fontSize = 20;
            optionTimeline.legend.textStyle.fontSize = 30;
            optionTimeline.legend.y = 50;

            optionTimeline.grid.x = 100;
            optionTimeline.grid.y = 30;
            optionTimeline.grid.x2 = 20;
            optionTimeline.grid.y2 = 110;
            optionTimeline.toolbox.padding = [10, 10, 10, 30];


        } else {
            _timelineChart = ec.init(document.getElementById('timeline'));
            _timelineChart.on("dataZoom", dataZoomed);
            optionTimeline.animation = false;
        }

        $("#timeButton").show();
        handleResize();

    } else {
        optionTimeline.animation = false;
    }
    console.log(nFilter + " Filters");

    if (nFilter > 0) {
        optionTimeline.legend.selected.All = false;
    } else {
        optionTimeline.legend.selected.All = true;
    }
    optionTimeline.xAxis[0].data = keys;
    optionTimeline.series[1].data = values[0]; //neg
    optionTimeline.series[3].data = values[1]; //neu
    optionTimeline.series[2].data = values[2];//pos


    var total = 0, pos = 0, neg = 0, neu = 0, prob = 0;
    for (var i = 0; i < values[0].length; i++) {
        neg += values[0][i];
    }
    $("#numNeg").html(neg);

    for (var i = 0; i < values[1].length; i++) {
        neu += values[1][i];
    }
    $("#numNeu").html(neu);

    for (var i = 0; i < values[2].length; i++) {
        pos += values[2][i];
    }
    $("#numPos").html(pos);

    for (var i = 0; i < values[3].length; i++) {
        total += values[3][i];
    }

    //$("#numTotal").html(total);
    $("#numTotal").html(neg + neu + pos);

    var wilson = GetVoteRange(pos, neg, neu);

    var prob = wilson.vsProb.toFixed(3)
    $("#probOpinion").html(prob);

    optionTimeline.series[0].data = values[3];
    // 为echarts对象加载数据 
    _timelineChart.setOption(optionTimeline, true);
    _zoomStart = 0;
    _zoomEnd = 100;
    return _timelineChart;
}



function getHaosoIndexWithoutTest(keyword, start, end) {
    var inputStart;
    if (start) {
        inputStart = ParseTimeString(start);
    }
    var inputEnd;
    if (end) {
        inputEnd = ParseTimeString(end);
    }

    var url = "http://index.haosou.com/index.php?a=soIndexJson&q=" + encodeURIComponent(keyword) + "&area=%E5%85%A8%E5%9B%BD"
    $.ajax({
        url: url,
        type: "get",
        //data: {
        //    "keyword": keyword
        //},
        success: function (data) {
            if (data && data.data && data.data.index && data.data.index[keyword]) {
                var freqList = data.data.index[keyword];

                var startDateStr = data.data.index["period"].from;
                var endDateStr = data.data.index["period"].to;

                var startDate = ParseTimeString(startDateStr);
                var endDate = ParseTimeString(endDateStr);


                var count = 0;


                var freqItems = freqList.split(/|/);

                for (var i = 0; i < freqItems.length; i++) {
                    var thisDate = addDays(startDate, i);

                    if (inputStart && inputStart > thisDate) {
                        continue;
                    }
                    if (inputStart && inputEnd < thisDate) {
                        break;
                    }

                    count += freqItems[i];

                }
                console.log("total in haosou index: " + count);
                $("#numHaosoIndex").html(count);
                return count;

            }
        }
    }
    );
}

function getQueryDisplayHtml(keyword, alias) {

    var e = keyword;
    e = clearString(e);
    //if (e && e.length > 2) {
    //    if (e.substring(0, 1) == '"'
    //        && e.substring(e.lengh - 2, 1) == '"') {
    //        e = e.substring(1, e.length - 2);
    //    }
    //}

    if (e && e.length > 0) {
    } else {
        return "";
    }

    var en = HtmlEncode(e);



    var encodeAlias = "";
    if (alias != null && alias.length < 20) {
        encodeAlias = HtmlEncode(alias);
    } else {
        encodeAlias = HtmlEncode(alias.substring(0, 20)) + "...";
    }
    var u = encodeURIComponent(e);

    //var query = encodeURIComponent("\"" + e + "\"");
    //var en2 = HtmlEncode(clearString(e));

    var itemsEntity = [];
    itemsEntity.push("<div class='col-md-4 text-right' >");

    itemsEntity.push("<div class='lazyDiv' style='float:right'>");
    itemsEntity.push("<img class='homeLazyImg' style='height:48px;width:48px; ' data-original='" + _picServiceAddress + "?c=1&q="
        + u + "&market=" + _market + "'  title='" + en + "' alt='" + en + "' />"); //"&r=" + n +    
    itemsEntity.push("</div>");
    itemsEntity.push("<div style='font-size:2em;float:right'>");
    itemsEntity.push(encodeAlias);
    itemsEntity.push("</div>");

    itemsEntity.push("</div>");//

    itemsEntity.push("<div class=' col-md-8 text-right' >");
    itemsEntity.push("<div style='text-align:right'>");
    itemsEntity.push("<div style='float:left;'>");
    itemsEntity.push("<div style='color:black;font-size:2em;text-align:center' id='numTotal'>0");
    itemsEntity.push("</div>");
    itemsEntity.push("<div style='color:#333333;font-size:1em;text-align:center'>报道总数");
    itemsEntity.push("</div>");
    itemsEntity.push("</div>");

    itemsEntity.push("<div style='float:left;width:30px'>&nbsp;");
    itemsEntity.push("</div>");

    itemsEntity.push("<div style='float:left'>");
    itemsEntity.push("<div style='color:blue;font-size:2em;text-align:center' id='numPos'>0");
    itemsEntity.push("</div>");
    itemsEntity.push("<div style='color:#333333;font-size:1em;text-align:center'>正面报道");
    itemsEntity.push("</div>");
    itemsEntity.push("</div>");

    itemsEntity.push("<div style='float:left;width:30px'>&nbsp;");
    itemsEntity.push("</div>");

    itemsEntity.push("<div style='float:left'>");
    itemsEntity.push("<div style='color:red;font-size:2em;text-align:center'  id='numNeg'>0");
    itemsEntity.push("</div>");
    itemsEntity.push("<div style='color:#333333;font-size:1em;text-align:center'>负面报道");
    itemsEntity.push("</div>");
    itemsEntity.push("</div>");

    itemsEntity.push("<div style='float:left;width:30px'>&nbsp;");
    itemsEntity.push("</div>");

    itemsEntity.push("<div style='float:left'>");
    itemsEntity.push("<div style='color:orange;font-size:2em;text-align:center'   id='probOpinion'>0");
    itemsEntity.push("</div>");
    itemsEntity.push("<div style='color:#333333;font-size:1em;text-align:center'>倾向性评分");
    itemsEntity.push("</div>");
    itemsEntity.push("</div>");


    itemsEntity.push("<div style='float:left;width:30px'>&nbsp;");
    itemsEntity.push("</div>");

    itemsEntity.push("<div style='float:left'>");
    itemsEntity.push("<div style='color:orange;font-size:2em;text-align:center' id='numHaosouIndex'>0");
    itemsEntity.push("</div>");
    itemsEntity.push("<div style='color:#333333;font-size:1em;text-align:center'>互联网搜索次数");
    itemsEntity.push("</div>");
    itemsEntity.push("</div>");

    itemsEntity.push("</div>");

    itemsEntity.push("</div>");


    return itemsEntity.join("");
}


function getQueryDisplayHtmlExport(keyword, alias) {

    var e = keyword;
    e = clearString(e);

    if (e && e.length > 0) {
    } else {
        return "";
    }

    var en = HtmlEncode(e);



    var encodeAlias = "";
    if (alias != null && alias.length < 20) {
        encodeAlias = HtmlEncode(alias);
    } else {
        encodeAlias = HtmlEncode(alias.substring(0, 20)) + "...";
    }
    var u = encodeURIComponent(e);

    var itemsEntity = [];

    itemsEntity.push("<h1 style='text-align:center'>");
    itemsEntity.push(encodeAlias);
    itemsEntity.push("</h1>");

    itemsEntity.push("<h2>");
    itemsEntity.push("统计信息");
    itemsEntity.push("</h2>");

    itemsEntity.push("<table width='98%' border='1' style=' border-collapse:collapse'>")

    itemsEntity.push("<tr>")

    itemsEntity.push("<td >报道总数</td><td>");
    itemsEntity.push("<span id='numTotal'>0");
    itemsEntity.push("</span>");
    itemsEntity.push("</td>");


    itemsEntity.push("<td >正面报道</td><td>");
    itemsEntity.push("<span  id='numPos'>0");
    itemsEntity.push("</span>");
    itemsEntity.push("</td>");

    itemsEntity.push("</tr>")
    itemsEntity.push("<tr>")

    itemsEntity.push("<td >负面报道</td><td>");
    itemsEntity.push("<span  id='numNeg'>0");
    itemsEntity.push("</span>");
    itemsEntity.push("</td>");

    itemsEntity.push("<td >倾向性评分</td><td>");
    itemsEntity.push("<span id='probOpinion'>0");
    itemsEntity.push("</span>");
    itemsEntity.push("</td>");
    itemsEntity.push("</tr>")
    itemsEntity.push("</table>");


    return itemsEntity.join("");
}

function removeQuote(s) {
    if (s) {
        s = s.replace(/"/g, "");
    }
    return s;
}


function clearString(s) {
    if (s) {
        var pattern = new RegExp("[`~!@#$^&*()w'i=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;|{}【】‘；：”“'。，、？]")
        var rs = "";
        for (var i = 0; i < s.length; i++) {
            rs = rs + s.substr(i, 1).replace(pattern, '');
        }
        return rs;
    }
    return s;
}

function getBasicInfo(keyword, alias) {
    var html = getQueryDisplayHtml(keyword, alias);
    $("#basicInfoDiv").html(html);

    $(".homeLazyImg").lazyload();
    var startDate = GetURLParameter("mindate");
    var endDate = GetURLParameter("maxdate");

    getHaosoIndex(alias, startDate, endDate, function (cnt) {
        $("#numHaosouIndex").html(cnt);
    });

    $("#interestDiv").html("Checking...");
    keyword = removeQuote(keyword);
    $.ajax({
        url: "service.svc/HasInterest",
        type: "get",
        data: {
            "keyword": keyword
        },
        success: function (data) {

            var items = [];

            if (data && data) {
                items.push("<a href='#' onclick='removeInterest(\"" + keyword + "\")'>取消关注</a>");

                $("#interestDiv").html();
            } else {
                items.push("<a href='#' onclick='addInterest(\"" + keyword + "\")'>关注</a>");

            }
            //window.alert(_currUrl);
            if (_displayBigScreen) {
                var regex = new RegExp('(/' + _SearchPage + ')', 'gi');
                var bigUrl = _currUrl.replace(regex, "/big.aspx");
                items.push("&nbsp;&nbsp;<a href='" + bigUrl + "'>巨屏版</a>");
            }
            var h = items.join("");
            $("#interestDiv").html(h);
        }
    });
}

function addInterest(keyword) {
    $("#interestDiv").empty();

    $.ajax({
        url: "service.svc/AddInterest",
        type: "get",
        data: {
            "keyword": keyword
        },
        success: function (data) {
            if (data && data) {
                alert(data);
                getBasicInfo(keyword, _alias);
            } else {
            }
        }
    });
}

function removeInterest(keyword) {
    $("#interestDiv").empty();

    $.ajax({
        url: "service.svc/RemoveInterest",
        type: "get",
        data: {
            "keyword": keyword
        },
        success: function (data) {
            if (data && data) {
                alert(data);
                getBasicInfo(keyword, _alias);
            } else {
            }
        }
    });
}

function getWikiInfo(keyword, div) {
    console.log("begin to get wiki data");

    if (keyword && keyword.length > 0) {
    }
    else {
        console.log("empty query string");
        return;
    }
    var mkt = "en";
    if (_market == "zh-CN" || _market == "zh-cn") {
        mkt = "zh";
    }
    var url = "http://" + mkt + ".wikipedia.org/w/api.php?format=json&action=query&titles=" +
        encodeURIComponent(keyword) + "&prop=pageimages|categories|images|extracts|pageprops|info|iwlinks|langlinks&redirects=&continue&cllimit=100&exintro&lllimit=500&lllang=zh&imlimit=100&callback=?";
    var s = $.getJSON(url, function (data) {
        var pages = data.query.pages
        for (var p in pages) {
            if (pages.hasOwnProperty(p)) {
                var pdata = pages[p];
                var title = pdata.title;
                if (pdata.missing) {
                    //no data
                    return;
                }
                if (pdata.extract) {
                    var wikiDisplayUrl = "http://" + mkt + ".wikipedia.org/wiki/" + title;
                    var wikiUrl = "http://" + mkt + ".wikipedia.org/wiki/" + encodeURIComponent(title);
                    var html = [];
                    html.push("<a title='click to nagivate to wikipedia' target='_blank' href='" + wikiUrl + "'>From " + wikiDisplayUrl + "</a>");
                    html.push(pdata.extract);
                    $("#" + div).html(html.join(""));
                } else {
                }
            }
        }
    });

    //var en = htmlEncode(keyword);

    //var imgSrc = "<img src='" + gPicServiceAddress + "?c=1&q="
    //           + encodeURIComponent(keyword) + "&market=" + gMarket + "'  title='" + en + "' alt='" + en + "' />";
    //$("#divImg").html(imgSrc);

    console.log("done to get wiki data");

}


function dataZoomed(param) {
    //console.log(param);
    _zoomStart = param.zoom.start;
    _zoomEnd = param.zoom.end;
}

function handleResize() {
    window.onresize = function () {
        for (var key in chartLists) {
            if (chartLists[key].chart) {
                chartLists[key].chart.resize();
            }
        }
        if (_timelineChart)
            _timelineChart.resize();
        if (_relationChart)
            _relationChart.resize();

        if (_mapChart) {
            if (_uiType != "big") {               
                var width = $("#mapsDiv").width()
                $("#mapsDiv").css("height", width * 2);
            }
            console.log("resizing map chart");
            _mapChart.resize();
        }
        if (_worldMapChart) {
            _worldMapChart.resize();
        }
        if (_cloudChart) {
            _cloudChart.resize();
        }
    };
}

var _colorListLight = ["#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3",
    "#fdb462", "#b3de69", "#fccde5", "#d9d9d9", "#bc80bd"];
var _colorList = [
    /////

    //"#1f78b4",
    "#33a02c",
    "#b2df8a",
    "#a6cee3",
    "#fb9a99",
    "#fdbf6f",
    "#ff7f00",
    "#cab2d6",
    //"#6a3d9a",
    ///
    '#FCCE10',
    '#B5C334',
    "#e31a1c",//'#C1232B',

];



var _optionBarChart = {
    // 默认色板
    //color: ['#3399ff',
    //    '#ff7f50', '#87cefa', '#da70d6', '#32cd32', '#6495ed',
    //        '#ff69b4', '#ba55d3', '#cd5c5c', '#ffa500', '#40e0d0',
    //        '#1e90ff', '#ff6347', '#7b68ee', '#00fa9a', '#ffd700',
    //        '#6699FF', '#ff6666', '#3cb371', '#b8860b', '#30e0e0'],

    //color:["#8dd3c7","#ffffb3","#bebada", "#fb8072", "#80b1d3",
    //    "#fdb462","#b3de69","#fccde5","#d9d9d9","#bc80bd"],
    tooltip: {
        show: true,
        trigger: 'item',
        enterable: true,
        textStyle:
        {
            fontSize: 12
        },
        position: function (p) {
            // 位置回调
            //console.log && console.log(p);
            //return [p[0] + 10, p[1] - 10];
            return [0, p[1] + 30];
        },
        //backgroundColor:'rgba(51,160,45,0.7)',
        padding: 10,
        showDelay: 1000,
        formatter: function (params, ticket, callback) {
            //console.log(params)
            if (!_rucmode) {
                var res = params.name + ' : ' + params.value; //params.seriesName + ''

                if (_uiType == "big") {
                    res = "<a href=\"big.aspx?q=" + encodeURIComponent("\"" + params.name + "\"") + "\">" + params.name + "</a> : " + params.value;
                } else {
                    res = "<a href=\"" + _SearchPage + "?q=" + encodeURIComponent("\"" + params.name + "\"") + "\">" + params.name + "</a> : " + params.value;
                }
                var selectedItem = params.name;
                if (params.seriesName == "Opinion") {
                    for (var key in _opininStr) {
                        if (_opininStr[key] === selectedItem) {
                            selectedItem = key;
                            break;
                        }
                    }
                }

                else if (params.seriesName === "DataM_ChinaRegion1"
                    || params.seriesName === "DataM_ChinaRegion2"
                    || params.seriesName === "DataM_ChinaRegion3"
                    || params.seriesName === "PntData_ChinaRegion1"
                    || params.seriesName === "PntData_ChinaRegion2"
                    || params.seriesName === "PntData_ChinaRegion3"
                    //|| params.seriesName === "DataS_question.loc_province"
                    //|| params.seriesName === "DataS_question.loc_city"

                ) {

                    selectedItem = _regionMapping[selectedItem];
                }


                GetPreviewData(params.seriesName, selectedItem, callback, ticket, res);

                return res;
            }
            return null;
        }
    },
    title:
    {
        text: "default name",
        textStyle:
        {
            fontSize: 18
        }
    },
    legend: {
        data: ['Count'],
        padding: 0,
        show: false,
        textStyle:
        {
            fontSize: 12,
            fontFamily: "'Microsoft YaHei',Arial"
        }

    },
    toolbox: {
        show: true,
        feature: {
            
            dataView: { show: true, readOnly: false },           
            saveAsImage: { show: true },            
        }
    },
    xAxis: [
        {
            type: 'value',
            boundaryGap: [0, 0.01],
            xisTick: { onGap: false },
            axisLabel:
            {
                textStyle:
                {
                    fontSize: 12,
                    fontFamily: "'Microsoft YaHei',Arial"
                },

            }
        }
    ],
    yAxis: [
        {
            show: false,
            type: 'category',
            data: null,
            position: "left",
            axisTick:
            {
                inside: true
            },
            axisLabel:
            {
                clickable: true,
                textStyle:
                {
                    fontSize: 12,
                    fontFamily: "'Microsoft YaHei',Arial"
                },
                //formatter: function (val) {

                //    if (val.length > _axisLabelLength) {
                //        return val.substring(0, _axisLabelLength) + "...";
                //        //    //var segs = [];
                //        //    //for (var i = 0; i < val.length; i += _axisLabelLength) {
                //        //    //    if (i + _axisLabelLength >= val.length) {
                //        //    //        segs.push(val.substring(i));
                //        //    //    } else {
                //        //    //        segs.push(val.substring(i, i + _axisLabelLength));
                //        //    //    }
                //        //    //}
                //        //    //return val.split("").join("\n");
                //    }

                //    return val;
                //}
            }
        }
    ],
    grid:
    {
        //borderWidth:1,
        x: 10,
        y: 40,
        x2: 10,
        y2: 40
    },
    series: [
        {
            name: "sname",
            type: "bar",
            barMinHeight: 10,
            data: null,

            itemStyle: {
                emphasis:
                {
                    barBorderColor: '#DDDDDD',
                    barBorderWidth: 1,
                    label:
                    {
                        show: true,
                        textStyle:
                        {
                            color: 'black',
                            fontFamily: "'Microsoft YaHei',Arial"
                        }
                    }
                },
                normal: {
                    color: function (params) {
                        // build a color map as your need.
                        //var colorList = [
                        //  '#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#27727B',
                        //   '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
                        //   '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'
                        //];
                        //return colorList[params.dataIndex % 15];


                        //return _colorList[_colorList.length - params.dataIndex % _colorList.length - 1];
                        return _colorList[_colorList.length - params.dataIndex % _colorList.length - 1];
                    },
                    barBorderColor: '#666666',
                    barBorderWidth: 0,
                    label: {
                        show: true,
                        //clickable:true,
                        position: 'insideLeft',
                        textStyle: {
                            color: 'black',
                            //fontSize: 10,
                            fontFamily: "'Microsoft YaHei',Arial"
                        },
                        //formatter: '{a}{b}'
                        formatter: function (data) {
                            //console.log(data)
                            //console.log(value)

                            return data.name + "(" + data.value+")";
                        }
                    }
                }
            }
        }
    ],
};


var _optionBarChart2Big = {
    // 默认色板
    color: ['#3399ff',
        '#ff7f50', '#87cefa', '#da70d6', '#32cd32', '#6495ed',
        '#ff69b4', '#ba55d3', '#cd5c5c', '#ffa500', '#40e0d0',
        '#1e90ff', '#ff6347', '#7b68ee', '#00fa9a', '#ffd700',
        '#6699FF', '#ff6666', '#3cb371', '#b8860b', '#30e0e0'],
    tooltip: {
        show: true,
        trigger: 'item',
        enterable: true,
        textStyle:
        {
            fontSize: 20
        },
        position: function (p) {
            // 位置回调
            //console.log && console.log(p);
            //return [p[0] + 10, p[1] - 10];
            return [0, p[1] + 30];
        },
        padding: 10,
        
        formatter: function (params, ticket, callback) {
            //console.log(params)


            var res = params.name + ' : ' + params.value; //params.seriesName + ''

            if (_uiType == "big") {
                res = "<a href=\"RucStudentBig.aspx?q=" + encodeURIComponent("\"" + params.name + "\"") + "\">" + params.name + "</a> : " + params.value;
            } else {
                res = "<a href=\"" + _SearchPage + "?q=" + encodeURIComponent("\"" + params.name + "\"") + "\">" + params.name + "</a> : " + params.value;
            }
            var selectedItem = params.name;
            if (params.seriesName == "Opinion") {
                for (var key in _opininStr) {
                    if (_opininStr[key] === selectedItem) {
                        selectedItem = key;
                        break;
                    }
                }
            }

            else if (params.seriesName === "DataM_ChinaRegion1"
                || params.seriesName === "DataM_ChinaRegion2"
                || params.seriesName === "DataM_ChinaRegion3"
                || params.seriesName === "PntData_ChinaRegion1"
                || params.seriesName === "PntData_ChinaRegion2"
                || params.seriesName === "PntData_ChinaRegion3"
                //|| params.seriesName === "DataS_question.loc_province"
                //|| params.seriesName === "DataS_question.loc_city"

            ) {

                selectedItem = _regionMapping[selectedItem];
            }

            GetPreviewData(params.seriesName, selectedItem, callback, ticket, res);
            return res;
        }
    },
    title:
    {
        text: "default name",
        textStyle:
        {
            fontSize: 18
        }
    },
    legend: {
        data: ['Count'],
        padding: 0,
        show: false,
        textStyle:
        {
            fontSize: 12
        }

    },
    toolbox: {
        show: true,
        feature: {
            //mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true },
            deepdive: {
                show: true,
                title: '深度分析',
                icon: 'images/external.png',
                onclick: function () {
                    var href = "deep.aspx?q=" + encodeURIComponent(_q) + "&f=" + encodeURIComponent(this.option.facet);
                    window.open(href);
                    //console.log(this.option.facet);

                }
            }
        }
    },
    xAxis: [
        {
            type: 'value',
            boundaryGap: [0, 0.01],
            //xisTick: { onGap: false },
            axisLabel:
            {
                textStyle:
                {
                    fontSize: 12
                },

            }
        }
    ],
    yAxis: [
        {
            type: 'category',
            data: null,
            position: "left",
            axisLabel:
            {
                clickable: true,
                interval:0,
                textStyle:
                {
                    fontSize: 12,
                },
                formatter: function (val) {

                    if (val.length > _axisLabelLength) {
                        //return val.substring(0, _axisLabelLength) + "...";
                        return "..."+val.substring(val.length-_axisLabelLength) ;
                        //    //var segs = [];
                        //    //for (var i = 0; i < val.length; i += _axisLabelLength) {
                        //    //    if (i + _axisLabelLength >= val.length) {
                        //    //        segs.push(val.substring(i));
                        //    //    } else {
                        //    //        segs.push(val.substring(i, i + _axisLabelLength));
                        //    //    }
                        //    //}
                        //    //return val.split("").join("\n");
                    }

                    return val;
                }
            }
        }
    ],
    grid:
    {
        //borderWidth:1,
        x: 90,
        y: 40,
        x2: 25,
        y2: 40
    },
    //showDelay: 100,
    //animation: true,
    //animationDuration: function (idx) {
    //    // 越往后的数据时长越大
    //    return idx * 100;
    //},
    //animationEasing: 'elasticOut',
    animationDeley: function (idx) {
                return idx * 100;
            },
    animationDelayUpdate: function (idx) {
        return idx * 100;
    },
    animationEasing: 'elasticOut',
    series: [
        {
            name: "sname",
            type: "bar",
            data: null,
            //animationDeley: function (idx) {
            //    return idx * 10;
            //},

            itemStyle: {
                normal: {
                    color: function (params) {
                        
                        // build a color map as your need.
                        //var colorList = [
                        //    '#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#27727B',
                        //    '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
                        //    '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'
                        //];


                        var colorList = [
                            //'#990033', "#CC0033", "#990066",

                            "#993399", "#CC3399",
                            "#CC6699", "#CC99CC", "#FF9999", "#FF99CC", "#FFCCCC",
                            "#66CCCC", "#CCFF66", "#99CC00",
                            '#B5C334', '#FCCE10', '#E87C25', '#27727B',
                            '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
                            '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'
                        ];
                        //console.log(params);
                        return colorList[params.dataIndex % 20];
                    },
                    barBorderColor: '#666666',
                    barBorderWidth: 0,
                    label: {
                        show: true,
                        //clickable:true,
                        //position: 'insideBottom',
                        textStyle: {
                            color: 'blue',
                            fontSize: 10
                        },
                        //formatter:
                        //    {   
                        //    }
                    }
                }
            }
        }
    ],
};

var _optionPieChart = {
    // 默认色板
    color: ['#ff7f50', '#87cefa', '#da70d6', '#32cd32', '#6495ed',
        '#ff69b4', '#ba55d3', '#cd5c5c', '#ffa500', '#40e0d0',
        '#1e90ff', '#ff6347', '#7b68ee', '#00fa9a', '#ffd700',
        '#6699FF', '#ff6666', '#3cb371', '#b8860b', '#30e0e0'],
    tooltip: {
        show: true
    },
    title:
    {
        text: "default name",
        textStyle:
        {
            fontSize: 18
        }
    },
    legend: {
        data: null,
        padding: 0,
        show: false
    },
    toolbox: {
        show: true,
        feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
        }
    },

    //grid:
    //    {
    //        //borderWidth:1,
    //        x: 90,
    //        y: 40,
    //        x2: 25,
    //        y2: 40
    //    },
    series: [
        {
            name: "sname",
            type: "pie",
            data: null,
            itemStyle: {
                normal: {
                    label: {
                        show: true
                    }
                }
            }
        }
    ],
};

function GenerateRelationChart(ec, nodes, links) {

    if (!_relationChart) {
        _relationChart = ec.init(document.getElementById('relationshipChart'));
        handleResize();
    }

    _optionRelation.series[0].nodes = nodes;
    _optionRelation.series[0].links = links;
    _relationChart.setOption(_optionRelation, false);
    UpdateRelations(links, 0);
}

function GenerateWordCloudChart(ec, dataWordCloud) {
    if (!_cloudChart) {

        if (_uiType == "big") {
            //clsName = "LargeBarChart";
            _optionCloud.title.text = "";
            _optionCloud.series[0].autoSize.minSize = 25;
        } else {
            $("#cloudDiv").addClass("height", 500);
        }
        _cloudChart = ec.init(document.getElementById('cloudDiv'));
        handleResize();
    }

    var items = [];
    for (var i = dataWordCloud.length - 1; i >= 0; i--) {
        items.push(dataWordCloud[i]);
    }

    _optionCloud.series[0].data = items;
    _cloudChart.setOption(_optionCloud, true);

}



var ruc_building_pos_baidu = {

    "中国人民大学": [116.319769, 39.976546],
    '知行5楼': [116.31645, 39.978772],
    '知行2楼': [116.316466, 39.978352],
    '品园5楼': [116.315392, 39.976133],
    '品园1楼': [116.314326, 39.974646],
    '品园2楼': [116.315557, 39.974743],
    '知行4楼': [116.316655, 39.978895],
    '品园6楼': [116.316461, 39.974837],
    '东风6楼': [116.325594, 39.976019],
    '知行1楼': [116.317291, 39.978419],
    '东风7楼': [116.325349, 39.976571],
    '宜园3楼': [116.316556, 39.977679],
    '红3楼': [116.324433, 39.977025],
    '知行3楼': [116.317344, 39.97888],
    '品园3楼': [116.315581, 39.975195],
    '家属区': [116.320051, 39.978038],
    '北园5楼': [116.317051, 39.980731],
    '品园4楼': [116.31549, 39.975704],
    '北园2楼': [116.318052, 39.979897],
    '红2楼': [116.32441, 39.976627],
    '青年公寓': [116.323991, 39.974266],
    '培训1楼': [116.317672, 39.974452],
    '红1楼': [116.324388, 39.97614],
    '北园6楼': [116.316566, 39.980361],
    '汇贤楼B座': [116.314318, 39.975996],
    '红03楼东': [116.324433, 39.977025],
    '静园22楼': [116.317279, 39.978125],
    '静园3楼': [116.320051, 39.978038],
    '静园14楼': [116.319243, 39.979253],
    '静园5楼': [116.319693, 39.978605],
    '静园10楼': [116.319082, 39.978046],
    '静园20楼': [116.318193, 39.97891],
    '静园15楼': [116.318332, 39.977326],
    '静园1楼': [116.320144, 39.97739],
    '静园12楼': [116.319103, 39.978625],
    '静园7楼': [116.320576, 39.979309],
    '静园8楼': [116.319227, 39.977362],
    '林园12楼': [116.32177, 39.978728],
    '静园19楼': [116.318157, 39.978605],
    '静园16楼': [116.318278, 39.977663],
    '静园2楼': [116.3201, 39.977694],
    '静园4楼': [116.320054, 39.978353],
    '宜园01楼': [116.31639, 39.977239],
    '宜园1楼': [116.31639, 39.977239],
    '静园17楼': [116.318176, 39.977942],
    '静园13楼': [116.319061, 39.978925],
    '静园9楼': [116.319142, 39.97768],
    '静园18楼': [116.318224, 39.978247]
};


function getBuildingGeoData(items) {
    var geoData = [];
        
    for (var i = 0; i < items.length; i++) {
        var building = items[i][0];
        var value = items[i][1];
        //console.log(value);
        building = building.replace("家属区-", "");
        if (ruc_building_pos_baidu[building]) {
            var pos = ruc_building_pos_baidu[building];
            geoData.push({
                "count": value,
                "lng": pos[0],
                "lat": pos[1],
                "name": building
            })
        }
    }

    //console.log(geoData);

    return geoData;
}


function getGeoData(view) {
    var geoData = [];
    var iResult = 0;
    var n = view.Documents.length;

    for (iResult = 0; iResult < n; iResult++) {
        //console.log(view.Documents[iResult]);
        var p = view.Documents[iResult];
        if (p.DataS != null && p.DataS.length > 0) {
            for (var iEntity = 0; iEntity < p.DataS.length; iEntity++) {
                var k = p.DataS[iEntity].Key;
                if (k == "Pos") {
                    var e = p.DataS[iEntity].Value;
                    if (e != "") {
                        var items = e.split(",")
                        geoData.push([
                            parseFloat( items[0]),
                            parseFloat(items[1])]
                        );
                    }
                }

            }
        }
    }
    return geoData;

}

function GenerateHeatMapChart(dataRuc) {
    if (!_heapMapChart) {
        _heapMapChart = new AMap.Map('container', {
            features: ['bg', 'road'],
            mapStyle: 'amap://styles/1de318cbb8d12c02303a22c550b9ccc9',
            center: [116.322056, 39.89491],//北京
            pitch: 56,
            zoom: 10.4,
            viewMode: '3D'
        });
    }
    var layer = new Loca.HeatmapLayer({
        map: _heapMapChart,
    });

    layer.setData(dataRuc, {
        lnglat: function (data) {
            return [data.value.lng, data.value.lat]
        },
        value: 'queue_len'
    });

    layer.setOptions({
        style: {
            radius: 18,
            color: {
                0.5: '#2c7bb6',
                0.65: '#abd9e9',
                0.7: '#ffffbf',
                0.9: '#fde468',
                1.0: '#d7191c'
            }
        }
    }).render();
    

}


function GenerateMapChart(ec, dataProv, dataCity) {
    console.log("GenerateMapChart");

    console.log(dataProv);
    if (!_mapChart) {

        if (_uiType == "big") {
            //clsName = "LargeBarChart";
            _mapChart = ec.init(document.getElementById('mapsDiv'));
            handleResize();
        } else {
            //$("#mapsDiv").css("height", 600);
            if (_rucmode) {
                var width = $("#mapsDiv").width()
                $("#mapsDiv").css("height", width*2);
            } else {
                $("#mapsDiv").css("height", 500);
            }
        }
        _mapChart = ec.init(document.getElementById('mapsDiv'));
        handleResize();
    }

    
    var maxRange = 1000;

    if (dataProv.length > 0) {
        var prov = dataProv[dataProv.length - 1];
        if (prov.value > 0) {
            prov.selected = true;
        } else {
            prov.selected = false;
        }
        _mapOption.series[1].mapType = prov.name;
        maxRange = prov.value;
        if (maxRange > 10) {
            maxRange = Math.round(maxRange * 0.8);
        }

        var idx = dataProv.length * 0.9;
        for (var j = 0; j < dataProv.length; j++) {
            if (j > idx) {
                maxRange = dataProv[j].value;
                break;
            }
        }

        console.log(maxRange);

        _mapOption.dataRange.max = maxRange;
        _mapOption.dataRange.value = maxRange;

    }
    if (_uiType == "big") {
        _mapOption.series[0].mapLocation.width = '100%';
        _mapOption.series[0].mapLocation.height = '50%';
        _mapOption.series[1].mapLocation.x = '0%';
        _mapOption.series[1].mapLocation.y = '50%';
    } else {
        if (_rucmode) {
            //if ($("#mapsDiv").width <= 600) {
                _mapOption.series[0].mapLocation.width = '100%';
                _mapOption.series[0].mapLocation.height = '50%';
                _mapOption.series[1].mapLocation.x = '0%';
                _mapOption.series[1].mapLocation.y = '50%';
            //} else {
            //    _mapOption.series[0].mapLocation.width = '50%';
            //    _mapOption.series[0].mapLocation.height = '100%';
            //    _mapOption.series[1].mapLocation.x = '50%';
            //    _mapOption.series[1].mapLocation.y = '0%';
            //}
        }
    }
    _mapOption.series[0].data = dataProv;
    _mapOption.series[1].data = dataCity;
    _mapChart.setOption(_mapOption, true);

    console.log(_mapChart);

    _mapChart.on("click", function (param) {
        //var selected = param.selected;
        var selectedProvince = param.name;
        //var name;
        //for (var i = 0, l = _mapOption.series[0].data.length; i < l; i++) {
        //    name = _mapOption.series[0].data[i].name;
        //    _mapOption.series[0].data[i].selected = selected[name];
        //    if (selected[name]) {
        //        selectedProvince = name;
        //    }
        //}
        _mapOption.series[1].mapType = selectedProvince;
        _mapChart.setOption(_mapOption, true);
    });

}



function GenerateWorldMapChart(ec, dataCountry) {

    if (!_worldMapChart) {

        if (_uiType == "big") {
            //clsName = "LargeBarChart";            
        } else {
            $("#worldMapDiv").css("height", 600);
        }
        _worldMapChart = ec.init(document.getElementById('worldMapDiv'));
        handleResize();
    }
    var maxRange = 1000;

    if (dataCountry.length > 0) {
        var prov = dataCountry[dataCountry.length - 1];
        //prov.selected = true;
        maxRange = prov.value;
        if (maxRange > 10) {
            maxRange =Math.round( maxRange * 0.8,0);
        }
        var idx = dataCountry.length * 0.9;
        for (var j = 0; j < dataCountry.length; j++) {
            if (j > idx) {
                maxRange = dataCountry[j].value;
                break;
            }
        }
        _worldMapOption.dataRange.max = maxRange;
        _worldMapOption.dataRange.value = maxRange;
    }
    if (_uiType == "big") {
        //do not display world map
        //_mapOption.series[0].mapLocation.width = '100%';
        //_mapOption.series[0].mapLocation.height = '50%';
        //_mapOption.series[1].mapLocation.x = '0%';
        //_mapOption.series[1].mapLocation.y = '50%';
    } else {
    }
    _worldMapOption.series[0].data = dataCountry;
    _worldMapChart.setOption(_worldMapOption, true);

    _worldMapChart.on("click", function (param) {
        //var selected = param.selected;
        //var selectedProvince = param.name;        
        //_mapOption.series[1].mapType = selectedProvince;
        //_mapChart.setOption(_mapOption, true);
    });

}


var relationRunIdx = 0;
function UpdateRelations(links, idx) {

    var n = links.length;
    if (idx >= n) {
        var newLinks = [];
        for (var i = 0; i < links.length; i++) {
            if (links[i].weight > 0) {
                newLinks.push(links[i]);
            }
        }
        _optionRelation.series[0].links = newLinks;
        _relationChart.setOption(_optionRelation, false);
        return;
    }
    $.ajax({
        url: "service.svc/GetHitCount",
        type: "get",
        data: {
            //"query": "\""+ links[i].source+"\" \""+ links[i].target+"\"",                
            //"query": _q + " " + links[idx].source + " " + links[idx].target,
            "query": _q + " " + links[idx].sourceq + " " + links[idx].targetq,
        },
        error: ErrorCallback,
        success: function (data) {
            links[idx].weight = data;
            links[idx].name = data;
            _optionRelation.series[0].links = links;
            _optionRelation.title.text = "Relation - " + idx + "/" + n;
            _relationChart.setOption(_optionRelation, false);

            if (idx < n) {
                UpdateRelations(links, idx + 1);
            }


        }
    });

}


function GenerateOneChart(ec, name, sname, keys, values, keyvalues, iPos) {

    var chartObject = chartLists[sname];

    var height = 80 + 25 * _dimensionSize;
    //console.log(height);

    var half = false;
    var clsName = "BarChart";
    if (_uiType == "big") {
        clsName = "LargeBarChart";

        if (sname == "DataS_InChina" || sname == "DataM_CityRailway"
            || sname == "DataM_ProvRailway"
            || sname == "DataS_Type2"
            || sname == "DataS_Type"
            || sname == "DataS_LastYear"
            || sname == "DataS_BuildingType"
            || sname == "DataS_IsPreSelected"
            || sname == "DataS_IsInRuc"
            ||sname=="DataS_Gender"
||sname=="DataS_JobType"
            ) {
            clsName = "HalfLargeBarChart";
            half = true;
        }

    } else {
        if (_dimensionSize == 20 || _dimensionSize == 30 || _dimensionSize == 40
            || _dimensionSize == 50) {
            clsName = clsName + _dimensionSize;
        }
    }
    if (!chartObject) {
        var chartDiv = "div_" + name;

        var chartContainerDiv = "div_container_" + name;
        var node;
        if (_uiType == "big") {
            var n = name;
            if (_cnFacetNames[name] != null) {
                n = _cnFacetNames[name];
            }
            var containerClass = "LargeBarChartContainer";
            if (half) {
                containerClass = "HalfLargeBarChartContainer";
            }

            var barHtml = "<div class='"+containerClass+"'  id='" + chartContainerDiv + "' ><div class='selectBar'>" + n + " </div><div id='" + chartDiv + "' class='" + clsName + "' ></div></div>";

            if (half) {
                node = $("#emptyDiv").after(barHtml);
            } else {
                node = $("#main").append(barHtml);
            }
            //if (iPos % 2 == 0) {
            //    node = $("#emptyDiv").after(barHtml);
            //} else {
            //    node = $("#main").append(barHtml);
            //}
            
        }//big interface
        else {
            //normal interface
            //node = $("#main").append("<div class='col-xs-12 col-sm-4  col-md-3 " + clsName + "' id='div_" + name + "' style='padding-right:2px;padding-left:2px'></div>");
            //<div class='BarChart' id='div_" + name + "_chart'></div><a>Clear</a>

            node = $("#main").append("<div class='col-xs-12 col-sm-4  col-md-3 " + clsName +
                "' id='div_" + name + "' style='padding-right:2px;padding-left:2px;height:" + height + "px'></div>");
            //<div class='BarChart' id='div_" + name + "_chart'></div><a>Clear</a>
            node.height(height);

        }

        var chart = ec.init(document.getElementById('div_' + name));// + "_chart"
        chartObject = {
            "name": sname,
            "chart": chart,
            "status": 1,
            "div": chartDiv,
            "cdiv": chartContainerDiv,
            "height": height
        };
        chartLists[sname] = chartObject;
        chart.on("click", ClickToAddFilter);
        handleResize();
    }
    else {
        if (_uiType == "big") {
            chartObject.status = 1;
        } else {
            if (chartObject.height != height) {
                //$("#" + chartObject.div).removeClass(chartObject.class).addClass(clsName);
                //chartObject.class = clsName;
                $("#" + chartObject.div).height(height);
                chartObject.chart.resize();
            }
            chartObject.status = 1;
        }
    }
    var chart = chartObject.chart;
    //if (name == "Opinion") {        
    //    _optionPieChart.title.text = name;        
    //    _optionPieChart.series[0].name = sname;
    //    _optionPieChart.legend.data = keys;
    //    _optionPieChart.series[0].data = keyvalues;
    //    chart.setOption(_optionPieChart, true);       

    //    return chartObject;
    //}

    var displayName = name;

    if (_uiType == "big") {
        _optionBarChart2Big.title.text = name;
        _optionBarChart2Big.yAxis[0].data = keys;
        _optionBarChart2Big.series[0].name = sname;
        _optionBarChart2Big.series[0].data = values;
        _optionBarChart2Big.facet = sname;
    } else {
        _optionBarChart.title.text = name;
        _optionBarChart.yAxis[0].data = keys;
        _optionBarChart.series[0].name = sname;
        _optionBarChart.series[0].data = values;
        _optionBarChart.facet = sname;
    }

    

    var maxTextLength = 0;
    for (var t = 0; t < keys.length; t++) {
        if (keys[t]) {
            if (keys[t].length > maxTextLength) {
                maxTextLength = keys[t].length;
            }
        } else {
            console.log(keys[t]);
        }
    }
    var ratio = maxTextLength / _axisLabelLength;


    if (_uiType == "big") {

        var maxTextLength = 0;
        for (var i = 0; i < keys.length; i++) {
            if (keys[i].length > maxTextLength) {
                maxTextLength = keys[i].length;
            }
        }

        _optionBarChart2Big.xAxis[0].axisLabel.textStyle.fontSize = 20;
        _optionBarChart2Big.yAxis[0].axisLabel.textStyle.fontSize = 30;


       


        _optionBarChart2Big.title.show = false;
        //_optionBarChart.title.textStyle.fontSize = 45;


        _optionBarChart2Big.toolbox.show = false;
        //_optionBarChart.toolbox.itemSize = 40;
        //_optionBarChart.toolbox.padding = [10, 30, 10, 10];

        _optionBarChart2Big.tooltip.textStyle.fontSize = 20;
        _optionBarChart2Big.series[0].itemStyle.normal.label.textStyle.fontSize = 25;


        if (_dimensionSize > 20) {
            _optionBarChart2Big.yAxis[0].axisLabel.textStyle.fontSize = 20;
        }

        if (_dimensionSize > 40) {
            _optionBarChart2Big.yAxis[0].axisLabel.textStyle.fontSize = 16;
            _optionBarChart2Big.series[0].itemStyle.normal.label.textStyle.fontSize = 16;
        }

        if (maxTextLength <= 2) {
            _optionBarChart2Big.grid.x = 100;
        } else if (maxTextLength == 3) {
            _optionBarChart2Big.grid.x = 120;
        } else if (maxTextLength == 4) {
            _optionBarChart2Big.grid.x = 150;
        }
        else if (maxTextLength == 5) {
            _optionBarChart2Big.grid.x = 180;
        } else if (maxTextLength == 6) {
            _optionBarChart2Big.grid.x = 210;
        } else {
            _optionBarChart2Big.grid.x = 250;
        }

        //_optionBarChart.grid.y = 110;
        _optionBarChart2Big.grid.y = 10;
        _optionBarChart2Big.grid.x2 = 70;
        _optionBarChart2Big.grid.y2 = 40;

        chart.setOption(_optionBarChart2Big, true);
    }
    else {
        //if (ratio > 1) {
        //    _optionBarChart.grid.x = "50%";
        //}
        //else {
        //}

        chart.setOption(_optionBarChart, true);
    }
    //chart.setOption(_optionBarChart, true);

    return chartObject;
}

function FilterByTime() {

    var timeList = _timelineChart.getOption().xAxis[0].data;

    var n = timeList.length;
    if (n <= 0) {
        return;
    }

    if (_zoomEnd == 0 && _zoomStart == 0) {
        //clear
    } else {
        var iStart = Math.floor(n * _zoomStart / 100);
        if (iStart < 0) iStart = 0;
        var iEnd = Math.ceil(n * _zoomEnd / 100);
        if (iEnd >= n) {
            iEnd = n - 1;
        }
        var startDate = timeList[iStart];
        var endDate = timeList[iEnd];

        if (_currDateGap > 1) {
            var ed = ParseTimeString(endDate);
            ed = addDays(ed, _currDateGap - 1);
            endDate = GetDateString(ed);
        }

        $.ajax({
            url: "service.svc/FilterByTime",
            type: "get",
            data: {
                "url": _currUrl,
                "dtMin": startDate,
                "dtMax": endDate
            },
            success: UpdateDataCallback
        }
        );
    }

}

function ClickToAddFilter(param) {
    //var mes = '【' + param.type + '】';
    //if (typeof param.seriesIndex != 'undefined') {
    //    mes += '  seriesIndex : ' + param.seriesIndex;
    //    mes += '  dataIndex : ' + param.dataIndex;
    //}
    //if (param.type == 'hover') {
    //    console.log('Event Console : ' + mes);
    //}
    //else {
    //    console.log(mes);
    //}
    console.log(param);

    //console.log(this);
    if ((typeof param.seriesIndex != 'undefined') && (param.seriesIndex != -1)) {
        if (param.data && param.data.selected) {
            //clear 
            console.log("remove filter " + param.seriesName);
            RemoveFilter(param.seriesName);
        }
        else {
            console.log("add filter");
            //var selectedItem = param.name;
            var selectedItem = param.data.orikey; //因为_dimItemRename中可能对key进行过修改
            if (param.seriesName === "Opinion") {
                for (var key in _opininStr) {
                    if (_opininStr[key] === selectedItem) {
                        selectedItem = key;
                        break;
                    }
                }
            }
            else if (param.seriesName === "DataM_ChinaRegion1"
                || param.seriesName === "DataM_ChinaRegion2"
                || param.seriesName === "DataM_ChinaRegion3"
                || param.seriesName === "PntData_ChinaRegion1"
                || param.seriesName === "PntData_ChinaRegion2"
                || param.seriesName === "PntData_ChinaRegion3"
                //|| params.seriesName === "DataS_question.loc_province"
                //|| params.seriesName === "DataS_question.loc_city"
            ) {

                selectedItem = _regionMapping[selectedItem];
            }

            $.ajax({
                url: "service.svc/GetUrl",
                type: "get",
                data: {
                    "url": _currUrl,
                    "fname": param.seriesName,
                    "fvalue": selectedItem
                },
                success: UpdateDataCallback,
                error: ErrorCallback
            }
            );
        }
    }
    if (param.seriesIndex == -1 && param.name) {
        //alert(param.name);
    }
}

function ChangeSort(sort) {
    SetParam("sort", sort, true, false);
}

function ChangeDSize(size) {
    SetParam("icount", size, false, false);
}

function SetParam(pname, pvalue, nofacet, timeline) {
    $.ajax({
        url: "service.svc/SetParam",
        type: "get",
        data: {
            "url": _currUrl,
            "pname": pname,
            "pvalue": pvalue
        },
        success: function (data) {
            var url = data;
            GetSearchResults(url, nofacet, timeline);
        }
    }
    );
}



function GetSearchResults(url, noFacet, timeline) {
    _currUrl = url;
    $("#fullUrl").attr("href", _currUrl);
    $("#fullUrl").text(_currUrl);

    var url = "eriver.aspx?u=" + encodeURIComponent(_currUrl) + "&q=" + encodeURIComponent(_q) + "&f=Nugget";

    if (_topic) {
        url = url + "&t=" + _topic;
    }

    $("#eventRiverPageLink").attr("href", url);
    $("#eriverLink").attr("href", url);

    url = "export.aspx?u=" + encodeURIComponent(_currUrl) + "&q=" + encodeURIComponent(_q);
    if (_topic) {
        url = url + "&t=" + _topic;
    }
    $("#exportLink").attr("href", url);
    $("#exportLink").show();




    url = "deep.aspx?q=" + encodeURIComponent(_q);
    if (_topic) {
        url = "deep.aspx?q=" + encodeURIComponent(_q) + "&t=" + _topic;
    }

    $("#deepDivLink").attr("href", url);

    url = "group.aspx?q=" + encodeURIComponent(_q);
    if (_topic) {
        url = "group.aspx?q=" + encodeURIComponent(_q) + "&t=" + _topic;
    }

    $("#groupLink").attr("href", url);

    url = "graph.aspx?q=" + encodeURIComponent(_q);
    $("#graphLink").attr("href", url);


    //$("#urlInfo").show();



    GenerateCharts(_currUrl, noFacet, timeline);
}



function GetSearchResultsExport(url, noFacet, timeline) {
    _currUrl = url;
    $("#fullUrl").hide();
    $("#eventRiverPageLink").hide();
    $("#eriverLink").hide();
    $("#exportLink").hide();
    $("#deepDivLink").hide();
    $("#groupLink").hide();
    $("#graphLink").hide();
    $("#urlInfo").hide();
    GenerateChartsExport(_currUrl, noFacet, timeline);
}


function UpdateDataCallback(data) {
    var url = data;
    GetSearchResults(url, false, true);
}
function ErrorCallback(XMLHttpRequest, textStatus, errorThrown) {
    displayMessage("Sorry that we failed to process your request.", "error");
}

function displayMessage(msg, type) {

    var align = "";
    var infoId = "#alertInfo";
    var alertId = "#alertInfo";
    if (_uiType == "big") {
        align = " text-right row";
        //alertId = "#alert";
    }

    $("#alertInfo").show();
    if (type == "error") {
        $(alertId).attr("class", "alert alert-danger" + align);
    }
    else if (type == null || type == "info") {
        $(alertId).attr("class", "alert alert-info" + align);
    }
    else if (type == "suc") {
        $(alertId).attr("class", "alert alert-success" + align);
    }
    $(infoId).html("<strong>" + _q + "</strong>&nbsp;&nbsp;" + msg);

}


function RemoveFilter(facet) {
    $.ajax({
        url: "service.svc/RemoveFilter",
        type: "get",
        data: {
            "url": _currUrl,
            "fname": facet,
        },
        success: UpdateDataCallback
    }
    );
}

function RemoveAllFilters() {
    $.ajax({
        url: "service.svc/RemoveAllFilters",
        type: "get",
        data: {
            "url": _currUrl,
        },
        success: UpdateDataCallback
    }
    );
}

//please check DisplayFiltersCompact
function DisplayFilters(data) {
    if (data)
        console.log("Filters:" + data);

    $("#filter").empty();
    if (data && data.Search && data.Search.FreeSearch) {
        $("#filter").html("<strong>" + data.Search.FreeSearch + "</strong>");
    }

    var i, n = data.Search.Facets.length;
    if (n > 0) {
        var items = [];


        items.push("<div class=\"panel panel-warning\">");
        items.push("<div class=\"panel-heading\">");
        items.push("<h3 class=\"panel-title\">");
        items.push("Current Filters:");
        items.push("</h3>");
        items.push("<a onclick='RemoveAllFilter()'>Clear All Filters</a>");
        items.push("</div>");

        items.push("<div class=\"panel-body\">");

        for (i = 0; i < n; i++) {
            var facet = data.Search.Facets[i];
            var style = "success";

            items.push("<div class=\"row\">");
            //facet name
            items.push("<div class='col-md-2 col-sm-2 col-xs-12'>");
            items.push("<h4 class='text-left'>");
            items.push(facet.Key);
            items.push("</h4>");
            items.push("</div>");
            items.push("<div class='col-md-10 col-sm-10 col-xs-12'>");
            items.push("<p>");
            items.push("<a class='btn btn-" + style + "' facet-key='"
                + HtmlEncode(facet.Key)
                + "' facet-value='" + HtmlEncode(facet.Value) +
                "' onclick='RemoveFilter(\"" + HtmlEncode(facet.Key) + "\")'><i class=\"fa fa-times\"></i>" +
                facet.Value + "</a>");
            items.push("</p>");
            items.push("</div>");
            items.push("</div>");//row
        }

        items.push("</div>");
        //items.push("<div class=\"panel-footer\">Panel footer</div>");
        items.push("</div>");

        $("#filter").append(items.join(""));
    }
}

function GetFilters(data) {
    var i, n = data.Search.Facets.length;
    var filters = {};
    for (i = 0; i < n; i++) {
        var facet = data.Search.Facets[i];
        filters[facet.Key] = facet.Value;
    }
    return filters;
}

function DisplayFiltersCompact(filters, view) {

    var n = 0;
    var items = [];


    var statCountHtml = [];


    items.push("<strong>Filters<strong>:");

    jQuery.each(filters, function (key, value) {
        n++;

        var displayValue = value;
        if (key === "Opinion" && _opininStr[value]) {
            displayValue = _opininStr[value];
        }
        else {
            if (_dimItemRename && _dimItemRename[key]) {
                var vRename = _dimItemRename[key][value];
                if (vRename) {
                    displayValue = vRename;
                }
            }
        }


        items.push("[<a facet-key='" + HtmlEncode(key) +
            "' facet-value='" + HtmlEncode(value) //class='btn btn-" + style + "'
            + "' onclick='RemoveFilter(\"" +
            HtmlEncode(key) + "\")'  style='cursor:pointer;margin-right:5px'><i class=\"fa fa-times\"></i>" +
            HtmlEncode(displayValue) + "</a>]");

        //statCountHtml.push(key);
        //statCountHtml.push("为");
        //statCountHtml.push(HtmlEncode(displayValue));
        //if (n < filters.length) {
        //    statCountHtml.push("，");
        //}
    });
    //if (filters.length > 0) {
    //    statCountHtml.push("的");
    //}
    statCountHtml.push("共有<div id='cinfo'>");
    statCountHtml.push(view.Paging.TotalItemCount);
    statCountHtml.push("</div>位学生");
    items.push("[<a onclick='RemoveAllFilters()' style='cursor:pointer;'><i class=\"fa fa-times\"></i>ALL</a>]");

    //items.push("</div>");

    //if (_uiType == "big") {
    //    $("#filter").html();
    //}
    //else {

    //}


    if (_uiType == "big") {
        var itemsFull = [];
        var html = "<strong>共有关于" + view.Search.FreeSearch + "的" + view.Paging.TotalItemCount + "个学生。</strong>&nbsp;";


        itemsFull.push(html);

        if (n > 0) {

            itemsFull.push(items.join(""));
        }
        $("#filter").html(itemsFull.join(""));

        $("#statCount").html(statCountHtml.join(""));

    } else {
        var itemsFull = [];


        var html = "<div class='counting'>共 <span >" + view.Paging.TotalItemCount + " </span>个学生【" + view.Search.FreeSearch + "】</div>&nbsp;";
        itemsFull.push("<div class='col-md-6 col-sm-6 col-xs-12 text-left'>");
        if (!_readOnly) {
            itemsFull.push(html);
        }
        itemsFull.push("</div>");

        if (n > 0) {
            itemsFull.push("<div class='col-md-6 col-sm-6 col-xs-12 text-right'>");
            itemsFull.push(items.join(""));
            itemsFull.push("</div>");
        }
        $("#filter").html(itemsFull.join(""));
    }


}

function Name2Category(name) {
    var n = _facetNameListsForRChart.length;
    for (var i = 0; i < n; i++) {
        if (_facetNameListsForRChart[i] === name) {
            return i;
        }
    }
    return -1;
}

function GenerateChartsExport(currUrl, noFacet, timeline) {


}

function GenerateCharts(currUrl, noFacet, timeline) {

    if (_uiType == "big") {
        displayMessage("分析处理中，请稍后...", "info");
    } else {
        displayMessage("正在处理...", "info");
    }
    console.log("开始获取数据...");
    var getFacet = true;
    if (noFacet) getFacet = false;
    require.config({
        paths: {
            echarts: './scripts/echart'
        }
    });

    var ecChart = require(
        [
            'echarts',
            'echarts/config',
            'echarts/chart/bar',
            'echarts/chart/line',
            "echarts/chart/pie",
            "echarts/chart/force",
            "echarts/chart/chord",
            'echarts/chart/map',
            'echarts/chart/wordCloud',
        ],
        function (ec) {

            //reset the status of the charts
            jQuery.each(chartLists, function (key, value) {
                value.status = 0; //reset status
            });

            if (!currUrl) {
                currUrl = window.location.href;
            }

            $(".progress").show();
            if (_readOnly) {
                $("#midProgress").hide();
            }
            $(".progress .progress-bar").css("width", "10%");


            //$("#timelineChart").hide();
            //$("#mapsDivContainer").hide();
            //$("#detailsContainer").hide();
            //$("#cloudDivContainer").hide();


            $.ajax({
                url: "service.svc/RetrieveData",
                type: "get",
                data: {
                    "url": currUrl,
                    "getText": true,
                    "facet": getFacet,
                    "getDoc": true,
                    "getTimeline": timeline,
                    "highlighting": true,
                },
                error: ErrorCallback,
                success: function (data) {
                    _q = data.Search.FreeSearch;
                    _dimensionSize = data.Search.FacetItemCount;
                    $("#q").val(_q);
                    //$("title").text(_q);
                    $("title").text("疫情期间中国人民大学学生情况分析");
                    if (data.Paging.TotalItemCount == 0) {
                        displayMessage("没有符合条件的学生", "info");
                        $(".progress").hide();
                        return;
                    }

                    //display timeline

                    if (!_rucmode) {
                        //人大学生数据暂时不显示时间轴
                        if (getFacet && timeline) {
                            var timeKeys = [], timeValues = [];
                            GetTimelineData(data, timeKeys, timeValues);
                            var numFilters = data.Search.Facets.length;
                            $("#timeline").show();
                            GenerateTimeline(ec, timeKeys, timeValues, numFilters);
                        }
                    }

                    $(".progress .progress-bar").css("width", "50%");

                    if (getFacet) {
                        var iFacet, nFacet = data.Facets.length;
                        var nPercent = 50.0;
                        var filters = GetFilters(data);
                        DisplayFiltersCompact(filters, data);

                        var dataProv = [];
                        var dataCity = [];

                        var dataCountry = [];

                        var dataWordCloud = [];

                        var facetTableHtml = [];

                        facetTableHtml.push("<table class='table table-stripe table-hover table-bordered' id='fTable'>");
                        facetTableHtml.push("<thead><tr><td>维度</td><td>内容</td><td>频度</td></tr></thead><tbody>");

                        for (iFacet = 0; iFacet < nFacet; iFacet++) {
                            var name, sname, keys = [], values = [], keyvalues = [];
                            name = data.Facets[iFacet].Value.FacetName;
                            sname = data.Facets[iFacet].Key;
                            var vls = data.Facets[iFacet].Value.Items;
                            var i, n = vls.length;

                            var selected = filters[sname];
                            if (selected) {
                                console.log("currently selected: " + selected);
                            }

                            var iCategory = Name2Category(name);
                            var isOpinion = (sname === "Opinion");

                            var isProv = (sname === "DataM_ChinaRegion1"
                                || sname === "PntData_ChinaRegion1"
                            );

                            var isShortProv = (sname === "DataS_p_province"
                            );


                            var isProvName = ((sname === "DataS_question.loc_province")
                                || (sname === "DataS_question_loc_province")

                                //for weibo
                                || (sname == "Entity_locs")
                            );

                            var isFullProvName = ((sname === "DataS_province"));

                            var isCity = (sname === "DataM_ChinaRegion2"
                                || sname === "PntData_ChinaRegion2"
                            );


                            var isCityName = ((sname === "DataS_question.loc_city")
                                || (sname === "DataS_question_loc_city")
                            );

                            var isTown = (sname === "DataM_ChinaRegion3"
                                || sname === "PntData_ChinaRegion3");

                            var isCountry = (sname === "PntData_DICT_国家"
                                || sname === "DataM_DICT_国家"
                                || sname === "DataM_国家"
                                || sname === "DataM_国家"
                                || sname === "DataM_Country"
                                || sname === "DataS_Country"
                                //for weibo
                                || (sname == "Entity_locs")
                            );

                            var isChinaRegion = isProv || isCity || isTown || isShortProv;
                            var isChinaRegionName = isProvName || isCityName || isFullProvName;

                            var isDomain = (sname == "DataS_Domain" ||
                                sname == "PntData_Domain");

                            //preprocess: 因为某一些key/value的key会被替换，替换后
                            var buildingData = [];
                            var posData = [];

                            for (i = n - 1; i >= 0; i--) {//foreach item

                                var cloud = false;
                                var kname = vls[i].key;

                                if (kname == '') {
                                    continue;
                                }
                                if (isOpinion) {
                                    kname = _opininStr[vls[i].key];
                                }
                                else if (isCountry) {
                                    dataCountry.push({ name: kname, value: vls[i].value });
                                }
                                else if (sname == "DataS_Building") {
                                    buildingData.push([kname, vls[i].value]);
                                }
                                else if (sname == "DataS_Pos") {
                                    var pitems = kname.split(',');
                                    posData.push([parseFloat(pitems[0]), parseFloat(pitems[1]), vls[i].value]);
                                }
                                else if (isChinaRegionName) {
                                    if (isProvName) {
                                        dataProv.push({ name: kname, value: vls[i].value });
                                    }
                                    else if (isFullProvName) {
                                        if (_provinceFull2ShortMapping[kname]) {
                                            var shortProvName = _provinceFull2ShortMapping[kname];
                                            dataProv.push({ name: shortProvName, value: vls[i].value });
                                            //new
                                            kname = shortProvName;
                                        }

                                    }
                                    else if (isCityName) {
                                        dataCity.push({ name: kname, value: vls[i].value });
                                    }
                                }
                                else if (isChinaRegion) {

                                    if (isShortProv) {
                                        if (_provinceMappingShort[kname]) {
                                            var shortProvName = _provinceMappingShort[kname][0];
                                            dataProv.push({ name: shortProvName, value: vls[i].value });
                                            //new
                                            kname = shortProvName;
                                        }
                                    }

                                    if (kname.length > 7) {

                                        var knameShort = kname.substring(7);
                                        _regionMapping[knameShort] = kname;

                                        if (isProv) {
                                            var code = kname.substring(0, 6);
                                            var shortProvName = _provinceMapping[code][0];
                                            dataProv.push({ name: shortProvName, value: vls[i].value });
                                            //new
                                            //kname= shortProvName;
                                        }

                                        else if (isCity) {

                                            var code = kname.substring(0, 2) + "0000";
                                            var knameShort2 = knameShort.substring(_provinceMapping[code][1].length);
                                            dataCity.push({ name: knameShort2, value: vls[i].value });

                                            //new
                                            //kname= knameShort2;
                                        }

                                        else if (isTown) {
                                            var prov = kname.substring(0, 2);
                                            if (prov === "11" || prov === "12" || prov === "31" || prov === "50") {
                                                //直辖市
                                                var code = prov + "0000";
                                                var knameShort2 = knameShort.substring(_provinceMapping[code][1].length);
                                                dataCity.push({ name: knameShort2, value: vls[i].value });

                                                //new
                                                //kname= knameShort2;
                                            }
                                        }

                                        kname = knameShort;
                                    }
                                }
                                else if (isDomain) {
                                }
                                else {
                                    cloud = true;
                                }

                                if (_dimensionSize > i) {
                                   //only _dimensionSize items are added to keys, values, keyvalues
                                    var oriKey = kname;
                                    if (_dimItemRename && _dimItemRename[sname]) {
                                        var vRename = _dimItemRename[sname][kname];
                                        if (vRename) {
                                            kname = vRename;
                                        }
                                    }


                                    keys.push(kname);

                                    if (cloud && _cloudFields.lastIndexOf(sname) >= 0) {
                                        dataWordCloud.push(
                                            {
                                                name: kname,
                                                value: vls[i].value,
                                                type: sname,
                                                itemStyle: createWordCloudStyle(sname) //normal: {color: 'black'}
                                            });
                                    }

                                    var v = vls[i].value;
                                    keyvalues.push({ name: kname, value: v });

                                    //if (iCategory >= 0) {
                                    if (iCategory == 0 || iCategory == 1) {
                                        nodesForRelationChart.push({
                                            category: iCategory,
                                            name: kname,
                                            value: v,
                                            facet: sname
                                        });

                                        //console.log(sname+", " + iCategory+", " + kname + ", " + vls[i].value);
                                    }

                                    if (selected == vls[i].key) {
                                        console.log("selected" + selected);
                                        //change itemstyle

                                        if (_uiType == "big") {
                                            values.push(
                                                {
                                                    selected: true,
                                                    value: v,
                                                    orikey: oriKey,
                                                    //tooltip: {},             
                                                    itemStyle: {
                                                        normal: {
                                                            color: "#3399ff",
                                                            barBorderColor: '#ff7f50',
                                                            barBorderWidth: 5,
                                                        }
                                                    }
                                                }
                                            );
                                        } else {
                                            values.push(
                                                {
                                                    selected: true,
                                                    value: v,
                                                    orikey: oriKey,
                                                    //tooltip: {},             
                                                    itemStyle: {
                                                        normal: {
                                                            color: "#3399ff",
                                                            barBorderColor: '#ff7f50',
                                                            barBorderWidth: 1,
                                                        }
                                                    }
                                                }
                                            );
                                        }
                                    } else {
                                        values.push({
                                            value: v,
                                            orikey: oriKey
                                        });
                                    }
                                }
                            }//end for each key/value item
                            if (sname == "DataS_Building") {
                                if (buildingData.length > 0) {
                                    console.log(buildingData);
                                    var building_geo = getBuildingGeoData(buildingData);
                                    loadBaiduMap(building_geo, true);
                                } else {
                                    loadBaiduMap(null, true)
                                }
                            }
                            else if (sname == "DataS_Pos") {
                                if (posData.length > 0) {
                                    loadBaiduChinaMap(posData);
                                } else {
                                    loadBaiduChinaMap(null)
                                }
                            }
                         

                         

                            if (keys.length > 0) {

                                if (sname != "DataS_Pos") {

                                    var chartObject = GenerateOneChart(ec, name, sname, keys, values, keyvalues, iFacet);
                                    //deal with chart                              

                                    for (var i in keyvalues) {
                                        facetTableHtml.push("<tr><td>" + name + "</td><td>" + keyvalues[keyvalues.length - i - 1].name + "</td><td>" + keyvalues[keyvalues.length - i - 1].value + "</td></tr>");
                                    }
                                }

                            }
                            else {
                                console.warn("no facet items: " + name);
                            }
                            $(".progress .progress-bar").css("width", (nPercent + (iFacet + 1) / (nFacet) * 50) + "%");
                        }

                        facetTableHtml.push("</tbody></table>");

                        if (!_rucmode && _uiType != "big") {
                            $("#facetTable").html(facetTableHtml.join("\n"));

                            //console.log($('#fTable'));
                            if (_uiType != "big") {
                                $('#fTable').DataTable({
                                    language:
                                    {
                                        "sProcessing": "处理中...",
                                        "sLengthMenu": "显示 _MENU_ 项结果",
                                        "sZeroRecords": "没有匹配结果",
                                        "sInfo": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
                                        "sInfoEmpty": "显示第 0 至 0 项结果，共 0 项",
                                        "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
                                        "sInfoPostFix": "",
                                        "sSearch": "搜索:",
                                        "sUrl": "",
                                        "sEmptyTable": "表中数据为空",
                                        "sLoadingRecords": "载入中...",
                                        "sInfoThousands": ",",
                                        "oPaginate": {
                                            "sFirst": "首页",
                                            "sPrevious": "上页",
                                            "sNext": "下页",
                                            "sLast": "末页"
                                        },
                                        "oAria": {
                                            "sSortAscending": ": 以升序排列此列",
                                            "sSortDescending": ": 以降序排列此列"
                                        }
                                    },
                                    paging: true,
                                    dom: 'Bfrtip',
                                    buttons: [
                                        //excelHtml5',
                                        //'print',
                                        {
                                            extend: 'print',
                                            text: '打印',
                                            autoPrint: false
                                        },
                                        //'copy',
                                        {
                                            extend: 'copy',
                                            text: '复制'
                                        },
                                        //'pdf',
                                        // 'csv'
                                        {
                                            extend: 'csv',
                                            text: '导出为EXCEL'
                                        }
                                    ]
                                });
                            }
                        }

                        if (!_rucmode && _uiType != "big") {
                            var nNode = nodesForRelationChart.length;
                            for (var i = 0; i < nNode; i++) {
                                for (var j = nNode - 1; j >= 0; j--) {
                                    linksForRelationChart.push(
                                        {
                                            source: nodesForRelationChart[i].name,
                                            sourceq: nodesForRelationChart[i].facet + ":" + nodesForRelationChart[i].name,
                                            target: nodesForRelationChart[j].name,
                                            targetq: nodesForRelationChart[j].facet + ":" + nodesForRelationChart[j].name,
                                            weight: 0,
                                            name: ''
                                        }
                                    );
                                }
                            }
                        }

                        if (_rucmode && (_uiType == "big")) {
                        } else {
                            //generate word cloud
                            if ($("#cloudDivContainer")) {
                                $("#cloudDivContainer").show();
                            }
                            GenerateWordCloudChart(ec, dataWordCloud);
                        }



                        if ($("#mapsDivContainer")) {
                            $("#mapsDivContainer").show();
                        }


                        //var rucData = getGeoData(data);
                        //loadBaiduChinaMap(rucData);
                        
                        //GenerateHeatMapChart(rucData);

                        GenerateMapChart(ec, dataProv, dataCity);

                        GenerateWorldMapChart(ec, dataCountry);


                        //GenerateRelationChart(ec, nodesForRelationChart, linksForRelationChart);

                        //setTimeout(function () { $("#barContainer").hide(); }, 1000);

                        //
                        var dimToRemove = [];
                        jQuery.each(chartLists, function (key, value) {

                            if (value.status === 0) {
                                //the chart is useless
                                dimToRemove.push(value);
                            }
                        });

                        jQuery.each(dimToRemove, function (item) {

                            //item.chart.clear();
                            //item.chart.dispose();
                            console.log(dimToRemove[item]);

                            $("#" + dimToRemove[item].div).remove(); //clean the node
                            $("#" + dimToRemove[item].cdiv).remove(); //clean the node
                            
                            console.log("removing " + dimToRemove[item].name + ", " + dimToRemove[item].cdiv);
                            //console.log(chartLists);

                            delete chartLists[dimToRemove[item].name];
                        });
                    }


                    if (_rucmode && (_uiType == "big")) {
                        //no display
                    } else {
                        //displau counts
                        var countInfo = DisplayCountAndSort(data);


                        //display results
                        $("#detailsContainer").show();
                        var resultHtml = "";
                        if (_rucmode) {

                            resultHtml = DisplayResultListForRucStudent(data);
                        } else {
                            DisplayResultList(data);
                        }

                        var pages = DisplayPaginationInfo(data.Paging);

                        if (_uiType == "big") {
                            $("#details").html(resultHtml + pages);
                        } else {
                            $("#details").html(countInfo);
                            $("#details").append(resultHtml);
                            $("#details").append(pages);
                        }
                    }

                    $(".homeLazyImg").lazyload();

                    if (_uiType == "big") {
                        displayMessage("已完成处理。", "suc");
                    } else {
                        displayMessage("已完成处理.", "suc");
                    }
                }
            });
        }
    );

}


function GetPreviewData(fname, fvalue, callback, ticket, res) {
    console.log(fname);
    if (_rucmode) {
        console.log("do not get preview data for big");
        return false;
    }
    $.ajax({
        url: "service.svc/GetPreviewData",
        type: "get",
        data: {
            "url": _currUrl,
            "getText": true,
            "fname": fname,
            "fvalue": fvalue
        },
        //error: ErrorCallback,
        success: function (data) {

            if (data.Paging.TotalItemCount == 0) {
                callback(ticket, res + "<br/>No additional data.");
                return;
            }
            //display results
            var resultHtml = DisplayPreviewResults(data);
            console.log(resultHtml);
            callback(ticket, res + "<br/>" + resultHtml);
        }
    });
}


var sortMethods = [{ name: "相关性", sort: "score desc" },
{ name: "时间倒序", sort: "Time Desc" },
{ name: "时间正序", sort: "Time Asc" }];

if (_subDocType === "weibo") {
    sortMethods.push({ name: "转发数", sort: "Meta_zhuan desc" });
    sortMethods.push({ name: "点赞数", sort: "Meta_zhan desc" });
    sortMethods.push({ name: "评论数", sort: "Meta_ping desc" });
}

function GetFirstItemIndex(p) {
    //console.log(p);
    return p.PageSize * (p.CurrentPage - 1) + 1
}
function GetLastItemIndex(p) {
    return Math.min(GetFirstItemIndex(p) + p.PageSize - 1, p.TotalItemCount);
}
function PageUrlFor(p, pageNum) {
    return p.PageUrl.replace(/!0/, pageNum);
}

function DisplayPaginationInfo(pi) {
    var items = [];

    //pagination
    items.push("<ul class=\"pagination\">");

    if (pi.HasPrevPageDummy) {
        items.push("<li><a  style='cursor:pointer;' onclick=\"GetSearchResults('"
            + pi.PrevPageUrlDummy + "',true,false)\">&laquo; 上一页</a></li>");
    }
    else {
        items.push("<li class=\"disabled\"><span>&laquo; 上一页</span></li>");
    }

    for (var iPage in pi.Pages) {
        var p = pi.Pages[iPage];
        if (p == pi.CurrentPage) {
            items.push("<li class=\"active\"><span>" + p + "</span></li>");
        }
        else {
            items.push("<li ><a  style='cursor:pointer;' onclick=\"GetSearchResults('" +
                PageUrlFor(pi, p) + "',true,false)\">" + p + "</a></li>");
        }
    }

    if (pi.CurrentPage < pi.LastPageDummy)//pi.HasNextPage
    {
        items.push("<li><a style='cursor:pointer;' onclick=\"GetSearchResults('" +
            pi.NextPageUrlDummy + "', true,false)\">下一页 &raquo;</a></li>");
    }
    else {
        items.push("<li class='disabled'><span >下一页 &raquo;</span></li>");
    }
    items.push("</ul>");

    return items.join("");
}
function DisplayCountAndSort(view) {
    var items = [];

    items.push("<div class='row'>");

    items.push("<div class='col-md-6 col-sm-6 col-xs-12'>");
    //count
    items.push("<div>");
    items.push("结果 <span class='text-success'>" +
        GetFirstItemIndex(view.Paging) + " - " + GetLastItemIndex(view.Paging) +
        "</span> / <span class='text-primary'>" + view.Paging.TotalItemCount + "</span>");
    items.push("</div>");

    items.push("</div>");

    items.push("<div class='col-md-6 col-sm-6 col-xs-12 text-right'>");
    //sort
    for (var i = 0; i < sortMethods.length; i++) {
        var currSort = sortMethods[i].sort;
        if (currSort == view.Search.Sort) {
            items.push("<a class=\"btn btn-primary\" selected='1'>");
            items.push(sortMethods[i].name);
            items.push("</a>");
        }
        else {
            items.push("<a class=\"btn btn-success\" onclick='ChangeSort(\"" + sortMethods[i].sort + "\")'>");
            items.push(sortMethods[i].name);
            items.push("</a>");
        }
    }

    items.push("</div>");

    items.push("</div>");

    return items.join("");

}
function getDomain(t) {
    if (t && t.DataS) {
        var i = 0; n = t.DataS.length;
        for (; i < n; i++) {
            if (t.DataS[i].Key == "Domain") {
                return t.DataS[i].Value;
            }
        }

    }
}


function getWeiboAnaLink(t) {
    var items = [];
    if (t && t.Url && _weiboAnaRootUrl) {



        if (t.Url.lastIndexOf("https://weibo.com/", 0) === 0) {


            var zhuan = 0;
            if (t && t.Meta) {
                var i = 0; n = t.Meta.length;
                for (; i < n; i++) {
                    if (t.Meta[i].Key == "zhuan") {
                        //items.push("转发数: " + t.Meta[i].Value + " ");
                        zhuan = t.Meta[i].Value;
                        break;
                    }
                }
            }
            if (zhuan > 0) {
                items.push("&nbsp;&nbsp;<a target='_blank' href='" + _weiboAnaRootUrl + "?url=" +
                    t.Url + "' >[传播分析]</a>"); //<span class='glyphicon glyphicon-asterisk'><span>
            }

        }
    }
    return items.join("&nbsp;");

}
function getWeiboStat(t) {
    var items = [];
    var zhuan = 0;
    if (t && t.Meta) {
        var i = 0; n = t.Meta.length;
        for (; i < n; i++) {
            if (t.Meta[i].Key == "ping") {
                items.push("评论数: " + t.Meta[i].Value + " ");

            }
            else if (t.Meta[i].Key == "zhuan") {
                items.push("转发数: " + t.Meta[i].Value + " ");
                zhuan = t.Meta[i].Value;
            }
            else if (t.Meta[i].Key == "zhan") {
                items.push("点赞数: " + t.Meta[i].Value + " ");
            }
        }

    }
    //if (zhuan > 0) {
    //    var link = getWeiboAnaLink(t);
    //    items.push(link)
    //}
    return items.join("&nbsp;");
}

function DisplayPreviewResults(view) {
    var items = [];

    var iResult = 0;
    var n = view.Documents.length;

    if (_uiType == "big") {
        items.push("<div class='snippet' style='width:500px;padding:10px;overflow-x:scroll;'>");
    } else {
        items.push("<div class='snippet' style='width:250px;padding:10px;overflow-x:scroll;'>");
    }

    for (iResult = 0; iResult < n; iResult++) {
        //console.log(view.Documents[iResult]);
        var p = view.Documents[iResult];

        var firstItemIndex = view.Paging.PageSize * (view.Paging.CurrentPage - 1) + 1

        var resultIdx = firstItemIndex + iResult;

        if (view.DocumentType == "doc") {
            var title = p.Title;
            if (!(title)) {
                title = p.Url;
            }
            if (p.Url && p.Url.length > 0) {
                items.push("<a href='");
                items.push(p.Url);

                items.push("' target='_blank'>")
                items.push(JsonDate2StringMinutes8(p.Time) + " " + title);
                items.push("<br/>");
                items.push(p.Text)
                items.push("</a>");

            } else {
                items.push(JsonDate2StringMinutes8(p.Time) + " " + title);
                items.push("<br/>");
                items.push(p.Text)
            }


            items.push("<br/>");

        } else {
            items.push(JsonDate2StringMinutes8(p.Time) + " " + p.Text);
            items.push("<br/>");
        }
    }
    items.push("</div>");
    return items.join("");
}

function DisplayResultListForRucStudent(view) {
    var items = [];

   
    //sentences
    if (_uiType == "big") {
        items.push("<ul class=\"list-group\">");
    }
    else {
        items.push("<table class=\"table table-striped table-hover table-bordered\" id='resultListTable'>");
        items.push("<thead>");
        items.push("<tr>");
        items.push("<th style='width:150px'>");
        items.push("时间");
        items.push("</th>");
        items.push("<th>");
        items.push("内容");
        items.push("</th>");
        items.push("</tr>");
        items.push("</thead>");
        items.push("<tbody>");
    }
    
    var iResult = 0;
    var n = view.Documents.length;

    for (iResult = 0; iResult < n; iResult++) {
        //console.log(view.Documents[iResult]);
        var p = view.Documents[iResult];

        var firstItemIndex = view.Paging.PageSize * (view.Paging.CurrentPage - 1) + 1

        var resultIdx = firstItemIndex + iResult;


        


            //sentence
            var sentenceText = "";
            if (p.Text && p.Text.length > 0) {
                sentenceText = p.Text.replace(" ", "").replace(".", "");
            }
            if (sentenceText.length <= 2) {
                // continue;
            }

            if (_uiType == "big") {

                items.push("<li>")
                

                items.push("<span class=\"timestr\" title=\"" + p.Id + "\">" + p.Id + "</span>");

                var url = p.Url;
                if (url && url.length > 0) {
                    items.push("<a href=\"" + url + "\" target=_blank>" + p.Text + "</a>");
                    var domain = getDomain(p.Url);
                    items.push("<span class='site'>" + domain + "</span>");
                } else {

                    items.push(p.Text);
                }

               
                items.push("</li>")

            }
            else {
                items.push("<tr>");

                items.push("<td>");
                items.push("<span class=\"success\" title=\"" + p.Id + "\">" + p.Id + "</span>");
                items.push("</td>");

                items.push("<td class='snippet'>");
                items.push( p.Text);               
                items.push("</td>");
                items.push("</tr>");
            }
        

    }
    if (view.DocumentType == "doc" ||
        (_uiType == "big")
    ) {
        items.push("</ul>");
    } else {
        items.push("</tbody>");
        items.push("</table>");
    }

    return items.join("");
}

function DisplayResultList(view) {
    var items = [];
    if (view.DocumentType == "doc") {
        items.push("<ul class=\"list-group\">");
    }
    else {
        //sentences
        if (_uiType == "big") {
            items.push("<ul class=\"list-group\">");
        }
        else {
            items.push("<table class=\"table table-striped table-hover table-bordered\" id='resultListTable'>");
            items.push("<thead>");
            items.push("<tr>");
            items.push("<th style='width:150px'>");
            items.push("时间");
            items.push("</th>");
            items.push("<th>");
            items.push("内容");
            items.push("</th>");
            items.push("</tr>");
            items.push("</thead>");
            items.push("<tbody>");
        }
    }
    var iResult = 0;
    var n = view.Documents.length;

    for (iResult = 0; iResult < n; iResult++) {
        //console.log(view.Documents[iResult]);
        var p = view.Documents[iResult];

        var firstItemIndex = view.Paging.PageSize * (view.Paging.CurrentPage - 1) + 1

        var resultIdx = firstItemIndex + iResult;


        if (view.DocumentType == "doc") {

            items.push("<li class=\"list-group-item\">");


            items.push("<span class=\"badge\">" + resultIdx + "</span>");
            var domain = "";

            if (p.Images && p.Images.length > 0) {
                var imgUrl = p.Images[0];
                items.push("<img class='homeLazyImg'  data-original='" + imgUrl + "' />");
            }


            items.push("<h4 class=\"list-group-item-heading snippet\">");
            if (p.Opinion == 3) {
                items.push("<span class=\"label label-success\">" + _opininStr[3] + "</span>");
            }
            else if (p.Opinion == 1) {
                items.push("<span class=\"label label-danger\">" + _opininStr[1] + "</span>");
            }
            var title = p.Title;
            if (!(title)) {
                title = p.Url;
            }

            var pattern = "http://www.court.gov.cn/";
            if (p.Url && (p.Url.substr(0, pattern.length) == pattern)) {
                p.Url = "http://wenshu.court.gov.cn/list/list/?sorttype=1&conditions=searchWord+QWJS+++%E6%A1%88%E5%8F%B7:" + encodeURIComponent(p.Id);
            }


            var downloadLink = "<a href=\"gdoc.aspx?docid=" + p.Id + "\" ><img src='images/download.png' /></a> "

            items.push(downloadLink)
            items.push("<a href=\"" + p.Url + "\" >" + title + "</a>");

            var weiboAnaLink = getWeiboAnaLink(p);
            if (weiboAnaLink) {
                items.push(weiboAnaLink);
            }


            items.push("</h4>");


            domain = getDomain(p);

            items.push("<p class=\"list-group-item-text snippet\">");
            var text = p.Text;
            if (text == null) text = "";
            text = text.replace(/\n/, "<br/>");
            items.push(text);

            items.push("</p>");

            items.push("<p class=\"displayUrl\">");
            items.push(p.DisplayUrl);
            items.push("</p>");
            items.push("<p>");
            items.push("<span class=\"label label-success\">" + p.Id + "</span>");


            //items.push("<span class=\"label label-primary\">" + JsonDate2String(p.Time) + "</span>");

            items.push("<span class=\"label label-primary\">" + JsonDate2StringMinutes8(p.Time) + "</span>");



            items.push("<span class=\"label label-warning\">" + p.Score + "</span>");
            if (domain) {
                items.push("<span class=\"label label-info\">" + domain + "</span>");
            }

            var weiboInfo = getWeiboStat(p);
            if (weiboInfo && weiboInfo.length > 0) {
                items.push("<span class=\"label label-success\">" + weiboInfo + "</span>");
            }

            items.push("</p>");


            var kLists = {};
            if (p.Entity != null && p.Entity.length > 0) {
                for (var iEntity = 0; iEntity < p.Entity.length; iEntity++) {
                    var e = p.Entity[iEntity].Value;
                    kLists[p.Entity[iEntity].Key] = e;
                }
            }
            if (p.Nugget != null && p.Nugget.length > 0) {
                kLists["Nugget"] = p.Nugget;
            }
            jQuery.each(kLists, function (key, value) {
                items.push("<div class=\"btn-group\">");
                //items.push("<button type=\"button\" class=\"btn btn-primary btn-sm dropdown-toggle\" data-toggle=\"dropdown\">");
                items.push("<a class=\"btn btn-sm dropdown-toggle\" data-toggle=\"dropdown\">");

                items.push(key);
                items.push("<span class=\"badge\">" + value.length + "</span>");

                items.push("<span class=\"caret\"></span>");
                //items.push("</button>");
                items.push("</a>");
                items.push("<ul class=\"dropdown-menu\" role=\"menu\">");
                jQuery.each(value, function (iEntity) {
                    var entityUrl = _SearchPage + "?q=" + encodeURI("\"" + value[iEntity] + "\"");
                    items.push("<li><a href=\"" + entityUrl + "\">" + value[iEntity] + "</a></li>");
                    //items.push("<li class=\"divider\"></li>");
                });
                items.push("</ul>");
                items.push("</div>");
            }
            );

            items.push("</li>");

        }
        else {

            //sentence
            var sentenceText = "";
            if (p.Text && p.Text.length > 0) {
                sentenceText = p.Text.replace(" ", "").replace(".", "");
            }
            if (sentenceText.length <= 2) {
                // continue;
            }

            if (_uiType == "big") {

                items.push("<li>")
                //items.push("<span class=\"timestr\" title=\"" + p.Id + "\">" + JsonDate2String(p.Time) + "</span>");

                items.push("<span class=\"timestr\" title=\"" + p.Id + "\">" + JsonDate2StringMinutes8(p.Time) + "</span>");

                var url = p.Url;
                if (url && url.length > 0) {
                    items.push("<a href=\"" + url + "\" target=_blank>" + p.Text + "</a>");
                    var domain = getDomain(p.Url);
                    items.push("<span class='site'>" + domain + "</span>");
                } else {

                    items.push(p.Text);
                }

                if (p.Opinion == 3) {
                    items.push("<span class=\"label label-success\">" + _opininStr[3] + "</span>");
                }
                else if (p.Opinion == 1) {
                    items.push("<span class=\"label label-danger\">" + _opininStr[1] + "</span>");
                }
                items.push("</li>")

            } else {
                items.push("<tr>");


                items.push("<td>");
                items.push("<span class=\"success\" title=\"" + p.Id + "\">" + JsonDate2StringMinutes8(p.Time) + "</span>");
                items.push("</td>");

                items.push("<td class='snippet'>");

                var url = p.Url;
                if (url && url.length > 0) {
                    items.push("<a href=\"" + url + "\" target=_blank>" + p.Text + "</a>");
                    var domain = getDomain(p.Url);
                    items.push("<span class='site'>" + domain + "</span>");
                } else {
                    //var getDocUrl = "service.svc/GetDocMatchResults?sid=" + p.Id;

                    var getDocUrl = "docv.aspx?sid=" + p.Id;
                    items.push("<a style='display:none' href=\"" + getDocUrl + "\" target=_blank>[D]</a>");
                    items.push(p.Text);
                }

                if (p.Opinion == 3) {
                    items.push("<span class=\"label label-success\">" + _opininStr[3] + "</span>");
                }
                else if (p.Opinion == 1) {
                    items.push("<span class=\"label label-danger\">" + _opininStr[1] + "</span>");
                }





                //items.push("<p class=\"displayUrl\">");
                //items.push(p.DisplayUrl);
                //items.push("</p>");
                //items.push("<p>");
                //items.push("<span class=\"label label-success\">" + p.Id + "</span>");
                //items.push("<span class=\"label label-primary\">" + JsonDate2String(p.Time) + "</span>");
                //items.push("<span class=\"label label-warning\">" + p.Score + "</span>");
                //items.push("<span class=\"label label-info\">" + domain + "</span>");
                //items.push("</p>");




                var kLists = {};
                if (p.Entity != null && p.Entity.length > 0) {
                    for (var iEntity = 0; iEntity < p.Entity.length; iEntity++) {
                        var e = p.Entity[iEntity].Value;
                        kLists[p.Entity[iEntity].Key] = e;
                    }
                }
                if (p.Nugget != null && p.Nugget.length > 0) {
                    kLists["Nugget"] = p.Nugget;
                }
                jQuery.each(kLists, function (key, value) {

                    items.push("&nbsp;<strong class='text-uppercase'>" + key + ":</strong> ");

                    jQuery.each(value, function (iEntity) {
                        var entityUrl = _SearchPage + "?q=" + encodeURI("\"" + value[iEntity] + "\"");
                        items.push("<a href=\"" + entityUrl + "\">" + value[iEntity] + "</a> &nbsp;");
                        //items.push("<li class=\"divider\"></li>");
                    });

                }
                );

                //display url information
                items.push("<div id='docInfo" + iResult + "'></div><script>GetDocInfo(\"" + p.Id + "\"," + iResult + ", \"" + escape(p.Text) + "\");</script>");

                items.push("</td>");
                items.push("</tr>");
            }
        }
    }
    if (view.DocumentType == "doc" ||
        (_uiType == "big")
    ) {
        items.push("</ul>");
    } else {
        items.push("</tbody>");
        items.push("</table>");

    }

    return items.join("");
}


function GetDocInfo(sid, id, sentence) {
    $.ajax({
        url: "service.svc/GetSentenceUrlTitle",
        type: "get",
        data: {
            "sentence": unescape(sentence)
        },
        success: function (dataOri) {
            var data;
            if (dataOri.d) {
                data = dataOri.d;
            } else {
                data = dataOri;
            }
            if (data) {
                var items = [];
                var n = data.length;
                var nTrue = 0;
                var docContentAll = "";
                if (n > 0) {

                    for (var i = 0; i < data.length; i++) {
                        var doc = data[i];
                        if (doc.Url && doc.Url.length > 0 && doc.Url != "#") {
                            nTrue++;
                            items.push("<div><span class=\"label label-info\">来自</span><a target='_blank' href='" + doc.Url + "'>");
                            items.push(doc.Title);
                            items.push("</a> <span class=\"label label-success\">" + doc.Text + "</span></div>");
                        }
                    }

                }
                if (nTrue > 0) {
                    docContentAll += "<div class=\"alert alert-info\" role=\"alert\">";
                    docContentAll += items.join("\n");

                    var getDocUrl = "docv.aspx?sid=" + sid;

                    docContentAll += ("<a href=\"" + getDocUrl + "\" target=_blank>[查看所有内容]</a>");

                    docContentAll += "</div>";
                }

                $("#docInfo" + id).html(docContentAll);
            }
        }
    });
}

//$(document).ready(function () {

//ConfigEChart();

function generateReport() {

    $("#queryTtile").html()
}
function PageLoad() {
    $("#alertInfo").hide();
    $(".progress").hide();
    $("#timeline").hide();

    $(".socialbar").hide();//for rucstudent
    $("#tailExample").hide();
    $("#right_menu").hide();

    if ((_uiType != "big") && (pagemode == "export")) {
        //导出
        $("#queryForm").hide();
        $("#navBar").hide();


        $("#btnUpdateDate").hide();

        $("#interescol").hide();
        $("#deepcol").hide();
        $("#info_col").switchClass("col-md-6", "col-md-12");


        $("#queryForm").hide();
        //optionTimeline.toolbox.show = false;
        optionTimeline.title.x = "center",
            optionTimeline.title.backgroundColor = "white";
        optionTimeline.title.y = 30;
        $("#timeline").height(270);
        optionTimeline.grid.y = 20,
            optionTimeline.grid.y2 = 30;

        optionTimeline.legend.backgroundColor = "white";
        optionTimeline.legend.x = "100";
        optionTimeline.legend.y = "20";
        optionTimeline.legend.orient = "vertical";

        optionTimeline.legend.selected.All = true;
        optionTimeline.legend.selected["全部"] = true;
        optionTimeline.legend.textStyle.fontWeight = "bolder";
        _optionBarChart.toolbox.show = false;
        //_optionBarChart.toolbox.orient = "vertical";
        //_optionBarChart.toolbox.x="right";
        _optionBarChart.title.x = "center";
        //_optionBarChart.grid.x=90;
        //_optionBarChart.grid.y=40;
        //_optionBarChart.grid.x2=5;
        //_optionBarChart.grid.y2=10;        

        var q = GetURLParameter("q");      

        _q = q;
        var topic = GetURLParameter("t");
        if (q) {
            var html = getQueryDisplayHtmlExport(q, _alias);
            $("#basicInfoDiv").html(html);
        }

        if (topic && topic.length > 0) {
            console.log("topic: " + topic);
            displayTopicInfo(topic);
        }


        if (q || topic) {
            GetSearchResults(window.location.href, false, true);
            //GenerateCharts();
        }

        return;
    }

    $("#btnUpdateDate").text(updateDatePeriodButtonText);
    if (_readOnly) {
        $("#btnUpdateDate").hide();

        $("#interescol").hide();
        $("#deepcol").hide();
        $("#info_col").switchClass("col-md-6", "col-md-12");


        $("#queryForm").hide();
        //optionTimeline.toolbox.show = false;
        optionTimeline.title.x = "center",
            optionTimeline.title.backgroundColor = "white";
        optionTimeline.title.y = 30;
        $("#timeline").height(270);
        optionTimeline.grid.y = 20,
            optionTimeline.grid.y2 = 30;

        optionTimeline.legend.backgroundColor = "white";
        optionTimeline.legend.x = "100";
        optionTimeline.legend.y = "20";
        optionTimeline.legend.orient = "vertical";

        optionTimeline.legend.selected.All = true;
        optionTimeline.legend.selected["全部"] = true;
        optionTimeline.legend.textStyle.fontWeight = "bolder";
        _optionBarChart.toolbox.show = false;
        //_optionBarChart.toolbox.orient = "vertical";
        //_optionBarChart.toolbox.x="right";
        _optionBarChart.title.x = "center";
        //_optionBarChart.grid.x=90;
        //_optionBarChart.grid.y=40;
        //_optionBarChart.grid.x2=5;
        //_optionBarChart.grid.y2=10;        

    }

    if (_uiType == "big") {
        $("#main").sortable();
        //$("#timeline").disableSelection();
        $("#main").sortable({ handle: ".selectBar" });//{ handle: ".chartTitle" }

        $("#halfDivs").sortable();
        
    } else {
        $("#main").sortable();//{ handle: ".chartTitle" }
    }


    var q = GetURLParameter("q");
    
    _q = q;
    var topic = GetURLParameter("t");
    if (q) {
        getBasicInfo(q, _alias);
        if (!_rucmode) {
            ShowRelatedQueries(_q);

            if (_showPersonalNetwork) {
                ShowNetwork(_q, "personNetwork");
            }
        }
    }

    if (_maintain === "true" || _maintain === "True") {
        $("#maintainInfo").html("目前系统正在维护或升级，可能不能正常运行或者运行缓慢，敬请谅解！");
        $("#maintainInfo").show(3000);
    } else {
        $("#maintainInfo").hide();
    }

    if (topic && topic.length > 0) {
        console.log("topic: " + topic);
        displayTopicInfo(topic);
    }


    if (q || topic) {
        GetSearchResults(window.location.href, false, true);
        //GenerateCharts();
    }
}
function displayTopicInfo(topic) {
    $.ajax({
        url: "service.svc/GetDeepTopic",
        type: "get",
        data: {
            "id": topic
        },
        success: function (data) {
            if (data && data) {
                var linkText = data.Name + "专题";
                var link = "<a href='index.aspx?t=" + topic + "'>" + linkText + "</a>";
                $("#topicNameSpan").html(link);
                $("#t").val(topic);
            }
        }
    });
}
$(document).ready(function () {
    //loadMap();
    PageLoad();
    //loadBaiduMap();
}
);


var dataRuc = [
    {
        "count": 2,
        "lng": 116.317878,
        "lat": 39.971219,
        "inter_name": "测试"

    },
    {
        "count": 8,
        "lng": 116.317600,
        "lat": 39.971219,
        "inter_name": "测试"

    }
];

//function loadMap() {
//    var _heapMapChart;
//    if (!_heapMapChart) {
//        _heapMapChart = new AMap.Map('heapMapDiv', {
//            features: ['bg', 'road'],
//            mapStyle: 'amap://styles/1de318cbb8d12c02303a22c550b9ccc9',
//            center: [116.313226, 39.970598],//北京
//            pitch: 56,
//            zoom: 16,
//            viewMode: '2D'//
//        });
//    }
//    var layer = new Loca.HeatmapLayer({
//        map: _heapMapChart,
//    });

//    layer.setData(dataRuc, {
//        lnglat: function (data) {
//            return [data.value.lng, data.value.lat]
//        },
//        value: 'count'
//    });

//    layer.setOptions({
//        style: {
//            radius: 18,
//            color: {
//                0.5: '#2c7bb6',
//                0.65: '#abd9e9',
//                0.7: '#ffffbf',
//                0.9: '#fde468',
//                1.0: '#d7191c'
//            }
//        }
//    }).render();
//}



var _rucMap;
function loadBaiduMap(geoMapData, baiduPos) {
    
    var dataRuc = geoMapData;
    console.log("geomapdata:")
    console.log(dataRuc);
    
    if (!_rucMap) {
        if (_uiType != "big") {
            $("#heapMapDiv").height("900");
        }
        _rucMap = new BMap.Map("heapMapDiv");          // 创建地图实例
        //_rucMap = new BMapGL.Map("heapMapDiv");
        //_rucMap.setHeading(64.5);
        //_rucMap.setTilt(73);

        _rucMap.enableScrollWheelZoom();
    } else {
        _rucMap.clearOverlays();
    }
    
    var point = bd_encrypt(116.313226, 39.970598)
    var point1 = new BMap.Point(point[0], point[1]);
    _rucMap.centerAndZoom(point1, 17);             // 初始化地图，设置中心点坐标和地图级别
    
    if (!geoMapData) {
        console.log("empty geo Map data");
        return;
    }

    var maxValue = 1;

    if (!baiduPos) {
        //如果是高德的数据，需要转化一下
        for (var i = 0; i < dataRuc.length; i++) {

            var pos = bd_encrypt(dataRuc[i].lng, dataRuc[i].lat)
            dataRuc[i].lng = pos[0];
            dataRuc[i].lat = pos[1];
        }
    }
    for (var i = 0; i < dataRuc.length; i++) {        
        if (dataRuc[i].count > maxValue) {
            maxValue = dataRuc[i].count;
        }
        var point = new BMap.Point(dataRuc[i].lng, dataRuc[i].lat);
        //var marker = new BMap.Marker(point);
        var label = new BMap.Label(dataRuc[i].name + dataRuc[i].count + "人", {
            position: point,
            offset: new BMap.Size(20, -19)
        });
        label.setStyle({
            //color: "red",
            //fontSize: "12px",
            //height: "40px",
            //border: 0,
            //backgroundColor:"rgba(0,0,0,0)",
            //opacity: 1,
            //background-color:
            //lineHeight: "20px",
            //fontFamily: "微软雅黑"
        });
        //marker.setLabel(label);

        //map.addOverlay(marker);
        _rucMap.addOverlay(label);
    }
    
    // 允许滚轮缩放

    //map.setMapStyle({ style: 'midnight' })
    //模板
    //默认地图样式(normal)
    //清新蓝风格(light)
    //黑夜风格(dark)
    //清新蓝绿风格(bluish)
    //高端灰风格(grayscale)
    //强边界风格(hardedge)
    //青春绿风格(darkgreen)
    //浪漫粉风格(pink)
    //午夜蓝风格(midnight)
    //自然绿风格(grassgreen)
    //精简风格(googlelite)
    //红色警戒风格(redalert)
   
    //_rucMap.setMapStyle({
    //    style: 'bluish'
    //});


    //map.setHeading(64.5);
    //map.setTilt(73);

    heatmapOverlay = new BMapLib.HeatmapOverlay({ "radius": 30 });
    _rucMap.addOverlay(heatmapOverlay);    

    console.log("Max value is " + maxValue);
    heatmapOverlay.setDataSet({ data: dataRuc, max: maxValue });

    //var control = new BMap.ScaleControl({ anchor: BMAP_ANCHOR_TOP_LEFT });
    //map.addControl(control);
}

function getRandom() {
    return (Math.random() -0.5)*0.0055;
}

var _studentMap;
function loadBaiduChinaMap(data) {//传入的数据是高德的坐标
    //console.log("student data geo:");
    //console.log(data);
    
    if (!_studentMap) {
        _studentMap = new BMap.Map("studentLocMapDiv", {});
       
        _studentMap.enableScrollWheelZoom();                        //启用滚轮放大缩小
        // 创建Map实例
    } else {
        _studentMap.clearOverlays();
    }
    _studentMap.centerAndZoom(new BMap.Point(105.000, 38.000), 5);     // 初始化地图,设置中心点坐标和地图级别
    //var mapStyle = {
    //    features: ["road", "building", "water", "land"],//隐藏地图上的poi
    //    //style: "dark"  //设置地图风格为高端黑
    //}
    //map.setMapStyle(mapStyle);

    if (data) {

        if (document.createElement('canvas').getContext) {  // 判断当前浏览器是否支持绘制海量点
            var points = [];  // 添加海量点数据
            for (var i = 0; i < data.length; i++) {
                var baiduPos = bd_encrypt(data[i][0], data[i][1]);
                points.push(new BMap.Point(baiduPos[0], baiduPos[1]));
                for (var j = 0; j < data[i][2] - 1; j++) {

                    points.push(new BMap.Point(baiduPos[0] + getRandom(), baiduPos[1] + getRandom()));
                }
            }
            //console.log(points);

            var options = {
                size: BMAP_POINT_SIZE_SMALL,
                shape: BMAP_POINT_SHAPE_STAR,
                color: '#d340c3'
            }
            var pointCollection = new BMap.PointCollection(points, options);  // 初始化PointCollection
            //pointCollection.addEventListener('click', function (e) {
            //    alert('单击点的坐标为：' + e.point.lng + ',' + e.point.lat);  // 监听点击事件
            //});
            _studentMap.addOverlay(pointCollection);  // 添加Overlay
        } else {
            alert('请在chrome、safari、IE8+以上浏览器查看本示例');
        }
    }

}

//百度坐标转高德（传入经度、纬度）
function bd_decrypt(bd_lng, bd_lat) {
    var X_PI = Math.PI * 3000.0 / 180.0;
    var x = bd_lng - 0.0065;
    var y = bd_lat - 0.006;
    var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * X_PI);
    var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * X_PI);
    var gg_lng = z * Math.cos(theta);
    var gg_lat = z * Math.sin(theta);
    var array = new Array();

    array.push(gg_lng);
    array.push(gg_lat);
    // console.log(array);
    return array;
    // return {lng: gg_lng, lat: gg_lat}
}


function bd_encrypt(gg_lng, gg_lat) {


    var X_PI = Math.PI * 3000.0 / 180.0;
    var x = gg_lng, y = gg_lat;
    var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * X_PI);
    var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * X_PI);
    var bd_lng = z * Math.cos(theta) + 0.0065;
    var bd_lat = z * Math.sin(theta) + 0.006;
    var array = new Array();
    array.push(bd_lng);
    array.push(bd_lat);
    // return {
    //  bd_lat: bd_lat,
    //  bd_lng: bd_lng
    //};
    return array;
}

function openHeatmap() {
    heatmapOverlay.show();
}
function closeHeatmap() {
    heatmapOverlay.hide();
}
function setGradient() {
    /*格式如下所示:
    {
        0:'rgb(102, 255, 0)',
        .5:'rgb(255, 170, 0)',
        1:'rgb(255, 0, 0)'
    }*/
    var gradient = {};
    var colors = document.querySelectorAll("input[type='color']");
    colors = [].slice.call(colors, 0);
    colors.forEach(function (ele) {
        gradient[ele.getAttribute("data-key")] = ele.value;
    });
    heatmapOverlay.setOptions({ "gradient": gradient });
}
//判断浏览区是否支持canvas
function isSupportCanvas() {
    var elem = document.createElement('canvas');
    return !!(elem.getContext && elem.getContext('2d'));
}


