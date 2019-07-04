import * as React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import TreeNode from "./TreeNode";

class TreeContainer extends React.PureComponent {
  static propTypes = {
    rootNodeId: PropTypes.string.isRequired,
  };

  render() {
    const { rootNodeId } = this.props;
    return (
      <div>
        Family tree:
        <TreeNode
          nodeId = {rootNodeId}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  rootNodeId: state.rootNodeId,
});

export default connect(mapStateToProps)(TreeContainer);
