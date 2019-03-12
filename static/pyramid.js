/**
 *
 * @authors leftjie (heykeener@163.com)
 * @date    2019-03-10 17:00:03
 * @version $0.1$
 */

function setPri(obj) {
    var myChart = echarts.init(document.getElementById('main'));
    myChart.showLoading();
    myChart.width = obj.width;
    myChart.height = obj.height;
    // 设置选项
    var option = {
        toolbox: {
            show: true,
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                dataView: {readOnly: true},
                magicType: {type: ['line', 'bar']},
                restore: {},
                saveAsImage: {}
            },
            orient: 'vertical',
        },
        title: {
            text: obj.title,
            subtext: obj.subtitle,
            sublink: obj.sublink,
            subtarget: 'blank',
            subtextStyle: {
                color: '#aaa',
                fontStyle: 'normal',
                fontSize: 12,
                algin: 'center',
            },
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            },
        },
        legend: {
            data: [obj.columns[1], obj.columns[2]]
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        dataset: {
            source: obj.data
        },
        xAxis: [
            {
                name: "数量",
                nameLocation: "center",
                nameGap: 25,
                nameRotate: 0,
                axisLine: {
                    symbol: "arrow",//坐标轴箭头
                    symbolSize: "5",//坐标轴箭头大小
                    lineStyle: {	//坐标轴线段设置
                        color: "#333",//颜色
                        width: 2,//坐标轴线段宽度
                    },
                },
                axisLabel: {
                    formatter: function (value) {
                        return numeral(Math.abs(value)).format('0,0');
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: "#ccc",//颜色
                        width: 1,
                    },
                },
            }
        ],
        yAxis: [
            {
                name: "年龄段",
                type: 'category',
                nameLocation: "middle",
                nameGap: 50,
                nameRotate: 90,
                axisLine: {
                    lineStyle: {	//坐标轴线段设置
                        color: "#333",//颜色
                        width: 1,//坐标轴线段宽度
                    },
                },
                axisTick: {
                    alignWithLabel: false,
                    length: obj.axisTick_length,
                },
                boundaryGap: true,
            }
        ],
        series: [
            {
                name: obj.columns[1],
                type: obj.gtype,
                smooth: obj.smooth,
                stack: obj.columns[0],
                label: {
                    show: obj.label,// 是否显示标签值
                    position: 'left', //显示位置
                    formatter: function (data) {
                        return numeral(Math.abs(data.data[1])).format('0,0');
                    },
                    color: "#6f6f6f",
                },
                itemStyle: {
                    color: obj.color_male,
                },
                areaStyle: {
                    color: obj.color_male,
                    opacity: obj.area_opacity,
                },
            },
            {
                name: obj.columns[2],
                type: obj.gtype,
                smooth: obj.smooth,
                stack: obj.columns[0],
                label: {
                    show: obj.label,// 是否显示标签值
                    position: 'right', //显示位置
                    color: "#6f6f6f",
                    formatter: function (data) {
                        return numeral(Math.abs(data.data[2])).format('0,0');
                    },
                },
                itemStyle: {
                    color: obj.color_female, //设置颜色
                },
                areaStyle: {
                    color: obj.color_female,
                    opacity: obj.area_opacity,
                },
            }
        ]
    };
    myChart.hideLoading();
    myChart.setOption(option);
}

function setPriW(width) {
    var myChart = echarts.init(document.getElementById('main'));
    myChart.resize(width);
}

function setPriH(height) {
    var myChart = echarts.init(document.getElementById('main'));
    myChart.resize(height);
}
