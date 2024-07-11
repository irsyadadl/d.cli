export const components = [
  { name: 'button' },
  { name: 'dropdown' },
  { name: 'dialog' },
  { name: 'dynamic-overlay' },
  { name: 'field' },
  { name: 'file-trigger', children: [{ name: 'button' }] },
  { name: 'toggle-button', children: [{ name: 'button' }] },
  { name: 'buttons', children: [{ name: 'file-trigger' }, { name: 'toggle-button' }] },
  { name: 'text-field', children: [{ name: 'field' }] },
  {
    name: 'collections',
    children: [{ name: 'menu' }, { name: 'list-box' }, { name: 'tabs' }, { name: 'tag-group' }, { name: 'table' }],
  },
  { name: 'menu', children: [{ name: 'dropdown' }] },
  { name: 'list-box', children: [{ name: 'dropdown' }] },
  { name: 'media', children: [{ name: 'avatar' }] },
  { name: 'avatar' },
  { name: 'tabs' },
  { name: 'tag-group', children: [{ name: 'field' }, { name: 'badge' }] },
  { name: 'table', children: [{ name: 'checkbox' }] },
  {
    name: 'date-and-time',
    children: [{ name: 'date-field' }, { name: 'date-picker' }, { name: 'popover' }],
  },
  { name: 'calendar', children: [{ name: 'button' }] },
  { name: 'date-field' },
  {
    name: 'date-picker',
    children: [{ name: 'popover' }, { name: 'field' }, { name: 'calendar' }, { name: 'dynamic-overlay' }],
  },
  { name: 'time-field', children: [{ name: 'field' }, { name: 'date-field' }] },
  { name: 'drag-and-drop', children: [{ name: 'drop-zone' }] },
  { name: 'drop-zone' },
  {
    name: 'forms',
    children: [
      { name: 'form' },
      { name: 'text-field' },
      { name: 'radio' },
      { name: 'checkbox' },
      { name: 'textarea' },
      { name: 'slider' },
      { name: 'switch' },
      { name: 'number-field' },
      { name: 'search-field' },
      { name: 'input-otp' },
    ],
  },
  { name: 'input-otp' },
  { name: 'form' },
  { name: 'text-field', children: [{ name: 'field' }] },
  { name: 'radio', children: [{ name: 'field' }] },
  { name: 'checkbox', children: [{ name: 'field' }] },
  { name: 'textarea', children: [{ name: 'field' }] },
  { name: 'slider', children: [{ name: 'field' }] },
  { name: 'switch' },
  { name: 'number-field', children: [{ name: 'field' }] },
  { name: 'search-field', children: [{ name: 'field' }, { name: 'button' }] },
  {
    name: 'navigation',
    children: [
      { name: 'link' },
      { name: 'breadcrumbs' },
      { name: 'pagination' },
      { name: 'button' },
      { name: 'separator' },
      { name: 'field' },
    ],
  },
  {
    name: 'pagination',
    children: [{ name: 'button' }, { name: 'separator' }, { name: 'field' }],
  },
  {
    name: 'breadcrumbs',
    children: [{ name: 'link' }],
  },
  { name: 'link' },
  {
    name: 'overlays',
    children: [{ name: 'modal' }, { name: 'sheet' }, { name: 'drawer' }, { name: 'popover' }, { name: 'tooltip' }],
  },
  {
    name: 'modal',
    children: [{ name: 'button' }, { name: 'dialog' }],
  },
  {
    name: 'sheet',
    children: [{ name: 'dialog' }, { name: 'modal' }],
  },
  {
    name: 'drawer',
    children: [{ name: 'dialog' }, { name: 'modal' }],
  },
  {
    name: 'popover',
    children: [{ name: 'dialog' }, { name: 'modal' }],
  },
  {
    name: 'pickers',
    children: [{ name: 'combo-box' }, { name: 'select' }, { name: 'list-box' }, { name: 'popover' }],
  },
  {
    name: 'combo-box',
    children: [{ name: 'field' }, { name: 'list-box' }, { name: 'popover' }],
  },
  {
    name: 'select',
    children: [{ name: 'field' }, { name: 'list-box' }, { name: 'popover' }],
  },
  {
    name: 'statuses',
    children: [{ name: 'badge' }, { name: 'progress-bar' }, { name: 'meter' }, { name: 'note' }, { name: 'toaster' }],
  },

  { name: 'badge' },
  { name: 'progress-bar', children: [{ name: 'field' }] },
  { name: 'meter', children: [{ name: 'field' }] },
  { name: 'note' },
  { name: 'toaster' },
  { name: 'surfaces', children: [{ name: 'card' }] },
  { name: 'card' },
  {
    name: 'colors',
    children: [{ name: 'color-picker' }],
  },
  {
    name: 'color-picker',
    children: [{ name: 'color' }, { name: 'select' }, { name: 'slider' }, { name: 'dynamic-overlay' }],
  },
  { name: 'color', children: [{ name: 'field' }] },
]
