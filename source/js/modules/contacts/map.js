import {map as createMap, tileLayer as createLayer, marker as createMarker, Icon} from 'leaflet';

const MAP_ID = '#contacts__map';

const LAYER_URL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const CENTER = [55.028522, 82.928281];
const ZOOM = 17;

const ICON_URL = './img/svg/map-marker.svg';
const ICON_SIZE = [70, 70];
const ICON_ANCHOR = [40, 70];
const POPUP_ANCHOR = [-6, -70];
const POPUP_TEXT = 'г. Новосибирск, ул. Щетинкина&nbsp;68, культурный центр &laquo;Бейт Менахем&raquo;';

export const createContactsMap = () => {
  const mapElement = document.querySelector(MAP_ID);

  if (mapElement) {
    mapElement.replaceChildren();

    const map = createMap(mapElement, {
      center: CENTER,
      zoom: ZOOM,
      layers: [createLayer(LAYER_URL)],

      dragging: false,
      touchZoom: false,
      keyboard: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
    });

    const marker = createMarker(CENTER, {
      icon: new Icon({
        iconUrl: ICON_URL,
        iconSize: ICON_SIZE,
        popupAnchor: POPUP_ANCHOR,
        iconAnchor: ICON_ANCHOR,
      }),
    });

    marker.addTo(map).bindPopup(POPUP_TEXT);

    map.attributionControl.setPrefix('');
  }
};
