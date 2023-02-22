import React from "react";
import '../Components.css';

const PRIMARY_COLOR = 'black';
const SORTED_COLOR = 'red';
const HIGHLIGHT_COLOR = 'blue';


export default class Bar extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            sorted: this.props.sorted,
            highlighted: this.props.highlighted
        };
    }

    static getDerivedStateFromProps(nextProps, prevProps) {
        const newState = {};
        if (nextProps.data !== prevProps.data) newState.data = nextProps.data;
        if (nextProps.sorted !== prevProps.sorted) newState.sorted = nextProps.sorted;
        if (nextProps.highlighted !== prevProps.highlighted) newState.highlighted = nextProps.highlighted;
        if (!newState.length) return newState;
        return null;
    }

    render() {
        return (<div
            className="bar"
            value={String(this.state.data)}
            style={{
                height: String(this.state.data * 5) + 'px',
                backgroundColor: (
                    this.state.highlighted ? HIGHLIGHT_COLOR : (this.state.sorted ? SORTED_COLOR : PRIMARY_COLOR)
                )
            }}
        >
        </div>)
    }
}