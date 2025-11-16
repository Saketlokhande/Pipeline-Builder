// llmNode.js

import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="LLM"
      inputHandles={[
        { id: `${id}-system`, style: { top: `${100/3}%` } },
        { id: `${id}-prompt`, style: { top: `${200/3}%` } }
      ]}
      outputHandles={[{ id: `${id}-response` }]}
    >
      <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.8)' }}>
        This is a LLM.
      </div>
    </BaseNode>
  );
}
