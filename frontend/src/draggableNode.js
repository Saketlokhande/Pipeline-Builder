// draggableNode.js

export const DraggableNode = ({ type, label }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };
  
    return (
      <div
        className={type}
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        style={{ 
          cursor: 'grab', 
          width: '100%',
          height: '44px',
          display: 'flex', 
          alignItems: 'center', 
          borderRadius: '6px',
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
          justifyContent: 'center', 
          flexDirection: 'column',
          boxShadow: '0 2px 8px rgba(99, 102, 241, 0.3)',
          transition: 'all 0.2s ease',
          border: '1px solid rgba(99, 102, 241, 0.5)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateX(2px)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(99, 102, 241, 0.5)';
          e.currentTarget.style.background = 'linear-gradient(135deg, #818cf8 0%, #9d6ff7 100%)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateX(0)';
          e.currentTarget.style.boxShadow = '0 2px 8px rgba(99, 102, 241, 0.3)';
          e.currentTarget.style.background = 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)';
        }}
        draggable
      >
          <span style={{ 
            color: '#fff', 
            fontWeight: '500',
            fontSize: '13px',
            textShadow: '0 1px 2px rgba(0,0,0,0.2)'
          }}>
            {label}
          </span>
      </div>
    );
  };
  