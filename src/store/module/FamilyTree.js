import uniqueId from 'lodash/uniqueId';
import { createReducer } from 'redux-reducer-utils';
import immer from 'immer';

const ADD_CHILD_NODE = Symbol('ADD_CHILD_NODE');

export const addChildNode = (targetNodeId) => ({
  type: ADD_CHILD_NODE,
  payload: {
    targetNodeId,
  },
});

const REMOVE_NODE = Symbol('REMOVE_NODE');

export const removeNode = (targetNodeId) => ({
  type: REMOVE_NODE,
  payload: {
    targetNodeId,
  },
});

const createNode = () => ({
  id: uniqueId(),
  properties: {},
  children: [],
});

const rootNode = createNode();

const initState = {
  rootNodeId: rootNode.id,
  nodes: {
    [rootNode.id]: rootNode,
  },
};

const removeNodeFromState = (state, targetNodeId) => {
  const targetNode = state.nodes[targetNodeId];
  if (!targetNode) {
    return;
  }
  if (targetNode.children.length !== 0) {
    targetNode.children.forEach((childId) => {
      removeNodeFromState(state, childId);
    });
  }
  delete state.nodes[targetNodeId];
};

export default createReducer(initState)
  .when(ADD_CHILD_NODE, immer((state, {payload}) => {
    const { targetNodeId } = payload;
    const targetNode = state.nodes[targetNodeId];
    if (!targetNode) {
      console.warn(`Cannot add child to node with id: ${targetNodeId}`);
      return;
    }
    const newNode = createNode();
    targetNode.children.push(newNode.id);
    state.nodes[newNode.id] = newNode;
    newNode.parentNodeId = targetNodeId;
  }))
  .when(REMOVE_NODE, immer((state, { payload }) => {
    const { targetNodeId } = payload;
    if (targetNodeId === state.rootNodeId) {
      console.warn('Cannot remove root node');
      return;
    }
    const targetNode = state.nodes[targetNodeId];
    const parentNode = state.nodes[targetNode.parentNodeId];
    removeNodeFromState(state, targetNodeId);
    parentNode.children = parentNode.children.filter((childId) => childId !== targetNodeId);
  }))
  .toFunction();
