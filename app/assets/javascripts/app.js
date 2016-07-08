import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class App extends Component {
  componentDidMount() {
    const context = this._canvas.getContext('2d');
    this.paint(context);
  }

  componentDidUpdate() {
    const context = this._canvas.getContext('2d');
    context.clearRect(0, 0, 200, 200);
    this.paint(context);
  }

  paint(context) {
    context.save();
    context.translate(100, 100);
    context.rotate(this.props.rotation, 100, 100);
    context.fillStyle = '#F00';
    context.fillRect(-50, -50, 100, 100);
    context.restore();
  }

  render() {
    return <canvas width={800} height={600} ref={(c) => this._canvas = c} />;
  }
}
