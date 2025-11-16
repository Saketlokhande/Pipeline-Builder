// conditionNode.js

import { useState, useEffect } from 'react';
import { BaseNode } from './BaseNode';

export const ConditionNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || 'equals');
  const [threshold, setThreshold] = useState(data?.threshold || '');

  useEffect(() => {
    if (data?.condition !== undefined) {
      setCondition(data.condition);
    }
    if (data?.threshold !== undefined) {
      setThreshold(data.threshold);
    }
  }, [data]);

  return (
    <BaseNode
      id={id}
      data={data}
      title="Condition"
      inputHandles={[{ id: `${id}-input` }]}
      outputHandles={[
        { id: `${id}-true` },
        { id: `${id}-false` }
      ]}
    >
      {({ handleFieldChange }) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '12px', color: '#ffffff' }}>
            Condition:
            <select 
              value={condition} 
              onChange={(e) => {
                setCondition(e.target.value);
                handleFieldChange('condition', e.target.value);
              }}
              style={{ padding: '4px', borderRadius: '4px', border: '1px solid rgba(255, 255, 255, 0.2)', backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#ffffff' }}
            >
              <option value="equals" style={{ background: '#1a1a26', color: '#ffffff' }}>Equals</option>
              <option value="greater" style={{ background: '#1a1a26', color: '#ffffff' }}>Greater Than</option>
              <option value="less" style={{ background: '#1a1a26', color: '#ffffff' }}>Less Than</option>
              <option value="contains" style={{ background: '#1a1a26', color: '#ffffff' }}>Contains</option>
            </select>
          </label>
          <label style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '12px', color: '#ffffff' }}>
            Threshold:
            <input 
              type="text" 
              value={threshold} 
              onChange={(e) => {
                setThreshold(e.target.value);
                handleFieldChange('threshold', e.target.value);
              }}
              style={{ padding: '4px', borderRadius: '4px', border: '1px solid rgba(255, 255, 255, 0.2)', backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#ffffff' }}
              placeholder="Compare value"
            />
          </label>
        </div>
      )}
    </BaseNode>
  );
}

