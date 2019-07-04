import * as React from 'react';
import PropTypes from "prop-types";
import { addChildNode, removeNode } from '../store/module/FamilyTree';
import {connect} from "react-redux";

class TreeNode extends React.PureComponent {
  static propTypes = {
    nodeId: PropTypes.string.isRequired,
    children: PropTypes.arrayOf(PropTypes.string).isRequired,
    addChildNode: PropTypes.func.isRequired,
    removeNode: PropTypes.func.isRequired,
  };

  onAddClick = () => {
    const { nodeId } = this.props;
    this.props.addChildNode(nodeId);
  };

  onRemoveClick = () => {
    const { nodeId } = this.props;
    this.props.removeNode(nodeId);
  };

  render() {
    const { nodeId, children } = this.props;
    return (
      <div>
        <div>Node: {nodeId}</div>
        <div
          style = {{
            display: 'flex',
          }}
        >
          <div onClick = {this.onAddClick}>
            Add Child
          </div>
          <div onClick = {this.onRemoveClick}>
            Remove node
          </div>
        </div>
        <div style = {{paddingLeft: 8}}>
          {children.map((childId) => (
            <ConnectedNode
              nodeId = {childId}
              key = {childId}
            />
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  children: state.nodes[ownProps.nodeId].children,
});

const mapDispatchToProps = {
  addChildNode,
  removeNode,
};

const ConnectedNode = connect(mapStateToProps, mapDispatchToProps)(TreeNode);

export default ConnectedNode;
