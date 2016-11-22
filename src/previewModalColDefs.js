export const previewModalColDefs = [{
  field: 'value',
  enableHiding: false,
  enableSorting: false
}, {
  field: 'count',
  enableHiding: false,
  suppressRemoveSort: true
}, {
  field: 'percentage',
  cellTemplate: '<uib-progressbar value="row.entity.percentage" type="success">{{row.entity.percentage + "%"}}</uib-progressbar>',
  enableHiding: false,
  enableSorting: false
}]
