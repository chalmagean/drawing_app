import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const API_URL = 'http://localhost:3000/api/v1';
const POINTS_PATH = '/points.json';
const LINES_PATH = '/lines.json';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentLine: [],
      points: [],
      lines: []
    };

    this.holdActive = false;
    this.holdStarter = null;
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }

  componentDidMount() {
    this.loadPointsRequest = this.fetchPoints();
    this.loadLinesRequest = this.fetchLines();

    const context = this._canvas.getContext('2d');
    this.paint(context);
  }

  componentDidUpdate() {
    const context = this._canvas.getContext('2d');
    this.paint(context);
  }

  componentWillUnmount() {
    this.loadPointsRequest.abort();
    this.loadLinesRequest.abort();
  }

  handleMouseDown(e) {
    // Do not take any immediate action - just set the holdStarter
    // to wait for the predetermined delay, and then begin a hold
    this.holdStarter = setTimeout( () => {
        this.holdStarter = null;
        this.holdActive = true;
    }, 200);
  }

  handleMouseUp(e) {
    // If the mouse is released immediately (i.e., a click), before the
    // holdStarter runs, then cancel the holdStarter and do the click
    if (this.holdStarter) {
      clearTimeout(this.holdStarter);

      const mouseX = e.pageX - this._canvas.offsetLeft;
      const mouseY = e.pageY - this._canvas.offsetTop;

      this.addPoint(mouseX, mouseY);
    }
    // Otherwise, if the mouse was being held, end the hold
    else if (this.holdActive) {
      this.holdActive = false;
      this.saveLine(this.state.currentLine);

      this.setState({
        lines: this.state.lines.concat([this.state.currentLine]),
        currentLine: []
      });
    }
  }

  handleMouseMove(e) {
    const mouseX = e.pageX - this._canvas.offsetLeft;
    const mouseY = e.pageY - this._canvas.offsetTop;

    if (this.holdActive) {
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

  fetchPoints() {
    const url = `${API_URL}${POINTS_PATH}`;

    return $.get(url, (data) => {
      const points = $.map(data, (point) => {
        return [[point.x, point.y]];
      });

      this.setState({ points })
    });
  }

  saveLine(lineNodes) {
    const url = `${API_URL}${LINES_PATH}`;

    $.post(url, { line: { nodes: lineNodes } })
      .done(data => {
        console.log('data', data);
      });
  }

  fetchLines() {
    const url = `${API_URL}${LINES_PATH}`;

    return $.get(url, (data) => {
      const lines = data.map(line => {
        return line.nodes.map(node => {
          return [node[0], node[1]];
        });
      });

      this.setState({ lines })
    });
  }

  render() {
    const canvasStyle = {
      border: "1px solid #ccc",
      backgroundColor: "#fafafa"
    }

    return <canvas
      style={canvasStyle}
      onMouseDown={this.handleMouseDown}
      onMouseUp={this.handleMouseUp}
      onMouseMove={this.handleMouseMove}
      width={800}
      height={600}
      ref={(c) => this._canvas = c} />;
  }
}
