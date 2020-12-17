import CMS from 'netlify-cms-app';
import { UuidControl, UuidPreview } from 'netlify-cms-widget-uuid-v4';

// const titleInput = document.querySelector('[id*=title-field]');
// titleInput.addEventListener('input', (e) => {
//     // do something with title
//     const title = e.target.value;
// });

CMS.registerWidget('uuid', UuidControl, UuidPreview)
