export const components = [
  { name: 'button' },
  {
    name: 'file-trigger',
    children: [{ name: 'button' }],
  },
  {
    name: 'toggle-button',
    children: [{ name: 'button' }],
  },
  {
    name: 'buttons',
    children: [{ name: 'button' }, { name: 'file-trigger' }, { name: 'toggle-button' }],
  },
  {
    name: 'text-field',
    children: [{ name: 'field' }],
  },
  {
    name: 'collections',
    children: [
      { name: 'menu' },
      { name: 'list-box' },
      { name: 'tabs' },
      { name: 'tag-group' },
      { name: 'table' },
      { name: 'dropdown' },
    ],
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
    children: [
      { name: 'calendar' },
      { name: 'date-field' },
      { name: 'date-picker' },
      { name: 'time-field' },
      { name: 'button' },
      { name: 'popover' },
      { name: 'field' },
      { name: 'dialog' },
    ],
  },
  { name: 'calendar' },
  { name: 'date-field' },
  {
    name: 'date-picker',
    children: [
      { name: 'date-field' },
      { name: 'popover' },
      { name: 'field' },
      { name: 'calendar' },
      { name: 'button' },
      { name: 'dialog' },
    ],
  },
  { name: 'time-field', children: [{ name: 'field' }, { name: 'date-field' }] },
  { name: 'drag-and-drop', children: [{ name: 'drop-zone' }] },
  { name: 'drop-zone' },
  {
    name: 'forms',
    children: [
      { name: 'form' },
      { name: 'text-field' },
      { name: 'field' },
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
    name: 'overlays',
    children: [
      { name: 'button' },
      { name: 'dialog' },
      { name: 'modal' },
      { name: 'sheet' },
      { name: 'drawer' },
      { name: 'popover' },
      { name: 'tooltip' },
    ],
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
    children: [
      { name: 'combo-box' },
      { name: 'select' },
      { name: 'dropdown' },
      { name: 'field' },
      { name: 'list-box' },
      { name: 'popover' },
      { name: 'button' },
      { name: 'modal' },
    ],
  },
  {
    name: 'combo-box',
    children: [
      { name: 'select' },
      { name: 'dropdown' },
      { name: 'field' },
      { name: 'list-box' },
      { name: 'popover' },
      { name: 'button' },
      { name: 'modal' },
    ],
  },
  {
    name: 'select',
    children: [{ name: 'dropdown' }, { name: 'field' }, { name: 'list-box' }, { name: 'popover' }, { name: 'modal' }],
  },
  {
    name: 'statuses',
    children: [
      { name: 'badge' },
      { name: 'progress-bar' },
      { name: 'meter' },
      { name: 'note' },
      { name: 'field' },
      { name: 'toaster' },
    ],
  },

  { name: 'badge' },
  { name: 'progress-bar', children: [{ name: 'field' }] },
  { name: 'meter', children: [{ name: 'field' }] },
  { name: 'note' },
  { name: 'toaster' },
  { name: 'surfaces', children: [{ name: 'card' }] },
  { name: 'card' },
]
