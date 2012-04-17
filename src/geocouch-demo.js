// req: leaflet, bootstrap, jquery

var demo = (function() {
    
    var map,
        db = require('db').current(),
        geojson;
        
    function item(bounds, callback) {
        console.log(bounds);
        
        // $.ajax('_rewrite/data?bbox=')
    }
    
    function updateItems(bounds) {
        var args = [
            bounds.getSouthWest().lng,
            bounds.getSouthWest().lat,
            bounds.getNorthEast().lng,
            bounds.getNorthEast().lat
        ];

        $.ajax({
            url: '_rewrite/data?bbox=' + args.join(','),
            dataType: 'json',
            success: function(data) {
                if (geojson) {
                    map.removeLayer(geojson);
                }
                
                map.addLayer(geojson = new L.GeoJSON(data));
            }
        });
    }
    
    function initMap(target) {
        // replace "toner" here with "terrain" or "watercolor"
        var layer = new L.StamenTileLayer("toner");
        
        map = new L.Map(target, {
            center: new L.LatLng(-27.4680, 153.0175),
            zoom: 16
        });
        
        map.on('dragend', function(evt) {
            updateItems(map.getBounds());
        });
        
        map.addLayer(layer);
    }
    
    $(function() {
        initMap('mapContainer');
    });
    
    return { 
        
    };
}());