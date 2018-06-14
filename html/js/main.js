const WIDTH = 1000;
const HEIGHT = 800;


class DLdiag {
  constructor(selector, width, height) {
    this.width = width;
    this.height = height;

    const svg = d3.select(selector).append("svg")
      .attr('xmlns', "http://www.w3.org/2000/svg")
      .attr('viewBox', `0 0 ${this.width} ${this.height}`)
      .attr("width", this.width)  // this need to change on resize
      .attr("height", this.height)  // and this as well

    const g = svg.append("g");
    this.g = g;

  }

  drawSequence(sequence, opts = {}) {

    console.log(sequence);


    const connections = sequence.map((d) => d.input_shape);

    const link = this.g.selectAll('.link')
      .data(connections);

    const linkEnter = link.enter().append('g')
      .attr('class', 'link')
      .attr('transform', (d, i) => `translate(${75}, ${75 * i})`);

    linkEnter.append('path')
      .attr('class', 'link')
      .attr('d', (d, i) => `M 0 0 l 0 25`);

    linkEnter.append('text')
      .attr('x', 10)
      .attr('y', 25 / 2)
      .style('font-size', '10px')
      .text((d) => d.join(" × "));


    const node = this.g.selectAll('.node')
      .data(sequence);

    const nodeEnter = node.enter().append('g')
      .attr('class', 'node')
      .attr('transform', (d, i) => `translate(${25}, ${25 + 75 * i})`);

    const typeColor = d3.scaleOrdinal(d3.schemeCategory10);

    nodeEnter.append('rect')
      .style('stroke', (d) => typeColor(d.type))
      .style('fill-opacity', 0.25)
      .style('fill', (d) => typeColor(d.type))
      .attr('width', 100)
      .attr('height', 50)
      .attr('rx', 10)
      .attr('ry', 10);

    nodeEnter.append('text')
      .attr('x', 10)
      .attr('y', 25 / 2)
      .style('font-size', '10px')
      .text((d) => d.join(" × "));


  }

}

// run

const dldiag = new DLdiag("#d3graph", WIDTH, HEIGHT);

fetch("data/sample.yaml")
  .then(response => response.text())
  .then(text => dldiag.drawSequence(jsyaml.load(text)));
