// filterNode.js

import { useState, useEffect } from 'react';
import { BaseNode } from './BaseNode';

export const FilterNode = ({ id, data }) => {
  const [filterType, setFilterType] = useState(data?.filterType || 'contains');
  const [filterValue, setFilterValue] = useState(data?.filterValue || '');

  useEffect(() => {
    if (data?.filterType !== undefined) {
      setFilterType(data.filterType);
    }
    if (data?.filterValue !== undefined) {
      setFilterValue(data.filterValue);
    }
  }, [data]);

  return (
    <BaseNode
      id={id}
      data={data}
      title="Filter"
      inputHandles={[{ id: `${id}-input` }]}
      outputHandles={[
        { id: `${id}-matched` },
        { id: `${id}-unmatched` }
      ]}
    >
      {({ handleFieldChange }) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '12px', color: '#ffffff' }}>
            Filter Type:
            <select 
              value={filterType} 
              onChange={(e) => {
                setFilterType(e.target.value);
                handleFieldChange('filterType', e.target.value);
              }}
              style={{ padding: '4px', borderRadius: '4px', border: '1px solid rgba(255, 255, 255, 0.2)', backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#ffffff' }}
            >
              <option value="contains" style={{ background: '#1a1a26', color: '#ffffff' }}>Contains</option>
              <option value="startsWith" style={{ background: '#1a1a26', color: '#ffffff' }}>Starts With</option>
              <option value="endsWith" style={{ background: '#1a1a26', color: '#ffffff' }}>Ends With</option>
              <option value="length" style={{ background: '#1a1a26', color: '#ffffff' }}>Length</option>
            </select>
          </label>
          <label style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '12px', color: '#ffffff' }}>
            Filter Value:
            <input 
              type="text" 
              value={filterValue} 
              onChange={(e) => {
                setFilterValue(e.target.value);
                handleFieldChange('filterValue', e.target.value);
              }}
              style={{ padding: '4px', borderRadius: '4px', border: '1px solid rgba(255, 255, 255, 0.2)', backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#ffffff' }}
              placeholder="Filter criteria"
            />
          </label>
        </div>
      )}
    </BaseNode>
  );
}

