import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dragging: false,
      currentLine: [],
      points: [],
      lines: []
    };

    this.handleMouseClick = this.handleMouseClick.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }

  componentDidMount() {
    const context = this._canvas.getContext('2d');
    this.paint(context);
  }

  componentDidUpdate() {
    const context = this._canvas.getContext('2d');
    this.paint(context);
  }

  handleMouseClick(e) {
    const mouseX = e.pageX - this._canvas.offsetLeft;
    const mouseY = e.pageY - this._canvas.offsetTop;

    this.addPoint(mouseX, mouseY);
  }

  handleMouseDown(e) {
    this.setState({ dragging: true });
  }

  handleMouseUp(e) {
    this.setState({
      dragging: false,
      lines: this.state.lines.concat([this.state.currentLine]),
      currentLine: []
    });
  }

  handleMouseMove(e) {
    const mouseX = e.pageX - this._canvas.offsetLeft;
    const mouseY = e.pageY - this._canvas.offsetTop;

    if (this.state.dragging) {
      this.addLineNode(mouseX, mouseY);
    }
  }

  addPoint(x, y) {
    const pointXY = [x, y];

    this.setState({ points: this.state.points.concat([pointXY]) });
  }

  addLineNode(x, y) {
    const pointXY = [x, y];

    this.setState({ currentLine: this.state.currentLine.concat([pointXY]) });
  }

  paintPoints(context) {
    const points = this.state.points;

    points.map(point => {
      context.fillRect(point[0], point[1], 4, 4);
    });
  }

  paintLines(context) {
    context.strokeStyle = "#df4b26";
    context.lineJoin = "round";
    context.lineWidth = 2;

    this.state.lines.map(line => {
      context.beginPath();

      line.map((node, index) => {
        if (index === 0) {
          // Beginning of the line
          let firstNode = line[0];
          context.moveTo(firstNode[0], firstNode[1]);
        } else {
          context.lineTo(node[0], node[1]);
        }
      });

      context.stroke();
    });
  }

  paint(context) {
    // Clear the canvas
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    // Paint the points
    // TODO: can this be done in an immutable way?
   this.paintPoints(context);
   this.paintLines(context);
  }

  render() {
    return <canvas
      onClick={this.handleMouseClick}
      onMouseDown={this.handleMouseDown}
      onMouseUp={this.handleMouseUp}
      onMouseMove={this.handleMouseMove}
      width={800}
      height={600}
      ref={(c) => this._canvas = c} />;
  }
}
