import React, { useEffect, useRef, useCallback } from 'react';

export default function Gameplay({ user }) {
    console.log(JSON.stringify(user, null, 2))
    const iframeRef = useRef(null);
  return (
 <div className= "play-container" > 
    
       <iframe ref={ iframeRef }src = "/godot/index.html" title = "Godot Game" style = {{ 
        border: "none", 
        width: "100vw", 
        height: "100vh",
        }}/>
     
    </div>
  );
}
