// outputNode.js

import { useState, useEffect } from 'react';
import { BaseNode } from './BaseNode';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');

  useEffect(() => {
    if (data?.outputName !== undefined) {
      setCurrName(data.outputName);
    }
    if (data?.outputType !== undefined) {
      setOutputType(data.outputType);
    }
  }, [data]);

  return (
    <BaseNode
      id={id}
      data={data}
      title="Output"
      inputHandles={[{ id: `${id}-value` }]}
      outputHandles={[]}
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
                handleFieldChange('outputName', e.target.value);
              }}
              style={{ padding: '4px', borderRadius: '4px', border: '1px solid rgba(255, 255, 255, 0.2)', backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#ffffff' }}
            />
          </label>
          <label style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '12px', color: '#ffffff' }}>
            Type:
            <select 
              value={outputType} 
              onChange={(e) => {
                setOutputType(e.target.value);
                handleFieldChange('outputType', e.target.value);
              }}
              style={{ padding: '4px', borderRadius: '4px', border: '1px solid rgba(255, 255, 255, 0.2)', backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#ffffff' }}
            >
              <option value="Text" style={{ background: '#1a1a26', color: '#ffffff' }}>Text</option>
              <option value="File" style={{ background: '#1a1a26', color: '#ffffff' }}>Image</option>
            </select>
          </label>
        </div>
      )}
    </BaseNode>
  );
}
