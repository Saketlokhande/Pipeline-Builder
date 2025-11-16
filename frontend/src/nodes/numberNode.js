// numberNode.js

import { useState, useEffect } from 'react';
import { BaseNode } from './BaseNode';

export const NumberNode = ({ id, data }) => {
  const [value, setValue] = useState(data?.value || 0);
  const [operation, setOperation] = useState(data?.operation || 'add');

  useEffect(() => {
    if (data?.value !== undefined) {
      setValue(data.value);
    }
    if (data?.operation !== undefined) {
      setOperation(data.operation);
    }
  }, [data]);

  return (
    <BaseNode
      id={id}
      data={data}
      title="Number"
      inputHandles={[{ id: `${id}-input` }]}
      outputHandles={[{ id: `${id}-output` }]}
    >
      {({ handleFieldChange }) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '12px', color: '#ffffff' }}>
            Operation:
            <select 
              value={operation} 
              onChange={(e) => {
                setOperation(e.target.value);
                handleFieldChange('operation', e.target.value);
              }}
              style={{ padding: '4px', borderRadius: '4px', border: '1px solid rgba(255, 255, 255, 0.2)', backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#ffffff' }}
            >
              <option value="add" style={{ background: '#1a1a26', color: '#ffffff' }}>Add</option>
              <option value="subtract" style={{ background: '#1a1a26', color: '#ffffff' }}>Subtract</option>
              <option value="multiply" style={{ background: '#1a1a26', color: '#ffffff' }}>Multiply</option>
              <option value="divide" style={{ background: '#1a1a26', color: '#ffffff' }}>Divide</option>
            </select>
          </label>
          <label style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '12px', color: '#ffffff' }}>
            Value:
            <input 
              type="number" 
              value={value} 
              onChange={(e) => {
                setValue(e.target.value);
                handleFieldChange('value', e.target.value);
              }}
              style={{ padding: '4px', borderRadius: '4px', border: '1px solid rgba(255, 255, 255, 0.2)', backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#ffffff' }}
            />
          </label>
        </div>
      )}
    </BaseNode>
  );
}

