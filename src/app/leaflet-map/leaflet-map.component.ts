import { OnInit } from '@angular/core';
import { AfterViewInit, Component } from '@angular/core';
import * as geojson from 'geojson';
import * as L from 'leaflet';

@Component({
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.css'],
})
export class LeafletMapComponent implements OnInit, AfterViewInit {
  constructor() {}
  private myMap!: L.Map;

  ngOnInit(): void {    this.initializeMap();}

  ngAfterViewInit(): void {

    this.addGeoJsonFeatures();

    this.myMap.on('click', (e) => {
      let d: any = document.getElementById('coordinates');
      d.innerHTML = `Lat:${e.latlng.lat},Long:${e.latlng.lng}`;
    });
  }

  initializeMap() {
    // map initialisation
    this.myMap = L.map('map').setView([28.4595, 77.0266], 1);
    // tileLayer
    const osm = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 6,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );
    osm.addTo(this.myMap);

    var OPNVKarte = L.tileLayer(
      'https://tileserver.memomaps.de/tilegen/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        attribution:
          'Map <a href="https://memomaps.de/">memomaps.de</a> <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }
    );
    var OpenTopoMap = L.tileLayer(
      'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 17,
        attribution:
          'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
      }
    );

    var MtbMap = L.tileLayer(
      'http://tile.mtbmap.cz/mtbmap_tiles/{z}/{x}/{y}.png',
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &amp; USGS',
      }
    );

    var Esri_WorldImagery = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      {
        attribution:
          'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
      }
    );

    var CyclOSM = L.tileLayer(
      'https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png',
      {
        maxZoom: 20,
        attribution:
          '<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }
    );

    // marker
    let marker = L.marker([28.4595, 77.0266]).addTo(this.myMap);
    marker.bindPopup('Neeraj' + ' ' + marker.getLatLng());

    // LAYER GROUP
    var baseMaps = {
      OpenStreetMap: osm,
      OPNVKarte: OPNVKarte,
      OpenTopoMap: OpenTopoMap,
      MtbMap: MtbMap,
      Esri_WorldImagery: Esri_WorldImagery,
      CyclOSM: CyclOSM,
    };

    var overlayMaps = {
      MARKER: marker,
    };

    var layerControl = L.control
      .layers(baseMaps, overlayMaps)
      .addTo(this.myMap);
  }

  // GeoJson
  addGeoJsonFeatures() {
    var geojsonData: geojson.FeatureCollection = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {
            name: 'Neeraj pant',
          },
          geometry: {
            type: 'LineString',
            coordinates: [
              [73.125, 27.877928333679495],
              [75.2783203125, 24.246964554300924],
              [78.0029296875, 29.19053283229458],
              [73.6962890625, 29.611670115197377],
              [74.1357421875, 28.304380682962783],
            ],
          },
        },
        {
          type: 'Feature',
          properties: { name: 'Neeraj pant' },
          geometry: {
            type: 'LineString',
            coordinates: [
              [76.728515625, 18.771115062337024],
              [81.6064453125, 19.72534224805787],
              [81.03515625, 20.550508894195637],
              [84.990234375, 22.39071391683855],
              [80.37597656249999, 22.39071391683855],
              [77.6953125, 20.2209657795223],
            ],
          },
        },
        {
          type: 'Feature',
          properties: { name: 'fretron' },
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [79.8486328125, 26.70635985763354],
                [76.9482421875, 26.43122806450644],
                [76.0693359375, 25.24469595130604],
                [83.583984375, 25.045792240303445],
                [85.4736328125, 27.72243591897343],
                [79.8486328125, 26.70635985763354],
              ],
            ],
          },
        },
        {
          type: 'Feature',
          properties: { name: 'DELL' },
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [73.4326171875, 21.616579336740603],
                [77.9150390625, 21.983801417384697],
                [73.3447265625, 21.453068633086783],
                [73.740234375, 19.89072302399691],
                [75.5419921875, 19.186677697957833],
                [78.22265625, 19.68397023588844],
                [77.95898437499999, 22.30942584120019],
                [73.4326171875, 21.616579336740603],
              ],
            ],
          },
        },
        {
          type: 'Feature',
          properties: {
            stroke: '#21835d',
            'stroke-width': 2,
            'stroke-opacity': 1,
            fill: '#555555',
            'fill-opacity': 1,
          },
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [79.90219116210938, 23.266580706342193],
                [79.8651123046875, 23.214844630431394],
                [79.97222900390625, 23.144148342611462],
                [79.89257812499999, 23.02539575081449],
                [80.09033203125, 23.021604048244296],
                [80.23590087890624, 23.00137983406543],
                [80.27297973632812, 23.245131597411042],
                [79.90219116210938, 23.266580706342193],
              ],
            ],
          },
        },
        {
          type: 'Feature',
          properties: {
            'marker-color': '#be2d2d',
            'marker-size': 'medium',
            'marker-symbol': 'star-stroked',
          },
          geometry: {
            type: 'Point',
            coordinates: [80.321044921875, 22.952070618482676],
          },
        },
        {
          type: 'Feature',
          properties: { name: 'fretron5432' },
          geometry: {
            type: 'Point',
            coordinates: [83.1884765625, 23.32208001137843],
          },
        },
        {
          type: 'Feature',
          properties: { name: 'fretron432' },
          geometry: {
            type: 'Point',
            coordinates: [78.8818359375, 29.49698759653577],
          },
        },
        {
          type: 'Feature',
          properties: { name: 'fretron432' },
          geometry: {
            type: 'Point',
            coordinates: [76.81640625, 16.214674588248542],
          },
        },
        {
          type: 'Feature',
          properties: { name: 'fretron432' },
          geometry: {
            type: 'Point',
            coordinates: [72.2900390625, 25.443274612305746],
          },
        },
        {
          type: 'Feature',
          properties: { name: 'fretron432' },
          geometry: {
            type: 'Point',
            coordinates: [74.091796875, 22.958393318086348],
          },
        },
        {
          type: 'Feature',
          properties: { name: 'fretron432' },
          geometry: {
            type: 'Point',
            coordinates: [85.166015625, 21.983801417384697],
          },
        },
        {
          type: 'Feature',
          properties: { name: 'fretron432' },
          geometry: {
            type: 'Point',
            coordinates: [78.3544921875, 14.43468021529728],
          },
        },
        {
          type: 'Feature',
          properties: { name: 'fretron432' },
          geometry: {
            type: 'Point',
            coordinates: [74.970703125, 27.176469131898898],
          },
        },
      ],
    };

    if (this.myMap) {
      L.geoJSON(geojsonData, {
        onEachFeature: function (feature, layer) {
          layer.bindPopup(feature.properties.name);
        },
        style: {
          fillColor: 'red',
          opacity: 1,
          color: 'blue',
        },
      })
        .bindPopup('neeraj')
        .addTo(this.myMap);
    }
  }
}
