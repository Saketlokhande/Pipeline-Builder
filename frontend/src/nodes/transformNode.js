// transformNode.js

import { useState, useEffect } from 'react';
import { BaseNode } from './BaseNode';

export const TransformNode = ({ id, data }) => {
  const [transformType, setTransformType] = useState(data?.transformType || 'uppercase');

  useEffect(() => {
    if (data?.transformType !== undefined) {
      setTransformType(data.transformType);
    }
  }, [data]);

  return (
    <BaseNode
      id={id}
      data={data}
      title="Transform"
      inputHandles={[{ id: `${id}-input` }]}
      outputHandles={[{ id: `${id}-output` }]}
    >
      {({ handleFieldChange }) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '12px', color: '#ffffff' }}>
            Transform Type:
            <select 
              value={transformType} 
              onChange={(e) => {
                setTransformType(e.target.value);
                handleFieldChange('transformType', e.target.value);
              }}
              style={{ padding: '4px', borderRadius: '4px', border: '1px solid rgba(255, 255, 255, 0.2)', backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#ffffff' }}
            >
              <option value="uppercase" style={{ background: '#1a1a26', color: '#ffffff' }}>Uppercase</option>
              <option value="lowercase" style={{ background: '#1a1a26', color: '#ffffff' }}>Lowercase</option>
              <option value="trim" style={{ background: '#1a1a26', color: '#ffffff' }}>Trim</option>
              <option value="reverse" style={{ background: '#1a1a26', color: '#ffffff' }}>Reverse</option>
              <option value="capitalize" style={{ background: '#1a1a26', color: '#ffffff' }}>Capitalize</option>
            </select>
          </label>
          <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.7)', fontStyle: 'italic' }}>
            Applies transformation to input data
          </div>
        </div>
      )}
    </BaseNode>
  );
}

