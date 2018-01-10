const DEFAULT_TITLE = 'DRAGONS OF MUGLOAR';

export const updateDocumentTitle = function (title?: string): void {
  document.title = title ? `${title} ${DEFAULT_TITLE}` : DEFAULT_TITLE;
};
