function Chart(props) {

  const { data } = props;
  const leftMargin = 50;
  const rightMargin = 500;
  const topMargin = 50;
  const bottomMargin = 100;
  const contentWidth = 600;


  let contentHeight;
  const lavel_l = data.labels.length;
  const series_l = data.series.length;
  const interval = 10;
  const bar_h = 20;
  const block = interval+(bar_h+interval)*series_l;
  contentHeight = block*lavel_l;

  console.log(contentHeight)

  const svgWidth = leftMargin + contentWidth + rightMargin;
  const svgHeight = contentHeight + bottomMargin;

  const color = d3.scaleOrdinal(d3.schemeCategory10)

  const maxValue = d3.max(data.series, item => d3.max(item.values));
  const xScale = d3.scaleLinear()
    .domain([0, maxValue])
    .range([0, contentWidth])
    .nice();
  return (
    <svg width={svgWidth} height={svgHeight}>
      {/* shift + @ = ` */}
      {/* グラフ全体を動かす */}
      <g transform={`translate(${leftMargin},${topMargin})`}>
        {
          xScale.ticks().map((x) => {
            // あんま理解できてない
            return <g transform={`translate(${xScale(x)},0)`}>
              <line x1='0' y1='0' x2='0' y2={contentHeight+5} stroke='grey' />
              <text y={contentHeight +20} textAnchor='middle'>{x}</text>
            </g>
          })          
        }
        {/* 棒グラフのみ下にずらす */}
        <g transform={`translate(0,10)`}>
        {data.labels.map((item, i) => (
          // labelごとの間隔調整(ラベルのyは-5したほうが綺麗)({block/2-10}でずれを戻す)
          <g transform={`translate(0,${i*block})`}>
            {/* textAnchor='middle'は文字列の中央を0とする(水平方向) */}
            <text x="-15"y={block/2-5} textAnchor='middle'>{item}</text>
            <line x1="-5" y1={block/2-10} x2="0" y2={block/2-10} stroke="grey"/>
            {data.series.map((e, j) => (
              // それぞれのラベルに対するブロックの間隔調整
              <g transform={`translate(0,${j * 30})`}>
                <rect x="0" y="0" width={xScale(e.values[i])} height="20" fill={color(e)}/>
              </g>
            ))}
          </g>
        ))}
        </g>
        {/* 一番下の線 */}
        <line x1='0' y1={block*lavel_l} x2={contentWidth} y2={block*lavel_l} stroke="grey" />

        {/* 凡例 */}
        {/* 凡例全体を下に下げる */}
        <g transform={`translate(0,10)`}>
        {data.series.map((e, j) => (
          <g transform={`translate(0,${j*(bar_h+interval)})`}>
            <rect x={contentWidth+10} y='0' width={bar_h} height={bar_h} fill={color(e)}/>
            <text x={contentWidth+35} y='15'>{e.name}</text>
          </g>
        ))}
        </g>
      </g>
    </svg>
  );
}

function App(){
  const data = {
    labels: ['A', 'B', 'C', 'D'],
    series: [
      {
        name: 'data',
        values: [123, 456, 789, 1111]
      },
      {
        name: 'another data',
        values: [234, 567, 891, 1024]
      },
      {
        name: 'and more',
        values: [567, 678, 789, 890]
      }
    ]
  }
  /*
  const data = {
    labels: ['A', 'B', 'C', 'D'],
    series: [
      {
        name: 'data',
        values: [123, 456, 789, 1111]
      },
      {
        name: 'another data',
        values: [234, 567, 891, 1024]
      },
      {
        name: 'and more',
        values: [567, 678, 789, 890]
      }
    ]
  }
  */
  return <Chart data={data} />
}

export default App;