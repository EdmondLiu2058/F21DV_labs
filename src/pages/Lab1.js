import React, { useRef, useEffect } from 'react';
import { Card } from 'antd';
import * as d3 from 'd3';

function MyD3Page() {
  const chartRef = useRef(null);

  useEffect(() => {
    const data = [
      { name: 'A', value: 100 },
      { name: 'B', value: 200 },
      { name: 'C', value: 50 },
    ];

    const svg = d3.select(chartRef.current).append('svg').attr('width', 500).attr('height', 500);

    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.name))
      .range([0, 500])
      .padding(0.2);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)])
      .range([500, 0]);

    svg
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d) => xScale(d.name))
      .attr('y', (d) => yScale(d.value))
      .attr('width', xScale.bandwidth())
      .attr('height', (d) => 500 - yScale(d.value))
      .attr('fill', 'blue');

    svg.append('g').call(d3.axisLeft(yScale)).attr('transform', 'translate(40, 0)');

    svg.append('g').call(d3.axisBottom(xScale)).attr('transform', 'translate(0, 460)');
  }, []);

  return (
    <Card title="My D3 Chart">
      <div ref={chartRef} />
    </Card>
  );
}

export default MyD3Page;
