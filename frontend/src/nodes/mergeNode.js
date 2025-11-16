// mergeNode.js

import { useState, useEffect } from 'react';
import { BaseNode } from './BaseNode';

export const MergeNode = ({ id, data }) => {
  const [mergeType, setMergeType] = useState(data?.mergeType || 'concat');
  const [separator, setSeparator] = useState(data?.separator || ', ');

  useEffect(() => {
    if (data?.mergeType !== undefined) {
      setMergeType(data.mergeType);
    }
    if (data?.separator !== undefined) {
      setSeparator(data.separator);
    }
  }, [data]);

  return (
    <BaseNode
      id={id}
      data={data}
      title="Merge"
      inputHandles={[
        { id: `${id}-input1` },
        { id: `${id}-input2` },
        { id: `${id}-input3` }
      ]}
      outputHandles={[{ id: `${id}-output` }]}
    >
      {({ handleFieldChange }) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '12px', color: '#ffffff' }}>
            Merge Type:
            <select 
              value={mergeType} 
              onChange={(e) => {
                setMergeType(e.target.value);
                handleFieldChange('mergeType', e.target.value);
              }}
              style={{ padding: '4px', borderRadius: '4px', border: '1px solid rgba(255, 255, 255, 0.2)', backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#ffffff' }}
            >
              <option value="concat" style={{ background: '#1a1a26', color: '#ffffff' }}>Concatenate</option>
              <option value="sum" style={{ background: '#1a1a26', color: '#ffffff' }}>Sum</option>
              <option value="average" style={{ background: '#1a1a26', color: '#ffffff' }}>Average</option>
            </select>
          </label>
          {mergeType === 'concat' && (
            <label style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '12px', color: '#ffffff' }}>
              Separator:
              <input 
                type="text" 
                value={separator} 
                onChange={(e) => {
                  setSeparator(e.target.value);
                  handleFieldChange('separator', e.target.value);
                }}
                style={{ padding: '4px', borderRadius: '4px', border: '1px solid rgba(255, 255, 255, 0.2)', backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#ffffff' }}
                placeholder=", "
              />
            </label>
          )}
        </div>
      )}
    </BaseNode>
  );
}

