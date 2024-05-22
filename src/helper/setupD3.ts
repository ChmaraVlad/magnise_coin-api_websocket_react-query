import * as d3 from 'd3';

interface Datapoint {
    date: Date,
    price: number
  }

export function setupD3(container: HTMLElement, data: Datapoint[]) {
  const width = 928;
  const height = 500;
  const marginTop = 20;
  const marginRight = 30;
  const marginBottom = 30;
  const marginLeft = 40;

  function render_data(data: Datapoint[]) {
    const x = d3.scaleUtc()
      .domain((d3.extent(data, function(d: Datapoint) {
        return d.date })) as [Date, Date])
      .range([marginLeft, width - marginRight]);


    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.price)] as number[])
      .range([height - marginBottom, marginTop]);

    const line = d3.line<Datapoint>()
      .x(d => x(d.date))
      .y(d => y(d.price));

    const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

    svg.append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0));

    svg.append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y).ticks(height / 40))
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").clone()
        .attr("x2", width - marginLeft - marginRight)
        .attr("stroke-opacity", 0.1))
      .call(g => g.append("text")
        .attr("x", -marginLeft)
        .attr("y", 10)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .text("↑ Daily price ($)"));

    svg.append("path")
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", line(data));

    container.append(svg.node()!);
  }

  render_data(data)
}
