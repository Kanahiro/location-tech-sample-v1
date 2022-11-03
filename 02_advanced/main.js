import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const map = new maplibregl.Map({
    container: 'map',
    style: {
        version: 8,
        sources: {
            osm: {
                type: 'raster',
                tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
                maxzoom: 19,
                tileSize: 256,
            },
        },
        layers: [
            {
                id: 'osm-layer',
                source: 'osm',
                type: 'raster',
            },
        ],
    },
});
console.log(map);

const geolocsationControl = new maplibregl.GeolocateControl();
map.addControl(geolocsationControl);
