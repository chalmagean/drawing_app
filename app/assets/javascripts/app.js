import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      points: [],
      lines: []
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const context = this._canvas.getContext('2d');
    this.paint(context);
  }

  componentDidUpdate() {
    const context = this._canvas.getContext('2d');
    this.paint(context);
  }

  handleClick(e) {
    const mouseX = e.pageX - this._canvas.offsetLeft;
    const mouseY = e.pageY - this._canvas.offsetTop;

    this.addPoint(mouseX, mouseY);
  }

  addPoint(x, y) {
    const pointXY = [x, y];

    this.setState({ points: this.state.points.concat([pointXY]) });
  }

  paintPoints(context) {
    const points = this.state.points;

    points.map(point => {
      context.fillRect(point[0], point[1], 4, 4);
    });
  }

  paint(context) {
    // Clear the canvas
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    // Paint the points
    // TODO: can this be done in an immutable way?
   this.paintPoints(context);
  }

  render() {
    return <canvas
      onClick={this.handleClick}
      width={800}
      height={600}
      ref={(c) => this._canvas = c} />;
  }
}
