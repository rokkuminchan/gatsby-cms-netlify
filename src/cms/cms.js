import CMS from 'netlify-cms-app';
import { UuidControl, UuidPreview } from 'netlify-cms-widget-uuid-v4';

const lessonSlugField = getFieldById("customizedLessonSlug");
const lessonTitleField = getFieldById("lessonTitle");
const topicIdField = getFieldById("topicId");

topicIdField && topicIdField.addEventListener('input', (e) => {
    console.log(e.target.value);
});

lessonTitleField && lessonTitleField.addEventListener('input', (e) => {
    lessonSlugField.value = e.target.value;
});

CMS.registerWidget('uuid', UuidControl, UuidPreview);

function getFieldById(id) {
    return document.querySelector(`input[id*='${id}-field']`);
}
