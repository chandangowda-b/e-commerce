// Layout.jsx
import React from "react";

const Layout = () => {
  const containerStyle = {
    display: "flex",
    width: "100vw",
    height: "100vh",
    boxSizing: "border-box",
    border: "2px solid #000",
  };

  const mainAreaStyle = {
    flex: 1,
    borderRight: "1px solid #000",
    position: 'relative',
  };

  const bluePanelStyle = {
      width: "35%",        // change this value to adjust blue area width
      backgroundColor: "#0b3b61",
      color: '#fff',
      padding: '20px',
  };

    const optionStyle = {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      marginTop: '16px'
    };

    const footerBtnContainer = {
      position: 'absolute',
      bottom: '28px',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: '16px',
      zIndex: 20,
      alignItems: 'center'
    };

    const btnStyle = {
      padding: '10px 14px',
      borderRadius: '10px',
      border: '2px solid #ef4444',
      background: 'linear-gradient(180deg, rgba(255,255,255,0.03), rgba(0,0,0,0.25))',
      color: '#ef4444',
      fontWeight: 600,
      cursor: 'pointer'
    };

  return (
    <div style={containerStyle}>
      <div style={mainAreaStyle}>
        <h1 style={{ fontSize: 28, fontWeight: 800, margin: '20px' }}>Live 3D Modification</h1>
        {/* main content */}

        <div style={footerBtnContainer}>
          <button style={btnStyle} onClick={() => { /* interior action placeholder */ }}>Interior</button>
          <button style={btnStyle} onClick={() => { /* exterior action placeholder */ }}>Exterior</button>
        </div>
      </div>
      <div style={bluePanelStyle}>
        <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>Choose Area</h3>
        <p style={{ marginTop: 12, color: '#d1e8ff' }}>Use the buttons at the bottom of the main area to switch between Interior and Exterior.</p>
      </div>
    </div>
  );
};

export default Layout;