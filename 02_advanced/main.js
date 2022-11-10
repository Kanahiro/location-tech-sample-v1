import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

import OpacityControl from 'maplibre-gl-opacity';
import 'maplibre-gl-opacity/dist/maplibre-gl-opacity.css';

import distance from '@turf/distance';

const map = new maplibregl.Map({
    container: 'map',
    zoom: 5,
    minZoom: 5,
    maxZoom: 18,
    center: [138, 37],
    maxBounds: [122, 20, 154, 50],
    style: {
        version: 8,
        glyphs: './fonts/{fontstack}/{range}.pbf',
        sources: {
            osm: {
                type: 'raster',
                tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
                maxzoom: 19,
                tileSize: 256,
                attribution:
                    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            },
            gsi_std: {
                type: 'raster',
                tiles: [
                    'https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png',
                ],
                maxzoom: 18,
                tileSize: 256,
                attribution:
                    '<a href="https://maps.gsi.go.jp/development/ichiran.html">地理院タイル</a>',
            },
            gsi_pale: {
                type: 'raster',
                tiles: [
                    'https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png',
                ],
                maxzoom: 18,
                tileSize: 256,
                attribution:
                    '<a href="https://maps.gsi.go.jp/development/ichiran.html">地理院タイル</a>',
            },
            gsi_photo: {
                type: 'raster',
                tiles: [
                    'https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg',
                ],
                maxzoom: 18,
                tileSize: 256,
                attribution:
                    '<a href="https://maps.gsi.go.jp/development/ichiran.html">地理院タイル</a>',
            },
            hazard_flood: {
                type: 'raster',
                tiles: [
                    'https://disaportaldata.gsi.go.jp/raster/01_flood_l2_shinsuishin_data/{z}/{x}/{y}.png',
                ],
                minzoom: 2,
                maxzoom: 17,
                tileSize: 256,
                attribution:
                    '<a href="https://disaportal.gsi.go.jp/hazardmap/copyright/opendata.html">ハザードマップポータルサイト</a>',
            },
            hazard_hightide: {
                type: 'raster',
                tiles: [
                    'https://disaportaldata.gsi.go.jp/raster/03_hightide_l2_shinsuishin_data/{z}/{x}/{y}.png',
                ],
                minzoom: 2,
                maxzoom: 17,
                tileSize: 256,
                attribution:
                    '<a href="https://disaportal.gsi.go.jp/hazardmap/copyright/opendata.html">ハザードマップポータルサイト</a>',
            },
            hazard_tsunami: {
                type: 'raster',
                tiles: [
                    'https://disaportaldata.gsi.go.jp/raster/04_tsunami_newlegend_data/{z}/{x}/{y}.png',
                ],
                minzoom: 2,
                maxzoom: 17,
                tileSize: 256,
                attribution:
                    '<a href="https://disaportal.gsi.go.jp/hazardmap/copyright/opendata.html">ハザードマップポータルサイト</a>',
            },
            hazard_doseki: {
                type: 'raster',
                tiles: [
                    'https://disaportaldata.gsi.go.jp/raster/05_dosekiryukeikaikuiki/{z}/{x}/{y}.png',
                ],
                minzoom: 2,
                maxzoom: 17,
                tileSize: 256,
                attribution:
                    '<a href="https://disaportal.gsi.go.jp/hazardmap/copyright/opendata.html">ハザードマップポータルサイト</a>',
            },
            hazard_kyukeisha: {
                type: 'raster',
                tiles: [
                    'https://disaportaldata.gsi.go.jp/raster/05_kyukeishakeikaikuiki/{z}/{x}/{y}.png',
                ],
                minzoom: 2,
                maxzoom: 17,
                tileSize: 256,
                attribution:
                    '<a href="https://disaportal.gsi.go.jp/hazardmap/copyright/opendata.html">ハザードマップポータルサイト</a>',
            },
            hazard_jisuberi: {
                type: 'raster',
                tiles: [
                    'https://disaportaldata.gsi.go.jp/raster/05_jisuberikeikaikuiki/{z}/{x}/{y}.png',
                ],
                minzoom: 2,
                maxzoom: 17,
                tileSize: 256,
                attribution:
                    '<a href="https://disaportal.gsi.go.jp/hazardmap/copyright/opendata.html">ハザードマップポータルサイト</a>',
            },
            skhb: {
                // 指定緊急避難場所
                type: 'vector',
                tiles: [
                    `${location.href.replace(
                        '/index.html',
                        '',
                    )}/skhb/{z}/{x}/{y}.pbf`,
                ],
                minzoom: 5,
                maxzoom: 8,
                attribution:
                    '<a href="https://www.gsi.go.jp/bousaichiri/hinanbasho.html" target="_blank">国土地理院:指定緊急避難場所データ</a>',
            },
            route: {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: [],
                },
            },
        },
        layers: [
            {
                id: 'osm-layer',
                source: 'osm',
                type: 'raster',
                layout: { visibility: 'none' },
            },
            {
                id: 'gsi_std-layer',
                source: 'gsi_std',
                type: 'raster',
                layout: { visibility: 'none' },
            },
            {
                id: 'gsi_pale-layer',
                source: 'gsi_pale',
                type: 'raster',
                layout: { visibility: 'none' },
            },
            {
                id: 'gsi_photo-layer',
                source: 'gsi_photo',
                type: 'raster',
                layout: { visibility: 'none' },
            },
            {
                id: 'hazard_flood-layer',
                source: 'hazard_flood',
                type: 'raster',
                layout: { visibility: 'none' },
            },
            {
                id: 'hazard_hightide-layer',
                source: 'hazard_hightide',
                type: 'raster',
                layout: { visibility: 'none' },
            },
            {
                id: 'hazard_tsunami-layer',
                source: 'hazard_tsunami',
                type: 'raster',
                layout: { visibility: 'none' },
            },
            {
                id: 'hazard_doseki-layer',
                source: 'hazard_doseki',
                type: 'raster',
                layout: { visibility: 'none' },
            },
            {
                id: 'hazard_kyukeisha-layer',
                source: 'hazard_kyukeisha',
                type: 'raster',
                layout: { visibility: 'none' },
            },
            {
                id: 'hazard_jisuberi-layer',
                source: 'hazard_jisuberi',
                type: 'raster',
                layout: { visibility: 'none' },
            },
            {
                id: 'route-layer',
                source: 'route',
                type: 'line',
                paint: {
                    'line-color': '#33aaff',
                    'line-width': 4,
                },
            },
            {
                id: 'skhb-0-layer',
                source: 'skhb',
                'source-layer': 'skhb',
                type: 'circle',
                paint: {
                    'circle-color': '#6666cc',
                    'circle-radius': 6,
                    'circle-stroke-width': 1,
                    'circle-stroke-color': '#ffffff',
                },
                layout: { visibility: 'none' },
            },
            {
                id: 'skhb-1-layer',
                source: 'skhb',
                'source-layer': 'skhb',
                type: 'circle',
                paint: {
                    'circle-color': '#6666cc',
                    'circle-radius': 6,
                    'circle-stroke-width': 1,
                    'circle-stroke-color': '#ffffff',
                },
                filter: ['==', ['get', 'disaster1'], 1], // 属性:disaster1が1の地物のみ表示する
                layout: { visibility: 'none' },
            },
            {
                id: 'skhb-2-layer',
                source: 'skhb',
                'source-layer': 'skhb',
                type: 'circle',
                paint: {
                    'circle-color': '#ccaa33',
                    'circle-radius': 6,
                    'circle-stroke-width': 1,
                    'circle-stroke-color': '#ffffff',
                },
                filter: ['==', ['get', 'disaster2'], 1],
                layout: { visibility: 'none' },
            },
            {
                id: 'skhb-3-layer',
                source: 'skhb',
                'source-layer': 'skhb',
                type: 'circle',
                paint: {
                    'circle-color': '#aa33aa',
                    'circle-radius': 6,
                    'circle-stroke-width': 1,
                    'circle-stroke-color': '#ffffff',
                },
                filter: ['==', ['get', 'disaster3'], 1],
                layout: { visibility: 'none' },
            },
            {
                id: 'skhb-4-layer',
                source: 'skhb',
                'source-layer': 'skhb',
                type: 'circle',
                paint: {
                    'circle-color': '#33aa33',
                    'circle-radius': 6,
                    'circle-stroke-width': 1,
                    'circle-stroke-color': '#ffffff',
                },
                filter: ['==', ['get', 'disaster4'], 1],
                layout: { visibility: 'none' },
            },
            {
                id: 'skhb-5-layer',
                source: 'skhb',
                'source-layer': 'skhb',
                type: 'circle',
                paint: {
                    'circle-color': '#3333aa',
                    'circle-radius': 6,
                    'circle-stroke-width': 1,
                    'circle-stroke-color': '#ffffff',
                },
                filter: ['==', ['get', 'disaster5'], 1],
                layout: { visibility: 'none' },
            },
            {
                id: 'skhb-6-layer',
                source: 'skhb',
                'source-layer': 'skhb',
                type: 'circle',
                paint: {
                    'circle-color': '#aa6666',
                    'circle-radius': 6,
                    'circle-stroke-width': 1,
                    'circle-stroke-color': '#ffffff',
                },
                filter: ['==', ['get', 'disaster6'], 1],
                layout: { visibility: 'none' },
            },
            {
                id: 'skhb-7-layer',
                source: 'skhb',
                'source-layer': 'skhb',
                type: 'circle',
                paint: {
                    'circle-color': '#3333aa',
                    'circle-radius': 6,
                    'circle-stroke-width': 1,
                    'circle-stroke-color': '#ffffff',
                },
                filter: ['==', ['get', 'disaster7'], 1],
                layout: { visibility: 'none' },
            },
            {
                id: 'skhb-8-layer',
                source: 'skhb',
                'source-layer': 'skhb',
                type: 'circle',
                paint: {
                    'circle-color': '#aa3333',
                    'circle-radius': 6,
                    'circle-stroke-width': 1,
                    'circle-stroke-color': '#ffffff',
                },
                filter: ['==', ['get', 'disaster8'], 1],
                layout: { visibility: 'none' },
            },
        ],
    },
});

/**
 * 現在選択されている指定緊急避難場所レイヤー(skhb)を特定しそのfilter条件を返す
 */
const getCurrentSkhbLayerFilter = () => {
    const style = map.getStyle();
    const skhbLayers = style.layers.filter((layer) =>
        layer.id.startsWith('skhb'),
    );
    const visibleSkhbLayers = skhbLayers.filter(
        (layer) => layer.layout.visibility === 'visible',
    );
    return visibleSkhbLayers[0].filter;
};

/**
 * 経緯度を渡すと最寄りの指定緊急避難場所を返す
 */
const getNearestFeature = (longitude, latitude) => {
    const currentSkhbLayerFilter = getCurrentSkhbLayerFilter();
    const features = map.querySourceFeatures('skhb', {
        sourceLayer: 'skhb',
        filter: currentSkhbLayerFilter,
    });

    const nearestFeature = features.reduce((minDistFeature, feature) => {
        const dist = distance(
            [longitude, latitude],
            feature.geometry.coordinates,
        );
        if (minDistFeature === null || minDistFeature.properties.dist > dist)
            return {
                ...feature,
                properties: {
                    ...feature.properties,
                    dist,
                },
            };
        return minDistFeature;
    }, null);

    return nearestFeature;
};

let userLocation = null;

/**
 * 最新のユーザーの位置情報と最寄りの指定緊急避難場所を繋いだラインを描画する
 */
const drawRoute = () => {
    if (map.getZoom() < 7) return;
    if (userLocation === null) {
        map.getSource('route').setData({
            type: 'FeatureCollection',
            features: [],
        });
        return;
    }
    const nearestFeature = getNearestFeature(userLocation[0], userLocation[1]);
    const routeFeature = {
        type: 'Feature',
        geometry: {
            type: 'LineString',
            coordinates: [userLocation, nearestFeature._geometry.coordinates],
        },
    };
    map.getSource('route').setData({
        type: 'FeatureCollection',
        features: [routeFeature],
    });
};

const geolocationControl = new maplibregl.GeolocateControl({
    trackUserLocation: true,
});
map.addControl(geolocationControl);
geolocationControl.on('geolocate', (e) => {
    userLocation = [e.coords.longitude, e.coords.latitude];
});

map.on('load', () => {
    const opacity = new OpacityControl({
        baseLayers: {
            'osm-layer': 'OpenStreetMap',
            'gsi_std-layer': '地理院タイル標準地図',
            'gsi_pale-layer': '地理院タイル淡色地図',
            'gsi_photo-layer': '地理院タイル空中写真',
        },
        overLayers: {
            'hazard_flood-layer': '洪水浸水想定区域',
            'hazard_hightide-layer': '高潮浸水想定区域',
            'hazard_tsunami-layer': '津波浸水想定区域',
            'hazard_doseki-layer': '土石流警戒区域',
            'hazard_kyukeisha-layer': '急傾斜警戒区域',
            'hazard_jisuberi-layer': '地滑り警戒区域',
        },
        opacityControl: true,
    });
    map.addControl(opacity, 'top-left');

    const opacitySkhb = new OpacityControl({
        baseLayers: {
            'skhb-0-layer': '全緊急指定避難場所',
            'skhb-1-layer': '洪水',
            'skhb-2-layer': '崖崩れ/土石流/地滑り',
            'skhb-3-layer': '高潮',
            'skhb-4-layer': '地震',
            'skhb-5-layer': '津波',
            'skhb-6-layer': '大規模な火事',
            'skhb-7-layer': '内水氾濫',
            'skhb-8-layer': '火山現象',
        },
    });
    map.addControl(opacitySkhb, 'bottom-left');

    map.on('move', () => drawRoute());
    map.on('render', () => drawRoute());
});

map.on('mousemove', (e) => {
    const features = map.queryRenderedFeatures(e.point, {
        layers: [
            'skhb-0-layer',
            'skhb-1-layer',
            'skhb-2-layer',
            'skhb-3-layer',
            'skhb-4-layer',
            'skhb-5-layer',
            'skhb-6-layer',
            'skhb-7-layer',
            'skhb-8-layer',
        ],
    });
    if (features.length > 0) {
        map.getCanvas().style.cursor = 'pointer';
    } else {
        map.getCanvas().style.cursor = '';
    }
});

map.on('click', (e) => {
    const features = map.queryRenderedFeatures(e.point, {
        layers: [
            'skhb-0-layer',
            'skhb-1-layer',
            'skhb-2-layer',
            'skhb-3-layer',
            'skhb-4-layer',
            'skhb-5-layer',
            'skhb-6-layer',
            'skhb-7-layer',
            'skhb-8-layer',
        ],
    });
    if (features.length === 0) return;
    const feature = features[0];
    const popup = new maplibregl.Popup()
        .setLngLat(feature.geometry.coordinates)
        .setHTML(
            `\
            <div style="font-weight:900; font-size: 1.2rem;">${
                feature.properties.name
            }</div>\
            <div>${feature.properties.address}</div>\
            <div>${feature.properties.remarks ?? ''}</div>\
            <div>\
            <span${
                feature.properties.disaster1 === 1 ? '' : ' style="color:#ccc;"'
            }">洪水</span>\
            <span${
                feature.properties.disaster2 === 1 ? '' : ' style="color:#ccc;"'
            }> 崖崩れ/土石流/地滑り</span>\
            <span${
                feature.properties.disaster3 === 1 ? '' : ' style="color:#ccc;"'
            }> 高潮</span>\
            <span${
                feature.properties.disaster4 === 1 ? '' : ' style="color:#ccc;"'
            }> 地震</span>\
            <div>\
            <span${
                feature.properties.disaster5 === 1 ? '' : ' style="color:#ccc;"'
            }>津波</span>\
            <span${
                feature.properties.disaster6 === 1 ? '' : ' style="color:#ccc;"'
            }> 大規模な火事</span>\
            <span${
                feature.properties.disaster7 === 1 ? '' : ' style="color:#ccc;"'
            }> 内水氾濫</span>\
            <span${
                feature.properties.disaster8 === 1 ? '' : ' style="color:#ccc;"'
            }> 火山現象</span>\
            </div>`,
        )
        .setMaxWidth('400px')
        .addTo(map);
});
