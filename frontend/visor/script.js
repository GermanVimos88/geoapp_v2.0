var map = L.map("map").setView([-0.4149555647213889, -78.02615761756898], 17);   // Coordernadas/zoom de inicio  [-0.4091048124328795, -78.04001927809362]
                                                     // Ejemplo:   setView([27.2, 83.95], 10);   
        
    
    
    map.addControl(new L.Control.Fullscreen({
        title: {
            'false': 'Ver Pantalla completa',
            'true': 'Pantalla Normal'
        }
    }));
    
    map.zoomControl.setPosition('topright');



