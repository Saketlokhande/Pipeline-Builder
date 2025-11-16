// inputNode.js

import { useState, useEffect } from 'react';
import { BaseNode } from './BaseNode';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data?.inputType || 'Text');

  useEffect(() => {
    if (data?.inputName !== undefined) {
      setCurrName(data.inputName);
    }
    if (data?.inputType !== undefined) {
      setInputType(data.inputType);
    }
  }, [data]);

  return (
    <BaseNode
      id={id}
      data={data}
      title="Input"
      inputHandles={[]}
      outputHandles={[{ id: `${id}-value` }]}
    >
      {({ handleFieldChange }) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '12px', color: '#ffffff' }}>
            Name:
            <input 
              type="text" 
              value={currName} 
              onChange={(e) => {
                setCurrName(e.target.value);
                handleFieldChange('inputName', e.target.value);
              }}
              style={{ 
                padding: '6px 8px', 
                borderRadius: '6px', 
                border: '1px solid rgba(255, 255, 255, 0.15)',
                backgroundColor: 'rgba(139, 92, 246, 0.4)',
                color: '#ffffff',
                fontSize: '12px',
                outline: 'none'
              }}
              placeholder="Enter input name"
            />
          </label>
          <label style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '12px', color: '#ffffff' }}>
            Type:
            <select 
              value={inputType} 
              onChange={(e) => {
                setInputType(e.target.value);
                handleFieldChange('inputType', e.target.value);
              }}
              style={{ 
                padding: '6px 8px', 
                borderRadius: '6px', 
                border: '1px solid rgba(255, 255, 255, 0.15)',
                backgroundColor: 'rgba(139, 92, 246, 0.4)',
                color: '#ffffff',
                fontSize: '12px',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="Text" style={{ background: '#1a1a26', color: '#ffffff' }}>Text</option>
              <option value="File" style={{ background: '#1a1a26', color: '#ffffff' }}>File</option>
            </select>
          </label>
        </div>
      )}
    </BaseNode>
  );
}
