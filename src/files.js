import { getDemoAndSnippetIdx, basename, el } from './utils';

const getFilesLinkId = (demoIdx, snippetIdx) => {
  return `s_${ demoIdx + '-' + snippetIdx }`;
}
const getFilesLinkURL = (demoIdx, snippetIdx) => {
  return `javascript:window.location.hash='${ demoIdx },${ snippetIdx}';` +
  `window.location.reload();`;
}

export default function files(settings) {
  const element = el('.files');
  const [ demoIdx, snippetIdx ] = getDemoAndSnippetIdx();
  const currentSnippets = settings.demos[demoIdx].snippets;

  element.innerHTML = '<ul>' + currentSnippets.map((path, idx) => {
    return `<li><a href="${ getFilesLinkURL(demoIdx, idx) }" ${ snippetIdx === idx ? 'class="active"' : '' } id="${ getFilesLinkId(demoIdx, idx) }">${ basename(path) }</a></li>`;
  }).join('') + '</ul>';

  return {
    indicateFileEditing(editing) {
      const snippet = document.querySelector('#' + getFilesLinkId(demoIdx, snippetIdx));

      if (
        snippet &&
        typeof settings.demos[demoIdx] !== 'undefined' &&
        typeof settings.demos[demoIdx].snippets[snippetIdx] !== 'undefined'
      ) {
        snippet.innerText = basename(settings.demos[demoIdx].snippets[snippetIdx]) + (editing ? ' *' : '');
      }
    }
  }
}